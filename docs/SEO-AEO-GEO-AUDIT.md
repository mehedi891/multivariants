# MultiVariants — SEO / AEO / GEO / AI-Citation Audit

**Project:** MultiVariants marketing + docs site · Next.js 16.2.1 (App Router, Turbopack), React 19, Tailwind v3
**Canonical domain:** `https://multivariants.com` · **Publisher entity:** eFoli · **CMS:** efoli CMS (multi-tenant, `SITE_SLUG=multivariants`)
**Audit date:** 2026-07-09 · **Method:** static code audit (6 parallel specialist passes), verified against actual source. **No files were changed.**
**Scope note:** `npm run build` was intentionally not run — its `postbuild` hook fires a live IndexNow submission. Items needing a live Lighthouse/production render are marked **Requires-prod-verify**.

---

## 1. Executive Summary

**Overall assessment:** The technical SEO *foundation is strong* — server-rendered content in the initial HTML, correct canonical/`metadataBase`, an auto-generated sitemap and robots with an explicit AI-bot allowlist, `generateMetadata` on all dynamic detail routes, valid JSON-LD (`SoftwareApplication`, `BlogPosting`, `Article`, `FAQPage`), a well-written `llms.txt`, and a clean landmark/skip-link accessibility baseline. This is well above the average Shopify-app marketing site.

The weaknesses cluster in five areas: **(a) broken shared assets** (the OG image and PNG icons referenced everywhere simply don't exist), **(b) social-metadata inheritance bugs** (9 pages unintentionally share the homepage's social card; the blog index has none), **(c) trust & citability gaps** (no About page, dead Terms link, a 2020 privacy date, and self-declared stats/rating with no source), **(d) indexing hygiene** (no staging `noindex`, CMS-outage 404s, orphaned academy docs, unindexable paginated content), and **(e) zero analytics** (no field data to measure any of it).

**Main strengths**
- SSR/Server Components everywhere — primary content is in the initial HTML for crawlers and AI retrievers (verified: no `"use client"` on any `page.tsx`).
- Correct `metadataBase` + relative canonicals; dynamic detail pages emit per-item canonical, OG `article`, Twitter, and JSON-LD.
- `robots.ts` explicitly allowlists GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot/Google-Extended etc.; auto-generated hourly sitemap enumerates CMS slugs.
- Honest, high-quality `llms.txt` with a "What MultiVariants is NOT" section; consistent NAP/entity data across Contact + JSON-LD; functional skip link + landmarks on all 14 routes.

**Most serious weaknesses**
1. Every referenced social/icon asset (`/og-image.png`, `/icon.png`, `/apple-icon.png`) is **missing** → broken share cards site-wide, broken PNG favicon/apple-touch icon, and an invalid `Organization.logo` in blog/client structured data.
2. 9 static pages inherit the homepage's `og:title`/`og:description`; the blog index strips its OG image entirely → duplicated / imageless social previews.
3. Above-the-fold hero content renders at `opacity:0` and only appears after client JS — an LCP drag and a no-JS blank-screen risk.
4. Trust/citation gaps: missing About & Terms pages (dead `#` footer link), stale 2020 privacy date, unsourced "13K merchants / 4.9★ / 350 reviews" claims, and a self-serving site-wide `AggregateRating`.
5. Indexing hygiene: no non-production `noindex` (staging is crawlable), blog/academy detail pages 404 during a CMS outage, and uncategorized academy docs are orphaned from both the listing and the sitemap.

**Expected impact:** Fixing (1)–(2) restores correct link-unfurl previews and per-page social identity across every channel that shares the site (immediate CTR/brand impact, ~1 hour of work). (3) improves Core Web Vitals/LCP and no-JS resilience. (4) is the biggest lever for **AI-citation** and E-E-A-T — assistants currently have little verifiable, attributable first-party material to cite. (5) protects the index from staging duplication and outage-driven de-indexing.

**Top 5 priorities**
| # | Finding | Sev | Effort | Why first |
|---|---------|-----|--------|-----------|
| 1 | **C1** — Ship the missing `og-image.png` + `icon.png` + `apple-icon.png` | Critical | XS | One asset drop fixes broken social cards, icons, *and* invalid schema logo across the whole site |
| 2 | **M1 + M2** — Per-page OpenGraph (9 pages share homepage card; blog index has none) | High | S | Cheap, high-visibility; restores per-page social identity |
| 3 | **C2** — Gate `noindex` for non-production (staging currently crawlable) | High | S | Prevents `*.vercel.app` duplicate-content indexing |
| 4 | **P1** — Don't hide above-the-fold hero behind `AnimateIn` (`opacity:0`→JS) | High | S | Direct LCP win + no-JS content visibility |
| 5 | **D1 + G3 + P5** — Source the stats/rating; add analytics | High | M | Trust/AI-citation + first field-data visibility |

**Findings by severity:** Critical **1** · High **11** · Medium **23** · Low **10** · Opportunity **5** — **50 total**.

---

## 2. Current Implementation Overview

