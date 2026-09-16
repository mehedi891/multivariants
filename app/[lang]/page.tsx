import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import VariantTableDemoSection from "@/components/VariantTableDemoSection";
import WhyMultivariantsSection from "@/components/WhyMultivariantsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import StatsBanner from "@/components/StatsBanner";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({
    title: "MultiVariants – One-Click Bulk Add to Cart for Shopify Variants",
    description:
      "Let Shopify customers bulk-add multiple product variants to cart in one click. Boost B2B/B2C orders with Mix n Match, restrictions & quantity rules. Free plan.",
    path: "/",
    locale: toLocale(lang),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content">
        <Hero />
        <WhySection />
        <VariantTableDemoSection />
        <WhyMultivariantsSection />
        <IntegrationsSection />
        <StatsBanner />
        <Features />
        <Testimonials />
        <Blogs />
        <CTASection />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
