import {
  BLOG_SITE,
  CMS_API_BASE_URL,
  asNumber,
  buildFetchInit,
  deriveCategoryStats,
  isPreviewConfigured,
  logApiError,
  mapApiPostToListItem,
  normalizeListPayload,
  parseJsonPayload,
  toErrorMessage,
  toPostStatus,
  type BlogPostFetchOptions,
  type BlogRequestHeaders,
  type PublicBlogListResult,
  type PublicBlogPost,
} from "@/lib/blog/public-api";

/**
 * Recipe Contents ("Spill The Sauce") from the CMS — /api/public/recipes.
 *
 * Same response shape as the blog (`category`, `categories`, author, SEO
 * fields…), so it reuses the blog's mapper and fetch settings and returns the
 * blog's types: the pages render recipes with the blog layout unchanged.
 *
 * One deliberate difference: there is NO local fallback. The blog falls back to
 * bundled demo posts on a CMS error; recipes must never show blog posts, so an
 * error yields an empty list (the page shows its empty state) or null (404).
 */

const LIST_URL = () => new URL("/api/public/recipes", CMS_API_BASE_URL);
const SINGLE_URL = (slug: string) =>
  new URL(`/api/public/recipes/${encodeURIComponent(slug)}`, CMS_API_BASE_URL);

function asRecords(items: unknown[]) {
  return items.filter(
    (raw): raw is Record<string, unknown> => typeof raw === "object" && raw !== null
  );
}

export async function getPublicRecipes({
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
    const url = LIST_URL();
    url.searchParams.set("site", BLOG_SITE);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (category && category !== "All") url.searchParams.set("category", category);

    const res = await fetch(url.toString(), buildFetchInit(60, requestHeaders));
    if (!res.ok) throw new Error(`${url}: ${res.status}`);

    const payload = normalizeListPayload(await parseJsonPayload(res, "recipes list request"));
    const recipes = asRecords(payload.posts)
      .map(mapApiPostToListItem)
      .filter((item) => Boolean(item.slug));

    const categoriesFromApi = asRecords(payload.categories)
      .map((item) => ({
        name: String(item.name ?? item.title ?? item.slug ?? ""),
        slug: String(item.slug ?? "").trim() || undefined,
        count: item.count === undefined ? undefined : asNumber(item.count, 0),
      }))
      .filter((item) => Boolean(item.name));

    return {
      posts: recipes,
      totalPages: payload.totalPages,
      currentPage: payload.currentPage,
      categories: categoriesFromApi.length > 0 ? categoriesFromApi : deriveCategoryStats(recipes),
      error: undefined,
    };
  } catch (error) {
    logApiError("recipes list fetch failed", error);
    return {
      posts: [],
      totalPages: 1,
      currentPage: Math.max(1, page),
      categories: [],
      error: toErrorMessage(error),
    };
  }
}

export async function getPublicRecipe(
  slug: string,
  requestHeaders?: BlogRequestHeaders,
  options?: BlogPostFetchOptions
): Promise<PublicBlogPost | null> {
  const preview = Boolean(options?.preview) && isPreviewConfigured();
  const locale = options?.locale?.trim();

  try {
    const url = SINGLE_URL(slug);
    url.searchParams.set("site", BLOG_SITE);
    if (locale) url.searchParams.set("locale", locale);

    const res = await fetch(url.toString(), buildFetchInit(60, requestHeaders, preview));
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${url}: ${res.status}`);

    const payload = await parseJsonPayload(res, "recipe single request");
    const root =
      typeof payload === "object" && payload !== null
        ? (payload as Record<string, unknown>)
        : {};
    const listItem = mapApiPostToListItem(root);
    if (!listItem.slug) throw new Error(`${url}: missing slug in response`);

    const contentHtml = String(root.contentHtml ?? root.content ?? root.html ?? "");
    return {
      ...listItem,
      contentHtml: contentHtml || "<p>No content available.</p>",
      isPreview: root.isPreview === true || undefined,
      status: toPostStatus(root.status),
    };
  } catch (error) {
    logApiError(`recipe single fetch failed for slug "${slug}"`, error);
    return null;
  }
}

/** Every published recipe slug (for the sitemap). */
export async function getPublicRecipeSlugs(limit = 100): Promise<string[]> {
  try {
    const url = LIST_URL();
    url.searchParams.set("site", BLOG_SITE);
    url.searchParams.set("limit", String(Math.min(limit, 100)));
    const slugs: string[] = [];
    // The CMS caps `limit` at 100, so walk the pages.
    for (let page = 1; page <= 50; page++) {
      url.searchParams.set("page", String(page));
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error(`${url}: ${res.status}`);
      const payload = normalizeListPayload(await parseJsonPayload(res, "recipes slug request"));
      slugs.push(
        ...asRecords(payload.posts)
          .map((raw) => String(raw.slug ?? ""))
          .filter(Boolean)
      );
      if (page >= payload.totalPages || slugs.length >= limit) break;
    }
    return slugs.slice(0, limit);
  } catch (error) {
    logApiError("recipes slug fetch failed", error);
    return [];
  }
}
