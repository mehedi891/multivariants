import type { PricingContent } from "@/i18n/content";

/**
 * Plan prices and limits — the single source of truth for the pricing page.
 *
 * These mirror the in-app "Subscription Plan" page in Shopify. When the plans
 * change there, update the numbers here and the plan copy in
 * messages/pricing/<locale>.json (plus the Plans section of app/llms.txt and
 * the AggregateOffer in app/[lang]/layout.tsx).
 */

export type PlanId = "starter" | "standard" | "professional" | "max";

export type LimitKey =
  | "rulesets"
  | "discountSets"
  | "maxFileUpload"
  | "multiFileUpload"
  | "fileStorage"
  | "fileRetention";

/** Display order of limit rows, on the cards and in the comparison table. */
export const LIMIT_KEYS: LimitKey[] = [
  "rulesets",
  "discountSets",
  "maxFileUpload",
  "multiFileUpload",
  "fileStorage",
  "fileRetention",
];

type PlanSpec = {
  id: PlanId;
  icon: string;
  popular?: boolean;
  /** Genuinely free tier (Starter). Paid plans use `monthly`/`annual`. */
  free?: boolean;
  monthly?: string;
  annual?: { amount: string; regular: string };
  /**
   * multiFileUpload is a file count and fileRetention is a number of days
   * (365 shows as "1 year"); every other value is shown as written.
   */
  limits: Partial<Record<LimitKey, string | number>>;
};

export const ANNUAL_SAVE = "20%";

export const PLAN_SPECS: PlanSpec[] = [
  {
    id: "starter",
    icon: "✨",
    free: true,
    limits: { rulesets: 1 },
  },
  {
    id: "standard",
    icon: "⚡",
    monthly: "$12.99",
    annual: { amount: "$124.70", regular: "$155.88" },
    limits: { rulesets: 20 },
  },
  {
    id: "professional",
    icon: "👑",
    popular: true,
    monthly: "$29.99",
    annual: { amount: "$287.90", regular: "$359.88" },
    limits: {
      rulesets: 90,
      discountSets: 20,
      maxFileUpload: "20 MB",
      fileStorage: "30 GB",
      fileRetention: 90,
    },
  },
  {
    id: "max",
    icon: "🚀",
    monthly: "$63.99",
    annual: { amount: "$614.30", regular: "$767.88" },
    limits: {
      rulesets: 200,
      discountSets: 50,
      maxFileUpload: "100 MB",
      multiFileUpload: 10,
      fileStorage: "100 GB",
      fileRetention: 365,
    },
  },
];

export function formatLimit(
  key: LimitKey,
  value: string | number,
  t: PricingContent,
): string {
  if (key === "multiFileUpload") return t.limits.files.replace("{n}", String(value));
  if (key === "fileRetention") {
    const days = Number(value);
    if (days % 365 === 0) {
      const years = days / 365;
      return (years === 1 ? t.limits.year : t.limits.years).replace("{n}", String(years));
    }
    return t.limits.days.replace("{n}", String(days));
  }
  return String(value);
}

/** Translated copy for one plan. Only Max carries a "coming soon" list. */
export function planCopy(t: PricingContent, id: PlanId) {
  const copy = t.plans[id];
  return {
    name: copy.name,
    description: copy.description,
    featuresHeading: copy.featuresHeading,
    features: copy.features as string[],
    comingSoon: "comingSoon" in copy ? (copy.comingSoon as string[]) : [],
  };
}
