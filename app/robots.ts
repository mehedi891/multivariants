import type { MetadataRoute } from "next";

const SITE_URL = "https://multivariants.com";

// AI answer/retrieval engines (for AEO/GEO citability) + major search engines.
const ANSWER_AND_SEARCH_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  // Preview/branch deploys return a blanket disallow so staging isn't crawled.
  // (The production *.vercel.app alias is additionally handled by the host-based
  // X-Robots-Tag noindex in middleware.ts.) (C2)
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ANSWER_AND_SEARCH_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
