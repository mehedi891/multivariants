import type { NextConfig } from "next";

function toUploadPattern(urlValue: string | undefined) {
  if (!urlValue) return null;

  try {
    const url = new URL(urlValue);
    const origin = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
    return new URL(`${origin}/uploads/**`);
  } catch {
    return null;
  }
}

const envUploadPatterns = [
  toUploadPattern(process.env.CMS_API_BASE_URL),
].filter((value): value is URL => Boolean(value));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:3000/uploads/**"),
      new URL("http://127.0.0.1:3000/uploads/**"),
      { protocol: "https", hostname: "mediadev.efoli.io" },
      { protocol: "https", hostname: "media.efoli.io" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "cms.efoli.com" },
      ...envUploadPatterns,
    ],
  },
  // 301/308 redirects from old WordPress URLs to the new site.
  // See siteurlcheck/missing-urls-redirects.md. Order matters — specific rules first.
  async redirects() {
    return [
      // --- Batch 1: blog categories -> /blog ----------------------------
      // All old category URLs (and their paginated variants) redirect to the
      // main blog listing.
      { source: "/blog/category/:slug/page/:page(\\d+)", destination: "/blog", permanent: true },
      { source: "/blog/category/:slug", destination: "/blog", permanent: true },

      // --- Batch 2: blog pagination -------------------------------------
      { source: "/blog/page/:n(\\d+)", destination: "/blog?page=:n", permanent: true },

      // --- Batch 4: blog date archives (YYYY/MM) -> all posts -----------
      { source: "/blog/:year(\\d{4})/:month(\\d{2})", destination: "/blog", permanent: true },

      // --- Batch 3: academy categories -> Help Center topic pages -------
      // The old WordPress topic slugs (installation, restriction-features,
      // trnaslation, …) are the CMS category slugs, so each keeps its page.
      { source: "/academy-categories/:slug", destination: "/academy/category/:slug", permanent: true },

      // --- Batch 5: legacy /docs -> academy ----------------------------
      { source: "/docs", destination: "/academy", permanent: true },

      // --- CMS landing pages -------------------------------------------
      // CMS landing pages only live at the root (/{slug}), so the BFCM offer
      // page moved from /whats-new/offer to /whats-new-offer. Already-sent
      // links keep working; the query string (e.g. utm_*) is carried over.
      // Temporary (307) on purpose: the offer is time-limited and noindex, so
      // there is no ranking to pass on, and a permanent redirect would stay
      // cached in browsers if the target changes when the deal ends.
      { source: "/whats-new/offer", destination: "/whats-new-offer", permanent: false },
    ];
  },
};

export default nextConfig;
