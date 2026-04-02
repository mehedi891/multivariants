import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  getPublicBlogPost,
  getPublicBlogPosts,
  type PublicBlogPost,
} from "@/app/blog/public-api";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type SocialProfile = {
  id: "facebook" | "linkedin" | "reddit" | "youtube"| "twitter";
  label: string;
  href: string;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://multivariants.com").replaceAll(
  /\/+$/g,
  ""
);
const GENERIC_POST_TITLE = "MultiVariants Blog";
const GENERIC_POST_DESCRIPTION =
  "Read the latest MultiVariants blog posts and Shopify growth guides.";

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

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function getAuthorBio(name: string, bio?: string) {
  if (bio && bio.trim().length > 0) return bio;
  return `${name} shares practical strategies and implementation guidance to help merchants grow with MultiVariants.`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

function stripHtml(value: string) {
  return value.replaceAll(/<[^>]*>/g, "");
}

function buildMetaDescription(excerpt: string, contentHtml: string) {
  const normalizedExcerpt = excerpt.trim();
  if (normalizedExcerpt) return normalizedExcerpt;

  const plain = stripHtml(contentHtml).replaceAll(/\s+/g, " ").trim();
  if (!plain) return GENERIC_POST_DESCRIPTION;
  if (plain.length <= 170) return plain;
  return `${plain.slice(0, 167).trimEnd()}...`;
}

function toAbsoluteUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function toIsoDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

function resolvePostSeo(post: PublicBlogPost) {
  const title =
    post.seoTitle?.trim() || post.title?.trim() || GENERIC_POST_TITLE;
  const description =
    post.seoDescription?.trim() ||
    buildMetaDescription(post.excerpt, post.contentHtml);

  return { title, description };
}

function buildContentWithToc(contentHtml: string): {
  contentWithAnchors: string;
  tocItems: TocItem[];
} {
  const usedIds = new Map<string, number>();
  const tocItems: TocItem[] = [];
  const contentWithTableWrap = contentHtml.replaceAll(
    /<table\b[\s\S]*?<\/table>/gi,
    (tableHtml) => `<div class="post-table-wrap">${tableHtml}</div>`
  );

  const contentWithAnchors = contentWithTableWrap.replaceAll(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const text = stripHtml(inner).replaceAll(/\s+/g, " ").trim();
      if (!text) return match;

      const existingIdMatch = attrs.match(/\sid=["']([^"']+)["']/i);
      const baseId = existingIdMatch?.[1] ?? (slugify(text) || "section");
      const seen = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, seen + 1);
      const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

      tocItems.push({ id, text, level });

      const nextAttrs = existingIdMatch
        ? attrs.replace(existingIdMatch[0], ` id="${id}"`)
        : `${attrs} id="${id}"`;

      return `<${tag}${nextAttrs}>${inner}</${tag}>`;
    }
  );

  return { contentWithAnchors, tocItems };
}

