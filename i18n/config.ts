/**
 * i18n configuration — the single source of truth for locales.
 *
 * Native Next.js 16 approach (no next-intl): next-intl relies on edge
 * middleware, which Next 16's `proxy` no longer supports. Routing lives in
 * `proxy.ts`; copy lives in `messages/**` and is loaded through
 * `i18n/dictionaries.ts` (site chrome) and `i18n/content.ts` (per-page copy).
 *
 * Adding or removing a language is a one-file change here — this drives
 * routing, the switcher, hreflang, and the sitemap.
 */

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Per-locale metadata: native name (for the switcher) + the hreflang code.
 *
 * The URL segment and the hreflang code deliberately differ: the path is the
 * short `/pt/pricing`, while hreflang declares the specific regional variant
 * the copy is actually written in (`pt-BR`), which is what search engines
 * match against a reader's language settings.
 */
export const localeMeta: Record<
  Locale,
  { name: string; hreflang: string; flag: string }
> = {
  en: { name: "English", hreflang: "en", flag: "🇺🇸" },
  pt: { name: "Português (BR)", hreflang: "pt-BR", flag: "🇧🇷" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * URL path for a route in a given locale. The default locale is unprefixed
 * (`/pricing`); every other locale is prefixed (`/pt/pricing`).
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/** Strips any locale prefix from a pathname, returning the bare route. */
export function barePathOf(pathname: string): string {
  const segments = pathname.split("/");
  const bare = isLocale(segments[1] ?? "")
    ? `/${segments.slice(2).join("/")}`
    : pathname;
  return bare === "" ? "/" : bare;
}

/** Coerces a raw `[lang]` route param to a known locale (falls back to English). */
export function toLocale(lang: string): Locale {
  return isLocale(lang) ? lang : defaultLocale;
}
