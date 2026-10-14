/**
 * The site-wide promotion shown in the bar above the navbar on every page.
 *
 * To run a new campaign, edit this object and the `promo` copy in
 * `messages/*.json`. The bar stops rendering once `endsAt` passes.
 */
export const promo = {
  code: "BFCM26",
  discount: "30%",
  href: "https://partners.efoli.com/install/multivariants/BFCM26",
  // End of Dec 12 in US Pacific time.
  endsAt: Date.parse("2026-12-12T23:59:59-08:00"),
  timeZone: "America/Los_Angeles",
} as const;

export function isPromoLive(now: number = Date.now()): boolean {
  return now < promo.endsAt;
}

/** The end date as a reader of `hreflang` writes it: "December 12", "12 de dezembro". */
export function formatPromoEnd(hreflang: string): string {
  return new Intl.DateTimeFormat(hreflang, {
    month: "long",
    day: "numeric",
    timeZone: promo.timeZone,
  }).format(promo.endsAt);
}
