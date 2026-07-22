import {
  getAllBlogPosts,
  getBlogPostBySlug,
  type BlogPost,
} from "@/app/blog/posts-data";

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
const BLOG_SITE = process.env.SITE_SLUG ?? process.env.BLOG_SITE ?? "multivariants";
const BLOG_API_PATH = normalizeEnvUrl(process.env.BLOG_API_PATH) ?? "/api/public/posts";
// Default ON (like clients/changelog/partners/faq) so a transient CMS outage
// serves local fallback content instead of hard-404ing live posts (C3) and
// never lets the sitemap collapse to static-only (C11).
const BLOG_API_FALLBACK_ENABLED =
  process.env.BLOG_API_FALLBACK_ENABLED !== "false";
const BLOG_API_FORWARD_AUTH = process.env.BLOG_API_FORWARD_AUTH === "true";
const BLOG_API_BEARER_TOKEN = normalizeEnvUrl(process.env.BLOG_API_BEARER_TOKEN);
const BLOG_API_PROTECTION_BYPASS = normalizeEnvUrl(
  process.env.BLOG_API_PROTECTION_BYPASS
);
// Shared secret with the CMS. Sent as the `x-preview-token` header (never a
// query string) on the single-post endpoint to unlock unpublished drafts.
// Server-side only — must never be exposed to client JavaScript.
const PREVIEW_SECRET = normalizeEnvUrl(process.env.PREVIEW_SECRET);

export function isPreviewConfigured() {
  return Boolean(PREVIEW_SECRET);
}

export function getPreviewSecret() {
  return PREVIEW_SECRET;
}

export type PostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

const POST_STATUSES: PostStatus[] = [
  "DRAFT",
  "PUBLISHED",
  "SCHEDULED",
  "ARCHIVED",
];

function toPostStatus(value: unknown): PostStatus | undefined {
  const raw = String(value ?? "").trim().toUpperCase();
  return POST_STATUSES.find((status) => status === raw);
}

const FALLBACK_IMAGE = "/images/features/easy-to-use-and-configure.webp";

export type BlogCategoryStat = {
  name: string;
  slug?: string;
  count?: number;
};

export type PublicBlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage: string;
  coverImageAlt: string;
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorAvatarUrl?: string;
  authorBio?: string;
  category: string;
  categorySlug?: string;
};

export type PublicBlogPost = PublicBlogListItem & {
  contentHtml: string;
  /** Only present when the post was fetched with a valid preview token. */
  isPreview?: boolean;
  /** DRAFT · PUBLISHED · SCHEDULED · ARCHIVED — only returned in preview. */
  status?: PostStatus;
};

export type PublicBlogListResult = {
  posts: PublicBlogListItem[];
  totalPages: number;
  currentPage: number;
  categories: BlogCategoryStat[];
  error?: string;
};

type BlogRequestHeaders = {
  cookie?: string | null;
  authorization?: string | null;
};

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function logApiError(scope: string, error: unknown) {
  const message = `[blog-api] ${scope}: ${toErrorMessage(error)}`;
  if (process.env.NODE_ENV !== "production") {
    console.warn(message);
    return;
  }
  if (process.env.BLOG_API_LOG_ERRORS === "true") {
    console.warn(message);
  }
}

async function parseJsonPayload(res: Response, scope: string) {
  const contentType = res.headers.get("content-type") ?? "";
  const raw = await res.text();
  try {
    return JSON.parse(raw);
  } catch {
    const preview = raw.slice(0, 120).replaceAll(/\s+/g, " ");
    throw new Error(
      `${scope}: expected JSON body but got "${contentType || "unknown"}" (${preview})`
    );
  }
}

