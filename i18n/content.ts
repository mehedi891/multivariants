import "server-only";
import { defaultLocale, type Locale } from "./config";

/**
 * Per-page / shared static content loader.
 *
 * Marketing copy that used to be hardcoded in JSX lives in
 * `messages/<namespace>/<locale>.json` — one JSON file per language, so a
 * translator can work through a page at a time. Every loader falls back to
 * English, so a missing or partial translation renders English rather than
 * blank.
 *
 * Only STATIC copy lives here. CMS-driven content (blog posts, academy docs,
 * changelog entries, client stories, partners) is translated in the CMS, not in
 * this folder — these files cover the surrounding page chrome only.
 *
 * Structural data that is not language-dependent (icons, image paths, prices,
 * feature flags) deliberately stays in the component/page and is merged with
 * the translated text by index, so there is exactly one source of truth for it.
 */
function makeLoader<T>(loaders: Record<Locale, () => Promise<{ default: T }>>) {
  return async (locale: Locale): Promise<T> => {
    try {
      return (await loaders[locale]()).default;
    } catch {
      return (await loaders[defaultLocale]()).default;
    }
  };
}

// --- common (shared sections reused across pages) --------------------------
import type commonEn from "@/messages/common/en.json";
export type CommonContent = typeof commonEn;
export const getCommonContent = makeLoader<CommonContent>({
  en: () => import("@/messages/common/en.json"),
  "pt-br": () => import("@/messages/common/pt-br.json"),
});

// --- home -------------------------------------------------------------------
import type homeEn from "@/messages/home/en.json";
export type HomeContent = typeof homeEn;
export const getHomeContent = makeLoader<HomeContent>({
  en: () => import("@/messages/home/en.json"),
  "pt-br": () => import("@/messages/home/pt-br.json"),
});

// --- pricing ----------------------------------------------------------------
import type pricingEn from "@/messages/pricing/en.json";
export type PricingContent = typeof pricingEn;
export const getPricingContent = makeLoader<PricingContent>({
  en: () => import("@/messages/pricing/en.json"),
  "pt-br": () => import("@/messages/pricing/pt-br.json"),
});

// --- features ---------------------------------------------------------------
import type featuresEn from "@/messages/features/en.json";
export type FeaturesContent = typeof featuresEn;
export const getFeaturesContent = makeLoader<FeaturesContent>({
  en: () => import("@/messages/features/en.json"),
  "pt-br": () => import("@/messages/features/pt-br.json"),
});

// --- contact ----------------------------------------------------------------
import type contactEn from "@/messages/contact/en.json";
export type ContactContent = typeof contactEn;
export const getContactContent = makeLoader<ContactContent>({
  en: () => import("@/messages/contact/en.json"),
  "pt-br": () => import("@/messages/contact/pt-br.json"),
});

// --- faq ---
import type faqEn from "@/messages/faq/en.json";
export type FaqContent = typeof faqEn;
export const getFaqContent = makeLoader<FaqContent>({
  en: () => import("@/messages/faq/en.json"),
  "pt-br": () => import("@/messages/faq/pt-br.json"),
});

// --- academy ---
import type academyEn from "@/messages/academy/en.json";
export type AcademyContent = typeof academyEn;
export const getAcademyContent = makeLoader<AcademyContent>({
  en: () => import("@/messages/academy/en.json"),
  "pt-br": () => import("@/messages/academy/pt-br.json"),
});
