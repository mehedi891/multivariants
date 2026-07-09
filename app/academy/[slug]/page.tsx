import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import AcademySidebar from "@/components/AcademySidebar";
import {
  getPublicAcademyCategories,
  getPublicAcademyDoc,
} from "@/app/academy/public-api";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPublicAcademyDoc(slug);

  if (!doc) {
    return {
      title: "Academy Doc",
      description: "MultiVariants help documentation.",
      alternates: { canonical: "/academy" },
      robots: { index: false, follow: true },
    };
  }

  const title = doc.seoTitle ?? doc.title;
  const description = doc.seoDescription ?? doc.excerpt;
  const url = `https://multivariants.com/academy/${slug}`;

  return {
    // `absolute` avoids the "| MultiVariants" template ALSO appending, which
    // would produce a double "… | Academy | MultiVariants" suffix.
    title: { absolute: `${title} | MultiVariants Academy` },
    description,
    alternates: { canonical: `/academy/${slug}` },
    openGraph: {
      type: "article",
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

export default async function AcademyDocPage({ params }: PageProps) {
  const { slug } = await params;
  const [{ categories }, doc] = await Promise.all([
    getPublicAcademyCategories(),
    getPublicAcademyDoc(slug),
  ]);

  if (!doc) notFound();

  const currentCategory =
    categories.find((category) => category.docs.some((item) => item.slug === doc.slug)) ??
    categories.find((category) => category.slug === doc.categorySlug) ??
    (doc.categorySlug
      ? {
          slug: doc.categorySlug,
          title: doc.categoryTitle ?? doc.categorySlug,
          description: "",
          docs: [{ ...doc, sections: [] }],
        }
      : {
          slug: "docs",
          title: "Docs",
          description: "",
          docs: [{ ...doc, sections: [] }],
        });

  const formattedDate = doc.lastUpdated || "Recently";
  const contentHtml = doc.contentHtml ?? "";
  const hasHtml = contentHtml.trim().length > 0;

  const docUrl = `https://multivariants.com/academy/${doc.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: doc.seoTitle ?? doc.title,
        description: doc.seoDescription ?? doc.excerpt,
        url: docUrl,
        mainEntityOfPage: docUrl,
        author: { "@id": "https://multivariants.com/#organization" },
        publisher: { "@id": "https://multivariants.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://multivariants.com" },
          { "@type": "ListItem", position: 2, name: "Academy", item: "https://multivariants.com/academy" },
          { "@type": "ListItem", position: 3, name: doc.title, item: docUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-12 lg:py-16"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[260px] w-[260px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-0 h-[260px] w-[260px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <AnimateIn direction="up">
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/55 sm:text-sm">
                <Link href="/academy" className="hover:text-primary-light transition-colors">
                  Academy
                </Link>
                <span>/</span>
                <span>{currentCategory.title}</span>
                <span>/</span>
                <span className="text-white/80">{doc.title}</span>
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-black leading-[1.3] tracking-tight text-white sm:text-4xl">
                {doc.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                {doc.excerpt}
              </p>
              <p className="mt-3 text-xs text-white/45 sm:text-sm">
                {doc.readTime} | Updated {formattedDate}
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-10 lg:py-14"
          style={{
            background:
              "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-110px] top-20 h-[250px] w-[250px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-70px] bottom-10 h-[250px] w-[250px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
            <AnimateIn direction="right">
              <AcademySidebar
                categories={categories}
                activeDocSlug={doc.slug}
                activeCategorySlug={currentCategory.slug}
              />
            </AnimateIn>

            <AnimateIn direction="left" delay={80}>
              <article className="rounded-2xl border border-white/[0.07] bg-[#0e1730]/85 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8 lg:p-10">
                {hasHtml ? (
                  <div
                    className="max-w-3xl space-y-5 text-[15px] leading-[1.78] text-white/80 sm:text-base [&_h2]:mt-9 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:leading-snug [&_h2]:text-white [&_h3]:mt-7 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:text-white/80 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_li]:text-white/80 [&_strong]:font-semibold [&_strong]:text-white [&_a]:font-medium [&_a]:text-primary-light [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent [&_a:hover]:decoration-accent [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-white/[0.08] [&_img]:shadow-[0_14px_30px_rgba(0,0,0,0.35)] [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:text-white/70"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                ) : (
                  <div className="space-y-8">
                    {doc.sections.map((section) => (
                      <section key={section.heading}>
                        <h2 className="text-2xl font-black leading-tight text-white">
                          {section.heading}
                        </h2>
                        <div className="mt-3 space-y-3">
                          {section.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="text-sm leading-relaxed text-white/80 sm:text-[15px]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        {section.points && section.points.length > 0 && (
                          <ul className="mt-4 space-y-2.5">
                            {section.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-white/[0.82] sm:text-[15px]"
                              >
                                <span className="mt-1 text-accent">+</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}
                  </div>
                )}
              </article>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
