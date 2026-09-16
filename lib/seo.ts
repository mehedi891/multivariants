import type { Metadata } from "next";
import {
  defaultLocale,
  localeMeta,
  locales,
  localizePath,
  type Locale,
} from "@/i18n/config";

const SITE_URL = "https://multivariants.com";

// Generated share card served by app/og-image/route.tsx. Referenced explicitly
// because a page that defines its own `openGraph` replaces the root's entirely,
// so the image must be restated per page.
const OG_IMAGE = "/og-image";

/**
 * hreflang alternates for a bare (locale-independent) path.
 *
 * `languages` advertises only the locales a translation actually exists in,
 * plus `x-default` → English. `canonical` is the current locale's URL — unless
 * that locale isn't in the available set (an English fallback served under a
 * localized URL), in which case the canonical points back at the English
 * original, so a fallback is never indexed as a duplicate and hreflang never
 * points at a non-canonical page.
 *
 * `availableLocales` defaults to every locale (fully translated static pages).
 * Pass a subset for partially translated content — e.g. `["en"]` for an
 * untranslated CMS post. It must always include `defaultLocale`.
 */
export function localeAlternates(
  barePath: string,
  locale: Locale = defaultLocale,
  availableLocales: readonly Locale[] = locales,
) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    if (!availableLocales.includes(l)) continue;
    languages[localeMeta[l].hreflang] = `${SITE_URL}${localizePath(barePath, l)}`;
  }
  languages["x-default"] = `${SITE_URL}${localizePath(barePath, defaultLocale)}`;

  const canonicalLocale = availableLocales.includes(locale) ? locale : defaultLocale;
  return {
    canonical: `${SITE_URL}${localizePath(barePath, canonicalLocale)}`,
    languages,
  };
}

type PageMetaInput = {
  /** Page title WITHOUT the brand suffix — the layout template appends "| MultiVariants". */
  title: string;
  description: string;
  /** Bare, locale-independent path, e.g. "/features" (use "/" for home). */
  path: string;
  /** Active locale — drives the canonical and the hreflang set. */
  locale?: Locale;
  /** Locales this page really exists in; defaults to all. Must include "en". */
  availableLocales?: readonly Locale[];
  /** Optional social-card title override; defaults to `${title} | MultiVariants`. */
  ogTitle?: string;
};

/**
 * Builds per-page metadata with a unique OpenGraph + Twitter card and full
 * hreflang alternates.
 *
 * Without this, a page that sets only `title`/`description` inherits the ROOT
 * OpenGraph wholesale, so every page shares the homepage's social title.
 */
export function pageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  availableLocales,
  ogTitle,
}: PageMetaInput): Metadata {
  const alternates = localeAlternates(path, locale, availableLocales);
  const socialTitle = ogTitle ?? `${title} | MultiVariants`;

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      url: alternates.canonical,
      siteName: "MultiVariants",
      title: socialTitle,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
      creator: "@multivariants",
    },
  };
}
