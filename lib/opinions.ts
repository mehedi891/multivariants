import { cache } from "react";

export type Opinion = {
  id: string;
  title: string;
  description: string;
  logoUrl?: string;
};

function normalizeEnvUrl(value: string | undefined) {
  const t = value?.trim();
  if (!t) return undefined;
  return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))
    ? t.slice(1, -1).trim()
    : t;
}

const CMS_API_BASE_URL =
  normalizeEnvUrl(process.env.CMS_API_BASE_URL) ?? "https://efoli-cms.vercel.app";
const OPINIONS_API_PATH =
  normalizeEnvUrl(process.env.OPINIONS_API_PATH) ?? "/api/public/opinions";
const OPINIONS_SITE = process.env.SITE_SLUG ?? process.env.OPINIONS_SITE ?? "multivariants";

// Shown if the CMS has no opinions published yet or is unreachable, so the
// homepage section never renders empty.
const FALLBACK_OPINIONS: Opinion[] = [
  {
    id: "fallback-1",
    title: "A game-changer for B2B ordering",
    description:
      "Our customers can now select multiple variants in one go — average order value jumped in the first month.",
  },
  {
    id: "fallback-2",
    title: "Live in 5 minutes",
    description:
      "Installation was a breeze and the Mix n Match feature is exactly what our wholesale customers needed.",
  },
  {
    id: "fallback-3",
    title: "Expanded into new markets",
    description:
      "The multi-language support let us grow into new European markets, and the support team is incredibly responsive.",
  },
];

function mapOpinion(raw: unknown): Opinion | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  const title = String(o.title ?? "").trim();
  const description = String(o.description ?? "").trim();
  if (!title && !description) return null;
  const logo = String(o.logoUrl ?? "").trim();
  return {
    id: String(o.id ?? title),
    title,
    description,
    logoUrl: logo || undefined,
  };
}

/**
 * List published opinions/testimonials for the site from the CMS.
 * The endpoint returns a bare array; falls back to local content on error/empty.
 */
export const getPublicOpinions = cache(async (): Promise<Opinion[]> => {
  try {
    const url = new URL(OPINIONS_API_PATH, CMS_API_BASE_URL);
    url.searchParams.set("site", OPINIONS_SITE);
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return FALLBACK_OPINIONS;
    const data: unknown = await res.json();
    const arr = Array.isArray(data)
      ? data
      : ((data as Record<string, unknown>)?.opinions ??
          (data as Record<string, unknown>)?.data ??
          []);
    const mapped = (Array.isArray(arr) ? arr : [])
      .map(mapOpinion)
      .filter((x): x is Opinion => x !== null);
    return mapped.length ? mapped : FALLBACK_OPINIONS;
  } catch {
    return FALLBACK_OPINIONS;
  }
});
