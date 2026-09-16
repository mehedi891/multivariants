import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Locale routing + staging noindex + Draft Mode guard.
 *
 * Next.js 16 renamed `middleware` → `proxy`; this replaces the old
 * `middleware.ts`. It handles, in order:
 *
 *  1. Staging noindex — only the canonical production domain(s) may be indexed.
 *     Every other host (preview deploys and the project's *.vercel.app alias)
 *     gets `X-Robots-Tag: noindex` so staging never competes with production for
 *     indexing. Canonicals already point at multivariants.com, so this is the
 *     belt-and-suspenders header that also covers the production *.vercel.app
 *     alias (which VERCEL_ENV alone can't distinguish).
 *  2. Draft Mode — any request carrying `__prerender_bypass` may be rendering
 *     unpublished CMS content, so it is never indexed and never cached, even on
 *     the canonical production domain.
 *  3. Locale routing (as-needed prefix) — the default locale (`en`) is served
 *     UNPREFIXED by internally rewriting `/pricing` → `/en/pricing`, so the URL
 *     stays clean. Prefixed locales (`/pt-br/pricing`) pass straight through.
 *     `/en/*` 308s to the unprefixed form so there is one canonical URL per page.
 */

const INDEXABLE_HOSTS = new Set(["multivariants.com", "www.multivariants.com"]);

// Files (anything with an extension) and non-localized route handlers must never
// be locale-rewritten — they have no `[lang]` segment to rewrite into.
const PUBLIC_FILE = /\.[^/]+$/;
const NON_LOCALIZED_ROUTES = new Set([
  "/og-image",
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
]);

function withSeoHeaders(
  res: NextResponse,
  host: string,
  isDraftMode: boolean,
): NextResponse {
  if (isDraftMode || !INDEXABLE_HOSTS.has(host)) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  if (isDraftMode) {
    res.headers.set("Cache-Control", "no-store, max-age=0");
  }
  return res;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const isDraftMode = req.cookies.has("__prerender_bypass");

  // API routes, SEO route handlers and static files pass through untouched —
  // never locale-rewritten, but still noindexed on staging.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    PUBLIC_FILE.test(pathname) ||
    NON_LOCALIZED_ROUTES.has(pathname)
  ) {
    return withSeoHeaders(NextResponse.next(), host, isDraftMode);
  }

  // `/en/...` is the unprefixed default → redirect to strip the prefix, so each
  // page has exactly one canonical URL.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // A prefixed non-default locale already maps onto app/[lang] — serve directly.
  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment) && firstSegment !== defaultLocale) {
    return withSeoHeaders(NextResponse.next(), host, isDraftMode);
  }

  // Unprefixed path → rewrite to the default locale internally (URL unchanged).
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return withSeoHeaders(NextResponse.rewrite(url), host, isDraftMode);
}

export const config = {
  // Run on all routes except Next internals and the static favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
