import type { MetadataRoute } from "next";
import { getPublicAcademyCategories } from "@/lib/academy/public-api";
import { getPublicBlogSlugs } from "@/lib/blog/public-api";
import { getPublicRecipeSlugs } from "@/lib/recipes/public-api";
import { RECIPES_PATH } from "@/lib/recipes/config";
import { getPublicClientSlugs } from "@/lib/clients-showcase/public-api";
import { getPublicLandingPages } from "@/lib/landing-pages/public-api";
import { locales, localizePath } from "@/i18n/config";

// Regenerate the sitemap every 15 min so new CMS content (blog posts, academy
// docs, client showcases) appears quickly, and a one-off failed/empty
// generation self-heals fast instead of persisting for an hour (C11).
export const revalidate = 900;

const SITE_URL = "https://multivariants.com";

/**
 * Absolute URL for a bare path in a locale. A sitemap must list only CANONICAL
 * URLs — the home path is "" rather than "/" so the English home stays
 * `https://multivariants.com` with no trailing slash.
 */
function absUrl(barePath: string, locale: (typeof locales)[number]): string {
  const p = localizePath(barePath || "/", locale);
  return `${SITE_URL}${p === "/" ? "" : p}`;
}

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
  { path: RECIPES_PATH, priority: 0.7, changeFrequency: "weekly" },
  { path: "/changelog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/clients-showcase", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories: academyTopics } = await getPublicAcademyCategories();
  const docs = academyTopics.flatMap((topic) => topic.docs.map((doc) => doc.slug)).filter(Boolean);
  // Help Center topic pages: their page copy is translated, like /academy.
  const topicPaths = academyTopics
    .filter((topic) => topic.docs.length > 0)
    .map((topic) => `/academy/category/${topic.slug}`);
  const slugs = await getPublicBlogSlugs(1000);
  const recipeSlugs = await getPublicRecipeSlugs(1000);
  const clientSlugs = await getPublicClientSlugs(1000);
  const landingPages = await getPublicLandingPages();

  // Static pages exist in every locale, so each expands to one <url> per
  // locale. CMS content (academy docs, blog posts, client stories) is authored
  // in English only — its localized URLs canonical back to English, and a
  // sitemap must never list a non-canonical URL, so those stay English-only.
  return [
    ...staticRoutes.flatMap((r) =>
      locales.map((locale) => ({
        url: absUrl(r.path, locale),
        lastModified: new Date(),
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      })),
    ),
    ...topicPaths.flatMap((path) =>
      locales.map((locale) => ({
        url: absUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ),
    ...[...new Set(docs)].map((docSlug) => ({
      url: `${SITE_URL}/academy/${docSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Recipe Contents (Spill The Sauce) — English-only like blog posts.
    ...recipeSlugs.map((slug) => ({
      url: `${SITE_URL}${RECIPES_PATH}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...clientSlugs.map((slug) => ({
      url: `${SITE_URL}/clients-showcase/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // CMS landing pages at the site root — English only; noIndex pages are left out.
    ...landingPages
      .filter((page) => !page.noIndex)
      .map((page) => ({
        url: `${SITE_URL}/${page.slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