| Concern | How it works today | File(s) |
|---|---|---|
| **Routing** | App Router. 14 page routes + 2 API routes (`/api/contact`, `/api/revalidate`) + generated `robots.txt`/`sitemap.xml`/`llms.txt`. Dynamic segments: `/blog/[slug]`, `/academy/[slug]`, `/clients-showcase/[slug]`. | `app/**` |
| **Rendering** | All `page.tsx` are Server Components; CMS data `await`-ed server-side into initial HTML. `AnimateIn` is the only content-wrapping client component (reveals via IntersectionObserver). Blog uses `headers()` → fully dynamic (no ISR). Other CMS pages ISR at `revalidate:60`. | `app/**`, `components/AnimateIn.tsx` |
| **Metadata** | Root defaults + title template `%s \| MultiVariants` in `layout.tsx`. Static pages set `title`/`description`/`canonical`. Detail pages use `generateMetadata` (per-item title/desc/canonical/OG/JSON-LD). | `app/layout.tsx`, per-page |
| **Sitemap** | Auto-generated, `revalidate=3600`; static routes + CMS academy/blog/client slugs. `lastModified` stamped `new Date()` each regen. | `app/sitemap.ts` |
| **robots.txt** | `allow: /` for `*` + explicit AI/search-bot allowlist; `sitemap` + `host`. No env gating, no `/api` disallow. | `app/robots.ts` |
| **Canonicals** | `metadataBase = https://multivariants.com`; mix of absolute + relative canonicals (both resolve). Paginated/filtered lists canonicalize to base path. | `app/layout.tsx`, per-page |
| **Structured data** | `SoftwareApplication`+`AggregateRating` (global, in `<head>`), `FAQPage` (`/faq`), `BlogPosting` (`/blog/[slug]`), `Article` (`/clients-showcase/[slug]`). No `Organization`/`WebSite`/`BreadcrumbList`; academy/pricing/features carry none. | `app/layout.tsx` + detail pages |
| **Content** | Home (composed sections), Features, Pricing (+comparison table), FAQ (CMS), Academy docs (CMS), Blog (CMS), Clients, Partners, Changelog, Privacy. No About / Terms / comparison-vs-competitor / use-case pages. | `app/**`, `components/**` |
| **Analytics** | **None.** No GA4/GTM/Vercel Analytics/RUM. Outbound Shopify links carry UTM params; no inbound capture or event tracking. IndexNow submission is production-gated and safe. | `package.json`, `scripts/submit-indexnow.mjs` |
| **Redirects** | 308-permanent WordPress→new rules (blog categories/date-archives/pagination → `/blog`, academy-categories → `/academy`), ordered specific-first. | `next.config.ts` |

---

## 3. Findings Table

IDs are grouped by area: **C**rawl/Index · **M**etadata · **S**tructure/Linking · structured **D**ata · **G**EO/AEO/content · **P**erf/A11y/Analytics. Severity ∈ Critical / High / Medium / Low / Opportunity. Status ∈ Confirmed / Likely / Improvement / Requires-prod-verify.

