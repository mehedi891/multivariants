---
name: nextjs-seo-website
description: >-
  Complete SEO / AEO / GEO playbook for a Next.js (App Router) marketing or
  documentation website — metadata + per-page OpenGraph, JSON-LD structured
  data, resilient sitemap, env-gated robots + AI-bot allowlist, llms.txt,
  generated OG image + favicons, staging noindex middleware, legacy (WordPress)
  redirects, CMS integration with ISR + on-demand revalidation, lazy
  production-gated analytics (GA4 + Meta Pixel) + Tawk.to chat, pagination
  metadata, and hero/LCP performance. This is the playbook used for the
  MultiVariants / efoli sites. Use when building, optimizing, or migrating a
  Next.js marketing/docs site, adding SEO/structured data, wiring analytics or
  live chat, or moving a site off WordPress to Next.js.
---

# Next.js Marketing/Docs Site — SEO / AEO / GEO Playbook

Reusable setup for a CMS-driven Next.js **App Router** marketing + documentation
site (TypeScript, Tailwind, deployed on Vercel). Copy-paste code lives in
`references/code-templates.md`; the parallel-agent audit approach is in
`references/audit-workflow.md`.

## Assumptions
- Next.js 16+ **App Router**, TypeScript, Tailwind, Vercel hosting.
- Content is CMS-driven via a public JSON API, with local fallback content.
- One canonical production domain; preview/staging on `*.vercel.app`.
- ⚠️ **This is NOT the Next.js from training data.** APIs and conventions change
  between versions — read `node_modules/next/dist/docs/` for the version in the
  target repo before writing metadata/route code.

## How to use
1. If optimizing an existing site, **run the audit first** (see
   `references/audit-workflow.md`) — fan out read-only agents across the areas
   below, produce a findings doc, get approval, then implement in phases.
2. Work the checklist below top-to-bottom. Each item maps to a template in
   `references/code-templates.md`.
3. **Verify every change live** with the curl + Playwright checks (see
   Verification). Never assume metadata/redirects work — inspect the rendered
   output.

---

## Setup checklist

### 1. Metadata foundation
- `app/layout.tsx`: set `metadataBase`, a title template (`%s | Brand`), root
  description (≤160 chars), default OpenGraph/Twitter, `robots: index,follow`,
  `<html lang>`. Keep the root title ≤60 chars.
- Create **`lib/seo.ts`** with a `pageMetadata({title, description, path, ogTitle})`
  helper. **Critical:** a page that sets its own `openGraph` object does NOT
  inherit the root OG image — the helper must set `openGraph.images` +
  `twitter.images` explicitly, or every page loses its share image.
- Every page uses `pageMetadata(...)` → unique `og:title`/description per page
  (otherwise all pages inherit the homepage social card).
- Canonicals **relative** (`/features`, not the absolute URL) so preview deploys
  self-correct via `metadataBase`.
- Titles descriptive + keyword-aware but < 60 chars incl. the ` | Brand` suffix.

### 2. Structured data (JSON-LD)
- Root `@graph` in `layout.tsx`: **Organization** (`@id`, `sameAs` socials,
  `logo`, `contactPoint`) + **WebSite** + **SoftwareApplication/Product** (with
  `AggregateOffer` for real price tiers). Reference the org by `@id` everywhere.
- Detail pages: `BlogPosting` (blog), `Article` (case studies),
  `TechArticle`/`HowTo` (docs), each with a **`BreadcrumbList`**.
- `/pricing`: `FAQPage` + offers. `/faq`: `FAQPage`.
- **Do NOT** fake first-party `Review` markup or a `SearchAction` with no real
  search URL. Point publisher `logo` at a real ≥112px asset (not a missing file).
- Any `AggregateRating` must be **accurate + sourced** (link the on-page rating
  to the real review platform); don't hardcode stale numbers.

### 3. Crawling & indexing
- **`app/sitemap.ts`**: static routes + CMS slugs (blog/docs/clients…). Make slug
  enumeration **resilient** — default the CMS fallback ON so a transient failure
  never yields an empty (static-only) sitemap. `revalidate` ~900s so a bad
  generation self-heals fast.
- **`app/robots.ts`**: allow `/`, disallow `/api/`, explicit AI-bot allowlist
  (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
  PerplexityBot, Google-Extended, Applebot-Extended, CCBot, cohere-ai +
  Googlebot/Bingbot). Return a blanket `disallow` when `VERCEL_ENV !== production`.
- **`app/llms.txt/route.ts`**: `force-static` markdown fact sheet — H1 + summary,
  a "What this is NOT" section, verified pricing, key-page links. Link it from
  the footer. Derive the "Last updated" date at build.

### 4. Staging noindex (host-based)
- **`middleware.ts`**: add `X-Robots-Tag: noindex, nofollow` on every host except
  the canonical production domain(s). `VERCEL_ENV` alone can't distinguish the
  production `*.vercel.app` alias from the real domain, so gate on **request
  host**. Verify after domain cutover: prod = indexable, staging = noindex.

### 5. Social image + icons
- **`app/og-image/route.tsx`**: generate a 1200×630 card with `next/og`
  `ImageResponse` at a **plain route** (`/og-image`), referenced explicitly from
  `layout.tsx` + `lib/seo.ts`. Do NOT use the `app/opengraph-image` file
  convention if you also reference it explicitly — Next reserves that path and
  drops explicit metadata references on pages that set their own `openGraph`.
