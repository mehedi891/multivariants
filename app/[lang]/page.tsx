import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getHomeContent } from "@/i18n/content";
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
  const locale = toLocale(lang);
  const { meta } = await getHomeContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/",
    locale,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const home = await getHomeContent(locale);
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content">
        <Hero content={home.hero} />
        <WhySection content={home.why} />
        <VariantTableDemoSection content={home.demo} />
        <WhyMultivariantsSection content={home.whyMv} />
        <IntegrationsSection content={home.integrations} />
        <StatsBanner content={home.stats} dict={dict} />
        <Features content={home.features} dict={dict} />
        <Testimonials content={home.testimonials} dict={dict} />
        <Blogs content={home.blogs} dict={dict} locale={locale} />
        <CTASection content={home.cta} dict={dict} locale={locale} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
