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
    default: "MultiVariants – Bulk Order App for Shopify | One-Click Variants Add to Cart",
    template: "%s | MultiVariants",
  },
  description:
    "MultiVariants is a Shopify app that lets customers bulk add multiple product variants to cart in one click. Boost B2B/B2C sales, reduce cart abandonment, and increase revenue. 13,000+ merchants across 120+ countries. 350+ five-star reviews.",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png",    type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MultiVariants – Bulk Order App",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",
  url: "https://multivariants.com",
  description:
    "Allow customers to bulk add multiple product variants to cart in one click on Shopify.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan available with 7-day trial",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "350",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Organization",
    name: "eFoli",
    url: "https://multivariants.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "DOHS Mirpur",
      addressLocality: "Dhaka",
      postalCode: "1216",
      addressCountry: "BD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@multivariants.com",
      contactType: "customer support",
    },
  },
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
      <body>{children}</body>
    </html>
  );
}
