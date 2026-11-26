import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { localizePath, toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAcademyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpMain from "@/components/academy/HelpMain";
import HelpIcon from "@/components/academy/HelpIcon";
import Breadcrumbs from "@/components/academy/Breadcrumbs";
import TopicsNav from "@/components/academy/TopicsNav";
import DocRow from "@/components/academy/DocRow";
import HelpCta from "@/components/academy/HelpCta";
import JsonLd from "@/components/academy/JsonLd";
import { container, iconTile } from "@/components/academy/styles";
import { getPublicAcademyCategories } from "@/lib/academy/public-api";
import { fill, plural } from "@/lib/academy/text";
import { describeTopic, topicAlias, topicIcon, visibleTopics } from "@/lib/academy/topics";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

async function load(lang: string, slug: string) {
  const locale = toLocale(lang);
  const [content, { categories }] = await Promise.all([
    getAcademyContent(locale),
    getPublicAcademyCategories(),
  ]);
  const topics = visibleTopics(categories, content.topics.otherTitle);
  const topic = topics.find((t) => t.slug === slug);
  return { locale, content, topics, topic };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { locale, content, topic } = await load(lang, slug);
  if (!topic) return { robots: { index: false, follow: true } };
  return pageMetadata({
    title: fill(content.meta.topicTitle, { topic: topic.title }),
    description:
      describeTopic(topic, content.topics.descriptions) ??
      fill(content.meta.topicDescription, { topic: topic.title }),
    path: `/academy/category/${topic.slug}`,
    locale,
  });
}

/** A Help Center topic: every guide in one CMS category, in CMS order. */
export default async function AcademyTopicPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const { locale, content, topics, topic } = await load(lang, slug);
  if (!topic) {
    // A renamed topic slug (e.g. the `trnaslation` typo) keeps its old links.
    const alias = topicAlias(slug, topics);
    if (alias) permanentRedirect(localizePath(`/academy/category/${alias}`, locale));
    notFound();
  }
  const dict = await getDictionary(locale);

  const description = describeTopic(topic, content.topics.descriptions);
  const count = plural(topic.docs.length, content.topics.guideOne, content.topics.guideOther);
  const topicUrl = `https://multivariants.com/academy/category/${topic.slug}`;

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
            { "@type": "ListItem", position: 3, name: topic.title, item: topicUrl },
          ],
        }}
      />
      <Navbar locale={locale} dict={dict} />
      <HelpMain>
        <section className="px-[5%] pb-16 pt-9 lg:pb-20">
          <div className={container}>
            <Breadcrumbs
              label={content.breadcrumb}
              items={[{ label: content.root, href: "/academy" }, { label: topic.title }]}
            />

            <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-9">
              <aside className="min-w-0">
                <TopicsNav topics={topics} current={topic.slug} label={content.topics.sidebar} />
              </aside>

              <div className="min-w-0">
                <header className="mb-[22px] flex items-start gap-4">
                  <span className={`h-[52px] w-[52px] rounded-[14px] ${iconTile}`}>
                    <HelpIcon name={topicIcon(topic.slug)} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h1 className="mb-1 text-[clamp(26px,3.6vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-hc-ink">
                      {topic.title}
                    </h1>
                    <p className="text-hc-muted">
                      {description ? `${description} · ${count}` : count}
                    </p>
                  </div>
                </header>

                <ol className="grid gap-2.5">
                  {topic.docs.map((doc, i) => (
                    <li key={doc.slug}>
                      <DocRow doc={doc} number={i + 1} minRead={content.article.minRead} />
                    </li>
                  ))}
                </ol>
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
