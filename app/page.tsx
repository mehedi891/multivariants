import type { Metadata } from "next";
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
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MultiVariants – One-Click Bulk Add to Cart for Shopify Variants",
  description:
    "MultiVariants lets Shopify merchants allow customers to bulk add multiple product variants to cart in one click. Boost B2B & B2C sales with Mix n Match, order restrictions, and incremental quantities. 13,000+ merchants · 120+ countries · Free plan.",
  alternates: { canonical: "https://multivariants.com" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
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
      </main>
      <Footer />
    </>
  );
}