function normalizeApiPath(pathValue: string, fallback: string) {
  const trimmed = pathValue.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildApiUrl(pathValue: string) {
  const path = normalizeApiPath(pathValue, "/api/public/posts");
  return new URL(path, CMS_API_BASE_URL);
}

function buildListUrl() {
  return buildApiUrl(BLOG_API_PATH);
}

function buildListUrlCandidates() {
  const candidates: URL[] = [];
  const seen = new Set<string>();

  const addCandidate = (url: URL) => {
    const key = url.toString();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(url);
  };

  addCandidate(buildListUrl());
  addCandidate(buildApiUrl("/api/public/posts"));

  return candidates;
}

function buildSinglePostUrl(slug: string) {
  const url = buildApiUrl(BLOG_API_PATH);
  const cleanPath = url.pathname.replaceAll(/\/+$/g, "") || "/api/public/posts";
  url.pathname = `${cleanPath}/${encodeURIComponent(slug)}`;
  return url;
}

function buildSinglePostUrlCandidates(slug: string) {
  const candidates: URL[] = [];
  const seen = new Set<string>();

  const addCandidate = (url: URL) => {
    const key = url.toString();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(url);
  };

  addCandidate(buildSinglePostUrl(slug));
  addCandidate(
    new URL(`/api/public/posts/${encodeURIComponent(slug)}`, CMS_API_BASE_URL)
  );

  return candidates;
}

function buildFetchInit(
  revalidateSeconds: number,
  requestHeaders?: BlogRequestHeaders,
  preview = false
) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // Preview responses are per-editor and may change on every save, so they are
  // never cached and never share a cache entry with published content.
  if (preview && PREVIEW_SECRET) {
    headers["x-preview-token"] = PREVIEW_SECRET;
    if (BLOG_API_PROTECTION_BYPASS) {
      headers["x-vercel-protection-bypass"] = BLOG_API_PROTECTION_BYPASS;
    }
    return { cache: "no-store" as const, headers };
  }

  if (BLOG_API_FORWARD_AUTH && requestHeaders?.cookie) {
    headers.cookie = requestHeaders.cookie;
  }
  if (BLOG_API_FORWARD_AUTH && requestHeaders?.authorization) {
    headers.authorization = requestHeaders.authorization;
  }

  if (!headers.authorization && BLOG_API_BEARER_TOKEN) {
    headers.authorization = `Bearer ${BLOG_API_BEARER_TOKEN}`;
  }

  if (BLOG_API_PROTECTION_BYPASS) {
    headers["x-vercel-protection-bypass"] = BLOG_API_PROTECTION_BYPASS;
  }

  if (
    BLOG_API_FORWARD_AUTH &&
    (requestHeaders?.cookie || requestHeaders?.authorization)
  ) {
    return { cache: "no-store" as const, headers };
  }

  return { next: { revalidate: revalidateSeconds }, headers };
}

function asNumber(value: unknown, fallback: number) {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return n;
  return fallback;
}

function ensureISODate(value: unknown) {
  if (typeof value === "string" && value.length >= 10) return value;
  return new Date().toISOString().slice(0, 10);
}

function optionalISODate(value: unknown) {
  if (typeof value === "string" && value.length >= 10) return value;
  return undefined;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localPostToContentHtml(post: BlogPost) {
  return post.sections
    .map((section) => {
      const heading = `<h2>${escapeHtml(section.heading)}</h2>`;
      const paragraphs = section.paragraphs
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("");
      const points =
        section.points && section.points.length
          ? `<ul>${section.points
              .map((point) => `<li>${escapeHtml(point)}</li>`)
              .join("")}</ul>`
          : "";
      const image =
        section.imageSrc
          ? `<figure><img src="${escapeHtml(section.imageSrc)}" alt="${escapeHtml(
              section.imageAlt ?? section.heading
            )}" />${
              section.imageAlt
                ? `<figcaption>${escapeHtml(section.imageAlt)}</figcaption>`
                : ""
            }</figure>`
          : "";

      return `${heading}${paragraphs}${points}${image}`;
    })
    .join("");
}

function localPostToListItem(post: BlogPost): PublicBlogListItem {
  const categoryName = post.tag || "General";
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    seoTitle: undefined,
    seoDescription: undefined,
    coverImage: post.heroImageSrc || FALLBACK_IMAGE,
    coverImageAlt: post.heroImageAlt || post.title,
    readingTimeMinutes: asNumber(
      post.readTime.replaceAll(/[^0-9]/g, ""),
      5
    ),
    publishedAt: ensureISODate(post.publishedAt),
    updatedAt: undefined,
    authorName: post.author || "MultiVariants Team",
    authorAvatarUrl: undefined,
    authorBio: undefined,
    category: categoryName,
    categorySlug: categoryName.toLowerCase().replaceAll(/\s+/g, "-"),
  };
}

