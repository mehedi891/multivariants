import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo";
import { localeMeta, toLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAcademyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleLink from "@/components/LocaleLink";
import CmsHtml from "@/components/CmsHtml";
import HelpMain from "@/components/academy/HelpMain";
import HelpIcon, { type HelpIconName } from "@/components/academy/HelpIcon";
import Breadcrumbs from "@/components/academy/Breadcrumbs";
import DocFeedback from "@/components/academy/DocFeedback";
import JsonLd from "@/components/academy/JsonLd";
import { buttonGradient, card, cardHover, container } from "@/components/academy/styles";
import { getPublicAcademyCategories, getPublicAcademyDoc } from "@/lib/academy/public-api";
import { enhanceDocBody } from "@/lib/academy/body";
import { fill, plural } from "@/lib/academy/text";
import { visibleTopics } from "@/lib/academy/topics";

// CMS content is authored in English only, so hreflang advertises just `en`
// and a localized URL canonicals back to the English page.
const CMS_LOCALES: readonly Locale[] = ["en"];
const SITE_URL = "https://multivariants.com";

type PageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

/**
 * CMS SEO titles often already end in "| MultiVariants"; drop it so the page
 * title doesn't repeat the brand before "| MultiVariants Help Center".
 */
function withoutBrand(title: string) {
  return title.replace(/\s*[|–-]\s*MultiVariants(?:\s+(?:Academy|Help Center))?\s*$/i, "").trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const doc = await getPublicAcademyDoc(slug);

  if (!doc) {
    return {
      title: "Help Center",
      description: "MultiVariants help documentation.",
      alternates: localeAlternates("/academy", locale, CMS_LOCALES),
      robots: { index: false, follow: true },
    };
  }

  const title = withoutBrand(doc.seoTitle ?? doc.title);
  const description = doc.seoDescription ?? doc.excerpt;
  const url = `${SITE_URL}/academy/${slug}`;

  return {
    // `absolute` avoids the "| MultiVariants" template ALSO appending, which
    // would produce a double "… | Help Center | MultiVariants" suffix.
    title: { absolute: `${title} | MultiVariants Help Center` },
    description,
    alternates: localeAlternates(`/academy/${slug}`, locale, CMS_LOCALES),
    openGraph: {
      type: "article",
      // CMS content is English-only and canonicals to the English URL.
      locale: "en_US",
      url,
      siteName: "MultiVariants",
      title,
      description,
      images: [{ url: "/og-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image"],
      creator: "@multivariants",
    },
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeMeta[locale].hreflang, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** A Help Center guide: CMS body, guide meta, feedback, prev/next and the topic's other guides. */
export default async function AcademyDocPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const [dict, content, { categories }, doc] = await Promise.all([
    getDictionary(locale),
    getAcademyContent(locale),
    getPublicAcademyCategories(),
    getPublicAcademyDoc(slug),
  ]);

  if (!doc) notFound();
  const t = content.article;

  // Topic, siblings and prev/next come from the ordered list, so they match
  // the topic page even if the single-doc response lacks a category.
  const topics = visibleTopics(categories, content.topics.otherTitle);
  const topic =
    topics.find((c) => c.docs.some((d) => d.slug === doc.slug)) ??
    topics.find((c) => c.slug === doc.categorySlug);
  const topicSlug = topic?.slug ?? doc.categorySlug;
  const topicName = topic?.title ?? doc.categoryTitle;
  const siblings = topic?.docs ?? [];
  const listed = siblings.find((d) => d.slug === doc.slug);
  const idx = siblings.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const body = enhanceDocBody(doc.contentHtml ?? "");
  const minutes = doc.readingMinutes ?? listed?.readingMinutes;
  const updatedAt = doc.updatedAt ?? listed?.updatedAt;
  const meta: Array<{ icon: HelpIconName; text: string }> = [];
  if (minutes) meta.push({ icon: "clock", text: fill(t.minRead, { n: minutes }) });
  if (body.steps) meta.push({ icon: "steps", text: plural(body.steps, t.stepOne, t.stepOther) });
  if (updatedAt) {
    meta.push({ icon: "calendar", text: fill(t.updated, { date: formatDate(updatedAt, locale) }) });
  }

  const docUrl = `${SITE_URL}/academy/${doc.slug}`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: content.home, item: SITE_URL },
    { "@type": "ListItem", position: 2, name: content.root, item: `${SITE_URL}/academy` },
    ...(topicSlug && topicName
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: topicName,
            item: `${SITE_URL}/academy/category/${topicSlug}`,
          },
        ]
      : []),
  ];
  crumbs.push({ "@type": "ListItem", position: crumbs.length + 1, name: doc.title, item: docUrl });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: doc.title,
        description: doc.seoDescription ?? doc.excerpt,
        url: docUrl,
        mainEntityOfPage: docUrl,
        ...(updatedAt && { dateModified: updatedAt }),
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      { "@type": "BreadcrumbList", itemListElement: crumbs },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar locale={locale} dict={dict} />
      <HelpMain>
        <section className="px-[5%] pb-16 pt-9 lg:pb-20">
          <div className={container}>
            <Breadcrumbs
              label={content.breadcrumb}
              items={[
                { label: content.root, href: "/academy" },
                ...(topicSlug && topicName
                  ? [{ label: topicName, href: `/academy/category/${topicSlug}` }]
                  : []),
                { label: doc.title },
              ]}
            />

            <div className="mt-5 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
              <article className="min-w-0">
                <h1 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-hc-ink">
                  {doc.title}
                </h1>
                {meta.length > 0 && (
                  <ul className="mb-[22px] flex flex-wrap items-center gap-x-3.5 gap-y-2 text-sm text-hc-dim">
                    {meta.map((m) => (
                      <li key={m.icon} className="inline-flex items-center gap-1.5">
                        <HelpIcon name={m.icon} className="h-[15px] w-[15px]" />
                        {m.text}
                      </li>
                    ))}
                  </ul>
                )}

                {body.html.trim() ? (
                  <CmsHtml className="academy-doc" html={body.html} />
                ) : (
                  <p className="text-lg text-hc-ink">{doc.excerpt}</p>
                )}

                <div className="mt-[26px]">
                  <DocFeedback slug={doc.slug} content={t.feedback} />
                </div>

                {(prev || next) && (
                  <nav aria-label={t.pager} className="mt-[22px] grid gap-3 sm:grid-cols-2">
                    {prev ? (
                      <LocaleLink
                        href={`/academy/${prev.slug}`}
                        className={`flex flex-col px-4 py-3.5 ${card} ${cardHover}`}
                      >
                        <span className="mb-0.5 text-xs text-hc-dim">← {t.previous}</span>
                        <span className="text-hc-ink">{prev.title}</span>
                      </LocaleLink>
                    ) : (
                      <span aria-hidden="true" className="hidden sm:block" />
                    )}
                    {next && (
                      <LocaleLink
                        href={`/academy/${next.slug}`}
                        className={`flex flex-col px-4 py-3.5 sm:items-end sm:text-right ${card} ${cardHover}`}
                      >
                        <span className="mb-0.5 text-xs text-hc-dim">{t.next} →</span>
                        <span className="text-hc-ink">{next.title}</span>
                      </LocaleLink>
                    )}
                  </nav>
                )}
              </article>

              <aside className="grid content-start gap-3.5 lg:sticky lg:top-24">
                {topicName && siblings.length > 0 && (
                  <nav aria-label={fill(t.inTopic, { topic: topicName })} className={`p-[18px] ${card}`}>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-hc-dim">
                      {fill(t.inTopic, { topic: topicName })}
                    </p>
                    <ul className="-mr-2 max-h-[46vh] overflow-y-auto pr-2">
                      {siblings.map((d) => {
                        const on = d.slug === doc.slug;
                        return (
                          <li key={d.slug} className="border-t border-hc-line first:border-t-0">
                            <LocaleLink
                              href={`/academy/${d.slug}`}
                              aria-current={on ? "page" : undefined}
                              className={`block py-[7px] text-sm leading-[1.4] transition-colors ${
                                on ? "font-semibold text-hc-ink" : "text-hc-muted hover:text-hc-ink"
                              }`}
                            >
                              {d.title}
                            </LocaleLink>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                )}

                <div className={`p-[18px] ${card}`}>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-hc-dim">
                    {t.helpTitle}
                  </p>
                  <p className="mb-3 text-sm text-hc-muted">{t.helpBody}</p>
                  <LocaleLink href="/contact" className={`w-full ${buttonGradient}`}>
                    <HelpIcon name="chat" className="h-4 w-4" />
                    {t.helpCta}
                  </LocaleLink>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </HelpMain>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
