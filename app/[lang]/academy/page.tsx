import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAcademyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import AcademyExplorer from "@/components/AcademyExplorer";
import ApiEmptyState from "@/components/ApiEmptyState";
import { getPublicAcademyCategories } from "@/lib/academy/public-api";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const { meta } = await getAcademyContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const content = await getAcademyContent(locale);
  const { categories, error } = await getPublicAcademyCategories();

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                {content.badge}
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                {content.subtitle}
              </p>
            </AnimateIn>
          </div>
        </section>

        {categories.length > 0 ? (
          <AcademyExplorer categories={categories} />
        ) : (
          <section
            className="relative overflow-hidden px-[5%] py-12 lg:py-16"
            style={{
              background:
                "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
            }}
          >
            <ApiEmptyState
              title={content.empty.title}
              description={content.empty.description}
              helpText={content.empty.helpText}
              error={error}
              showDebugDetails={process.env.NODE_ENV !== "production"}
            />
          </section>
        )}
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
