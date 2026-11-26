import type { HelpIconName } from "@/components/academy/HelpIcon";
import type { AcademyCategory, AcademyDoc } from "@/lib/academy/docs-data";
import { OTHER_TOPIC_SLUG } from "@/lib/academy/public-api";

/**
 * Help Center structure — how the CMS doc categories ("topics") are presented.
 * Topics, their order and their guides come from the CMS. The icon and a
 * fallback description (messages/academy `topics.descriptions`) are keyed by
 * the category slug, so a description filled in the CMS always wins.
 */

/** A guide with the topic it is listed under. */
export type HelpDoc = AcademyDoc & { topicSlug: string; topicName: string };

/** Topics with at least one guide, with the synthetic "other" topic named in the page language. */
export function visibleTopics(categories: AcademyCategory[], otherTitle: string) {
  return categories
    .filter((c) => c.docs.length > 0)
    .map((c) => (c.slug === OTHER_TOPIC_SLUG ? { ...c, title: otherTitle } : c));
}

/** Every guide once, in CMS order, tagged with its topic. */
export function flattenDocs(topics: AcademyCategory[]): HelpDoc[] {
  const seen = new Set<string>();
  const out: HelpDoc[] = [];
  for (const topic of topics) {
    for (const doc of topic.docs) {
      if (seen.has(doc.slug)) continue;
      seen.add(doc.slug);
      out.push({ ...doc, topicSlug: topic.slug, topicName: topic.title });
    }
  }
  return out;
}

const TOPIC_ICONS: Record<string, HelpIconName> = {
  installation: "rocket",
  "get-started": "rocket",
  "getting-started": "rocket",
  setup: "rocket",
  "restriction-features": "layers",
  "product-options": "grid",
  "basic-configuration": "list",
  discounts: "percent",
  "general-settings": "tool",
  "theme-adjustments-for-cart-page": "cart",
  trnaslation: "globe",
  translation: "globe",
  "referral-program": "link",
  [OTHER_TOPIC_SLUG]: "card",
};

export function topicIcon(slug: string): HelpIconName {
  return TOPIC_ICONS[slug] ?? "doc";
}

/** CMS description first, else the fallback copy for that slug. */
export function describeTopic(
  topic: AcademyCategory,
  fallbacks: Record<string, string>,
): string | undefined {
  return topic.description.trim() || fallbacks[topic.slug] || undefined;
}

/**
 * Slugs that name the same topic. The CMS translation category is still
 * `trnaslation` (a typo the old WordPress site also indexed); if it is renamed
 * to `translation`, links to either slug redirect to whichever one exists.
 */
const TOPIC_ALIASES: string[][] = [["trnaslation", "translation"]];

export function topicAlias(slug: string, topics: AcademyCategory[]): string | undefined {
  const group = TOPIC_ALIASES.find((g) => g.includes(slug));
  return group?.find((s) => s !== slug && topics.some((t) => t.slug === s));
}

/**
 * "Start here" steps, in order. Each step lists candidate slugs — the planned
 * guide first, then today's CMS slug — and shows the first one published, so
 * the section upgrades itself when new guides go live. A step with no
 * published guide is skipped. Descriptions: `quickStart.steps[i]`.
 */
const QUICK_START: string[][] = [
  ["installation"],
  ["how-to-add-the-multivariants-app-block-in-your-theme", "add-app-block"],
  ["apply-multivariants-to-a-single-product"],
  ["how-to-set-minimum-or-maximum-order-quantity-moq-limit", "set-minimum-maximum-order-quantity"],
];

/** Hand-picked guides for "Popular guides"; unpublished ones are skipped. */
const POPULAR = [
  "how-to-set-minimum-or-maximum-order-quantity-moq-limit",
  "set-minimum-maximum-order-quantity",
  "how-to-set-up-product-options-in-multivariants",
  "how-to-set-up-product-options",
  "how-to-create-a-tiered-discount-set-in-multivariants",
  "how-to-build-a-mix-n-match-bundle-using-multivariants",
  "mix-n-match",
  "how-to-apply-the-restrictions-on-cart-page-too",
  "how-the-referral-program-works",
  "how-to-create-bundle-quantity-quantity-dropdown-using-multivariants",
  "bundle-quantity",
  "set-incremental-quantity",
  "incremental-quantity",
];

/** Published quick-start steps, each with its step index (for its description). */
export function quickStart(docs: HelpDoc[]) {
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  return QUICK_START.flatMap((candidates, step) => {
    const doc = candidates.map((s) => bySlug.get(s)).find(Boolean);
    return doc ? [{ doc, step }] : [];
  });
}

export function popularDocs(docs: HelpDoc[], exclude: string[], limit = 6) {
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  return POPULAR.filter((s) => !exclude.includes(s))
    .map((s) => bySlug.get(s))
    .filter((d): d is HelpDoc => Boolean(d))
    .slice(0, limit);
}
