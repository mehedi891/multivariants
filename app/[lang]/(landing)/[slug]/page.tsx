import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsHtml from "@/components/CmsHtml";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PreviewBanner from "@/components/PreviewBanner";
import { SitePromoBanner } from "@/components/PromoBanner";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLandingPage } from "@/lib/landing-pages/public-api";
import { ogImageFor } from "@/lib/seo";

/**
 * CMS landing pages at the site root: `/{slug}` (proxy.ts rewrites it to
 * `/en/{slug}`). English only — `/pt/{slug}` renders the same English page and
 * canonicals to `/{slug}`.
 *
 * Static routes (`/pricing`, `/blog`, …) take precedence over this `[slug]`, so
 * it only sees URLs no other page claims. That makes it the 404 path for every
 * unknown single-segment URL: a slug the CMS doesn't know must stay a 404.
 *
 * The page brings its own layout, so its HTML is rendered full width, exactly
 * as received (CmsHtml: no sanitizing, scripts run). The site's header (promo
 * bar + navbar) and footer are rendered only when the editor left them on.
 */

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return {};

  const preview = page.isPreview === true;
  const prefix = preview ? "[Preview] " : "";
  const title = page.metaTitle || page.title;
  const description = page.metaDescription;
  const canonical = page.canonicalUrl || `/${page.slug}`;
  const image = page.ogImage || ogImageFor("en");

  return {
    // An SEO title from the CMS is used as written; a plain page title gets the
    // site's " | MultiVariants" suffix like every other page.
    title: page.metaTitle ? { absolute: `${prefix}${page.metaTitle}` } : `${prefix}${page.title}`,
    description,
    alternates: { canonical },
    // Unpublished drafts are never indexed, even on the production domain.
    robots:
      preview || page.noIndex
        ? { index: false, follow: false, ...(preview ? { nocache: true } : {}) }
        : undefined,
    // Setting openGraph/twitter replaces the root layout's, which describe the
    // home page, so the share card is restated for this page.
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "MultiVariants",
      locale: "en_US",
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@multivariants",
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { lang, slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) notFound();

  const locale = toLocale(lang);
  const dict = page.showHeader || page.showFooter ? await getDictionary(locale) : null;

  return (
    <>
      {page.isPreview && (
        <PreviewBanner status={page.status} exitRedirect={`/${page.slug}`} solid />
      )}
      {page.showHeader && dict && (
        <>
          <SitePromoBanner locale={locale} dict={dict} />
          <Navbar locale={locale} dict={dict} />
        </>
      )}
      <main id="main-content" lang="en">
        <CmsHtml html={page.content} />
      </main>
      {page.showFooter && dict && <Footer locale={locale} dict={dict} />}
    </>
  );
}
