import { promo } from "@/lib/promo";

/**
 * The BFCM offer on the /whats-new landing page.
 *
 * The plain /whats-new page is shared with free and uninstalled merchants, who
 * must not see the deal. Everyone else gets /whats-new/offer — the same page
 * plus the offer — which is never indexed.
 *
 * This deal (41% off for life, code BFCM41) is separate from the site-wide bar
 * in lib/promo.ts, but it ends at the same moment. After that, proxy.ts sends
 * /whats-new/offer to the plain page, with no redeploy.
 */
export const whatsNewOffer = {
  path: "/whats-new/offer",
  code: "BFCM41",
  endsAt: promo.endsAt,
} as const;

export function isWhatsNewOfferLive(now: number = Date.now()): boolean {
  return now < whatsNewOffer.endsAt;
}
