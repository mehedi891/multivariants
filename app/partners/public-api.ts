import localPartners from "@/app/partners/partners.json";

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
const PARTNERS_API_PATH =
  normalizeEnvUrl(process.env.PARTNERS_API_PATH) ?? "/api/public/partners";
const PARTNERS_SITE =
  process.env.PARTNERS_SITE ?? process.env.BLOG_SITE ?? "multivariants";
const PARTNERS_API_FALLBACK_ENABLED =
  process.env.PARTNERS_API_FALLBACK_ENABLED !== "false";

export type PublicPartner = {
  id: string;
  title: string;
  description: string;
  logoUrl?: string;
  link: string;
};

type LocalPartner = {
  id: string;
  businessName: string;
  description: string;
  websiteUrl: string;
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

function buildPartnersUrl() {
  return new URL(normalizeApiPath(PARTNERS_API_PATH, "/api/public/partners"), CMS_API_BASE_URL);
}

function normalizePartnerLink(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return "#";

  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:")
  ) {
    return raw;
  }

  if (raw.startsWith("//")) {
    return `https:${raw}`;
  }

  return `https://${raw.replace(/^\/+/, "")}`;
}

function normalizePayload(payload: unknown) {
  if (Array.isArray(payload)) return payload;

  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;

  return (
    (Array.isArray(data.partners) && data.partners) ||
    (Array.isArray(root.partners) && root.partners) ||
    (Array.isArray(data.items) && data.items) ||
    (Array.isArray(root.items) && root.items) ||
    []
  );
}

function mapApiPartner(raw: Record<string, unknown>): PublicPartner {
  const title = String(raw.title ?? raw.name ?? "Partner").trim() || "Partner";
  const slugId = title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-+|-+$/g, "");

  const fallbackId = slugId || "partner";

  return {
    id: String(raw.id ?? raw.slug ?? fallbackId),
    title,
    description: String(raw.description ?? raw.excerpt ?? ""),
    logoUrl: String(raw.logoUrl ?? raw.logo ?? raw.image ?? "").trim() || undefined,
    link: normalizePartnerLink(raw.link ?? raw.websiteUrl ?? raw.url),
  };
}

function fallbackPartners(): PublicPartner[] {
  return (localPartners as LocalPartner[]).map((partner) => ({
    id: partner.id,
    title: partner.businessName,
    description: partner.description,
    logoUrl: undefined,
    link: normalizePartnerLink(partner.websiteUrl),
  }));
}

export async function getPublicPartners(): Promise<{ partners: PublicPartner[]; error?: string }> {
  try {
    const url = buildPartnersUrl();
    url.searchParams.set("site", PARTNERS_SITE);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`partners list request failed: ${res.status}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    const rawText = await res.text();
    let payload: unknown;
    try {
      payload = JSON.parse(rawText);
    } catch {
      const preview = rawText.slice(0, 140).replaceAll(/\s+/g, " ");
      throw new Error(
        `partners list request expected JSON but got "${contentType || "unknown"}" (${preview})`
      );
    }

    const partners = normalizePayload(payload)
      .filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null
      )
      .map(mapApiPartner)
      .filter((partner) => Boolean(partner.id && partner.title));

    return { partners };
  } catch (error) {
    if (PARTNERS_API_FALLBACK_ENABLED) {
      return {
        partners: fallbackPartners(),
        error: toErrorMessage(error),
      };
    }

    return {
      partners: [],
      error: toErrorMessage(error),
    };
  }
}
