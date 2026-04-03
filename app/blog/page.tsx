import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { getPublicBlogPosts } from "@/app/blog/public-api";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest MultiVariants insights on bulk ordering, B2B conversion, restriction rules, and Shopify growth.",
  alternates: { canonical: "/blog" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://multivariants.com/blog",
    title: "MultiVariants Blog",
    description:
      "Read the latest MultiVariants insights on bulk ordering, B2B conversion, restriction rules, and Shopify growth.",
    siteName: "MultiVariants",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiVariants Blog",
    description:
      "Read the latest MultiVariants insights on bulk ordering, B2B conversion, restriction rules, and Shopify growth.",
    creator: "@multivariants",
  },
};

type PageProps = {
  searchParams: Promise<{
    page?: string | string[];
    category?: string | string[];
  }>;
};

const PAGE_SIZE = 9;
const SHOW_BLOG_API_ERROR =
  process.env.NEXT_PUBLIC_BLOG_API_DEBUG === "true";

function pickFirst(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function safePage(value: string | undefined) {
  const parsed = Number(value ?? "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
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

function toBlogHref(page: number, category: string) {
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (category && category.toLowerCase() !== "all") query.set("category", category);
  const qs = query.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const incomingHeaders = await headers();
  const selectedCategory = pickFirst(params.category) ?? "all";
  const requestedPage = safePage(pickFirst(params.page));

  const { posts, totalPages, currentPage, categories, error } = await getPublicBlogPosts({
    page: requestedPage,
    limit: PAGE_SIZE,
    category: selectedCategory.toLowerCase() === "all" ? undefined : selectedCategory,
    requestHeaders: {
      cookie: incomingHeaders.get("cookie"),
      authorization: incomingHeaders.get("authorization"),
    },
  });

  const categoriesWithAll = [
    { name: "All", slug: "all", count: undefined as number | undefined },
    ...categories,
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #060d1f 0%, #0a1430 50%, #101d3f 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -left-24 h-[320px] w-[320px] rotate-12 bg-gradient-to-br from-primary/15 to-transparent blur-[70px]" />
            <div className="absolute -right-24 top-1/3 h-[360px] w-[360px] -rotate-12 bg-gradient-to-br from-accent/12 to-transparent blur-[90px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(92,106,196,0.16),transparent_32%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-light/90">
                    Journal
                  </p>
                  <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                    MultiVariants Blog
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/[0.65] sm:text-lg">
                    Powered by API content. Browse by category and open any
                    article at /blog/postURI.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/14 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
                    Listing
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/[0.8]">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] pb-16 pt-10 lg:pb-24"
          style={{
            background:
              "linear-gradient(180deg, #09122a 0%, #0d1834 55%, #121f3f 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px] opacity-25" />
            <div className="absolute left-[-120px] top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[90px]" />
            <div className="absolute right-[-120px] bottom-0 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[95px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="rounded-2xl border border-white/14 bg-gradient-to-b from-[#1a2442]/88 to-[#101a33]/94 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-light">
                    Filter by Category
                  </p>
                  <p className="text-xs uppercase tracking-[0.08em] text-white/[0.48]">
                    {posts.length} results on this page
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {categoriesWithAll.map((category) => {
                    const categoryValue = category.slug || category.name;
                    const isActive =
                      selectedCategory === categoryValue ||
                      selectedCategory.toLowerCase() === category.name.toLowerCase();
                    return (
                      <Link
                        key={category.slug || category.name}
                        href={toBlogHref(1, categoryValue)}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                          isActive
                            ? "border-primary/70 bg-gradient-to-r from-primary/32 to-[#7482e0]/32 text-white shadow-[0_0_0_1px_rgba(92,106,196,0.55),0_0_18px_rgba(92,106,196,0.34)]"
                            : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                        }`}
                      >
                        {category.name}
                        {typeof category.count === "number" ? ` (${category.count})` : ""}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimateIn>

            {posts.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-white/14 bg-white/[0.04] px-5 py-8 text-center backdrop-blur-lg">
                <p className="text-lg font-bold text-white">No posts found</p>
                <p className="mt-2 text-sm text-white/[0.62]">
                  {error
                    ? "Blog API is not returning valid JSON. Check CMS_API_BASE_URL / BLOG_API_PATH."
                    : "Try another category."}
                </p>
                {error && SHOW_BLOG_API_ERROR && (
                  <p className="mt-3 text-xs text-amber-300/90">
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" role="list">
                {posts.map((post) => (
                  <li key={post.slug} className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/card block h-full overflow-hidden rounded-[20px] border border-white/14 bg-[#0d1730]/76 transition-all duration-300 hover:-translate-y-1 hover:border-primary/48 hover:shadow-[0_18px_44px_rgba(42,121,212,0.26)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/12">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          fill
                          unoptimized={isRemoteImage(post.coverImage)}
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute left-3 top-3 rounded-full border border-accent/45 bg-accent/18 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                          {post.category}
                        </span>
                        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/[0.85]">
                          {post.readingTimeMinutes} min read
                        </span>
                      </div>

                      <article className="p-4">
                        <h2 className="text-lg font-black leading-snug text-white transition-colors group-hover/card:text-primary-light">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/[0.7]">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[11px] font-bold text-white/[0.8]">
                              {initials(post.authorName)}
                            </span>
                            <span className="truncate text-xs text-white/[0.62]">
                              {post.authorName}
                            </span>
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.08em] text-white/[0.48]">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                      </article>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                <Link
                  href={toBlogHref(Math.max(1, currentPage - 1), selectedCategory)}
                  aria-disabled={currentPage === 1}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                    currentPage === 1
                      ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                      : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                  }`}
                >
                  Prev
                </Link>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                  <Link
                    key={p}
                    href={toBlogHref(p, selectedCategory)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`h-9 w-9 rounded-full border text-center text-xs font-semibold leading-9 transition-all ${
                      p === currentPage
                        ? "border-primary/48 bg-primary/18 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.28)]"
                        : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {p}
                  </Link>
                ))}

                <Link
                  href={toBlogHref(Math.min(totalPages, currentPage + 1), selectedCategory)}
                  aria-disabled={currentPage === totalPages}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                    currentPage === totalPages
                      ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                      : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                  }`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
