# multivariants.com — Sitemap & Link Fix List
> Generated July 8, 2026 · Based on XML sitemap vs. full live crawl diff (436 URLs)

## P1 — Indexing (do first)

### 1. 94 live blog posts are NOT in the XML sitemap
The post sitemaps declare only 140 posts, but 233 are live. Check Rank Math → Titles & Meta → Posts for a bulk noindex, and per-post "Exclude from sitemap" flags. If unintentional, these posts are invisible to search engines via sitemap discovery. Note: several are recent, high-intent pages (e.g. `best-shopify-apps-for-high-volume-orders`, `shopify-order-limit-app-faq`, `shopify-spring-2026-update`). Full list in Appendix A.

### 2. 11 academy docs missing from docs-sitemap.xml
All are the new **custom product options** docs — exactly the feature pages that should rank:

- https://multivariants.com/academy/how-to-set-up-product-options/
- https://multivariants.com/academy/how-to-set-up-the-custom-button-swatch-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-checkbox-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-color-swatch-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-date-and-time-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-dropdown-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-file-attachment-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-image-swatch-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-number-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-radio-option/
- https://multivariants.com/academy/how-to-set-up-the-custom-text-option/

Likely cause: docs-sitemap last modified 2025-07-08 (a year stale) while these docs are newer. Check the doc post type's sitemap/noindex settings in Rank Math.

### 3. Broken link in production
`/clients-showcase/brick-slips-uk-&-multivariants/` — a hand-typed href with a literal `&` in the slug; it returns an empty page. Fix the link to point to the canonical `/clients-showcase/brick-slips-uk-multivariants/`. (Same page: the Disc Golf showcase link has a trailing newline inside its href — clean it up too.)

## P2 — SEO hygiene

### 4. Typo slugs live in production
- `/academy-categories/trnaslation/` → rename to `translation`, add 301 redirect
- `/blog/shopify-custom-vaiants-display-for-bakery/` → rename to `...variants...`, add 301 redirect

### 5. 7 academy docs not linked from the /academy/ hub
Only reachable via `/academy-categories/*` archives — weak internal linking for feature documentation:

- https://multivariants.com/academy/bundle-quantity/
- https://multivariants.com/academy/incremental-quantity/
- https://multivariants.com/academy/limit-per-variant-option/
- https://multivariants.com/academy/minimum-maximum-order-value/
- https://multivariants.com/academy/restriction-on-variants/
- https://multivariants.com/academy/set-minimum-maximum-order-quantity/
- https://multivariants.com/academy/how-to-set-up-the-custom-date-and-time-option/

Add them to the /academy/ hub page.

### 6. 9 orphan URLs (in sitemap, linked from nowhere on the site)
Search engines can find them but users can't. Add internal links, or remove from sitemap if deprecated:

- https://multivariants.com/academy/can-i-apply-volume-discounts-with-multivariants/
- https://multivariants.com/academy/can-i-set-minimum-order-quantity-increase-quantity-in-multiples/
- https://multivariants.com/academy/cart-liquid-update-for-min-max-or-bundle-quantity-restrictions/
- https://multivariants.com/academy/how-to-uninstall-multivariants/
- https://multivariants.com/academy/is-multivariants-works-with-pagefly-page-builder/
- https://multivariants.com/academy/why-is-it-showing-unlimited-available-and-not-showing-my-available-stock-quantity-for-variants/
- https://multivariants.com/docs/
- https://multivariants.com/clients-showcase/the-confectionary-improved-order-process-on-shopify/
- https://multivariants.com/clients-showcase/brick-slips-uk-multivariants/ (only "linked" via the broken `&` URL above)

