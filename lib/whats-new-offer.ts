import { promo } from "@/lib/promo";

/**
 * The BFCM offer on the /whats-new landing page.
 *
 * The page is shared with free and uninstalled merchants, who must not see the
 * deal, so the offer only appears on a link carrying `?bfcm=offer`. proxy.ts
 * serves those requests from the offer variant (app/whats-new/offer); every
 * other request gets the plain page.
 *
 * This deal (41% off for life, code BFCM41) is separate from the site-wide bar
 * in lib/promo.ts, but it ends at the same moment — after that the link quietly
 * shows the plain page, with no redeploy.
 */
export const whatsNewOffer = {
  param: "bfcm",
  value: "offer",
  code: "BFCM41",
  endsAt: promo.endsAt,
} as const;

export function isWhatsNewOfferLive(now: number = Date.now()): boolean {
  return now < whatsNewOffer.endsAt;
}

export function isWhatsNewOfferRequest(searchParams: URLSearchParams): boolean {
  return searchParams.get(whatsNewOffer.param) === whatsNewOffer.value;
}
