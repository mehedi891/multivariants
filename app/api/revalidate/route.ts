import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { barePathOf, locales } from "@/i18n/config";
import { CMS_CACHE_TAG } from "@/lib/landing-pages/public-api";

export const runtime = "nodejs";

/**
 * On-demand revalidation. The CMS POSTs `{ "path": "/blog/my-post" }` on every
 * publish, edit, unpublish or delete — one call per affected path, including a
 * page's old path when its URL changes. Landing pages send root paths, e.g.
 * `{ "path": "/black-friday" }`.
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (!process.env.REVALIDATE_SECRET || token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  let path: unknown;
  try {
    ({ path } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (typeof path !== "string" || !path.trim()) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  const sent = path.trim().startsWith("/") ? path.trim() : `/${path.trim()}`;

  // CMS data fetched with the `cms` tag (landing pages and their sitemap list)
  // stays cached until this expires it. `expire: 0` expires it right away, so
  // the next visit renders the new content instead of one last stale copy.
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });

  // proxy.ts rewrites unprefixed URLs to the default locale (/pricing →
  // /en/pricing) and revalidatePath needs the rewritten path, so revalidate
  // each locale's version of the page as well as the path as sent.
  const bare = barePathOf(sent);
  const paths = new Set([
    sent,
    ...locales.map((locale) => `/${locale}${bare === "/" ? "" : bare}`),
  ]);
  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ revalidated: true, path: sent, now: Date.now() });
}
