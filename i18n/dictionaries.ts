import "server-only";
import { defaultLocale, type Locale } from "./config";

/**
 * Server-side loader for the site-chrome dictionary (nav, footer, shared CTAs).
 *
 * Every locale falls back to English, so a missing or partial translation
 * renders English rather than an empty string. Per-page marketing copy lives in
 * `i18n/content.ts` instead — this file is only the chrome shared by all pages.
 *
 * Adding a locale = one entry in `i18n/config.ts` + a `messages/<locale>.json`.
 */
const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("@/messages/en.json"),
  "pt-br": () => import("@/messages/pt-br.json"),
};

export type Dictionary = typeof import("@/messages/en.json");

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    return (await loaders[locale]()).default;
  } catch {
    return (await loaders[defaultLocale]()).default;
  }
}