function mapApiPostToListItem(raw: Record<string, unknown>): PublicBlogListItem {
  const categoryObject =
    typeof raw.category === "object" && raw.category !== null
      ? (raw.category as Record<string, unknown>)
      : null;
  const authorObject =
    typeof raw.author === "object" && raw.author !== null
      ? (raw.author as Record<string, unknown>)
      : null;
  const seoObject =
    typeof raw.seo === "object" && raw.seo !== null
      ? (raw.seo as Record<string, unknown>)
      : null;

  return {
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? "Untitled Post"),
    excerpt: String(raw.excerpt ?? raw.summary ?? ""),
    seoTitle:
      String(
        seoObject?.title ??
          raw.metaTitle ??
          raw.seoTitle ??
          raw.seo_title ??
          ""
      ).trim() || undefined,
    seoDescription:
      String(
        seoObject?.description ??
          raw.metaDescription ??
          raw.seoDescription ??
          raw.seo_description ??
          ""
      ).trim() || undefined,
    coverImage: String(raw.coverImage ?? raw.image ?? raw.thumbnail ?? FALLBACK_IMAGE),
    coverImageAlt: String(raw.coverImageAlt ?? raw.imageAlt ?? raw.title ?? "Blog image"),
    readingTimeMinutes: asNumber(
      raw.readingTimeMinutes ?? raw.readTimeMinutes ?? raw.reading_time,
      5
    ),
    publishedAt: ensureISODate(raw.publishedAt ?? raw.createdAt ?? raw.date),
    updatedAt: optionalISODate(
      raw.updatedAt ?? raw.modifiedAt ?? raw.updated_at ?? raw.publishedAt ?? raw.createdAt
    ),
    authorName: String(
      authorObject?.name ?? raw.authorName ?? raw.author ?? "MultiVariants Team"
    ),
    authorAvatarUrl:
      String(authorObject?.avatarUrl ?? raw.authorAvatarUrl ?? "").trim() || undefined,
    authorBio:
      String(authorObject?.bio ?? raw.authorBio ?? raw.authorDescription ?? "").trim() ||
      undefined,
    category: String(
      categoryObject?.name ?? raw.categoryName ?? raw.tag ?? "General"
    ),
    categorySlug:
      String(categoryObject?.slug ?? raw.categorySlug ?? "").trim() || undefined,
  };
}

function normalizeListPayload(payload: unknown) {
  if (Array.isArray(payload)) {
    return {
      posts: payload,
      totalPages: 1,
      currentPage: 1,
      categories: [],
    };
  }

  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;
  const meta =
    typeof root.meta === "object" && root.meta !== null
      ? (root.meta as Record<string, unknown>)
      : {};

  const posts =
    (Array.isArray(data.posts) && data.posts) ||
    (Array.isArray(root.posts) && root.posts) ||
    (Array.isArray(data.items) && data.items) ||
    [];

  const categories =
    (Array.isArray(data.categories) && data.categories) ||
    (Array.isArray(root.categories) && root.categories) ||
    [];

  const totalPages = asNumber(
    data.totalPages ?? root.totalPages ?? meta.totalPages ?? meta.pageCount,
    1
  );
  const currentPage = asNumber(data.page ?? root.page ?? meta.page, 1);

  return { posts, totalPages, currentPage, categories };
}

function deriveCategoryStats(items: PublicBlogListItem[]): BlogCategoryStat[] {
  const counter = new Map<string, BlogCategoryStat>();
  items.forEach((item) => {
    const key = item.categorySlug || item.category;
    const existing = counter.get(key);
    if (existing) {
      existing.count = (existing.count ?? 0) + 1;
      return;
    }
    counter.set(key, {
      name: item.category,
      slug: item.categorySlug,
      count: 1,
    });
  });

  return Array.from(counter.values());
}

function fallbackList({
  page,
  limit,
  category,
}: {
  page: number;
  limit: number;
  category?: string;
}): PublicBlogListResult {
  const all = getAllBlogPosts().map(localPostToListItem);
  const filtered = category
    ? all.filter(
        (post) => post.category === category || post.categorySlug === category
      )
    : all;
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * limit;

  return {
    posts: filtered.slice(start, start + limit),
    totalPages,
    currentPage,
    categories: deriveCategoryStats(all),
  };
}

