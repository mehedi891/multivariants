# Old → New URL Redirect Map

Tracking old-site (WordPress) URLs that are **not present** on the new site, with the
redirect target for each.

- **Old site:** `https://multivariants.com` (current WordPress)
- **New site (verify here):** `https://multivariants-website.vercel.app`
- Redirects to be implemented as **301 (permanent)** in `next.config.ts`.

**Status legend:** ✅ verified · ⏳ pending verify · ❓ needs decision

---

## Global — trailing slash & config

- The new site keeps **`trailingSlash: false`** (clean URLs, no trailing slash) — SEO-consistent.
- Next.js **automatically 308-redirects** any `/path/` → `/path`. Since **every** old WordPress URL
  ends in `/`, the slash is stripped first, then the URL matches the 301 rules below (whose
  `source` values are written **without** a trailing slash).
- Net effect, e.g.:
  `/blog/category/wholesale-b2b/` → *(auto 308, strip slash)* `/blog/category/wholesale-b2b`
  → *(301 rule)* `/blog?category=wholesale-b2b`
  A 2-hop chain — Google follows it fine.
- **You do not need to write trailing-slash variants** in the redirect table; the sources match
  after normalization.
- *Optional:* to collapse it to a single 301 hop, handle the trailing-slash form in `middleware.ts`
  instead of `redirects()`. Not required — the 2-hop is standard and SEO-safe.

---

## Batch 1 — Blog categories

All old category URLs → `/blog`. (Paginated variants `/blog/category/<slug>/page/<n>/` also → `/blog`.)

| # | Old URL | Redirect To | Status |
|---|---------|-------------|--------|
| 1 | /blog/category/artificial-intelligence/ | /blog | ✅ |
| 2 | /blog/category/dropshipping/ | /blog | ✅ |
| 3 | /blog/category/guest-perspectives/ | /blog | ✅ |
| 4 | /blog/category/multivariants-features/ | /blog | ✅ |
| 5 | /blog/category/shopify-bulk-order/ | /blog | ✅ |
| 6 | /blog/category/shopify-bundling/ | /blog | ✅ |
| 7 | /blog/category/shopify-quick-delivery/ | /blog | ✅ |
| 8 | /blog/category/shopify/ | /blog | ✅ |
| 9 | /blog/category/top-shopify-apps-for-merchants/ | /blog | ✅ |
| 10 | /blog/category/updates/ | /blog | ✅ |
| 11 | /blog/category/use-case/ | /blog | ✅ |
| 12 | /blog/category/wholesale-b2b/ | /blog | ✅ |

> Rules: `{ source: "/blog/category/:slug", destination: "/blog", permanent: true }`
> and `{ source: "/blog/category/:slug/page/:page(\\d+)", destination: "/blog", permanent: true }`
> — the `:slug` wildcard covers **all 12** categories (and any future one).

---

<!-- Add the next batch of old URLs below and I'll fill in the redirect targets. -->

## Batch 2 — Blog pagination

Old `/blog/page/<n>/` → new `/blog?page=<n>` (page number preserved). If `<n>` exceeds the
new site's page count, the blog page clamps to the last available page (never a hard 404).

| # | Old URL | Redirect To | Status |
|---|---------|-------------|--------|
| 1 | /blog/page/2/ | /blog?page=2 | ✅ |
| 2 | /blog/page/3/ | /blog?page=3 | ✅ |
| 3 | /blog/page/4/ | /blog?page=4 | ✅ |
| 4 | /blog/page/5/ | /blog?page=5 | ✅ |
| 5 | /blog/page/6/ | /blog?page=6 | ✅ |
| 6 | /blog/page/7/ | /blog?page=7 | ✅ |
| 7 | /blog/page/8/ | /blog?page=8 | ✅ |
| 8 | /blog/page/9/ | /blog?page=9 | ✅ |
| 9 | /blog/page/10/ | /blog?page=10 | ✅ |
| 10 | /blog/page/11/ | /blog?page=11 | ✅ |
| 11 | /blog/page/12/ | /blog?page=12 | ✅ |
| 12 | /blog/page/13/ | /blog?page=13 | ✅ |
| 13 | /blog/page/14/ | /blog?page=14 | ✅ |
| 14 | /blog/page/15/ | /blog?page=15 | ✅ |
| 15 | /blog/page/16/ | /blog?page=16 | ✅ |
| 16 | /blog/page/17/ | /blog?page=17 | ✅ |
| 17 | /blog/page/18/ | /blog?page=18 | ✅ |
| 18 | /blog/page/19/ | /blog?page=19 | ✅ |
| 19 | /blog/page/20/ | /blog?page=20 | ✅ |
| 20 | /blog/page/21/ | /blog?page=21 | ✅ |
| 21 | /blog/page/22/ | /blog?page=22 | ✅ |
| 22 | /blog/page/23/ | /blog?page=23 | ✅ |
| 23 | /blog/page/24/ | /blog?page=24 | ✅ |
| 24 | /blog/page/25/ | /blog?page=25 | ✅ |
| 25 | /blog/page/26/ | /blog?page=26 | ✅ |

> Single rule: `{ source: "/blog/page/:n", destination: "/blog?page=:n", permanent: true }` — covers all of the above (and any future page number).

---

<!-- Add the next batch of old URLs below and I'll fill in the redirect targets. -->

## Batch 3 — Academy categories

Old `/academy-categories/<slug>/` → new `/academy` (the new academy page has no per-category
URL; it filters client-side). One wildcard rule covers all.

| # | Old URL | Redirect To | Status |
|---|---------|-------------|--------|
| 1 | /academy-categories/basic-configuration/ | /academy | ✅ |
| 2 | /academy-categories/general-settings/ | /academy | ✅ |
| 3 | /academy-categories/installation/ | /academy | ✅ |
| 4 | /academy-categories/product-options/ | /academy | ✅ |
| 5 | /academy-categories/restriction-features/ | /academy | ✅ |
| 6 | /academy-categories/theme-adjustments-for-cart-page/ | /academy | ✅ |
| 7 | /academy-categories/trnaslation/ | /academy | ✅ |

> Single rule: `{ source: "/academy-categories/:slug", destination: "/academy", permanent: true }` — covers all of the above.

---

<!-- Add the next batch of old URLs below and I'll fill in the redirect targets. -->

## Batch 4 — Blog date archives (WordPress monthly archives)

Old `/blog/<YYYY>/<MM>/` monthly archive URLs → new `/blog`. The new site has no date archives.
59 URLs total, 2020/10 → 2026/07.

| # | Old URL (pattern) | Redirect To | Status |
|---|---------|-------------|--------|
| all 59 | /blog/:year(\d{4})/:month(\d{2})/ | /blog | ✅ |

**Full list (for the record):**
2020/10, 2020/11, 2021/02, 2021/04, 2021/06, 2021/07,
2022/03, 2022/04, 2022/05, 2022/06, 2022/07, 2022/08, 2022/09, 2022/10, 2022/11, 2022/12,
2023/01–2023/12, 2024/01–2024/12, 2025/01–2025/12, 2026/01–2026/07.

> Single rule: `{ source: "/blog/:year(\\d{4})/:month(\\d{2})", destination: "/blog", permanent: true }`
> The `\d{4}/\d{2}` constraint makes it match **only** date archives — never real post slugs
> (`/blog/my-post`) or the `/blog/page/:n` rule.

---

<!-- Add the next batch of old URLs below and I'll fill in the redirect targets. -->

## Batch 5 — (paste old URLs here)

| # | Old URL | Redirect To | Status |
|---|---------|-------------|--------|
| | | | |
