import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { getPublicClient, type PublicClient } from "@/app/clients-showcase/public-api";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://multivariants.com").replaceAll(
  /\/+$/g,
  ""
);
const GENERIC_TITLE = "MultiVariants Client Stories";
const GENERIC_DESCRIPTION =
  "Discover client success stories powered by MultiVariants.";

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function toAbsoluteUrl(value: string) {
  if (!value) return SITE_URL;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function toIsoDate(value: string | undefined) {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

function stripHtml(value: string) {
  return value.replaceAll(/<[^>]*>/g, "");
}

function getMetaDescription(client: PublicClient) {
  if (client.metaDescription?.trim()) return client.metaDescription.trim();
  if (client.excerpt.trim()) return client.excerpt.trim();
  const plain = stripHtml(client.contentHtml ?? "").replaceAll(/\s+/g, " ").trim();
  if (!plain) return GENERIC_DESCRIPTION;
  if (plain.length <= 170) return plain;
  return `${plain.slice(0, 167).trimEnd()}...`;
}

function wrapPostTables(contentHtml: string) {
  return contentHtml.replaceAll(
    /<table\b[\s\S]*?<\/table>/gi,
    (tableHtml) => `<div class="post-table-wrap">${tableHtml}</div>`
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = await getPublicClient(slug);

  if (!client) {
    return {
      title: GENERIC_TITLE,
      description: GENERIC_DESCRIPTION,
      alternates: { canonical: "/clients-showcase" },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title =
    client.metaTitle?.trim() ||
    `${client.title} | Client Story`;
  const description = getMetaDescription(client);
  const canonicalPath = `/clients-showcase/${client.slug}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const imageUrl = client.ogImage || client.coverImage;
  const publishedTime = toIsoDate(client.publishedAt);
  const updatedTime = toIsoDate(client.updatedAt ?? client.publishedAt);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: "MultiVariants",
      title,
      description,
      publishedTime,
      modifiedTime: updatedTime,
      authors: [client.authorName],
      images: imageUrl
        ? [
            {
              url: toAbsoluteUrl(imageUrl),
              alt: client.coverImageAlt || client.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [toAbsoluteUrl(imageUrl)] : undefined,
    },
  };
}

export default async function ClientDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const client = await getPublicClient(slug);

  if (!client) notFound();

  const contentHtml = wrapPostTables(client.contentHtml ?? "<p>No details available.</p>");
  const canonicalUrl = toAbsoluteUrl(`/clients-showcase/${client.slug}`);
  const imageUrl = client.ogImage || client.coverImage;
  const clientJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: client.metaTitle?.trim() || client.title,
    description: getMetaDescription(client),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    datePublished: toIsoDate(client.publishedAt),
    dateModified: toIsoDate(client.updatedAt ?? client.publishedAt),
    image: imageUrl ? [toAbsoluteUrl(imageUrl)] : undefined,
    author: {
      "@type": "Person",
      name: client.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "MultiVariants",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/icon.png"),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clientJsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-10 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl">
            <AnimateIn direction="up">
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/[0.55] sm:text-sm">
                <Link
                  href="/clients-showcase"
                  className="transition-colors hover:text-primary-light"
                >
                  Clients Showcase
                </Link>
                <span>/</span>
                <span className="text-white/[0.82]">{client.title}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-accent/35 bg-accent/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                  Client Story
                </span>
                <span className="text-xs uppercase tracking-[0.08em] text-white/[0.45]">
                  {formatDate(client.publishedAt)} | {client.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
                {client.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/[0.65] sm:text-lg">
                {client.excerpt}
              </p>
              <p className="mt-3 text-sm text-white/[0.45]">By {client.authorName}</p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-x-clip overflow-y-visible px-[5%] py-10 lg:py-14"
          style={{
            background:
              "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl">
            <article className="overflow-hidden rounded-[24px] border border-white/14 bg-gradient-to-b from-[#1a2441]/92 to-[#101933]/96 shadow-[0_18px_42px_rgba(0,0,0,0.34)]">
              {client.coverImage ? (
                <div className="relative aspect-[16/8] border-b border-white/10">
                  <Image
                    src={client.coverImage}
                    alt={client.coverImageAlt || client.title}
                    fill
                    unoptimized={isRemoteImage(client.coverImage)}
                    className="object-cover"
                    sizes="(min-width: 1024px) 70vw, 95vw"
                    priority
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/8] items-center justify-center border-b border-white/10 bg-gradient-to-br from-primary/15 to-accent/10">
                  <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl font-black tracking-wide text-white/80">
                    {initials(client.title)}
                  </span>
                </div>
              )}

              <section className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-3 sm:px-8">
                <p className="text-xs uppercase tracking-[0.1em] text-white/[0.48]">
                  Updated {formatDate(client.updatedAt ?? client.publishedAt)}
                </p>
                {isExternalLink(client.link) && (
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/85 transition-colors hover:border-primary hover:text-primary-light"
                  >
                    Visit Client Website
                  </a>
                )}
              </section>

              <div className="p-6 sm:p-8">
                <div
                  className="blog-post-content space-y-5 text-sm leading-relaxed text-white/[0.82] sm:text-[15px] [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:text-white/[0.82] [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:text-white/[0.82] [&_a]:font-medium [&_a]:text-primary-light [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent [&_a:hover]:decoration-accent [&_figure]:my-6 [&_figure]:overflow-hidden [&_figure]:rounded-xl [&_figure]:border [&_figure]:border-white/14 [&_figure]:bg-white/[0.03] [&_figure]:p-2 [&_figure_img]:h-auto [&_figure_img]:w-full [&_figure_img]:rounded-lg [&_:not(figure)>img]:inline-block [&_:not(figure)>img]:h-[1em] [&_:not(figure)>img]:w-auto [&_:not(figure)>img]:align-[-0.1em] [&_figcaption]:px-1 [&_figcaption]:pt-2 [&_figcaption]:text-xs [&_figcaption]:text-white/[0.45]"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              <section
                aria-label="Author details"
                className="border-t border-white/12 bg-white/[0.02] p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-light">
                  About the Author
                </p>
                <div className="mt-4 flex items-start gap-4">
                  {client.authorAvatarUrl ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/18">
                      <Image
                        src={client.authorAvatarUrl}
                        alt={client.authorName}
                        fill
                        unoptimized={isRemoteImage(client.authorAvatarUrl)}
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-sm font-bold text-white/[0.85]">
                      {initials(client.authorName)}
                    </span>
                  )}

                  <div>
                    <h2 className="text-xl font-black text-white">{client.authorName}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/[0.45]">
                      MultiVariants Contributor
                    </p>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/[0.72] sm:text-[15px]">
                      Shares client transformation stories and practical Shopify growth insights.
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
