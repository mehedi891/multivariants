"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AcademyCategory, AcademyDoc } from "@/app/academy/docs-data";

type ExplorerDoc = AcademyDoc & {
  categorySlug: string;
  categoryTitle: string;
};

type Props = {
  categories: AcademyCategory[];
};

function matchesDoc(doc: ExplorerDoc, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();

  return (
    doc.title.toLowerCase().includes(q) ||
    doc.excerpt.toLowerCase().includes(q) ||
    doc.sections.some(
      (section) =>
        section.heading.toLowerCase().includes(q) ||
        section.paragraphs.some((p) => p.toLowerCase().includes(q)) ||
        (section.points ?? []).some((point) => point.toLowerCase().includes(q))
    )
  );
}

export default function AcademyExplorer({ categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allDocs = useMemo<ExplorerDoc[]>(
    () =>
      categories.flatMap((category) =>
        category.docs.map((doc) => ({
          ...doc,
          categorySlug: category.slug,
          categoryTitle: category.title,
        }))
      ),
    [categories]
  );

  const filteredDocs = useMemo(() => {
    return allDocs.filter((doc) => {
      if (activeCategory !== "all" && doc.categorySlug !== activeCategory) {
        return false;
      }
      return matchesDoc(doc, query.trim());
    });
  }, [activeCategory, allDocs, query]);

  const docsByCategory = useMemo(() => {
    const map = new Map<string, ExplorerDoc[]>();
    filteredDocs.forEach((doc) => {
      const prev = map.get(doc.categorySlug) ?? [];
      prev.push(doc);
      map.set(doc.categorySlug, prev);
    });
    return map;
  }, [filteredDocs]);

  const topMatches = useMemo(() => filteredDocs.slice(0, 6), [filteredDocs]);

  return (
    <section
      className="relative overflow-hidden px-[5%] pb-16 pt-10 lg:pb-24"
      style={{
        background: "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
      }}
      aria-labelledby="academy-explorer-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
        <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:46px_46px] opacity-25" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/15 bg-gradient-to-b from-[#1e2a4a]/85 via-[#182540]/90 to-[#121c35]/95 p-4 shadow-[0_22px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="academy-explorer-heading"
                className="text-2xl font-black tracking-tight text-white sm:text-3xl"
              >
                Find Docs Faster
              </h2>
              <p className="mt-1 text-sm text-white/60 sm:text-[15px]">
                Search across all docs, then narrow by category.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-white/18 bg-white/[0.05] px-3 py-1 uppercase tracking-[0.08em] text-white/70">
                {allDocs.length} docs total
              </span>
              <span className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 uppercase tracking-[0.08em] text-primary-light">
                {filteredDocs.length} results
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <label
              htmlFor="academy-search"
              className="group flex items-center gap-2.5 rounded-xl border border-white/18 bg-[#0f1933]/65 px-3.5 py-2.5 text-sm text-white/65 transition-all focus-within:border-primary/55 focus-within:shadow-[0_0_18px_rgba(92,106,196,0.28)]"
            >
              <svg
                className="h-4 w-4 text-white/45 group-focus-within:text-primary-light"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="5.8" />
                <path d="m13.6 13.6 3.4 3.4" strokeLinecap="round" />
              </svg>
              <input
                id="academy-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs by title, topic, or keyword..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                  activeCategory === "all"
                    ? "border-primary/45 bg-primary/18 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.3)]"
                    : "border-white/18 bg-white/[0.04] text-white/65 hover:border-white/35 hover:text-white"
                }`}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                    activeCategory === category.slug
                      ? "border-accent/45 bg-accent/18 text-accent shadow-[0_0_16px_rgba(71,193,191,0.28)]"
                      : "border-white/18 bg-white/[0.04] text-white/65 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {query.trim() && topMatches.length > 0 && (
          <div className="mt-6 rounded-2xl border border-white/14 bg-white/[0.05] p-4 shadow-[0_14px_36px_rgba(0,0,0,0.3)] backdrop-blur-lg">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-light">
              Top Matches
            </p>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {topMatches.map((doc) => (
                <li key={`top-${doc.slug}`}>
                  <Link
                    href={`/academy/${doc.slug}`}
                    className="block rounded-lg border border-white/12 bg-[#0e1830]/70 px-3 py-2 text-sm text-white/80 transition-all hover:border-primary/50 hover:text-primary-light"
                  >
                    <p className="font-semibold leading-snug">{doc.title}</p>
                    <p className="mt-1 text-xs text-white/45">{doc.categoryTitle}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {filteredDocs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/14 bg-white/[0.04] px-5 py-8 text-center backdrop-blur-lg">
            <p className="text-lg font-bold text-white">No docs found</p>
            <p className="mt-2 text-sm text-white/60">
              Try a different keyword or switch category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 rounded-full border border-primary/45 bg-primary/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary-light transition-all hover:bg-primary/24"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <ul className="mt-8 space-y-6">
            {categories.map((category, index) => {
              const docs = docsByCategory.get(category.slug) ?? [];
              if (docs.length === 0) return null;

              return (
                <li key={category.slug}>
                  <article className="group relative overflow-hidden rounded-[26px] border border-white/14 bg-gradient-to-b from-[#1a2543]/88 via-[#16213b]/90 to-[#111c34]/95 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all duration-300 hover:border-primary/45 hover:shadow-[0_24px_52px_rgba(42,121,212,0.3)] sm:p-6">
                    <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/18 blur-3xl" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                    <div className="relative z-10 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                          Category {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-2xl font-black text-white sm:text-[1.8rem]">
                          {category.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/60">{category.description}</p>
                      </div>
                      <span className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary-light">
                        {docs.length} results
                      </span>
                    </div>

                    <ul className="relative z-10 mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {docs.map((doc) => (
                        <li key={`${category.slug}-${doc.slug}`}>
                          <Link
                            href={`/academy/${doc.slug}`}
                            className="group/doc block rounded-2xl border border-white/14 bg-[#0f1933]/65 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_14px_34px_rgba(71,193,191,0.24)]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-base font-bold leading-snug text-white group-hover/doc:text-accent">
                                {doc.title}
                              </p>
                              <span className="text-white/35 transition-all group-hover/doc:translate-x-1 group-hover/doc:text-accent">
                                →
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">
                              {doc.excerpt}
                            </p>
                            <p className="mt-3 text-xs uppercase tracking-[0.08em] text-white/45">
                              {doc.readTime} | Updated {doc.lastUpdated}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
