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
const FAQ_SITE = process.env.SITE_SLUG ?? process.env.FAQ_SITE ?? "multivariants";
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

/**
 * `fallbackItems` is shown whenever the CMS has no FAQs published (or is
 * unreachable). It is static copy, so the caller passes it in already
 * localized from messages/faq/<locale>.json — keeping it here in English meant
 * the localized FAQ page, and its FAQPage structured data, rendered English.
 */
export async function getPublicFaqs(
  category?: string,
  fallbackItems: PublicFaqItem[] = [],
): Promise<PublicFaqResult> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", FAQ_SITE);
        if (category) url.searchParams.set("category", category);

        const res = await fetch(url.toString(), {
          next: { revalidate: 60 },
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
          return fallbackFaqs(fallbackItems);
        }

        return normalized;
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch (error) {
    if (FAQ_API_FALLBACK_ENABLED) {
      return { ...fallbackFaqs(fallbackItems), error: toErrorMessage(error) };
    }
    return { categories: [], uncategorized: [], total: 0, error: toErrorMessage(error) };
  }
}

// Local fallback so the page still renders if the CMS is empty or unreachable.
function fallbackFaqs(uncategorized: PublicFaqItem[]): PublicFaqResult {
  return { categories: [], uncategorized, total: uncategorized.length };
}

