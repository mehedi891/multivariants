import type { AcademyCategory, AcademyDoc, AcademySection } from "@/app/academy/docs-data";
import {
  getAcademyCategories,
  getAcademyDocBySlug,
  getAllAcademyDocs,
} from "@/app/academy/docs-data";

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
const DOCS_API_PATH = normalizeEnvUrl(process.env.DOCS_API_PATH) ?? "/api/public/docs";
const DOCS_SITE = process.env.DOCS_SITE ?? process.env.BLOG_SITE ?? "multivariants";
const DOCS_API_FALLBACK_ENABLED = process.env.DOCS_API_FALLBACK_ENABLED === "true";

export type PublicAcademyDoc = AcademyDoc & {
  contentHtml?: string;
  categorySlug?: string;
  categoryTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type PublicAcademyCategoriesResult = {
  categories: AcademyCategory[];
  error?: string;
};

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function asNumber(value: unknown, fallback: number) {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return n;
  return fallback;
}

function formatReadTime(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) {
    const normalized = value.trim();
    if (/min/i.test(normalized)) return normalized;
    const parsed = Number(normalized);
    if (Number.isFinite(parsed) && parsed > 0) return `${Math.round(parsed)} min read`;
  }

  return `${asNumber(value, 5)} min read`;
}

function formatUpdatedDate(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return "Recently";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(value: string) {
  return value.replaceAll(/<[^>]*>/g, "").replaceAll(/\s+/g, " ").trim();
}

function sectionsToHtml(sections: AcademySection[]) {
  return sections
    .map((section) => {
      const heading = section.heading ? `<h2>${section.heading}</h2>` : "";
      const paragraphs = section.paragraphs.map((p) => `<p>${p}</p>`).join("");
      const points =
        section.points && section.points.length > 0
          ? `<ul>${section.points.map((point) => `<li>${point}</li>`).join("")}</ul>`
          : "";
      return `${heading}${paragraphs}${points}`;
    })
    .join("");
}

function normalizeApiPath(pathValue: string, fallback: string) {
  const trimmed = pathValue.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildApiUrl(pathValue: string) {
  const path = normalizeApiPath(pathValue, "/api/public/docs");
  return new URL(path, CMS_API_BASE_URL);
}

function buildListUrl() {
  return buildApiUrl(DOCS_API_PATH);
}

function buildSingleDocUrl(slug: string) {
  const url = buildApiUrl(DOCS_API_PATH);
  const cleanPath = url.pathname.replaceAll(/\/+$/g, "") || "/api/public/docs";
  url.pathname = `${cleanPath}/${encodeURIComponent(slug)}`;
  return url;
}

async function fetchJson(url: string, revalidateSeconds: number, scope: string) {
  const res = await fetch(url, {
    next: { revalidate: revalidateSeconds },
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`${scope}: request failed with status ${res.status}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  const raw = await res.text();
  try {
    return JSON.parse(raw);
  } catch {
    const preview = raw.slice(0, 140).replaceAll(/\s+/g, " ");
    throw new Error(
      `${scope}: expected JSON but got "${contentType || "unknown"}" (${preview})`
    );
  }
}

function mapSections(raw: unknown): AcademySection[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map((item) => {
      const paragraphsRaw = Array.isArray(item.paragraphs) ? item.paragraphs : [];
      const pointsRaw = Array.isArray(item.points) ? item.points : [];
      return {
        heading: String(item.heading ?? item.title ?? ""),
        paragraphs: paragraphsRaw.map((p) => String(p)),
        points: pointsRaw.map((p) => String(p)),
      };
    })
    .filter((section) => section.heading || section.paragraphs.length > 0);
}

function mapApiDocListItem(raw: Record<string, unknown>): AcademyDoc {
  const excerpt = String(raw.excerpt ?? raw.summary ?? raw.description ?? "").trim();
  return {
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? "Untitled Doc"),
    excerpt,
    readTime: formatReadTime(raw.readingTimeMinutes ?? raw.readTimeMinutes ?? raw.readTime),
    lastUpdated: formatUpdatedDate(raw.updatedAt ?? raw.lastUpdated ?? raw.publishedAt),
    sections: [],
  };
}

function mapApiCategory(raw: Record<string, unknown>): AcademyCategory | null {
  const docsRaw = Array.isArray(raw.docs) ? raw.docs : [];
  const docs = docsRaw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map(mapApiDocListItem)
    .filter((doc) => Boolean(doc.slug));

  const slug = String(raw.slug ?? "");
  const title = String(raw.name ?? raw.title ?? slug);
  if (!slug || !title) return null;

  return {
    slug,
    title,
    description: String(raw.description ?? ""),
    docs,
  };
}

function normalizeListPayload(payload: unknown) {
  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;

  const categoriesRaw =
    (Array.isArray(data.categories) && data.categories) ||
    (Array.isArray(root.categories) && root.categories) ||
    [];

  return categoriesRaw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map(mapApiCategory)
    .filter((category): category is AcademyCategory => Boolean(category));
}

function mapApiSingleDoc(payload: unknown): PublicAcademyDoc | null {
  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;
  const docRaw =
    typeof data.doc === "object" && data.doc !== null
      ? (data.doc as Record<string, unknown>)
      : data;

  const base = mapApiDocListItem(docRaw);
  if (!base.slug) return null;

  const sections = mapSections(docRaw.sections);
  const categoryObj =
    typeof docRaw.category === "object" && docRaw.category !== null
      ? (docRaw.category as Record<string, unknown>)
      : null;

  const contentHtml = String(
    docRaw.contentHtml ?? docRaw.content ?? docRaw.html ?? sectionsToHtml(sections)
  ).trim();

  const excerpt =
    base.excerpt ||
    (contentHtml ? stripHtml(contentHtml).slice(0, 180).trim() : "Academy guide");

  return {
    ...base,
    excerpt,
    sections,
    contentHtml,
    categorySlug:
      String(categoryObj?.slug ?? docRaw.categorySlug ?? "").trim() || undefined,
    categoryTitle:
      String(categoryObj?.name ?? categoryObj?.title ?? docRaw.categoryName ?? "").trim() ||
      undefined,
    seoTitle:
      String(docRaw.metaTitle ?? docRaw.seoTitle ?? "").trim() || undefined,
    seoDescription:
      String(docRaw.metaDescription ?? docRaw.seoDescription ?? "").trim() || undefined,
  };
}

export async function getPublicAcademyCategories(): Promise<PublicAcademyCategoriesResult> {
  try {
    const url = buildListUrl();
    url.searchParams.set("site", DOCS_SITE);

    const categories = normalizeListPayload(
      await fetchJson(url.toString(), 300, "docs list request")
    );

    return { categories };
  } catch (error) {
    if (DOCS_API_FALLBACK_ENABLED) {
      return { categories: getAcademyCategories(), error: toErrorMessage(error) };
    }

    return { categories: [], error: toErrorMessage(error) };
  }
}

export async function getPublicAcademyDoc(slug: string): Promise<PublicAcademyDoc | null> {
  try {
    const url = buildSingleDocUrl(slug);
    url.searchParams.set("site", DOCS_SITE);
    const parsed = await fetchJson(url.toString(), 600, `docs single request (${slug})`);
    const doc = mapApiSingleDoc(parsed);
    if (doc) return doc;

    if (DOCS_API_FALLBACK_ENABLED) {
      const entry = getAcademyDocBySlug(slug);
      if (!entry) return null;
      return {
        ...entry.doc,
        contentHtml: sectionsToHtml(entry.doc.sections),
        categorySlug: entry.category.slug,
        categoryTitle: entry.category.title,
      };
    }

    return null;
  } catch {
    if (DOCS_API_FALLBACK_ENABLED) {
      const entry = getAcademyDocBySlug(slug);
      if (!entry) return null;
      return {
        ...entry.doc,
        contentHtml: sectionsToHtml(entry.doc.sections),
        categorySlug: entry.category.slug,
        categoryTitle: entry.category.title,
      };
    }
    return null;
  }
}

export async function getPublicAcademySlugs(): Promise<string[]> {
  try {
    const { categories } = await getPublicAcademyCategories();
    return categories.flatMap((category) => category.docs.map((doc) => doc.slug)).filter(Boolean);
  } catch {
    if (DOCS_API_FALLBACK_ENABLED) {
      return getAllAcademyDocs().map((doc) => doc.slug);
    }
    return [];
  }
}
