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

// --- blog ---
import type blogEn from "@/messages/blog/en.json";
export type BlogContent = typeof blogEn;
export const getBlogContent = makeLoader<BlogContent>({
  en: () => import("@/messages/blog/en.json"),
  "pt-br": () => import("@/messages/blog/pt-br.json"),
});

// --- changelog ---
import type changelogEn from "@/messages/changelog/en.json";
export type ChangelogContent = typeof changelogEn;
export const getChangelogContent = makeLoader<ChangelogContent>({
  en: () => import("@/messages/changelog/en.json"),
  "pt-br": () => import("@/messages/changelog/pt-br.json"),
});

// --- partners ---
import type partnersEn from "@/messages/partners/en.json";
export type PartnersContent = typeof partnersEn;
export const getPartnersContent = makeLoader<PartnersContent>({
  en: () => import("@/messages/partners/en.json"),
  "pt-br": () => import("@/messages/partners/pt-br.json"),
});

// --- clients ---
import type clientsEn from "@/messages/clients/en.json";
export type ClientsContent = typeof clientsEn;
export const getClientsContent = makeLoader<ClientsContent>({
  en: () => import("@/messages/clients/en.json"),
  "pt-br": () => import("@/messages/clients/pt-br.json"),
});

// --- privacy ---
import type privacyEn from "@/messages/privacy/en.json";
export type PrivacyContent = typeof privacyEn;
export const getPrivacyContent = makeLoader<PrivacyContent>({
  en: () => import("@/messages/privacy/en.json"),
  "pt-br": () => import("@/messages/privacy/pt-br.json"),
});
