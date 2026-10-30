import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BulkOrderCard from "@/components/whats-new/BulkOrderCard";
import DiscountCard from "@/components/whats-new/DiscountCard";
import FeatureCarousel from "@/components/whats-new/FeatureCarousel";
import FeaturesIntro from "@/components/whats-new/FeaturesIntro";
import Footer from "@/components/whats-new/Footer";
import Header from "@/components/whats-new/Header";
import Hero from "@/components/whats-new/Hero";
import HowItWorks from "@/components/whats-new/HowItWorks";
import InstallCta from "@/components/whats-new/InstallCta";
import Marquee from "@/components/whats-new/Marquee";
import ProductOptionsCard from "@/components/whats-new/ProductOptionsCard";
import RestrictionsCard from "@/components/whats-new/RestrictionsCard";
import WhySection from "@/components/whats-new/WhySection";
import { SITE_URL, SOCIAL_LINKS } from "@/components/whats-new/links";

const PATH = "/whats-new";
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = "Four Shopify Apps, Replaced by One";
const DESCRIPTION =
  "MultiVariants brings order restrictions, tiered discounts, product options and bulk order forms into one Shopify app — one install, one setup, one dashboard.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    locale: "en",
    availableLocales: ["en"],
    ogTitle: "MultiVariants — Four Shopify apps, replaced by one",
  }),
  // A layout's title.template doesn't apply to a page in the same segment, so
  // the brand suffix is spelled out here.
  title: `${TITLE} | MultiVariants`,
  keywords: [
    "Shopify bulk order form",
    "Shopify order restrictions",
    "Shopify tiered discounts",
    "Shopify product options",
    "Shopify wholesale app",
    "MultiVariants",
  ],
};

const ORG_ID = `${SITE_URL}/#organization`;
const APP_ID = `${SITE_URL}/#app`;

const STEPS = [
  { name: "Welcome", text: "Install MultiVariants and open the guided onboarding." },
  { name: "Choose feature", text: "Pick one feature — or several. You can mix them freely." },
  { name: "Configure", text: "Set your rules while the storefront preview updates live." },
  { name: "Activate", text: "Switch it on for your store with a single toggle." },
  { name: "Done", text: "You're live. Come back and add the next feature any time." },
];

// This page has its own root layout, so it can't lean on the site-wide graph in
// app/[lang]/layout.tsx — it restates the Organization/WebSite nodes (same
// @ids) and adds the page, its breadcrumb, the app and the onboarding HowTo.
// Facts (pricing, rating) mirror app/llms.txt.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "MultiVariants",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
      sameAs: [...SOCIAL_LINKS.map((s) => s.href), "https://apps.shopify.com/multivariants"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@multivariants.com",
        contactType: "customer support",
      },
      parentOrganization: { "@type": "Organization", name: "eFoli", url: "https://efoli.com" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MultiVariants",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: `${TITLE} | MultiVariants`,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": APP_ID },
      mainEntity: { "@id": APP_ID },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image` },
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "What's New", item: PAGE_URL },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: "MultiVariants",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Shopify app",
      operatingSystem: "Shopify",
      url: SITE_URL,
      installUrl: "https://apps.shopify.com/multivariants",
      description:
        "One Shopify app for order restrictions, tiered discounts, product options and bulk order pages, sharing one setup and one dashboard.",
      featureList: [
        "Bulk Order pages: a quick-order page where buyers add every product, variant and quantity at once",
        "Advanced Restrictions: minimum and maximum quantities, order increments and variant rules per product",
        "CSV upload and download of restriction rules, matched by SKU or product name",
        "Tiered Discounts: quantity or order-value tiers, percentage or fixed amount off",
        "Product Options: checkboxes, colour swatches, sizes, add-on pricing and file uploads",
        "Customer eligibility: all customers, logged-in customers, customer tags or specific customers",
        "Grid or list bulk order layouts with 3, 4 or 5 products per row",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "29.99",
        offerCount: "3",
        offers: [
          { "@type": "Offer", name: "Starter", price: "0", priceCurrency: "USD", description: "Free forever." },
          { "@type": "Offer", name: "Standard", price: "12.99", priceCurrency: "USD", description: "Per month. 14-day free trial." },
          { "@type": "Offer", name: "Professional", price: "29.99", priceCurrency: "USD", description: "Per month. 14-day free trial." },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "355",
        bestRating: "5",
        worstRating: "1",
      },
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#how`,
      name: "Go live with MultiVariants in five guided steps",
      description: "A guided onboarding takes you from install to live — no setup guesswork.",
      inLanguage: "en",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${PAGE_URL}#how`,
      })),
    },
  ],
};

export default function WhatsNewPage() {
  return (
    <>
      {/* Rendered as a plain string child: React escapes `</script`, and `<` is
          unicode-escaped below, so no raw-HTML injection is needed. */}
      <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      <div className="wn" style={{ minWidth: 0, overflowX: "clip" }}>
        <Header />
        <main>
          <Hero />
          <Marquee />
          <FeaturesIntro />
          <FeatureCarousel>
            <BulkOrderCard />
            <DiscountCard />
            <ProductOptionsCard />
            <RestrictionsCard />
          </FeatureCarousel>
          <WhySection />
          <HowItWorks />
          <InstallCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
