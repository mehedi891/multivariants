import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://multivariants.com"),
  title: {
    default: "MultiVariants – Bulk Add-to-Cart App for Shopify",
    template: "%s | MultiVariants",
  },
  description:
    "MultiVariants lets Shopify customers bulk-add multiple product variants to cart in one click. Boost B2B/B2C sales with Mix n Match, order restrictions & quantity rules. Free plan.",
  keywords: [
    "Shopify bulk order app",
    "variants bulk add to cart",
    "Shopify B2B app",
    "multiple variants cart",
    "bulk order Shopify",
    "mix and match Shopify",
    "wholesale Shopify app",
    "quantity increment Shopify",
    "MultiVariants",
  ],
  authors: [{ name: "eFoli", url: "https://multivariants.com" }],
  creator: "eFoli",
  publisher: "eFoli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://multivariants.com",
    siteName: "MultiVariants",
    title: "MultiVariants – One-Click Bulk Add to Cart for Shopify Variants",
    description:
      "Allow customers to bulk order multiple product variants in one click. Trusted by 13,000+ Shopify merchants across 120+ countries.",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "MultiVariants – Bulk Order App for Shopify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiVariants – Bulk Order App for Shopify",
    description:
      "One-click bulk add to cart for Shopify product variants. 13,000+ merchants. Free plan available.",
    images: ["/og-image"],
    creator: "@multivariants",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://multivariants.com",
  },
  // Icons are supplied by the app/favicon.ico, app/icon and app/apple-icon
  // file conventions.
};

// Site-wide entity graph: a single Organization + WebSite that other pages'
// JSON-LD (BlogPosting/Article publishers, breadcrumbs) can reference by @id,
// plus the product's SoftwareApplication node.
const jsonLd = {
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
      publisher: { "@id": "https://multivariants.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "MultiVariants – Bulk Order App",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Shopify",
      url: "https://multivariants.com",
      description:
        "Allow customers to bulk add multiple product variants to cart in one click on Shopify.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "29.99",
        offerCount: "3",
        description:
          "Free Starter plan; paid plans from $12.99/month with a 7-day free trial",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "350",
        bestRating: "5",
        worstRating: "1",
      },
      publisher: { "@id": "https://multivariants.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
