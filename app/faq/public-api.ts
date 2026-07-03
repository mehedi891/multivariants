function normalizeEnvUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1).trim()
      : trimmed;
  return unquoted || undefined;
}

const CMS_API_BASE_URL =
  normalizeEnvUrl(process.env.CMS_API_BASE_URL) ?? "https://admin.yourdomain.com";
const FAQ_API_PATH =
  normalizeEnvUrl(process.env.FAQ_API_PATH) ?? "/api/public/faqs";
const FAQ_SITE = process.env.FAQ_SITE ?? "multivariants";
const FAQ_API_FALLBACK_ENABLED = process.env.FAQ_API_FALLBACK_ENABLED !== "false";

export type PublicFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PublicFaqCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  faqs: PublicFaqItem[];
};

export type PublicFaqResult = {
  categories: PublicFaqCategory[];
  uncategorized: PublicFaqItem[];
  total: number;
  error?: string;
};

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function normalizeApiPath(pathValue: string, fallback: string) {
  const trimmed = pathValue.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildApiUrl(pathValue: string) {
  return new URL(normalizeApiPath(pathValue, "/api/public/faqs"), CMS_API_BASE_URL);
}

function buildUrlCandidates() {
  const candidates: URL[] = [];
  const seen = new Set<string>();
  const add = (url: URL) => {
    const key = url.toString();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(url);
  };
  add(buildApiUrl(FAQ_API_PATH));
  add(buildApiUrl("/api/public/faqs"));
  return candidates;
}

function parseJsonPayload(rawText: string, contentType: string, scope: string) {
  try {
    return JSON.parse(rawText);
  } catch {
    const preview = rawText.slice(0, 120).replaceAll(/\s+/g, " ");
    throw new Error(
      `${scope} expected JSON but got "${contentType || "unknown"}" (${preview})`
    );
  }
}

function mapFaqItem(raw: unknown): PublicFaqItem | null {
  if (typeof raw !== "object" || raw === null) return null;
  const item = raw as Record<string, unknown>;
  const question = String(item.question ?? "").trim();
  const answer = String(item.answer ?? "").trim();
  if (!question || !answer) return null;
  return {
    id: String(item.id ?? question),
    question,
    answer,
  };
}

function mapFaqItems(raw: unknown): PublicFaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(mapFaqItem).filter((x): x is PublicFaqItem => x !== null);
}

function mapCategory(raw: unknown): PublicFaqCategory | null {
  if (typeof raw !== "object" || raw === null) return null;
  const cat = raw as Record<string, unknown>;
  const name = String(cat.name ?? "").trim();
  if (!name) return null;
  const faqs = mapFaqItems(cat.faqs);
  if (faqs.length === 0) return null;
  return {
    id: String(cat.id ?? cat.slug ?? name),
    name,
    slug: String(cat.slug ?? name),
    description: String(cat.description ?? "").trim() || undefined,
    faqs,
  };
}

function normalizePayload(payload: unknown): PublicFaqResult {
  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};

  // Single-category shape ( ?category=... ) — has faqs at the root.
  if (Array.isArray(root.faqs) && !Array.isArray(root.categories)) {
    const single = mapCategory(root);
    const categories = single ? [single] : [];
    const total = categories.reduce((n, c) => n + c.faqs.length, 0);
    return { categories, uncategorized: [], total };
  }

  const categories = (Array.isArray(root.categories) ? root.categories : [])
    .map(mapCategory)
    .filter((x): x is PublicFaqCategory => x !== null);
  const uncategorized = mapFaqItems(root.uncategorized);

  const counted =
    categories.reduce((n, c) => n + c.faqs.length, 0) + uncategorized.length;
  const total = Number(root.total);

  return {
    categories,
    uncategorized,
    total: Number.isFinite(total) && total > 0 ? total : counted,
  };
}

export async function getPublicFaqs(
  category?: string
): Promise<PublicFaqResult> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", FAQ_SITE);
        if (category) url.searchParams.set("category", category);

        const res = await fetch(url.toString(), {
          next: { revalidate: 300 },
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const contentType = res.headers.get("content-type") ?? "";
        const rawText = await res.text();
        const payload = parseJsonPayload(rawText, contentType, "faq request");
        const normalized = normalizePayload(payload);

        // If the CMS has no FAQs published yet, use local content so the page
        // is never blank — real CMS FAQs take over as soon as they're added.
        const isEmpty =
          normalized.categories.length === 0 &&
          normalized.uncategorized.length === 0;
        if (isEmpty && FAQ_API_FALLBACK_ENABLED && !category) {
          return fallbackFaqs();
        }

        return normalized;
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch (error) {
    if (FAQ_API_FALLBACK_ENABLED) {
      return { ...fallbackFaqs(), error: toErrorMessage(error) };
    }
    return { categories: [], uncategorized: [], total: 0, error: toErrorMessage(error) };
  }
}

// Local fallback so the page still renders if the CMS is unreachable.
function fallbackFaqs(): PublicFaqResult {
  const uncategorized: PublicFaqItem[] = [
    {
      id: "what-is",
      question: "What is MultiVariants?",
      answer:
        "MultiVariants is a Shopify app that lets your customers add multiple product variants to the cart in a single click. It's built for B2B, wholesale, and high-volume B2C stores that need faster bulk ordering, order restrictions, and flexible quantity rules.",
    },
    {
      id: "bulk-add",
      question: "What is Bulk Add to Cart?",
      answer:
        "Instead of adding one variant at a time, shoppers see all variants (colors, sizes, and other options) in a single table, set quantities for each, then add everything to the cart at once. This dramatically reduces clicks and cart abandonment.",
    },
    {
      id: "mix-n-match",
      question: "What is Mix n Match?",
      answer:
        "Mix n Match lets customers build their own box or bundle from different variants while meeting minimum or maximum order limits you define. It's a great way to increase average order value and offer a more personalized shopping experience.",
    },
    {
      id: "restrictions",
      question: "Can I set order minimums, maximums, and quantity increments?",
      answer:
        "Yes. You can enforce minimum and maximum quantities per product or per variant, require minimums per color or size, and set incremental quantities (for example only allow orders in multiples of 12, 24, 36).",
    },
    {
      id: "free-plan",
      question: "Is there a free plan or a trial?",
      answer:
        "Yes. MultiVariants offers a free plan to get started, plus a 7-day free trial on paid plans so you can test the advanced features risk-free.",
    },
    {
      id: "support",
      question: "Do you offer support?",
      answer:
        "Yes. Our team offers strong support and onboarding, including guided setup, customization help, and real-time troubleshooting over live call and screen share. You can also email support@multivariants.com.",
    },
  ];

  return { categories: [], uncategorized, total: uncategorized.length };
}
