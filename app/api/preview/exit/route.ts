import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { PREVIEW_LOCALE_COOKIE } from "@/app/api/preview/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Clears draft mode. Linked from the preview banner — no token required, since
 * leaving preview only ever reveals less than the caller can already see.
 */
export async function GET(req: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const requested = new URL(req.url).searchParams.get("redirect");
  // Only same-site relative paths, so this can't be used as an open redirect.
  const path =
    requested && requested.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/blog";

  const res = NextResponse.redirect(new URL(path, req.url), 307);
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.cookies.delete(PREVIEW_LOCALE_COOKIE);
  return res;
}
