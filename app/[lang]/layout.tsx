import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import Analytics from "@/components/Analytics";
import LiveChat from "@/components/LiveChat";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { isLocale, locales, localeMeta, localizePath, type Locale } from "@/i18n/config";
import { ogImageFor, ogLocaleFields } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Site-wide defaults. Generated per locale rather than exported as a static
 * object: every field here is inherited by pages that don't override it —
 * `keywords` on all of them, and everything on the 404 page — so a static
 * English object leaked English into every localized page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const { meta } = await getDictionary(locale);

  return {
    metadataBase: new URL("https://multivariants.com"),
    title: {
      default: meta.defaultTitle,
      template: "%s | MultiVariants",
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "eFoli", url: "https://multivariants.com" }],
    creator: "eFoli",
    publisher: "eFoli",
    openGraph: {
      type: "website",
      url: `https://multivariants.com${localizePath("/", locale) === "/" ? "" : localizePath("/", locale)}`,
      siteName: "MultiVariants",
      title: meta.ogTitle,
      description: meta.ogDescription,
      ...ogLocaleFields(locale),
      images: [
        { url: ogImageFor(locale), width: 1200, height: 630, alt: meta.ogImageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: [ogImageFor(locale)],
      creator: "@multivariants",
    },
    // No explicit `index, follow`: that is the default, and declaring it made
    // 404 pages ship it next to Next's injected `noindex` — two contradictory
    // robots tags. Only the non-default Googlebot preview directives remain.
    robots: {
      googleBot: {
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Favicon is supplied by the app/favicon.ico file convention (the brand mark).
  };
}

// Site-wide entity graph: a single Organization + WebSite that other pages'
// JSON-LD (BlogPosting/Article publishers, breadcrumbs) can reference by @id,
// plus the product's SoftwareApplication node.
function buildJsonLd(dict: Dictionary) {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://multivariants.com/#organization",
      name: "MultiVariants",
      url: "https://multivariants.com",
      logo: {
        "@type": "ImageObject",
        url: "https://multivariants.com/images/logo.webp",
      },
      sameAs: [
        "https://www.facebook.com/MultiVariantsApp",
        "https://www.linkedin.com/company/multivariants/",
        "https://twitter.com/multivariants",
        "https://apps.shopify.com/multivariants",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@multivariants.com",
        contactType: "customer support",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "eFoli",
        url: "https://efoli.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "DOHS Mirpur",
          addressLocality: "Dhaka",
          postalCode: "1216",
          addressCountry: "BD",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://multivariants.com/#website",
      url: "https://multivariants.com",
      name: "MultiVariants",
      // Every language the site is published in, as hreflang codes.
      inLanguage: locales.map((l) => localeMeta[l].hreflang),
      publisher: { "@id": "https://multivariants.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: dict.schemaApp.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Shopify",
      url: "https://multivariants.com",
      description: dict.schemaApp.description,
      inLanguage: dict.schemaApp.inLanguage,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "29.99",
        offerCount: "3",
        description: dict.schema.offerDescription,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "355",
        bestRating: "5",
        worstRating: "1",
      },
      publisher: { "@id": "https://multivariants.com/#organization" },
    },
  ],
  };
}

/** Pre-render every locale variant at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <html lang={localeMeta[locale].hreflang} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(dict)) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <Analytics />
        <LiveChat />
      </body>
    </html>
  );
}
