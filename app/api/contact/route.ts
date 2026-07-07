import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---- Config ---------------------------------------------------------------
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3; // submissions allowed per IP per window
const MIN_FILL_MS = 2000; // a real human takes >2s to fill the form
const MAX_MESSAGE_LEN = 5000;

function normalizeEnvUrl(value: string | undefined) {
  const t = value?.trim();
  if (!t) return undefined;
  return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))
    ? t.slice(1, -1).trim()
    : t;
}

const CMS_API_BASE_URL =
  normalizeEnvUrl(process.env.CMS_API_BASE_URL) ?? "https://efoli-cms.vercel.app";
const CONTACT_API_PATH = normalizeEnvUrl(process.env.CONTACT_API_PATH) ?? "/api/public/contact";
const CONTACT_SITE = process.env.CONTACT_SITE ?? "multivariants";

// ---- In-memory rate limiter ----------------------------------------------
// Best-effort per-instance limiter. On serverless this is per warm instance,
// not global — a reasonable first line of defense alongside bot detection.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // opportunistic cleanup so the map doesn't grow unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      const kept = v.filter((t) => now - t < WINDOW_MS);
      if (kept.length === 0) hits.delete(k);
      else hits.set(k, kept);
    }
  }
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const now = Date.now();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // ---- Bot detection -------------------------------------------------------
  // 1) Honeypot: a hidden field real users never fill. If present, silently
  //    accept (return success) so bots don't learn they were caught.
  const honeypot = String(body.company ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }
  // 2) Timing: forms submitted faster than a human can type are bots.
  const elapsed = Number(body.elapsed);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  // ---- Rate limiting -------------------------------------------------------
  const ip = clientIp(req);
  if (isRateLimited(ip, now)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  // ---- Validation ----------------------------------------------------------
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  // ---- Forward to the CMS contact endpoint ---------------------------------
  try {
    const url = new URL(CONTACT_API_PATH, CMS_API_BASE_URL);
    url.searchParams.set("site", CONTACT_SITE);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });
    if (!res.ok) {
      console.error(`[contact] CMS responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please email support@multivariants.com." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] forward failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email support@multivariants.com." },
      { status: 502 }
    );
  }
}