export async function getPublicBlogPosts({
  page,
  limit,
  category,
  requestHeaders,
}: {
  page: number;
  limit: number;
  category?: string;
  requestHeaders?: BlogRequestHeaders;
}): Promise<PublicBlogListResult> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildListUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", BLOG_SITE);
        url.searchParams.set("page", String(page));
        url.searchParams.set("limit", String(limit));
        if (category && category !== "All") {
          url.searchParams.set("category", category);
        }

        const res = await fetch(
          url.toString(),
          buildFetchInit(60, requestHeaders)
        );
        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const payload = normalizeListPayload(
          await parseJsonPayload(res, "list request")
        );
        const posts = payload.posts
          .filter(
            (raw): raw is Record<string, unknown> =>
              typeof raw === "object" && raw !== null
          )
          .map(mapApiPostToListItem)
          .filter((post) => Boolean(post.slug));

        const categoriesFromApi = payload.categories
          .filter(
            (raw): raw is Record<string, unknown> =>
              typeof raw === "object" && raw !== null
          )
          .map((item) => ({
            name: String(item.name ?? item.title ?? item.slug ?? ""),
            slug: String(item.slug ?? "").trim() || undefined,
            count:
              item.count === undefined ? undefined : asNumber(item.count, 0),
          }))
          .filter((item) => Boolean(item.name));

        return {
          posts,
          totalPages: payload.totalPages,
          currentPage: payload.currentPage,
          categories:
            categoriesFromApi.length > 0 ? categoriesFromApi : deriveCategoryStats(posts),
          error: undefined,
        };
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch (error) {
    logApiError("list fetch failed", error);
    const errorMessage = toErrorMessage(error);

    if (BLOG_API_FALLBACK_ENABLED) {
      return fallbackList({ page, limit, category });
    }

    return {
      posts: [],
      totalPages: 1,
      currentPage: Math.max(1, page),
      categories: [],
      error: errorMessage,
    };
  }
}

function fallbackPost(slug: string): PublicBlogPost | null {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  const listItem = localPostToListItem(post);
  return {
    ...listItem,
    contentHtml: localPostToContentHtml(post),
  };
}

export type BlogPostFetchOptions = {
  /** Send the shared secret so unpublished drafts are returned. */
  preview?: boolean;
  /** Optional CMS locale — previews a draft translation. */
  locale?: string;
};

export async function getPublicBlogPost(
  slug: string,
  requestHeaders?: BlogRequestHeaders,
  options?: BlogPostFetchOptions
): Promise<PublicBlogPost | null> {
  const preview = Boolean(options?.preview) && Boolean(PREVIEW_SECRET);
  const locale = options?.locale?.trim();

  try {
    const errors: string[] = [];

    for (const baseUrl of buildSinglePostUrlCandidates(slug)) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", BLOG_SITE);
        if (locale) url.searchParams.set("locale", locale);

        const res = await fetch(
          url.toString(),
          buildFetchInit(60, requestHeaders, preview)
        );
        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const payload = await parseJsonPayload(res, "single request");
        const root =
          typeof payload === "object" && payload !== null
            ? (payload as Record<string, unknown>)
            : {};
        const data =
          typeof root.data === "object" && root.data !== null
            ? (root.data as Record<string, unknown>)
            : root;
        const postData =
          typeof data.post === "object" && data.post !== null
            ? (data.post as Record<string, unknown>)
            : data;

        const listItem = mapApiPostToListItem(postData);
        if (!listItem.slug) {
          errors.push(`${url}: missing slug in response`);
          continue;
        }

        const contentHtml = String(
          postData.contentHtml ?? postData.content ?? postData.html ?? ""
        );

        return {
          ...listItem,
          contentHtml: contentHtml || "<p>No content available.</p>",
          isPreview: postData.isPreview === true || undefined,
          status: toPostStatus(postData.status),
        };
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }
    throw new Error(errors.join(" | "));
  } catch (error) {
    logApiError(`single fetch failed for slug "${slug}"`, error);

    // In preview the editor must see the real draft or an honest 404 — never a
    // stale published/local copy silently standing in for it.
    if (BLOG_API_FALLBACK_ENABLED && !preview) {
      return fallbackPost(slug);
    }

    return null;
  }
}

export async function getPublicBlogSlugs(limit = 100): Promise<string[]> {
  try {
    const errors: string[] = [];
    for (const baseUrl of buildListUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", BLOG_SITE);
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("page", "1");

        const res = await fetch(url.toString(), { next: { revalidate: 60 } });
        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const payload = normalizeListPayload(
          await parseJsonPayload(res, "slug request")
        );
        return payload.posts
          .filter(
            (raw): raw is Record<string, unknown> =>
              typeof raw === "object" && raw !== null
          )
          .map((raw) => String(raw.slug ?? ""))
          .filter(Boolean);
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }
    throw new Error(errors.join(" | "));
  } catch (error) {
    logApiError("slug fetch failed", error);

    if (BLOG_API_FALLBACK_ENABLED) {
      return getAllBlogPosts().map((post) => post.slug);
    }

    return [];
  }
}
