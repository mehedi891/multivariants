import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAcademyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleLink from "@/components/LocaleLink";
import ApiEmptyState from "@/components/ApiEmptyState";
import HelpMain from "@/components/academy/HelpMain";
import HelpIcon from "@/components/academy/HelpIcon";
import HelpSearch from "@/components/academy/HelpSearch";
import DocRow from "@/components/academy/DocRow";
import TopicCard from "@/components/academy/TopicCard";
import HelpFaq from "@/components/academy/HelpFaq";
import HelpCta from "@/components/academy/HelpCta";
import JsonLd from "@/components/academy/JsonLd";
import {
  card,
  cardHover,
  container,
  eyebrow,
  eyebrowGreen,
  sectionTitle,
} from "@/components/academy/styles";
import { getPublicAcademyCategories } from "@/lib/academy/public-api";
import { getPublicFaqs } from "@/lib/faq/public-api";
import { searchDocs, type HelpIndexEntry } from "@/lib/academy/search";
import { plural } from "@/lib/academy/text";
import {
  describeTopic,
  flattenDocs,
  popularDocs,
  quickStart,
  visibleTopics,
} from "@/lib/academy/topics";

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

/** Literal classes per step count, so Tailwind sees them. */
const QUICK_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Help Center home: search, quick start, topics, popular guides, FAQ. */
export default async function AcademyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const [dict, content, { categories, error }] = await Promise.all([
    getDictionary(locale),
    getAcademyContent(locale),
    getPublicAcademyCategories(),
  ]);
  // CMS FAQs when published (as on the PushBundle help centre); until then the
  // Help Center's own quick answers.
  const faqs = await getPublicFaqs(undefined, content.faq.items);
  const faqItems = [...faqs.categories.flatMap((c) => c.faqs), ...faqs.uncategorized].slice(0, 6);

  const topics = visibleTopics(categories, content.topics.otherTitle);
  const docs = flattenDocs(topics);
  const index: HelpIndexEntry[] = docs.map((d) => ({
    slug: d.slug,
    title: d.title,
    topicName: d.topicName,
  }));
  const steps = quickStart(docs);
  const popular = popularDocs(
    docs,
    steps.map((s) => s.doc.slug),
  );
  // Only suggest searches that find something today.
  const chips = content.search.chips.filter((c) => searchDocs(index, c).length > 0);
  const { hero, stats } = content;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: content.home, item: "https://multivariants.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: content.root,
              item: "https://multivariants.com/academy",
            },
          ],
        }}
      />
      <Navbar locale={locale} dict={dict} />
      <HelpMain>
        {/* z-10 keeps the search suggestions above the sections below. */}
        <section className="relative z-10 px-[5%] pb-8 pt-12 text-center sm:pt-16 lg:pt-[76px]">
          <div className={container}>
            <p className={eyebrow}>{hero.eyebrow}</p>
            <h1 className="mx-auto mb-3.5 mt-3 max-w-4xl text-[clamp(34px,5.4vw,56px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-hc-ink">
              {hero.title}{" "}
              <span className="bg-hc-grad bg-clip-text text-transparent">{hero.titleAccent}</span>
            </h1>
            <p className="mx-auto mb-[30px] max-w-[620px] text-lg text-hc-muted">{hero.subtitle}</p>
            <HelpSearch docs={index} ui={content.search} chips={chips} />
            {docs.length > 0 && (
              <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-hc-muted">
                <li>
                  <b className="mr-1.5 text-base text-hc-ink">{docs.length}</b>
                  {docs.length === 1 ? stats.guideOne : stats.guideOther}
                </li>
                <li>
                  <b className="mr-1.5 text-base text-hc-ink">{topics.length}</b>
                  {topics.length === 1 ? stats.topicOne : stats.topicOther}
                </li>
                <li>
                  <b className="mr-1.5 text-base text-hc-ink">24/7</b>
                  {stats.support}
                </li>
              </ul>
            )}
          </div>
        </section>

        {topics.length === 0 ? (
          <section className="px-[5%] py-12">
            <ApiEmptyState
              title={content.empty.title}
              description={content.empty.description}
              helpText={content.empty.helpText}
              error={error}
              showDebugDetails={process.env.NODE_ENV !== "production"}
            />
          </section>
        ) : (
          <>
            {steps.length > 0 && (
              <section aria-labelledby="help-start-title" className="px-[5%] py-10 lg:py-12">
                <div className={container}>
                  <p className={eyebrowGreen}>{content.quickStart.eyebrow}</p>
                  <h2 id="help-start-title" className={sectionTitle}>
                    {plural(steps.length, content.quickStart.titleOne, content.quickStart.titleOther)}
                  </h2>
                  <ol
                    className={`mt-6 grid gap-3.5 sm:grid-cols-2 ${QUICK_COLS[steps.length] ?? ""}`}
                  >
                    {steps.map(({ doc, step }, i) => (
                      <li key={doc.slug}>
                        <LocaleLink
                          href={`/academy/${doc.slug}`}
                          className={`group relative flex h-full flex-col p-5 ${card} ${cardHover}`}
                        >
                          <span className="mb-3.5 grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-hc-grad font-extrabold text-white shadow-hc">
                            {i + 1}
                          </span>
                          <HelpIcon
                            name="arrow"
                            className="absolute right-4 top-5 h-4 w-4 text-hc-dim transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-hc-cyan"
                          />
                          <span className="mb-1.5 text-base font-bold leading-[1.35] text-hc-ink">
                            {doc.title}
                          </span>
                          <span className="text-sm text-hc-muted">
                            {content.quickStart.steps[step]}
                          </span>
                        </LocaleLink>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            <section
              id="topics"
              aria-labelledby="help-topics-title"
              className="px-[5%] py-10 lg:py-12"
            >
              <div className={container}>
                <p className={eyebrow}>{content.topics.eyebrow}</p>
                <h2 id="help-topics-title" className={sectionTitle}>
                  {content.topics.title}
                </h2>
                <p className="mt-1.5 text-hc-muted">{content.topics.subtitle}</p>
                <div className="mt-6 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
                  {topics.map((topic) => (
                    <TopicCard
                      key={topic.slug}
                      topic={topic}
                      description={describeTopic(topic, content.topics.descriptions)}
                      countLabel={plural(
                        topic.docs.length,
                        content.topics.guideOne,
                        content.topics.guideOther,
                      )}
                      viewAllLabel={plural(
                        topic.docs.length,
                        content.topics.viewAllOne,
                        content.topics.viewAllOther,
                      )}
                    />
                  ))}
                </div>
              </div>
            </section>

            {popular.length >= 3 && (
              <section aria-labelledby="help-popular-title" className="px-[5%] py-10 lg:py-12">
                <div className={container}>
                  <p className={eyebrowGreen}>{content.popular.eyebrow}</p>
                  <h2 id="help-popular-title" className={sectionTitle}>
                    {content.popular.title}
                  </h2>
                  <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {popular.map((doc) => (
                      <li key={doc.slug}>
                        <DocRow
                          doc={doc}
                          topic={doc.topicName}
                          minRead={content.article.minRead}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}

        <HelpFaq items={faqItems} eyebrowText={content.faq.eyebrow} title={content.faq.title} />

        <section className="px-[5%] pb-16 pt-10 lg:pb-20">
          <div className={container}>
            <HelpCta content={content.help} />
          </div>
        </section>
      </HelpMain>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
