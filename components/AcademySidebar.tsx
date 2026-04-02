"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AcademyCategory } from "@/app/academy/docs-data";

type Props = {
  categories: AcademyCategory[];
  activeDocSlug: string;
  activeCategorySlug: string;
};

export default function AcademySidebar({
  categories,
  activeDocSlug,
  activeCategorySlug,
}: Props) {
  const [query, setQuery] = useState("");
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      categories.map((category) => [category.slug, category.slug === activeCategorySlug])
    )
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.map((category) => ({
      ...category,
      docs: category.docs.filter((doc) => {
        if (!q) return true;
        return (
          doc.title.toLowerCase().includes(q) || doc.excerpt.toLowerCase().includes(q)
        );
      }),
    }));
  }, [categories, query]);

  const visibleCount = useMemo(
    () => filtered.reduce((sum, category) => sum + category.docs.length, 0),
    [filtered]
  );

  return (
    <aside className="relative h-fit overflow-hidden rounded-2xl border border-white/14 bg-gradient-to-b from-[#1d2a49]/92 to-[#121d37]/96 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:sticky lg:top-[92px]">
      <div className="pointer-events-none absolute -top-20 -right-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative z-10 mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white/80">
            Knowledge Grid
          </h2>
          <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/45">
            {visibleCount} visible docs
          </p>
        </div>
        <Link
          href="/academy"
          className="rounded-full border border-white/18 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-light transition-all hover:border-primary/45 hover:text-accent"
        >
          Index
        </Link>
      </div>

      <label
        htmlFor="academy-sidebar-search"
        className="relative z-10 mb-4 flex items-center gap-2 rounded-lg border border-white/16 bg-[#0f1933]/70 px-3 py-2 text-sm text-white/65 focus-within:border-primary/45"
      >
        <svg
          className="h-4 w-4 text-white/45"
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
          id="academy-sidebar-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter docs..."
          className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
        />
      </label>

      <div className="relative z-10 space-y-3">
        {filtered.map((category, index) => {
          if (category.docs.length === 0) return null;

          const openFromSearch = query.trim().length > 0;
          const isOpen = openFromSearch || manualOpen[category.slug];

          return (
            <section
              key={category.slug}
              className="rounded-xl border border-white/12 bg-white/[0.03] transition-all"
            >
              <button
                type="button"
                onClick={() =>
                  setManualOpen((prev) => ({ ...prev, [category.slug]: !prev[category.slug] }))
                }
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white/85">
                    {category.title}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-white/45">
                    Cluster {String(index + 1).padStart(2, "0")} · {category.docs.length} docs
                  </p>
                </div>
                <span
                  className={`text-white/45 transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ›
                </span>
              </button>

              {isOpen && (
                <ul className="space-y-1 px-2 pb-2">
                  {category.docs.map((doc) => {
                    const isActive = doc.slug === activeDocSlug;

                    return (
                      <li key={doc.slug}>
                        <Link
                          href={`/academy/${doc.slug}`}
                          className={`group/link flex items-start gap-2 rounded-lg px-2.5 py-2 text-sm transition-all ${
                            isActive
                              ? "border border-primary/45 bg-primary/15 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.3)]"
                              : "border border-transparent text-white/65 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                              isActive ? "bg-primary-light" : "bg-white/35 group-hover/link:bg-accent"
                            }`}
                          />
                          <span className="leading-snug">{doc.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