| ID | Area | Sev | Status | Page/Route | File:Line | Finding | Evidence | Impact | Recommendation |
|----|------|-----|--------|-----------|-----------|---------|----------|--------|----------------|
| **C1** | Crawl/Meta/Schema | **Critical** | Confirmed | Site-wide | `app/layout.tsx:43,55,75,78`; `blog/[slug]/page.tsx:349`; `clients-showcase/[slug]/page.tsx:176` | `/og-image.png`, `/icon.png`, `/apple-icon.png` referenced but files don't exist (only `app/favicon.ico` present) | `find public app -iname og-image.png …` → MISSING; `images:[{url:"/og-image.png"…}]`, `icon:[{url:"/icon.png"…}]` | Broken social/link-unfurl cards on every share; broken PNG favicon + apple-touch icon; invalid `Organization.logo` (404) in blog/client JSON-LD | Add real `public/og-image.png` (1200×630), `public/icon.png` (≥112² for schema logo; also add 32²), `public/apple-icon.png` (180²). Prefer file-conventions `app/opengraph-image.png`/`app/icon.png`. Verify each returns 200. |
| **C2** | Crawl | **High** | Confirmed (impact needs prod-verify) | All routes on preview/staging | `app/robots.ts:26-35` | No `VERCEL_ENV` gate; robots identical on prod and `*.vercel.app` | `rules:[{userAgent:"*",allow:"/"}…] host:SITE_URL`; `grep VERCEL_ENV app/` → none | Staging/preview deploys fully crawlable → duplicate content / accidental staging indexation (only partly mitigated by prod canonicals) | On `VERCEL_ENV !== "production"` return `disallow:/` (and/or `X-Robots-Tag: noindex` via middleware for preview hosts). |
| **C3** | Crawl | **High** | Confirmed | `/blog/[slug]`, `/academy/[slug]` | `app/blog/public-api.ts:22`; `app/academy/public-api.ts:23`; pages `blog/[slug]:311`, `academy/[slug]:47` | Blog & academy fallbacks default **OFF** (`=== "true"`) → CMS failure returns `null` → `notFound()`; clients/changelog/partners/faq default **ON** (`!== "false"`) | inconsistent flag defaults across `public-api.ts` files | A transient CMS outage turns every live blog/academy URL into a hard 404 → Google may drop them | Make resilience consistent: default fallback ON, or serve stale / a retryable 5xx instead of `notFound()` so live posts never 404. |
| **C4** | Crawl/Perf | Medium | Confirmed | `/blog`, `/blog/[slug]` | `app/blog/page.tsx:104`; `blog/[slug]:237,304` | Both call `headers()`, forcing full dynamic rendering (no ISR/static cache) | `const incomingHeaders = await headers();` in list + `generateMetadata` + body | Cold SSR + extra CMS round-trips on every request/crawl for the highest-volume content; higher TTFB, more crawl budget | Read `headers()` only when auth-forwarding is enabled; otherwise omit so blog can ISR-cache. Consider `generateStaticParams`. |
| **C5** | Crawl | Medium | Confirmed | `/academy`, `/academy/[slug]`, sitemap | `app/academy/public-api.ts:189-211,315-318` | `normalizeListPayload` maps only `categories[]`; CMS `uncategorized[]` docs are dropped from listing + sitemap (yet IndexNow submits them) | `getPublicAcademySlugs`= `categories.flatMap(...)`; `submit-indexnow.mjs:73` reads `docs.uncategorized` | Uncategorized docs are orphans — not linked, not in sitemap → hard to discover/index | Include `uncategorized` docs in list normalization + slug enumeration to match the IndexNow set. |
| **C6** | Crawl | Medium | Confirmed | All sitemap URLs | `app/sitemap.ts:34,41,47,53` | `lastModified: new Date()` on every entry, regenerated hourly | repeated `lastModified: new Date()` | Signals "everything changed hourly" → dilutes `lastmod` trust, wastes crawl budget | Use real `updatedAt`/`publishedAt` for CMS items; a build constant for static routes. |
| **C7** | Crawl | Medium | Confirmed | `/changelog?page=N`, `/partners?page=N` | `app/changelog/page.tsx:14`; `app/partners/page.tsx:33` | Static canonical (`/changelog`,`/partners`); entries have no own URL and aren't in the sitemap | `alternates:{canonical:"/changelog"}` while `?page=2..N` render different entries | Content on page ≥2 self-canonicalizes to page 1 with no other indexable URL → effectively unindexable | Self-referential paginated canonicals (`?page=2`), or give entries their own URLs + sitemap inclusion, or single-page render. |
| **C8** | Crawl | Low | Confirmed | `robots.txt` | `app/robots.ts:28-34` | No `Disallow: /api/`; redundant duplicate allow rule; non-standard `host` (Yandex-only) | two `allow:"/"` rules; `host:SITE_URL` | Minor (API routes are POST-only → 405 on GET); rule noise | Add `disallow:["/api/"]`; collapse allow rules. `host` harmless. |
| **C9** | Crawl | Low | Improvement | 404 / errors | no `app/not-found.tsx`/`error.tsx`/`global-error.tsx` | `notFound()` yields Next's generic 404; unhandled errors → bare 500 | `grep` → none exist | Missed branding/internal-linking on 404; ungraceful 500s | Add branded `app/not-found.tsx` (links to `/`, `/blog`) + `error.tsx` boundary. |
| **C10** | Crawl | Low | Requires-prod-verify | Sitemap | `app/sitemap.ts:29-30` | Slug fetches capped `limit=1000`, single page; collapses to static-only if CMS down at regen time | `getPublicBlogSlugs(1000)`, `getPublicClientSlugs(1000)` | Overflow URLs silently dropped >1000; transient full loss of dynamic URLs on outage | Loop pagination to exhaustion; serve last-known-good on fetch failure. |
| **M1** | Metadata | **High** | Confirmed | `/features`,`/pricing`,`/contact`,`/faq`,`/privacy-policy`,`/partners`,`/changelog`,`/academy`,`/clients-showcase` | each `page.tsx` (no `openGraph`) | Pages set unique `title` but no `openGraph` → Next inherits root OG wholesale → all 9 share the **homepage** og:title/description | Next docs: page without `openGraph` inherits root's entirely; `openGraph.title` never derived from `title` | 9 routes unfurl with the homepage pitch (e.g. Pricing shares as the home hero) → duplicated, misleading social previews | Add minimal per-page `openGraph:{title,description,url}` (image inherits once C1 fixed). Consider a metadata helper mapping `title`→`og:title`. |
| **M2** | Metadata | **High** | Confirmed | `/blog` | `app/blog/page.tsx:20-27` | Blog list sets its own `openGraph` **without `images`**; OG is all-or-nothing → drops the root OG image | `openGraph` block has no `images` key | Blog index social shares have no image card at all | Add `openGraph.images` + `twitter.images` to the blog list metadata. |
| **M3** | Metadata | Medium | Confirmed | `/academy/[slug]` | `app/academy/[slug]/page.tsx:32` | Title `${…} \| Academy` is a child segment, so template appends `\| MultiVariants` → double suffix `X \| Academy \| MultiVariants` | `title: \`${doc.seoTitle ?? doc.title} \| Academy\`` | Long, brand-repeating titles; >60-char truncation risk | Drop manual `\| Academy` (let template add brand), or use `title:{absolute:"…— MultiVariants Academy"}`. |
| **M4** | Metadata | Medium | Confirmed | `/academy/[slug]` | `app/academy/[slug]/page.tsx:22-29` | Not-found academy doc fallback lacks `robots:{index:false}` (blog & client fallbacks have it) | blog `[slug]:249-252` sets `index:false`; academy omits | Missing/unpublished docs indexable as thin "Academy Doc" pages | Add `robots:{index:false,follow:true}` to the academy not-found branch. |
| **M5** | Metadata | Medium | Confirmed | `/academy/[slug]` | `app/academy/[slug]/page.tsx:31-38` | `generateMetadata` emits no `openGraph`/`twitter` → docs inherit generic root OG | metadata has only `title/description/alternates` | Doc shares look identical/generic; no per-doc social identity | Add per-doc OG/Twitter (`type:"article"`, title, desc, canonical) like blog/client. |
| **M6** | Metadata | Medium | Confirmed | Root + Home | `app/layout.tsx:13-14,17`; `app/page.tsx:16-18` | Root default title 75 chars (>60); root desc 240, home desc 248 (both ≫160) | measured lengths | SERP truncation; tail keywords/stats lost | Trim title ≤60 (e.g. "MultiVariants – Bulk Add-to-Cart App for Shopify"); descriptions ≤160. |
| **M7** | Metadata | Low | Confirmed | `/faq`, `/contact`, Home | `faq/page.tsx:10-11`; `contact/page.tsx:8-9`; `page.tsx:16` | FAQ desc 169 (>160); Contact desc thin (76, low-intent); Home title 63 (marginal) | measured | Minor truncation / weak CTR / under-used snippet | Trim FAQ desc; expand Contact desc; optional Home title trim. |
| **M8** | Metadata | Opportunity | Improvement | Site-wide | `app/layout.tsx` (no `verification`) | No `metadata.verification` (Google/Bing) and no verification file in `public/` | no `verification` key; no `msvalidate`/`google-site-verification` | GSC/Bing ownership not asserted in-repo (may be DNS-verified — unverifiable here) | Add `verification:{google,other:{'msvalidate.01'}}` if not verified out-of-band. |
| **S1** | Structure | **High** | Confirmed | Footer (all pages) | `components/Footer.tsx:24` | "Terms of Service" links to dead `href:"#"`; no `/terms` route; Privacy references a nonexistent "Terms and Conditions" | `{ label:"Terms of Service", href:"#" }` | Dead legal link site-wide; missing legal page erodes trust signals | Publish `/terms-of-service` and wire the link (or remove item until it exists). |
| **S2** | Structure/Schema | Medium | Confirmed | `/blog/[slug]`,`/academy/[slug]`,`/clients-showcase/[slug]` | `blog/[slug]:403`; `academy/[slug]:88`; `clients-showcase/[slug]:204` | Visible breadcrumbs render but no `BreadcrumbList` JSON-LD | plain-text `<Link>/<span>` trails | No breadcrumb SERP enhancement despite eligible visible UI | Emit `BreadcrumbList` mirroring the visible trail (data already present). |
| **S3** | Linking/IA | Medium | Confirmed | Site-wide | `app/page.tsx`, `features/page.tsx`, `blog/[slug]/page.tsx` | Thin contextual internal links; in-body CTAs point mostly off-site (Shopify/demo); blog posts don't link to product/docs | Home body links only `/blog`+`/pricing`; blog links only within `/blog`+Shopify | Shallow link graph limits equity flow & topical clustering | Add contextual links: home→features/academy/clients; features→pricing; posts→relevant product/academy pages. |
| **S4** | A11y/Structure | Medium | Confirmed | Navbar (all pages) | `components/Navbar.tsx:86-101` | Resources dropdown `<button>` has no `aria-haspopup/expanded/controls`; opens on hover/`focus-within`, inert on click | `<button>Resources</button>` with no ARIA state | SR/keyboard users get no menu state; button does nothing on activation | Add `aria-haspopup="menu"`, `aria-expanded`, open-on-click/keyboard handling. |
| **S5** | A11y/Linking | Low | Confirmed | Testimonials / clients / partners / navbar | `Testimonials.tsx:90`; `clients-showcase/page.tsx:152`; `partners/page.tsx:177,182`; `Navbar.tsx:20` | `alt=""` on merchant logo; generic "Read More"/"View More" links; partner CTA `href={link\|\|"#"}`; nav label "Docs" vs page "Academy" | quoted per file | Minor: ambiguous SR link text (WCAG 2.4.4); data-dependent dead link; anchor-text inconsistency | Add contextual `aria-label`s; hide CTA when no link; align nav label; set logo alt or keep decorative intentionally. |
| **D1** | Schema/GEO | **High** | Confirmed (risk) | All pages | `app/layout.tsx:97-103` | Self-serving hardcoded `AggregateRating` (4.9 / reviewCount 350) injected site-wide, no `sameAs` to the App Store to corroborate | `aggregateRating:{ratingValue:"4.9",reviewCount:"350"…}` | Google discounts/penalizes self-serving review markup about your own entity; figures rot silently | Corroborate via `sameAs` to the Shopify listing, source from live data, or scope out of self-referential markup. Keep values consistent with visible UI (they currently are). |
| **D2** | Schema/GEO | Medium | Confirmed (gap) | Site-wide | absent | No standalone `Organization` node (only nested `author`); social links exist only as footer `<a>` | `Footer.tsx:59,66,73` socials, unmarked | Misses Knowledge-Graph/entity linkage; brand socials not machine-associated | Add `Organization` with `sameAs` (3 footer socials), `logo` (real ≥112² asset), `contactPoint` (support@multivariants.com). |
| **D3** | Schema | Medium | Confirmed (gap) | Site-wide | absent | No `WebSite` node | grep → none | No site-entity signal / sitelinks eligibility | Add `WebSite` (name,url,publisher). **Do NOT** add `SearchAction` — search is client-side only, no query-param URL (would be misleading). |
| **D4** | Schema | Medium | Confirmed | `/blog/[slug]`,`/clients-showcase/[slug]` | `blog/[slug]:347-350`; `clients-showcase/[slug]:174-177` | `publisher.logo` → `/icon.png`, which is **missing** (C1) *and* declared 32×32 (below Google's ~112px min) | `logo:{ImageObject,url:"/icon.png"}` | Logo dropped from rich results / invalid (404) | Point at a real ≥112² logo asset (fixed with C1). |
| **D5** | Schema | Medium | Confirmed (gap) | `/pricing` | `components/PricingPlans.tsx:27-82` vs `layout.tsx:91-96` | Real 3-tier pricing ($0/$12.99/$29.99) unmarked; global `Offer` only shows `price:"0"` | plan amounts vs single `price:"0"` | Missed price rich-data; global schema understates the offering | Add `AggregateOffer` (low 0 / high 29.99 USD) or per-plan `Offer` on `/pricing`. |
| **D6** | Schema | Low | Confirmed (gap) | `/academy/[slug]` | whole file | Step-by-step docs emit zero JSON-LD | `grep ld+json` → 0 | Missed `Article`/`HowTo`/`TechArticle` eligibility on the most "answerable" content | Add `TechArticle`/`HowTo` from `doc.title/excerpt/lastUpdated` + `BreadcrumbList`. |
| **D7** | Schema | Low | Confirmed (gap) | `/pricing` | `app/pricing/page.tsx:21-42` | 5 on-page FAQs unmarked while `/faq` uses `FAQPage` | `const faqs=[…]` rendered, no schema | Inconsistent FAQ coverage; missed AEO signal | Add `FAQPage` (note display-policy caveat below). |
| **D8** | Schema | Low | Confirmed | Site-wide | `layout.tsx:85,105` vs `blog/[slug]:345` | Brand-name inconsistency: `author.name:"eFoli"` vs BlogPosting `publisher.name:"MultiVariants"` | quoted | Fragmented entity signals (two org names) | Standardize the publishing `Organization`; cross-link via shared `@id`. |
| **G1** | Content/GEO | **High** | Confirmed (missing) | — | no `app/about` | No About / About-eFoli page | `ls app` → none | No E-E-A-T anchor for the publisher entity; weak company disambiguation in AI answers | Add an About page (eFoli story, products, team, contact). |
| **G2** | Content/AEO | **High** | Confirmed (missing) | — | no compare route | No comparison-vs-alternatives page ("MultiVariants vs X", "best Shopify bulk order app") | grep: no `compare/vs/alternative` route | Forfeits high-intent AI-answer & featured-snippet queries | Build a comparison page + comparison table. |
| **G3** | GEO/Trust | **High** | Confirmed (weak) | Home/Stats/Testimonials/Pricing | `Hero.tsx:44,95`; `StatsBanner.tsx:22`; `Testimonials.tsx:52`; `pricing:371` | "13,000+ merchants / 120+ countries / 350+ reviews / 4.9★" stated with no on-page source or link | bare claim strings | Unsourced claims are low-confidence for AI citation; reads as puffery; `AggregateRating` uncorroborated | Link stats to the Shopify App Store listing; add that listing as `sameAs`. |
| **G4** | AEO | Medium | Confirmed | `/features` | `app/features/page.tsx:375-381` | Flagship feature bullets rendered as `<p>`, not `<ul><li>` | `item.bullets.map(b=><p>{b}</p>)` | Poorer list extraction for snippets/AI summaries | Render bullets as semantic `<ul><li>`. |
| **G5** | Trust | Medium | Confirmed (stale) | `/privacy-policy` | `app/privacy-policy/page.tsx:39` | Effective date "September 01, 2020" (6 yrs stale); references nonexistent Terms | `"Effective date: September 01, 2020"` | Signals abandoned legal docs to AI/user trust heuristics | Refresh effective date; reconcile with a published Terms (S1). |
| **G6** | E-E-A-T | Medium | Confirmed | `/blog/[slug]` | `app/blog/[slug]/page.tsx:62-65,544` | Auto-generated generic author bio; byline "MultiVariants Contributor" | `\`${name} shares practical strategies…\`` | Thin author authority weakens article citability | Store real author bios/roles in CMS; render them. |
| **G7** | Freshness | Low | Confirmed | `/academy/[slug]` | `app/academy/[slug]/page.tsx:66` | Missing-date fallback renders literal "Recently"; no machine-readable date | `doc.lastUpdated \|\| "Recently"` | Vague freshness signal | Require `lastUpdated`; render `<time>` + schema date. |
| **G8** | GEO | Low | Confirmed | `/llms.txt` | `app/llms.txt/route.ts:39` | `llms.txt` not linked/referenced anywhere; hardcoded "Last updated" date | grep: not referenced | Limited real-world adoption + rot risk reduce its value | Link from footer/`<head>`; derive date dynamically. Keep the (excellent) content. |
| **G9** | Content strategy | Opportunity | Improvement | Home/Features/Pricing | `layout.tsx:14`; `page.tsx:16`; `features:288` | No use-case/solution pages; Home/Features/Pricing target the same "bulk order" head term | near-identical H1/meta phrasing | Keyword cannibalization; no topic-cluster coverage | Add use-case pages (wholesale, mix-n-match, size runs, B2B min/max) each with definition + FAQ + HowTo. |
| **P1** | Perf/A11y | **High** | Confirmed | All routes / hero | `components/AnimateIn.tsx:51-56`; `components/Hero.tsx:41-105` | Above-fold LCP content starts `opacity:0`, revealed only by client IntersectionObserver after hydration; reduced-motion block doesn't reset opacity | `opacity: visible ? 1 : 0`; `useState(false)`; `globals.css:174` only zeroes `transition-duration` | Inflates LCP; blank hero if JS slow/blocked (incl. reduced-motion users) | Render above-the-fold (Hero `<h1>`, CTAs) without `AnimateIn`, or make it CSS-only with a no-JS/reduced-motion `opacity:1` fallback. |
| **P5** | Analytics | **High** | Confirmed | Site-wide | `package.json` deps | No GA4/GTM/Vercel Analytics/RUM; no event/conversion tracking | deps = only next/react/react-dom | Zero field CWV / traffic / conversion data to validate anything | Add production-gated lightweight analytics (Vercel Analytics + Speed Insights, or GA4 via `@next/third-parties`) + CTA events. |
| **P2** | Perf | Medium | Confirmed | Fonts | `app/layout.tsx:5-9,127`; `tailwind.config.js:26` | `next/font` Inter loaded as `--font-inter` but Tailwind `sans` uses literal `'Inter'`; nothing consumes the var | only reference to `--font-inter` is its definition | Inter woff2 fetched but unused → renders in system/local font | Set Tailwind `sans:['var(--font-inter)',…]` (or `inter.className` on `<body>`). |
| **P3** | Perf/Images | Medium | Requires-prod-verify | CMS images | `next.config.ts:15-26` | `remotePatterns` only cover localhost + `${CMS_API_BASE_URL}/uploads/**`; no hardcoded prod fallback (unlike other files) | env-only pattern; `contact/route.ts:20` hardcodes fallback but config doesn't | Optimized `<Image>` CMS images 404 in prod if `CMS_API_BASE_URL` unset | Add prod CMS host (`efoli-cms.vercel.app`) to `remotePatterns`; verify path prefix. |
| **P4** | Perf/Images | Medium | Confirmed | Testimonials/Blogs | `Testimonials.tsx:90`; `Blogs.tsx:59-63` | Remote CMS images use `unoptimized` → no transcode/srcset | `<Image … fill unoptimized>` | Larger transfers, weaker LCP for blog/testimonial imagery | Configure `remotePatterns` for those hosts and drop `unoptimized`. |
| **P6** | A11y | Medium | Requires-prod-verify | Dark theme | `Contact.tsx:57`; `NewsletterForm.tsx:26`; `Footer.tsx:165,174`; `Hero.tsx:58,101`; `Navbar.tsx:76` | Low-contrast text/placeholders `white/30`–`white/50` on dark bg | `placeholder-white/30`, `text-white/40-50` | Likely WCAG 2.1 AA contrast failures; readability | Raise to ≥`white/70` body/labels, ≥`white/55` placeholders; verify ≥4.5:1. |
| **P7** | A11y | Medium | Confirmed | Inputs | `NewsletterForm.tsx:26`; `AcademyExplorer.tsx:132`; `AcademySidebar.tsx:87`; `VariantTableDemoSection.tsx:110` | `outline-none` without a visible focus replacement (good `focus-visible:ring` pattern exists elsewhere but isn't applied) | quoted | Keyboard focus hard/impossible to see (WCAG 2.4.7) | Add `focus-visible:ring-2 focus-visible:ring-primary` (mirror `Contact.tsx`/blog). |
| **P8** | Perf | Opportunity | Requires-prod-verify | `/features`, decorative | `features/page.tsx:405-414`; `CTASection.tsx:24`; `globals.css:66-73` | First above-fold `/features` image not `priority`; `feTurbulence` noise + multiple `blur-[100-120px]` layers | quoted | Slightly slower `/features` LCP; GPU paint cost low-end | Mark first feature image `priority`; consider static noise PNG / fewer blur layers. |

**Confirmed-OK (no action):** SSR content in initial HTML on all routes · skip link + `<main id="main-content">` on all 14 routes · IndexNow production-gated, public key by design (no leak) · no secrets in client components · image CLS well controlled (dimensions/`sizes` present) · `llms.txt` valid (`force-static`, correct content-type) · redirects correct & specific-first · form labels/honeypot/`role="status"` correct.

---

## 4. Page-Level Audit

| Route | Search intent | Title (rendered) | H1 | Canonical | Indexable | Schema | Main content issue | Internal-link issue | AEO / AI-citation opportunity | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Brand + "Shopify bulk order app" | *MultiVariants – One-Click Bulk Add to Cart…* (63) | ✅ Bulk Variant Ordering… | ✅ | Yes | SoftwareApplication+Rating | Desc 248c; unsourced stats; hero hidden till JS (P1) | Body links only `/blog`,`/pricing` | Add sourced-stats block + link to features/academy | M6,G3,P1,S3 |
| `/features` | "what does it do / features" | Features \| MultiVariants (desc 111) | ✅ | ✅ (rel) | Yes | **none** | Bullets as `<p>` (G4); no definition lead; OG=homepage | CTAs all off-site | `ItemList` schema; `<ul>` bullets; link to pricing | M1,G4,D-gap |
| `/pricing` | "price / plans / cost" | Pricing \| MultiVariants (147) | ✅ | ✅ (rel) | Yes | **none** (global Offer=0) | Real tiers unmarked (D5); FAQs unmarked (D7); OG=homepage | Doesn't link `/faq`,`/features` | `Product`+`AggregateOffer`+`FAQPage` | M1,D5,D7 |
| `/contact` | "contact / support" | Contact \| MultiVariants (76 thin) | ✅ Write to Us | ✅ (abs) | Yes | — | Thin desc; OG=homepage | ok | `ContactPoint` already in global Org | M1,M7 |
| `/faq` | question intents | FAQ \| MultiVariants (169) | ✅ | ✅ (abs) | Yes | ✅ FAQPage | Desc >160; OG=homepage | Not linked from pricing FAQ | Expand FAQ breadth (strong AEO asset) | M1,M7 |
| `/privacy-policy` | legal | Privacy Policy \| MultiVariants (110) | ✅ | ✅ (abs) | Yes | — | Effective date 2020; cites nonexistent Terms | ok | Refresh; pair with Terms | G5,S1 |
| `/partners` | "partners" | Partners \| MultiVariants (85) | ✅ | ✅ (rel) | Yes | — | Pagination unindexable (C7); CTA `#` fallback; OG=homepage | — | per-partner URLs? | C7,M1,S5 |
| `/changelog` | "updates / changelog" | Changelog \| MultiVariants (72) | ✅ | ✅ (rel) | Yes | — | Pagination unindexable (C7); OG=homepage | — | per-entry anchors + dates | C7,M1 |
| `/blog` | "shopify bulk order tips" | Blog \| MultiVariants (120) | ✅ MultiVariants Blog | ✅ (rel) | Yes (explicit) | — | **No OG image** (M2); fully dynamic (C4) | good (cards) | list-page ISR | M2,C4 |
| `/blog/[slug]` | informational long-tail | dynamic ✅ | ✅ | ✅ per-item | Yes / 404 | ✅ BlogPosting | 404 on CMS outage (C3); generic author bio (G6); no BreadcrumbList (S2) | posts don't link product/docs (S3) | Real author E-E-A-T; BreadcrumbList | C3,G6,S2,S3 |
| `/academy` | "how to / docs" | Academy \| MultiVariants (110) | ✅ MultiVariants Academy | ✅ (rel) | Yes | — | Omits uncategorized docs (C5); OG=homepage | — | Hub for HowTo cluster | C5,M1 |
| `/academy/[slug]` | "how do I …" | dynamic — **double suffix** (M3) | ✅ | ✅ per-item | Yes / 404 | **none** (D6) | 404 on outage (C3); not-found indexable (M4); no OG (M5); "Recently" date (G7) | sidebar only | `HowTo`/`TechArticle`+Breadcrumb — highest AEO value | C3,D6,M3,M4,M5,G7 |
| `/clients-showcase` | "case studies / customers" | Clients Showcase \| MultiVariants (85) | ✅ | ✅ (rel) | Yes | — | OG=homepage | "Read More" generic (S5) | proof for GEO citation | M1,S5 |
| `/clients-showcase/[slug]` | case-study | dynamic ✅ | ✅ | ✅ per-item | Yes / 404 | ✅ Article | No BreadcrumbList (S2) | ok | First-party case-study = citable | S2 |

---

## 5. Metadata Recommendations

Replace / add the following (natural, page-accurate, within length limits):

- **Root default title** (`layout.tsx:14`, currently 75c) → `MultiVariants – Bulk Add-to-Cart App for Shopify` (48).
- **Root description** (240c) → trim to ≤160, keep the strongest claim + one keyword phrase.
- **Home description** (`page.tsx:17`, 248c) → `Let Shopify customers bulk-add multiple product variants to cart in one click. Boost B2B/B2C orders with Mix n Match, restrictions & quantity rules. Free plan.` (~156).
- **Contact description** (76c, thin) → `Contact the MultiVariants team for Shopify bulk-ordering support, live demos, setup help, and onboarding.` (~110).
- **FAQ description** (169c) → trim ~10 chars.
- **Per-page OpenGraph (M1)** — add to features/pricing/contact/faq/privacy/partners/changelog/academy/clients: `openGraph:{ title:<page title>, description:<page desc>, url:<canonical> }` (image inherits once C1 lands). Ideal: a small shared helper.
- **Blog list (M2)** — add `openGraph.images` + `twitter.images`.
- **Academy doc (M3/M5)** — `title:{absolute:"${title} — MultiVariants Academy"}` + per-doc `openGraph`/`twitter` (`type:"article"`).
- **Verification (M8)** — add `verification` tokens if not DNS-verified.

---

## 6. Structured-Data Plan

**Existing (all syntactically valid):** `SoftwareApplication`+`AggregateRating` (global), `FAQPage` (`/faq`), `BlogPosting` (`/blog/[slug]`), `Article` (`/clients-showcase/[slug]`). No duplicate/conflicting same-type blocks on any single route.

| Schema | Add on | Why | Required props | Data source (in repo) | Risk |
|---|---|---|---|---|---|
| **Organization** (standalone) | Home / root (once) | No org-identity node; socials unmarked | name, url, logo, sameAs[], contactPoint | Footer socials (`:59,66,73`), `logo.webp`, support email | Low — real & visible |
| **WebSite** | Root | Site entity | name, url, publisher | static | Low — **omit SearchAction** (no real search URL) |
| **BreadcrumbList** | blog/academy/clients detail | Visible breadcrumbs already render | itemListElement[] | `currentCategory`+title in each page | Low — mirrors UI |
| **HowTo / TechArticle** | `/academy/[slug]` | Step-by-step help content, zero schema now | headline, step[]/dateModified | `doc.title/excerpt/lastUpdated/points` | Low |
| **Product / AggregateOffer** | `/pricing` | Real tiers unmarked | offers→AggregateOffer(low 0/high 29.99 USD) | `PricingPlans.tsx:27-82` | Medium — keep prices synced |
| **FAQPage** | `/pricing` | 5 FAQs unmarked | mainEntity[] | pricing `faqs[]` | Low-med — display-policy caveat |

**Fix in existing:** `publisher.logo` → real ≥112² asset (D4/C1); reconcile eFoli vs MultiVariants org naming via shared `@id` (D8); corroborate/rescope `AggregateRating` (D1).
**Do NOT add:** first-party `Review` markup on testimonials (self-serving, unverifiable — policy risk); `SearchAction` (no query-param search).
**Policy note:** Google now limits `FAQPage`/HowTo *rich results* to authoritative/gov-health domains — these still carry real **AEO/AI** value (retrievable Q&A), just don't expect SERP accordions. If CMS answers contain HTML, ensure `Answer.text` is plain text.

---

## 7. Content & Topical-Authority Gaps

- **Missing pages (priority):** Terms of Service (S1) → About/About eFoli (G1) → Comparison-vs-alternatives (G2) → Use-case/solution pages (G9: wholesale, mix-n-match, apparel size runs, B2B min/max).
- **Weak pages:** Privacy (stale date, G5); blog author E-E-A-T (generic bios, G6); Features (no definition lead, `<p>` bullets).
- **Overlap / cannibalization:** Home + Features + Pricing all target "bulk order Shopify / variants bulk add to cart" with near-identical phrasing — differentiate with use-case pages that absorb long-tail intent.
- **Structured-data-poor money pages:** features, pricing, academy carry no JSON-LD.
- **Citation-worthy resource opportunities:** sourced first-party stats block (link to App Store); expanded FAQ; comparison table; real case studies (clients pages are already good raw material — surface dates/authors).
- **Strong assets to preserve/expand:** FAQPage, `llms.txt` (esp. "What MultiVariants is NOT"), consistent NAP/entity data, plan comparison table.

---

## 8. Prioritized Implementation Plan

### Phase 1 — Critical fixes (crawl, index, rendering, trust)
| Task | IDs | Impact | Complexity | Files | Validation |
|---|---|---|---|---|---|
| Ship `og-image.png`, `icon.png`, `apple-icon.png` (+point schema logo at real image) | C1,D4 | High | XS | `public/` (or `app/opengraph-image.*`,`app/icon.*`) | curl each → 200; social-card debugger |
| Gate `noindex`/robots for non-production | C2 | High | S | `app/robots.ts` (+ optional `middleware.ts`) | check preview `robots.txt` = disallow; prod = allow |
| Stop CMS-outage 404s on blog/academy details | C3 | High | S | `blog/public-api.ts`, `academy/public-api.ts`, detail pages | simulate CMS-down → 200/stale, not 404 |
| Per-page OpenGraph + blog-list OG image | M1,M2 | High | S | 9 `page.tsx` + `blog/page.tsx` (+helper) | inspect `<meta property="og:*">` per route |
| Don't hide above-fold hero behind `AnimateIn` | P1 | High | S | `Hero.tsx`, `AnimateIn.tsx`/`globals.css` | JS-off render shows hero; Lighthouse LCP |
| Fix dead Terms link (publish Terms or remove) | S1 | High | S–M | `Footer.tsx` (+ new `/terms-of-service`) | no `href="#"`; link 200 |

### Phase 2 — High-impact improvements (metadata, schema, structure, links)
`D1` source/rescope AggregateRating + link stats (`G3`) · add `Organization`+`WebSite` (`D2,D3`) · `BreadcrumbList` on 3 detail routes (`S2`) · pricing `Product/AggregateOffer`+`FAQPage` (`D5,D7`) · academy `HowTo`/`TechArticle`+`BreadcrumbList` (`D6`) · academy title double-suffix + not-found noindex + per-doc OG (`M3,M4,M5`) · title/desc length fixes (`M6,M7`) · fix uncategorized-academy orphans (`C5`) · blog `headers()`→ISR (`C4`) · sitemap real `lastmod` (`C6`) · paginated changelog/partners indexability (`C7`) · font wiring (`P2`) · CMS `remotePatterns` prod fallback + drop `unoptimized` (`P3,P4`) · internal-linking pass (`S3`).

### Phase 3 — AEO / GEO / AI-citation & authority
About page (`G1`) · comparison page + table (`G2`) · use-case/solution cluster (`G9`) · real author E-E-A-T in CMS (`G6`) · refresh privacy + reconcile Terms (`G5`) · `<ul>` feature bullets (`G4`) · link/date `llms.txt` (`G8`) · academy date requirement (`G7`) · sourced-stats social-proof block.

### Phase 4 — Validation & monitoring
Add analytics/RUM + Speed Insights + CTA events (`P5`) · GSC + Bing verification (`M8`) · contrast + focus-visible a11y sweep (`P6,P7`) · branded 404/error pages (`C9`) · Navbar dropdown ARIA (`S4`) · Rich Results + schema validator on all types · Lighthouse/CWV baseline · sitemap & broken-link monitoring · sitemap pagination cap (`C10`).

---

## 9. Quick Wins (low effort, meaningful gain)
1. **C1** — drop the 3 missing image assets (fixes broken social cards + icons + schema logo at once).
2. **M2** — add `images` to blog-list OpenGraph (one line).
3. **P2** — wire Tailwind `sans` to `var(--font-inter)` (one line; stops a wasted font fetch).
4. **M6/M7** — trim over-length titles/descriptions.
5. **C8** — `disallow: /api/` + collapse duplicate allow rule.
6. **G8** — link `llms.txt` from the footer.
7. **M4** — add `robots:{index:false}` to academy not-found branch.
8. **S5** — `aria-label`s on "Read More"/"View More"; hide partner CTA when link is empty.

---

## 10. Questions & Missing Information (cannot confirm from repo)
- **Production domain behavior** — is `multivariants.com` live and pointed at this app, or still on WordPress? (Redirects/canonicals assume the cutover.) Are `*.vercel.app` deploys already indexed?
- **Search Console / Bing** — is the site already verified (DNS/HTML)? Any existing coverage, impressions, or manual actions?
- **Analytics** — is measurement intentionally omitted, or handled by an external tag manager not in this repo?
- **Stats provenance** — are "13,000+ merchants / 120+ countries / 4.9★ / 350 reviews" current App-Store figures? Needed before we can source/mark them up safely (D1/G3).
- **CMS workflow** — can the CMS store real author bios/roles, per-doc `lastUpdated`, and per-item `seoTitle/seoDescription/ogImage`? (Several fixes depend on CMS fields.)
- **Legal** — is a Terms of Service drafted/approved to publish (S1)?
- **Target keywords / markets / competitors** — no keyword or competitor data in-repo; comparison/use-case page targeting (G2/G9) needs your priority list. No search-volume was invented.
- **`CMS_API_BASE_URL` in prod** — is it set on Vercel? Image optimization (P3) breaks silently if not.

---

*Audit only — no code was modified. Awaiting approval before implementing any phase.*
