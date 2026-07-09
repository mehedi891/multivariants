import type { MetadataRoute } from "next";
import { getPublicAcademySlugs } from "@/app/academy/public-api";
import { getPublicBlogSlugs } from "@/app/blog/public-api";
import { getPublicClientSlugs } from "@/app/clients-showcase/public-api";

// Regenerate the sitemap every 15 min so new CMS content (blog posts, academy
// docs, client showcases) appears quickly, and a one-off failed/empty
// generation self-heals fast instead of persisting for an hour (C11).
export const revalidate = 900;

const SITE_URL = "https://multivariants.com";

// Static marketing/legal pages that always exist in the app.
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/academy", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/changelog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/clients-showcase", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getPublicAcademySlugs();
  const slugs = await getPublicBlogSlugs(1000);
  const clientSlugs = await getPublicClientSlugs(1000);

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...docs.map((docSlug) => ({
      url: `https://multivariants.com/academy/${docSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `https://multivariants.com/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...clientSlugs.map((slug) => ({
      url: `https://multivariants.com/clients-showcase/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
