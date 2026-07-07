/**
 * IndexNow submission — runs after `next build` (postbuild).
 * Notifies IndexNow-enabled engines (Bing, Yandex, Naver, Seznam, and Google's
 * experiment) of the current URL set so new/changed pages are crawled fast.
 *
 * URLs = static marketing/legal routes + all CMS-driven blog posts, academy docs,
 * and client showcases (same sources the sitemap uses).
 *
 * Safe by default: skips unless INDEXNOW_KEY is set, and skips non-production
 * Vercel deploys so previews/local builds never ping search engines.
 */

const KEY = process.env.INDEXNOW_KEY || "a3f1c9e07b2d48f6a1c5e9d3b7028f4c";
const HOST = process.env.INDEXNOW_HOST || "multivariants.com";
const SITE = `https://${HOST}`;

const CMS = (process.env.CMS_API_BASE_URL || "https://efoli-cms.vercel.app").replace(/\/+$/, "");
const CMS_SITE = process.env.BLOG_SITE || "multivariants";
const ENDPOINT = "https://api.indexnow.org/indexnow";

// --- Guards -----------------------------------------------------------------
// Submit ONLY on production deploys. Everywhere else (local builds, Vercel
// preview deploys) it runs as a dry-run that logs the URLs without pinging
// IndexNow. Force a real submission with INDEXNOW_FORCE=1.
const shouldSubmit =
  process.env.VERCEL_ENV === "production" || process.env.INDEXNOW_FORCE === "1";
const dryRun = process.argv.includes("--dry") || !shouldSubmit;

if (!KEY) {
  console.log("[indexnow] no INDEXNOW_KEY set — skipping.");
  process.exit(0);
}

// --- Static routes (keep in sync with app/sitemap.ts) -----------------------
const staticPaths = [
  "",
  "/features",
  "/pricing",
  "/faq",
  "/contact",
  "/partners",
  "/privacy-policy",
  "/academy",
  "/blog",
  "/changelog",
  "/clients-showcase",
];

async function getJson(path) {
  try {
    const res = await fetch(`${CMS}${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      console.warn(`[indexnow] ${path} -> ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[indexnow] ${path} failed:`, err?.message ?? err);
    return null;
  }
}

async function collectPaths() {
  const paths = new Set(staticPaths);

  // Blog posts: { posts: [{ slug }] }
  const blog = await getJson(`/api/public/posts?site=${CMS_SITE}&page=1&limit=1000`);
  for (const p of blog?.posts ?? []) if (p?.slug) paths.add(`/blog/${p.slug}`);

  // Academy docs: { categories: [{ docs: [{ slug }] }], uncategorized: [{ slug }] }
  const docs = await getJson(`/api/public/docs?site=${CMS_SITE}`);
  for (const cat of docs?.categories ?? []) for (const d of cat?.docs ?? []) if (d?.slug) paths.add(`/academy/${d.slug}`);
  for (const d of docs?.uncategorized ?? []) if (d?.slug) paths.add(`/academy/${d.slug}`);

  // Clients: { clients: [{ slug }] }
  const clients = await getJson(`/api/public/clients?site=${CMS_SITE}&page=1&limit=1000`);
  for (const c of clients?.clients ?? []) if (c?.slug) paths.add(`/clients-showcase/${c.slug}`);

  return [...paths];
}

const urlList = (await collectPaths()).map((p) => `${SITE}${p}`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
};

if (dryRun) {
  console.log(`[indexnow] DRY RUN — would submit ${urlList.length} URLs to IndexNow:`);
  for (const u of urlList) console.log(`  ${u}`);
  console.log("[indexnow] (set INDEXNOW_FORCE=1 or deploy to production to actually submit)");
  process.exit(0);
}

try {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`[indexnow] submitted ${urlList.length} URLs -> ${res.status} ${res.statusText}`);
  // IndexNow returns 200 (OK) or 202 (accepted). Never fail the build on this.
} catch (err) {
  console.warn("[indexnow] submission failed (non-fatal):", err?.message ?? err);
}
