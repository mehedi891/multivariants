"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/app/blog/posts-data";

type Props = {
  posts: BlogPost[];
};

const PAGE_SIZE = 9;

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

export default function BlogExplorerGrid({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((post) => {
      map.set(post.tag, (map.get(post.tag) ?? 0) + 1);
    });
    return map;
  }, [posts]);

  const categories = useMemo(
    () => ["All", ...Array.from(categoryCounts.keys())],
    [categoryCounts]
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.tag === activeCategory);
  }, [activeCategory, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visiblePosts = filteredPosts.slice(start, start + PAGE_SIZE);

  return (
    <section
      className="relative overflow-hidden px-[5%] pb-16 pt-10 lg:pb-24"
      style={{
        background: "linear-gradient(180deg, #09122a 0%, #0d1834 55%, #121f3f 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px] opacity-25" />
        <div className="absolute left-[-120px] top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[90px]" />
        <div className="absolute right-[-120px] bottom-0 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[95px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="rounded-2xl border border-white/14 bg-gradient-to-b from-[#1a2442]/88 to-[#101a33]/94 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-light">
              Filter by Category
            </p>
            <p className="text-xs uppercase tracking-[0.08em] text-white/[0.48]">
              {filteredPosts.length} results
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              const count =
                category === "All" ? posts.length : categoryCounts.get(category) ?? 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setPage(1);
                  }}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                    isActive
                      ? "border-primary/70 bg-gradient-to-r from-primary/32 to-[#7482e0]/32 text-white shadow-[0_0_0_1px_rgba(92,106,196,0.55),0_0_18px_rgba(92,106,196,0.34)]"
                      : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {visiblePosts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/14 bg-white/[0.04] px-5 py-8 text-center backdrop-blur-lg">
            <p className="text-lg font-bold text-white">No posts found</p>
            <p className="mt-2 text-sm text-white/[0.62]">
              Try selecting another category.
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" role="list">
            {visiblePosts.map((post) => (
              <li key={post.slug} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/card block h-full overflow-hidden rounded-[20px] border border-white/14 bg-[#0d1730]/76 transition-all duration-300 hover:-translate-y-1 hover:border-primary/48 hover:shadow-[0_18px_44px_rgba(42,121,212,0.26)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/12">
                    <Image
                      src={post.heroImageSrc}
                      alt={post.heroImageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-accent/45 bg-accent/18 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                      {post.tag}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/[0.85]">
                      {post.readTime}
                    </span>
                  </div>

                  <article className="p-4">
                    <h3 className="text-lg font-black leading-snug text-white transition-colors group-hover/card:text-primary-light">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/[0.7]">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[11px] font-bold text-white/[0.8]">
                          {initials(post.author)}
                        </span>
                        <span className="truncate text-xs text-white/[0.62]">
                          {post.author}
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
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-white/18 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/[0.78] transition-all hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-full border text-xs font-semibold transition-all ${
                  p === currentPage
                    ? "border-primary/48 bg-primary/18 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.28)]"
                    : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                }`}
                aria-label={`Go to page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-white/18 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/[0.78] transition-all hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
