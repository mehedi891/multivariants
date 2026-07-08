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

      // --- Batch 3: academy categories -> academy ----------------------
      { source: "/academy-categories/:slug", destination: "/academy", permanent: true },
    ];
  },
};

export default nextConfig;