### 7. academy-categories archives absent from sitemap
The 7 `/academy-categories/*` pages are linked site-wide but not in any sitemap. If they should rank (they're useful doc hubs), enable their taxonomy in Rank Math's sitemap settings.

## P3 — Thin content (optional)

### 8. 59 monthly archives (2020/10–2026/07) publicly linked
Thin, near-duplicate pages. Recommended: noindex date archives (Rank Math → Titles & Meta → Archives) or remove the archive widget. Same logic applies to the 25 `/blog/page/N/` pagination URLs (ensure `rel=prev/next` or noindex,follow).

## Appendix A — 94 blog posts missing from XML sitemap

- https://multivariants.com/blog/10-low-cost-b2b-business-ideas-to-gain-profit/
- https://multivariants.com/blog/advantages-of-b2b-discount-pricing-in-ecommerce/
- https://multivariants.com/blog/analyzing-data-and-metrics-for-strategic-b2b-inventory-expansion/
- https://multivariants.com/blog/b2b-customer-segmentation/
- https://multivariants.com/blog/b2b-order-management-system-on-shopify/
- https://multivariants.com/blog/best-b2b-sales-strategy/
- https://multivariants.com/blog/best-products-to-buy-in-bulk-and-sell-on-shopify/
- https://multivariants.com/blog/best-shopify-apps-for-high-volume-orders/
- https://multivariants.com/blog/best-shopify-apps-for-selling-t-shirts/
- https://multivariants.com/blog/can-ai-understand-product-variants/
- https://multivariants.com/blog/choosing-a-b2b-wholesale-platform/
- https://multivariants.com/blog/complete-guide-to-shopify-growth-hacking-marketing/
- https://multivariants.com/blog/content-marketing-for-b2b-success/
- https://multivariants.com/blog/data-driven-b2b-sales-optimization/
- https://multivariants.com/blog/demand-based-pricing/
- https://multivariants.com/blog/dos-and-donts-of-shopify-discounts/
- https://multivariants.com/blog/drawbacks-of-b2b-discount-pricing/
- https://multivariants.com/blog/e-commerce-promotional-calendar/
- https://multivariants.com/blog/effective-holiday-marketing-tactics-for-b2b/
- https://multivariants.com/blog/email-marketing-for-b2b-ecommerce/
- https://multivariants.com/blog/enhancing-customer-satisfaction-through-inventory-management/
- https://multivariants.com/blog/find-wholesale-customers-for-your-shopify-store/
- https://multivariants.com/blog/free-shipping-benefits-and-mistakes-in-ecommerce/
- https://multivariants.com/blog/how-pricing-tiers-can-bring-success-to-your-e-commerce-business/
- https://multivariants.com/blog/how-to-add-multiple-products-into-cart-at-shopify/
- https://multivariants.com/blog/how-to-calculate-wholesale-price/
- https://multivariants.com/blog/how-to-choose-the-right-advertising-platforms-for-b2b-ecommerce/
- https://multivariants.com/blog/how-to-do-wholesale-business-without-a-shopify-plus-account/
- https://multivariants.com/blog/how-to-make-a-buyer-persona-for-a-b2b-business/
- https://multivariants.com/blog/how-to-manage-product-variants-on-shopify/
- https://multivariants.com/blog/how-to-reduce-cart-abandonment-in-ecommerce/
- https://multivariants.com/blog/how-to-retain-customers-at-shopify/
- https://multivariants.com/blog/how-to-select-multiple-variants-of-the-same-product-at-a-time-in-shopify/
- https://multivariants.com/blog/how-to-sell-wholesale-on-shopify-with-handshake/
- https://multivariants.com/blog/how-to-set-up-shopify-store-for-b2b-success/
- https://multivariants.com/blog/how-wholesalers-add-value-and-make-money/
- https://multivariants.com/blog/identifying-and-addressing-inventory-risks-in-b2b/
- https://multivariants.com/blog/implementing-effective-b2b-segmentation-strategies/
- https://multivariants.com/blog/importance-of-customer-repurchase-and-retention-at-shopify/
- https://multivariants.com/blog/importance-of-ecommerce-discount-pricing/
- https://multivariants.com/blog/importance-of-inventory-management-in-b2b-business/
- https://multivariants.com/blog/know-how-shopify-works-with-instagram/
- https://multivariants.com/blog/mapping-the-b2b-buyer-journey/
- https://multivariants.com/blog/multivariants-bulk-order-app-earned-200-positive-reviews-at-shopify/
- https://multivariants.com/blog/online-business-success-tips-after-an-offline-success/
- https://multivariants.com/blog/optimizing-b2b-ecommerce-with-best-practices-at-shopify/
- https://multivariants.com/blog/overcoming-challenges-in-b2b-customer-segmentation/
- https://multivariants.com/blog/overstock-vs-understock/
- https://multivariants.com/blog/product-variations-understanding-what-are-variants-on-shopify/
- https://multivariants.com/blog/profitable-ways-to-run-ecommerce-wholesale-business/
- https://multivariants.com/blog/relationship-between-cash-flow-and-inventory-control-in-a-b2b-business/
- https://multivariants.com/blog/sell-bulk-bakery-ingredients-on-shopify/
- https://multivariants.com/blog/sell-yoga-products-on-shopify/
- https://multivariants.com/blog/shopify-apps-for-fitness-accessories/
- https://multivariants.com/blog/shopify-apps-for-makeup-stores/
- https://multivariants.com/blog/shopify-apps-for-selling-vitamins-and-supplements/
- https://multivariants.com/blog/shopify-b2b-ordering-mistakes/
- https://multivariants.com/blog/shopify-bulk-ordering-limitations/
- https://multivariants.com/blog/shopify-catalog-price-multi-currency/
- https://multivariants.com/blog/shopify-order-limit-app-faq/
- https://multivariants.com/blog/shopify-order-limits-for-skincare-products/
- https://multivariants.com/blog/shopify-product-options/
- https://multivariants.com/blog/shopify-spring-2026-update/
- https://multivariants.com/blog/simple-ways-to-get-reviews-on-your-shopify-store/
- https://multivariants.com/blog/simplify-your-shopify-b2b-inventory-and-order-tracking-know-how/
- https://multivariants.com/blog/step-by-step-guide-to-sell-on-shopify/
- https://multivariants.com/blog/strategic-cac-reduction-for-b2b-business/
- https://multivariants.com/blog/strategies-for-measuring-b2b-segmentation-roi-and-effectiveness/
- https://multivariants.com/blog/successful-ways-to-boost-ecommerce-sales-with-linkedin/
- https://multivariants.com/blog/surprising-shopify-statistics/
- https://multivariants.com/blog/the-essential-jobs-wholesalers-do/
- https://multivariants.com/blog/the-essential-role-of-ecommerce-websites-in-modern-marketing/
- https://multivariants.com/blog/the-ultimate-guide-to-product-categorization/
- https://multivariants.com/blog/third-party-apps-for-b2b-customer-segmentation/
- https://multivariants.com/blog/types-of-ecommerce-discount-promotions/
- https://multivariants.com/blog/uncovering-the-power-of-purchase-frequency-in-shopify/
- https://multivariants.com/blog/understanding-the-importance-of-b2b-buyer-personas-on-shopify/
- https://multivariants.com/blog/variant-selection-for-apparel-stores/
- https://multivariants.com/blog/vendor-relationship-strategies-for-b2b-inventory-success/
- https://multivariants.com/blog/ways-to-increase-customer-lifetime-value-at-shopify/
- https://multivariants.com/blog/ways-to-make-a-successful-ecommerce-marketing-strategy/
- https://multivariants.com/blog/what-are-the-common-shopify-mistakes/
- https://multivariants.com/blog/what-are-the-conversion-rate-killers-at-ecommerce/
- https://multivariants.com/blog/what-are-the-importances-of-shopify-multicurrency/
- https://multivariants.com/blog/what-is-shopify-product-variants/
- https://multivariants.com/blog/what-is-wholesaling-business/
- https://multivariants.com/blog/where-to-buy-items-in-bulk-for-resale-in-ecommerce/
- https://multivariants.com/blog/wholesale-buyers/
- https://multivariants.com/blog/wholesale-custom-order-form-everything-you-need-to-know/
- https://multivariants.com/blog/wholesale-price-formula/
- https://multivariants.com/blog/wholesaler-types-and-how-do-wholesalers-make-money/
- https://multivariants.com/blog/wholesaler-vs-distributor/
- https://multivariants.com/blog/why-online-reviews-for-shopify-businesses-are-important/
- https://multivariants.com/blog/why-volume-discounts-are-a-win-win-for-b2b-businesses/
