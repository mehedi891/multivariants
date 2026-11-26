import type { Metadata } from "next";
import { Suspense } from "react";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAcademyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpMain from "@/components/academy/HelpMain";
import Breadcrumbs from "@/components/academy/Breadcrumbs";
import HelpSearch from "@/components/academy/HelpSearch";
import HelpSearchResults from "@/components/academy/HelpSearchResults";
import HelpCta from "@/components/academy/HelpCta";
import { container } from "@/components/academy/styles";
import { getPublicAcademyCategories } from "@/lib/academy/public-api";
import { flattenDocs, visibleTopics } from "@/lib/academy/topics";
import type { HelpIndexEntry } from "@/lib/academy/search";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { results } = await getAcademyContent(toLocale(lang));
  // Result pages are thin, query-driven duplicates — keep them out of the index.
  return { title: results.metaTitle, robots: { index: false, follow: true } };
}

/** Help Center search results (`/academy/search?q=`). */
export default async function AcademySearchPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const [dict, content, { categories }] = await Promise.all([
    getDictionary(locale),
    getAcademyContent(locale),
    getPublicAcademyCategories(),
  ]);
  const index: HelpIndexEntry[] = flattenDocs(
    visibleTopics(categories, content.topics.otherTitle),
  ).map((d) => ({
    slug: d.slug,
    title: d.title,
    topicName: d.topicName,
    readingMinutes: d.readingMinutes,
  }));

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <HelpMain>
        <section className="px-[5%] pb-16 pt-9 lg:pb-20">
          <div className={container}>
            <Breadcrumbs
              label={content.breadcrumb}
              items={[{ label: content.root, href: "/academy" }, { label: content.results.crumb }]}
            />

            <div className="mt-6 max-w-[860px]">
              <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-hc-ink">
                {content.results.metaTitle}
              </h1>
              <div className="relative z-10 mt-6">
                <Suspense fallback={<HelpSearch docs={index} ui={content.search} size="md" />}>
                  <HelpSearchResults
                    docs={index}
                    content={{
                      search: content.search,
                      results: content.results,
                      article: content.article,
                    }}
                  />
                </Suspense>
              </div>
            </div>

            <div className="mt-16">
              <HelpCta content={content.help} />
            </div>
          </div>
        </section>
      </HelpMain>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
