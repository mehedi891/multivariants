import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getContactContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const { meta } = await getContactContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const content = await getContactContent(locale);
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content">
        <Contact content={content} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
