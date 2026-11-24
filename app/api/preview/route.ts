import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import {
  getPublicBlogPost,
  getPreviewSecret,
  isPreviewConfigured,
} from "@/lib/blog/public-api";
import { fetchLandingPage } from "@/lib/landing-pages/public-api";
import { getPublicRecipe } from "@/lib/recipes/public-api";
import { RECIPES_PATH, RECIPES_SEGMENT } from "@/lib/recipes/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Cookie carrying the locale of the draft translation being previewed. */
export const PREVIEW_LOCALE_COOKIE = "__preview_locale";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual throws on length mismatch, so compare lengths first. The
  // length of a secret is not sensitive; its contents are.
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/**
 * The CMS may hand us the slug in several shapes:
 *   my-draft-post · /my-draft-post · /blog/my-draft-post
 *   https://multivariants.com/blog/my-draft-post
 * Reduce all of them to the bare slug and reject anything outside `parent`:
 * "blog" for posts, RECIPES_SEGMENT for Recipe Contents (`type=recipe`), none
 * for landing pages (they live at the site root).
 */
function normalizeSlug(raw: string | null, parent?: string) {
  if (!raw) return null;

  let value = raw.trim();
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      value = new URL(value).pathname;
    } catch {
      return null;
    }
  }

  // Drop any query string / hash the CMS appended.
  value = value.split("?")[0].split("#")[0];

  const segments = value
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const slug = segments.at(-1);
  if (!slug || slug === parent) return null;
  // Guard against traversal or a path outside `parent`.
  if (slug.includes("..")) return null;
  if (segments.length > 1 && segments.at(-2) !== parent) return null;

  return slug;
}

/** Redirect into a preview. Preview responses are never cached or indexed. */
function previewRedirect(path: string, req: NextRequest) {
  const res = NextResponse.redirect(new URL(path, req.url), 307);
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (!isPreviewConfigured()) {
    return NextResponse.json(
      { error: "Preview is not configured on this site" },
      { status: 501 }
    );
  }

  // Accept the token from a header (preferred — stays out of access logs and
  // Referer) or from the query string, which is what a CMS redirect can send.
  const provided =
    req.headers.get("x-preview-token") ??
    searchParams.get("secret") ??
    searchParams.get("token") ??
    "";
  const expected = getPreviewSecret() ?? "";

  if (!provided || !safeEqual(provided, expected)) {
    return NextResponse.json({ error: "Invalid preview token" }, { status: 401 });
  }

  const isLanding = searchParams.get("type") === "landing";
  // Recipe Contents: the CMS also sends `base`, but our own folder
  // (RECIPES_PATH) is authoritative and is what the redirect uses.
  const isRecipe = searchParams.get("type") === "recipe";
  const slug = normalizeSlug(
    searchParams.get("slug") ??
      searchParams.get("path") ??
      searchParams.get("uri"),
    isLanding ? undefined : isRecipe ? RECIPES_SEGMENT : "blog"
  );

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  // CMS landing pages, served at /{slug}. English only, so no locale cookie.
  // As with posts: confirm the draft exists first, then redirect to the slug
  // the CMS returned (never the raw input).
  if (isLanding) {
    let page;
    try {
      page = await fetchLandingPage(slug, { preview: true });
    } catch (error) {
      console.warn(error instanceof Error ? error.message : String(error));
      return NextResponse.json({ error: "CMS unavailable" }, { status: 502 });
    }
    if (!page) {
      return NextResponse.json(
        { error: `No landing page found for slug "${slug}"` },
        { status: 404 }
      );
    }

    const draft = await draftMode();
    draft.enable();

    const res = previewRedirect(`/${encodeURIComponent(page.slug)}`, req);
    res.cookies.delete(PREVIEW_LOCALE_COOKIE);
    return res;
  }

  const locale =
    searchParams.get("locale")?.trim() ||
    searchParams.get("lang")?.trim() ||
    undefined;

  // Confirm the draft actually resolves before enabling draft mode, and
  // redirect to the slug the CMS returned rather than the raw input so a
  // crafted `slug` can't turn this into an open redirect.
  const post = isRecipe
    ? await getPublicRecipe(slug, undefined, { preview: true, locale })
    : await getPublicBlogPost(slug, undefined, { preview: true, locale });

  if (!post) {
    return NextResponse.json(
      { error: `No ${isRecipe ? "recipe" : "post"} found for slug "${slug}"` },
      { status: 404 }
    );
  }

  const draft = await draftMode();
  draft.enable();

  const section = isRecipe ? RECIPES_PATH : "/blog";
  const res = previewRedirect(`${section}/${encodeURIComponent(post.slug)}`, req);

  if (locale) {
    res.cookies.set(PREVIEW_LOCALE_COOKIE, locale, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } else {
    res.cookies.delete(PREVIEW_LOCALE_COOKIE);
  }

  return res;
}
