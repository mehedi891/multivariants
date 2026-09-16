import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({
    title: "Contact Us – Support, Demos & Onboarding",
    description:
      "Contact the MultiVariants team for Shopify bulk-ordering support, live demos, setup help, and onboarding. We're here to help you get selling faster.",
    path: "/contact",
    locale: toLocale(lang),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content">
        <Contact />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
