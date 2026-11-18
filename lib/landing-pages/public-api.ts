import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import {
  getPreviewSecret,
  normalizeEnvUrl,
  type PostStatus,
} from "@/lib/blog/public-api";

/**
 * CMS landing pages: pages editors build in the CMS, served at the site root
 * (`/{slug}`), English only. Rendered by app/[lang]/(landing)/[slug]/page.tsx.
 *
 * Published pages are cached until the CMS says otherwise: the fetch has no time
 * limit and carries the `cms` tag, which /api/revalidate expires whenever a page
 * is published, edited, unpublished or deleted. In Draft Mode the fetch sends
 * the preview token (so the CMS also returns drafts) and is never cached.
 */

const CMS_API_BASE_URL =
  normalizeEnvUrl(process.env.CMS_API_BASE_URL) ?? "https://admin.yourdomain.com";
const SITE = process.env.SITE_SLUG ?? "multivariants";

/** Cache tag on CMS fetches that wait for on-demand revalidation. */
export const CMS_CACHE_TAG = "cms";

export type LandingPage = {
  id: string;
  title: string;
  slug: string;
  /** Raw HTML, rendered exactly as received (Raw HTML blocks, styles, scripts). */
  content: string;
  showHeader: boolean;
  showFooter: boolean;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  publishedAt?: string;
  updatedAt?: string;
  /** Only returned with a valid preview token. */
  isPreview?: boolean;
  /** DRAFT · PUBLISHED · SCHEDULED · ARCHIVED — only returned in preview. */
  status?: PostStatus;
};

export type LandingPageListItem = {
  title: string;
  slug: string;
  noIndex: boolean;
  publishedAt?: string;
  updatedAt?: string;
};

const STATUSES: readonly PostStatus[] = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"];

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toLandingPage(raw: Record<string, unknown>): LandingPage {
  const status = String(raw.status ?? "").toUpperCase();
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    content: typeof raw.content === "string" ? raw.content : "",
    // The site's own chrome stays on unless the editor switched it off.
    showHeader: raw.showHeader !== false,
    showFooter: raw.showFooter !== false,
    metaTitle: optionalString(raw.metaTitle),
    metaDescription: optionalString(raw.metaDescription),
    ogImage: optionalString(raw.ogImage),
    canonicalUrl: optionalString(raw.canonicalUrl),
    noIndex: raw.noIndex === true,
    publishedAt: optionalString(raw.publishedAt),
    updatedAt: optionalString(raw.updatedAt),
    isPreview: raw.isPreview === true,
    status: STATUSES.find((s) => s === status),
  };
}

function apiUrl(path: string) {
  const url = new URL(path, CMS_API_BASE_URL);
  url.searchParams.set("site", SITE);
  return url;
}

/**
 * One landing page, or `null` when the CMS has no page with that slug (404).
 * Any other CMS failure throws: a live landing page must never be turned into
 * a 404 by a CMS outage.
 *
 * `preview: true` sends the preview token, so drafts are returned too.
 */
export async function fetchLandingPage(
  slug: string,
  { preview = false }: { preview?: boolean } = {},
): Promise<LandingPage | null> {
  const url = apiUrl(`/api/public/landing-pages/${encodeURIComponent(slug)}`);
  const previewToken = preview ? getPreviewSecret() : undefined;

  const res = await fetch(
    url,
    previewToken
      ? {
          headers: { Accept: "application/json", "x-preview-token": previewToken },
          cache: "no-store",
        }
      : {
          headers: { Accept: "application/json" },
          next: { revalidate: false, tags: [CMS_CACHE_TAG] },
        },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`[landing-pages] CMS returned ${res.status} for landing page "${slug}"`);
  }
  return toLandingPage((await res.json()) as Record<string, unknown>);
}

/**
 * The landing page for the current request — the draft when Draft Mode is on.
 * Cached per request, so generateMetadata and the page share one fetch.
 */
export const getLandingPage = cache(async (slug: string) => {
  const { isEnabled } = await draftMode();
  return fetchLandingPage(slug, { preview: isEnabled });
});

/**
 * Every published landing page (no content), for the sitemap. Returns `[]`
 * when the CMS can't be reached, so the rest of the sitemap still builds.
 */
export async function getPublicLandingPages(): Promise<LandingPageListItem[]> {
  try {
    const res = await fetch(apiUrl("/api/public/landing-pages"), {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600, tags: [CMS_CACHE_TAG] },
    });
    if (!res.ok) throw new Error(`CMS returned ${res.status}`);
    const { pages } = (await res.json()) as { pages?: Record<string, unknown>[] };
    return (pages ?? [])
      .map((p) => ({
        title: String(p.title ?? ""),
        slug: String(p.slug ?? ""),
        noIndex: p.noIndex === true,
        publishedAt: optionalString(p.publishedAt),
        updatedAt: optionalString(p.updatedAt),
      }))
      .filter((p) => p.slug);
  } catch (error) {
    console.warn(
      `[landing-pages] list: ${error instanceof Error ? error.message : String(error)}`,
    );
    return [];
  }
}
