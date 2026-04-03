import type { MetadataRoute } from "next";
import { getPublicAcademySlugs } from "@/app/academy/public-api";
import { getPublicBlogSlugs } from "@/app/blog/public-api";
import { getPublicClientSlugs } from "@/app/clients-showcase/public-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getPublicAcademySlugs();
  const slugs = await getPublicBlogSlugs(200);
  const clientSlugs = await getPublicClientSlugs(200);

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
    {
      url: "https://multivariants.com/changelog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://multivariants.com/clients-showcase",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
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