function SocialIcon({ id }: { id: SocialProfile["id"] }) {
  if (id === "facebook") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.43H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
      </svg>
    );
  }

  if (id === "linkedin") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95v5.67H9.31V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.29 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.07 20.45H3.5V9h3.57v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0Z" />
      </svg>
    );
  }

  if (id === "reddit") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M24 11.65c0-1.77-1.43-3.2-3.2-3.2-.87 0-1.65.35-2.23.9-1.56-1.06-3.65-1.75-5.95-1.84l1.01-4.75 3.3.7a2.24 2.24 0 1 0 .16-1.12l-3.82-.81a.57.57 0 0 0-.67.44l-1.13 5.29c-2.37.06-4.54.75-6.14 1.84a3.2 3.2 0 1 0-1.82 5.84c0 .16-.01.31-.01.47 0 4.06 3.83 7.35 8.54 7.35 4.72 0 8.55-3.29 8.55-7.35 0-.15 0-.3-.02-.45A3.2 3.2 0 0 0 24 11.65Zm-14.1 2.68a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm7.08 4.28c-1.03 1.03-3 1.12-4.98 1.12-1.98 0-3.95-.1-4.98-1.12a.57.57 0 1 1 .81-.81c.62.62 1.94.8 4.17.8 2.23 0 3.55-.18 4.17-.8a.57.57 0 1 1 .81.8Zm-.17-4.28a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M21.58 7.19a2.95 2.95 0 0 0-2.08-2.09C17.67 4.5 12 4.5 12 4.5s-5.67 0-7.5.6A2.95 2.95 0 0 0 2.42 7.2 30.98 30.98 0 0 0 1.82 12c0 1.62.2 3.23.6 4.8a2.95 2.95 0 0 0 2.08 2.08c1.83.62 7.5.62 7.5.62s5.67 0 7.5-.62a2.95 2.95 0 0 0 2.08-2.09c.4-1.56.6-3.17.6-4.79 0-1.62-.2-3.23-.6-4.8ZM10.2 15.02V8.98L15.55 12l-5.35 3.02Z" />
    </svg>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const incomingHeaders = await headers();
  const requestHeaders = {
    cookie: incomingHeaders.get("cookie"),
    authorization: incomingHeaders.get("authorization"),
  };
  const post = await getPublicBlogPost(slug, requestHeaders);

  if (!post) {
    return {
      title: GENERIC_POST_TITLE,
      description: GENERIC_POST_DESCRIPTION,
      alternates: { canonical: "/blog" },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const { title, description } = resolvePostSeo(post);
  const canonicalPath = `/blog/${post.slug}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const imageUrl = post.coverImage ? toAbsoluteUrl(post.coverImage) : undefined;
  const publishedTime = toIsoDate(post.publishedAt);

  return {
    title,
    description,
    category: post.category,
    keywords: [post.category, "Shopify", "MultiVariants", "Bulk ordering"],
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
      section: post.category,
      authors: [post.authorName],
      publishedTime,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.coverImageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      creator: "@multivariants",
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const incomingHeaders = await headers();
  const requestHeaders = {
    cookie: incomingHeaders.get("cookie"),
    authorization: incomingHeaders.get("authorization"),
  };
  const post = await getPublicBlogPost(slug, requestHeaders);

  if (!post) notFound();

  const relatedRes = await getPublicBlogPosts({
    page: 1,
    limit: 4,
    category: post.categorySlug || post.category,
    requestHeaders,
  });
  const related = relatedRes.posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const { contentWithAnchors, tocItems } = buildContentWithToc(post.contentHtml);
  const postCanonicalUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const coverImageUrl = post.coverImage ? toAbsoluteUrl(post.coverImage) : undefined;
  const { title: seoTitle, description: seoDescription } = resolvePostSeo(post);
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postCanonicalUrl,
    },
    headline: seoTitle,
    description: seoDescription,
    image: coverImageUrl ? [coverImageUrl] : undefined,
    datePublished: toIsoDate(post.publishedAt),
    dateModified: toIsoDate(post.updatedAt ?? post.publishedAt),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.authorName,
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
  const socialProfiles: SocialProfile[] = [
    {
      id: "facebook",
      label: "Facebook",
      href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL ?? postCanonicalUrl,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ?? postCanonicalUrl,
    },
    {
      id: "reddit",
      label: "Reddit",
      href: process.env.NEXT_PUBLIC_SOCIAL_REDDIT_URL ?? postCanonicalUrl,
    },
    {
      id: "youtube",
      label: "YouTube",
      href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL ?? postCanonicalUrl,
    },
    {
      id: "twitter",
      label: "X",
      href: process.env.NEXT_PUBLIC_SOCIAL_X_URL ?? postCanonicalUrl,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
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
                <Link href="/blog" className="hover:text-primary-light transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-white/[0.82]">{post.title}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-accent/35 bg-accent/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                  {post.category}
                </span>
                <span className="text-xs uppercase tracking-[0.08em] text-white/[0.45]">
                  {formatDate(post.publishedAt)} | {post.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl/tight leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/[0.65] sm:text-lg">
                {post.excerpt}
              </p>
              <p className="mt-3 text-sm text-white/[0.45]">By {post.authorName}</p>
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

          <div className="relative z-10 mx-auto max-w-6xl lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-6">
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit lg:self-start">
              <div className="rounded-2xl border border-white/14 bg-white/[0.04] p-4 backdrop-blur-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary-light">
                  Table of Contents
                </p>

                {tocItems.length > 0 ? (
                  <nav aria-label="Table of contents" className="mt-3">
                    <ul className="space-y-1.5">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`block rounded-md px-2 py-1.5 text-sm text-white/65 transition-colors hover:text-white ${
                              item.level === 3 ? "pl-5" : ""
                            }`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <p className="mt-3 text-sm text-white/45">No sections available.</p>
                )}
              </div>
            </aside>

            <article className="overflow-hidden rounded-[24px] border border-white/14 bg-gradient-to-b from-[#1a2441]/92 to-[#101933]/96 shadow-[0_18px_42px_rgba(0,0,0,0.34)]">
              <div className="relative aspect-[16/8] border-b border-white/10">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  unoptimized={isRemoteImage(post.coverImage)}
                  className="object-cover"
                  sizes="(min-width: 1024px) 70vw, 95vw"
                  priority
                />
              </div>

              <section
                aria-label="Social media links"
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-3 sm:px-8"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-white/[0.48]">
                  Follow MultiVariants
                </p>
                <div className="flex items-center gap-2">
                  {socialProfiles.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-primary hover:bg-gradient-to-br hover:from-primary/30 hover:to-accent/20 hover:text-white hover:shadow-[0_10px_22px_rgba(92,106,196,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101933]"
                    >
                      <SocialIcon id={item.id} />
                    </a>
                  ))}
                </div>
              </section>

              <div className="p-6 sm:p-8">
                <div
                  className="blog-post-content space-y-5 text-sm leading-relaxed text-white/[0.82] sm:text-[15px] [&_h2]:mt-7 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-white [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:text-white/[0.82] [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:text-white/[0.82] [&_a]:font-medium [&_a]:text-primary-light [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent [&_a:hover]:decoration-accent [&_figure]:my-6 [&_figure]:overflow-hidden [&_figure]:rounded-xl [&_figure]:border [&_figure]:border-white/14 [&_figure]:bg-white/[0.03] [&_figure]:p-2 [&_figure_img]:h-auto [&_figure_img]:w-full [&_figure_img]:rounded-lg [&_:not(figure)>img]:inline-block [&_:not(figure)>img]:h-[1em] [&_:not(figure)>img]:w-auto [&_:not(figure)>img]:align-[-0.1em] [&_figcaption]:px-1 [&_figcaption]:pt-2 [&_figcaption]:text-xs [&_figcaption]:text-white/[0.45]"
                  dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
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
                  {post.authorAvatarUrl ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/18">
                      <Image
                        src={post.authorAvatarUrl}
                        alt={post.authorName}
                        fill
                        unoptimized={isRemoteImage(post.authorAvatarUrl)}
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-sm font-bold text-white/[0.85]">
                      {initials(post.authorName)}
                    </span>
                  )}

                  <div>
                    <h2 className="text-xl font-black text-white">{post.authorName}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/[0.45]">
                      MultiVariants Contributor
                    </p>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/[0.72] sm:text-[15px]">
                      {getAuthorBio(post.authorName, post.authorBio)}
                    </p>
                  </div>
                </div>
              </section>

              <section
                aria-label="Get the app on Shopify"
                className="border-t border-white/12 bg-white/[0.01] px-6 py-6 sm:px-8"
              >
                <Link
                  href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Image
                    src="/images/Get-MultiVariants-from-Shopify-App-Store-Black.png"
                    alt="Find it on the Shopify App Store"
                    width={390}
                    height={84}
                    priority={false}
                  />
                </Link>
              </section>
            </article>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[#131d35] px-[5%] py-12 lg:py-16">
            <div className="mx-auto max-w-6xl">
              <AnimateIn direction="up">
                <div className="mb-6 flex items-end justify-between gap-3">
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Related Posts
                  </h2>
                  <Link
                    href="/blog"
                    className="text-sm font-semibold text-primary-light hover:text-accent"
                  >
                    View all posts
                  </Link>
                </div>
              </AnimateIn>

              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {related.map((item, index) => (
                  <AnimateIn key={item.slug} direction="up" delay={index * 70}>
                    <li>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="block h-full rounded-2xl border border-white/14 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                          {item.category}
                        </p>
                        <p className="mt-2 text-base font-bold leading-snug text-white">
                          {item.title}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[10px] font-bold text-white/[0.8]">
                              {initials(item.authorName)}
                            </span>
                            <span className="text-xs text-white/[0.62]">{item.authorName}</span>
                          </div>
                          <p className="text-xs text-white/[0.45]">
                            {formatDate(item.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  </AnimateIn>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
