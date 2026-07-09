import { NextResponse, type NextRequest } from "next/server";

// Only the canonical production domain(s) may be indexed. Every other host —
// preview deploys and the project's *.vercel.app alias — receives an
// `X-Robots-Tag: noindex` header so staging never competes with production for
// indexing/duplicate content (C2). Canonicals already point at multivariants.com,
// so this is the belt-and-suspenders header that also covers the production
// *.vercel.app alias (which VERCEL_ENV alone can't distinguish).
const INDEXABLE_HOSTS = new Set([
  "multivariants.com",
  "www.multivariants.com",
]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const res = NextResponse.next();
  if (!INDEXABLE_HOSTS.has(host)) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  // Run on all routes except Next internals and the static favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
