"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { barePathOf, localeMeta, locales, localizePath, type Locale } from "@/i18n/config";

/**
 * Language switcher.
 *
 * Preserves the current page when switching locale (`/pt/pricing` →
 * `/pricing`) by stripping the locale prefix and re-localizing the bare path.
 * Styled to match the navbar's "Resources" menu — hover/focus-within reveal, so
 * it needs no open/close state and stays keyboard accessible.
 *
 * `scroll={false}`: it is the same page in another language, so keep the reader
 * where they are instead of jumping to the top.
 */
export default function LocaleSwitcher({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const barePath = barePathOf(pathname);
  const first = pathname.split("/")[1] ?? "";
  const current: Locale = (locales as readonly string[]).includes(first)
    ? (first as Locale)
    : "en";

  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
        aria-haspopup="true"
      >
        <span aria-hidden="true">{localeMeta[current].flag}</span>
        <span className="sr-only">
          {label}: {localeMeta[current].name}
        </span>
        {/* Compact code (EN / PT-BR) — full names live in the menu. */}
        <span aria-hidden="true">{current.toUpperCase()}</span>
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="pointer-events-none invisible absolute right-0 top-full z-50 w-48 translate-y-2 rounded-xl border border-white/20 bg-[#111a2f]/95 p-1.5 opacity-0 shadow-[0_16px_35px_rgba(0,0,0,0.45)] transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={localizePath(barePath, locale)}
            scroll={false}
            hrefLang={localeMeta[locale].hreflang}
            aria-current={locale === current ? "true" : undefined}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
              locale === current
                ? "bg-primary/20 text-primary-light"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{localeMeta[locale].flag}</span>
            {localeMeta[locale].name}
          </Link>
        ))}
      </div>
    </div>
  );
}
