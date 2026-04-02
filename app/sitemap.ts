import type { MetadataRoute } from "next";
import { getAllAcademyDocs } from "@/app/academy/docs-data";
import { getPublicBlogSlugs } from "@/app/blog/public-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = getAllAcademyDocs();
  const slugs = await getPublicBlogSlugs(200);

  return [
    {
      url: "https://multivariants.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://multivariants.com/academy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://multivariants.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...docs.map((doc) => ({
      url: `https://multivariants.com/academy/${doc.slug}`,
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
  ];
}