- Icons: keep the real brand `app/favicon.ico`; add `app/apple-icon.png`
  (180×180). Do NOT add a generated `app/icon.*` that overrides the brand mark.

### 6. Legacy redirects (migration)
- `next.config.ts` `async redirects()`: map old WordPress URLs → new
  (categories/date-archives/pagination → list pages; old doc-category slugs →
  docs). `permanent: true` = 308. Order specific rules first. Next auto-strips
  trailing slashes (2-hop is fine). Verify each chain lands on 200.

### 7. CMS integration
- One **`SITE_SLUG`** env var for all CMS calls (not per-section vars).
- Per-section `public-api.ts` modules: normalize env URL, candidate URLs, map +
  validate the payload, **local fallback content** on error/empty. Default
  fallback ON for resilience.
- ISR via `next: { revalidate: 60 }`; add **`/api/revalidate`** (token-gated,
  `revalidatePath`) so CMS edits appear within seconds.

### 8. Analytics + live chat (lazy, production-gated)
- **`components/Analytics.tsx`**: GA (gtag) + Meta Pixel via `next/script`,
  SPA-aware pageviews on route change (skip the first to avoid double-count).
  Gate on `NODE_ENV === production` **and** env IDs present; set IDs in Vercel
  **Production only**. ⚠️ GA must be a **GA4 `G-XXXXXXXXXX`** Measurement ID —
  a UA `UA-…` ID (dead since 2023-07-01) or a bare numeric ID will NOT track.
- **`components/LiveChat.tsx`** (Tawk.to): a **zero-dependency** loader that
  injects the widget only after the first user interaction (or a short idle
  fallback) → 0 impact on Lighthouse/CWV (an audit never interacts). Skip the
  official `@tawk.to/tawk-messenger-react` package on React 19 (its peer dep is
  React ^18).

### 9. Performance & a11y
- Render above-the-fold hero content **immediately** — never behind an
  `opacity:0`-until-JS scroll animation (breaks LCP + no-JS). Reduced-motion must
  reset opacity, not just transition-duration.
- Wire the self-hosted font: Tailwind `sans` → `var(--font-…)` AND set it on
  `body` in `globals.css` (Preflight behavior varies by version).
- Serve CMS images that are already WebP as-is; only route through the optimizer
  (drop `unoptimized` + add the host to `remotePatterns`) if you want responsive
  `srcset` and accept the image-optimization cost.
- Raise near-invisible borders/placeholders (`white/0.05–0.08`) and add
  `focus-visible:ring-*` to inputs.

### 10. Pagination & filtered lists (avoid duplicate content)
- Paginated/filtered list pages (`/blog?page=2`, `?category=x`) must use
  **`generateMetadata({searchParams})`**, not static `metadata`, so each page
  gets a **unique title/description** (` – Page N`) and a **self-referencing
  canonical** (`/blog?page=2`). Page 1 keeps the clean base title + `/blog`
  canonical. **Do NOT** canonicalize page 2+ back to page 1 (Google discourages
  it). Client-side-only filters (no URL change) need nothing — they're one URL.

---

## Key decisions & gotchas (learned the hard way)
- **OG image dropped on some pages?** Reserved `/opengraph-image` path conflicts
  with explicit metadata references → use a plain `/og-image` route (§5).
- **Empty sitemap on staging?** A single failed CMS fetch cached for the whole
  revalidate window → default fallback ON + shorter revalidate (§3).
- **Staging still indexable?** `VERCEL_ENV` can't see the prod `*.vercel.app`
  alias → gate on request host in middleware (§4).
- **Generated icon overriding the brand favicon?** Next prefers `app/icon.*` PNG
  over `favicon.ico` → don't add a generated `app/icon.*` (§5).
- **GA not tracking?** Wrong ID format — needs GA4 `G-…`, not UA/numeric (§8).
- **AIScan/agent-readiness "API/OAuth/MCP" checks failing?** Those are for API
  products, not marketing sites. Don't publish empty/fake `.well-known/api-catalog`,
  OAuth metadata, or MCP cards for services that don't exist. Focus on Bot Access
  (robots allowlist), llms.txt, structured data, and content.

---

## Verification (always do this)
Use read-only `curl` + headless **Playwright** (a Next devDependency). Never
trust that metadata/redirects/lazy-loading work — inspect rendered output.
- Indexability: prod has no `X-Robots-Tag` + `index, follow`; staging has
  `noindex`. `robots.txt` = allow + disallow `/api/`.
- Sitemap: `curl …/sitemap.xml | grep -c "<loc>"` includes dynamic URLs.
- Redirects: follow each legacy URL (`curl -L … -w "%{url_effective}"`) → 200.
- Metadata: per-page unique `og:title` + `og:image` (resolved absolute);
  paginated pages get ` – Page N` + self-canonical.
- Structured data: check emitted `"@type"`s per page; run through Google's Rich
  Results Test on the live domain.
- Lazy chat: 0 third-party scripts on load, injected after a simulated
  interaction (Playwright dispatch scroll/mousemove).
- **Never run `npm run build` if a `postbuild` hook submits to IndexNow / pings
  external services** — use `npx next build` (skips the npm postbuild hook) or
  verify statically.

## Post-launch (hand to the site owner)
- Set analytics IDs in Vercel **Production** env; create a **GA4** property if
  only a UA/numeric ID exists.
- Add + verify the domain in **Google Search Console** and **Bing** and submit
  the sitemap.
- Optionally add a cookie-consent gate before analytics/pixel load.
