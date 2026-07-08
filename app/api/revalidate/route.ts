import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (!process.env.REVALIDATE_SECRET || token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  let path: string | undefined;
  try {
    ({ path } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path, now: Date.now() });
}
