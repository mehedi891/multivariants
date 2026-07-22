import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import {
  getPublicBlogPost,
  getPreviewSecret,
  isPreviewConfigured,
} from "@/app/blog/public-api";

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
 * Reduce all of them to the bare slug and reject anything that escapes /blog.
 */
function normalizeSlug(raw: string | null) {
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
  if (!slug || slug === "blog") return null;
  // Guard against traversal or a path that is not a blog post.
  if (slug.includes("..")) return null;
  if (segments.length > 1 && segments.at(-2) !== "blog") return null;

  return slug;
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

  const slug = normalizeSlug(
    searchParams.get("slug") ??
      searchParams.get("path") ??
      searchParams.get("uri")
  );

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const locale =
    searchParams.get("locale")?.trim() ||
    searchParams.get("lang")?.trim() ||
    undefined;

  // Confirm the draft actually resolves before enabling draft mode, and
  // redirect to the slug the CMS returned rather than the raw input so a
  // crafted `slug` can't turn this into an open redirect.
  const post = await getPublicBlogPost(slug, undefined, { preview: true, locale });

  if (!post) {
    return NextResponse.json(
      { error: `No post found for slug "${slug}"` },
      { status: 404 }
    );
  }

  const draft = await draftMode();
  draft.enable();

  const target = new URL(`/blog/${encodeURIComponent(post.slug)}`, req.url);
  const res = NextResponse.redirect(target, 307);

  // Preview responses must never be cached or indexed.
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");

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
