---
name: seo-marketing-site
description: >-
  Build a fast, accessible, machine-readable marketing + docs website. Use when
  scaffolding or extending a product/marketing/docs site that must hit Lighthouse
  mobile >=95, WCAG 2.1 AA, and be optimized for SEO + AEO/GEO (AI answer engines
  like ChatGPT, Claude, Perplexity, Google AI). Covers the Next.js App Router +
  Tailwind architecture, a single source of truth for facts, generated
  metadata/JSON-LD/hreflang, robots.txt + llms.txt, design tokens, content/truth
  discipline, and automated a11y/UI audits. Every snippet is a generic template —
  swap the <PLACEHOLDER> values for your brand. (No-JS gate intentionally omitted:
  this project uses scroll/entrance animations as core UX.)
---

# SEO / AEO / GEO marketing-site standard

A reusable playbook for building a marketing + docs website that is **fast, accessible, and
machine-readable**. It encodes one architectural idea — **one source of truth, everything else
generated** — and applies it to metadata, structured data, internationalization, and the AI-answer
surface (`llms.txt`).

Every code block is a **template**. Replace anything in `<ANGLE_BRACKETS>` and the
`example.com` / `<Brand>` placeholders with real values. Do not ship the placeholders.

> **Note for this project:** the original standard included a hard "works without JavaScript" gate.
> That gate is intentionally **dropped here** because the site relies on scroll-triggered entrance
> animations (`AnimateIn`, interactive demos, the pricing toggle, the Calendly popup) as core UX.
> Everything else — performance, a11y, SEO/AEO/GEO, truth discipline — still applies in full.

---

## 0. The quality bar (non-negotiable gates)

These are pass/fail. A page that misses any of them is not done.

| Gate | Target | How it's enforced |
| --- | --- | --- |
| Performance | Lighthouse **mobile >= 95** (Perf/SEO/Best-Practices) | Test against the **canonical host** (the `www`/primary domain), never a redirecting apex |
| Accessibility | **WCAG 2.1 AA** | Playwright a11y audit + manual keyboard pass (§9) |
| One H1 | Exactly **one `<h1>` per page** | UI audit asserts it |
| Headings | **Sentence case**, logical order (no skipped levels) | Copy rule + review |
| Links | **Descriptive** link text (never "click here"/"read more" alone) | Review |
| Color | All text meets **AA contrast (4.5:1 body, 3:1 large)** | Verify every token pair (§8) |
| Facts | **Zero invented claims** — every statement matches the real product | Truth discipline (§12) |

**Why these and not "looks good":** marketing sites are read by three audiences at once — humans,
search crawlers, and AI answer engines. The gates above are the floor that keeps all three happy.

---

## 1. Tech stack

- **Next.js (latest, App Router)** — static-first (SSG) with ISR where content changes; React Server
  Components by default, client components only where interactivity demands it.
- **TypeScript** everywhere.
- **Tailwind CSS** — design tokens declared as theme variables in one global stylesheet (no
  `tailwind.config.js` color sprawl). See §8.
- **Self-hosted fonts** via the framework's font loader (`next/font` or equivalent) with
  `display: swap` — no render-blocking external font requests.
- **Markdown content** (`gray-matter` + a Markdown renderer) for long-form docs/blog/legal, rendered
  into a scoped `.prose` style.
- **Analytics**: lightweight Web-Vitals/RUM, mounted only in production. Any cookie-setting product
  analytics sits **behind a consent gate** and is off by default.
- **Hosting**: zero-config platform deploy (Vercel/Netlify/etc.). Keep platform-specific config
  minimal so the canonical-host/redirect rules in §6 hold.

> **Framework version drift.** Major App-Router releases change APIs and conventions. Before writing
> routing/metadata/caching code, read the installed version's own docs
> (`node_modules/<framework>/dist/docs/` or the official site for that exact version) instead of
> relying on memory. Heed deprecation notices.

---

## 2. Project structure

```
src/
  app/
    layout.tsx              # root: fonts, default <Metadata>, header/footer, Org+WebSite JSON-LD, analytics
    page.tsx                # homepage
    globals.css             # Tailwind import + theme design tokens + base styles + .prose
    not-found.tsx           # branded 404
    robots.ts               # crawler policy: allow search + AI answer bots (§6)
    sitemap.ts              # generated from the route registry + content collections
    manifest.ts             # PWA manifest
    opengraph-image.tsx     # default generated OG/social card (1200x630)
    llms.txt/route.ts       # entity definition + verified facts for AI answer engines (§6)
    <section>/page.tsx      # one folder per route; dynamic segments as [slug]
  components/
    layout/                 # Header (nav/menus), Footer, SkipLink
    ui/                     # Button, Container, Section, Badge, Logo, icons — the primitives
    seo/JsonLd.tsx          # the <script type="application/ld+json"> renderer
    marketing/              # page templates (FeaturePage, etc.) so pages are data, not bespoke JSX
  lib/
    site.ts                 # ⭐ SINGLE SOURCE OF TRUTH for facts/URLs/brand (§3)
    seo.ts                  # buildMetadata(), absoluteUrl(), hreflang generator (§4)
    jsonld.ts               # all schema.org builders (§5)
    routes.ts               # registry of published routes -> sitemap (§7)
content/                    # markdown for docs/blog/legal (source files)
public/brand/               # logo + icons
tests/                      # Playwright audits: ui-audit.mjs, a11y-audit.mjs (§13)
```

**Principle:** pages are **thin**. A page file should be `metadata = buildMetadata({...})` + a `data`
object fed to a shared template. Anything appearing on many pages (hero, feature grid, FAQ, JSON-LD)
is a component or a `lib/` generator, never copy-pasted.

---

## 3. Single source of truth — `lib/site.ts`

Every fact about the product/company lives **here, once**. The site UI, JSON-LD, OG images, and
`llms.txt` all import from it, so they can never drift. This is the keystone of the whole standard.

```ts
// src/lib/site.ts
export const siteConfig = {
  name: "<Brand>",
  parentBrand: "<Parent Co. or same as name>",
  parentUrl: "https://parent.example.com",

  /** Production origin / canonical host (the FINAL destination host after any apex<->www redirect). */
  url: "https://www.example.com",

  /** Canonical one-sentence entity definition. Reused VERBATIM in JSON-LD + llms.txt + hero. */
  description:
    "<Brand> is a <category> for <audience> that <core verb phrase>. <One more concrete sentence, no hype>.",

  tagline: "<Short positioning line>",
  installTarget: "https://app.example.com/",

  social: {
    x: "#",
    linkedin: "https://www.linkedin.com/company/<brand>/",
  },

  legalEntity: "<Registered legal entity name>",
  supportEmail: "support@example.com",
  address: { locality: "<City>", country: "<ISO-2>" },
} as const;

export type SiteConfig = typeof siteConfig;
```

**Rule:** if a fact changes, you change it here and the change propagates. If you ever find yourself
typing the brand name, a price, or a URL into a page file — stop, and import it from `siteConfig`.

---

## 4. Metadata system — `lib/seo.ts`

One `buildMetadata()` builds the title, description, canonical, hreflang, Open Graph, Twitter card,
and robots directives for **every** page. Pages never hand-write `<head>` tags.

```ts
// src/lib/seo.ts
import type { Metadata } from "next";
import { siteConfig } from "./site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

type BuildMetadataOptions = {
  title?: string;              // rendered as "<title> — <Brand>" via the layout template
  titleAbsolute?: string;      // exact <title>, bypassing the template
  description: string;         // ~150-160 chars, unique per page, no keyword stuffing
  path: string;                // site-relative -> drives canonical + alternates
  type?: "website" | "article";
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[] };
  ogImage?: string;            // defaults to the site card
  noindex?: boolean;           // utility pages (search results, thank-you) -> true
};

export function buildMetadata({
  title, titleAbsolute, description, path,
  type = "website", article, ogImage = "/opengraph-image", noindex = false,
}: BuildMetadataOptions): Metadata {
  const ogImageUrl = absoluteUrl(ogImage);
  const canonical = absoluteUrl(path);
  const ogTitle =
    titleAbsolute ?? (title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`);

  const openGraph: Record<string, unknown> = {
    type, url: canonical, siteName: siteConfig.name, title: ogTitle, description,
    locale: "en_US", images: [{ url: ogImageUrl, width: 1200, height: 630 }],
  };
  if (type === "article" && article) {
    if (article.publishedTime) openGraph.publishedTime = article.publishedTime;
    if (article.modifiedTime) openGraph.modifiedTime = article.modifiedTime;
    if (article.authors?.length) openGraph.authors = article.authors;
  }

  return {
    ...(titleAbsolute ? { title: { absolute: titleAbsolute } } : title ? { title } : {}),
    description,
    alternates: { canonical },
    openGraph: openGraph as Metadata["openGraph"],
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImageUrl] },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true, follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
  };
}
```

In the **root layout** set the title template + `metadataBase` once:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
};
```

**Per-page usage** (the entire SEO surface of a page is these few lines):

```ts
export const metadata = buildMetadata({
  title: "<Page title>",
  path: "/<route>",
  description: "<Unique 150-160 char summary of THIS page>",
});
```

---

## 5. Structured data (JSON-LD) — `lib/jsonld.ts` + `components/seo/JsonLd.tsx`

Structured data is how search engines build rich results **and** how AI answer engines extract facts.
Centralize every builder so schemas share one `@id` graph and never contradict the visible page.

```tsx
// src/components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Mount **Organization + WebSite** once in the root layout; add page-specific nodes per page.

```ts
// src/lib/jsonld.ts
import { siteConfig } from "./site";
import { absoluteUrl } from "./seo";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Only emit sameAs entries that are real URLs — placeholders ("#") are skipped. */
function realSocialUrls(): string[] {
  return Object.values(siteConfig.social).filter((v) => /^https?:\/\//.test(v));
}

export function organizationSchema() {
  const sameAs = realSocialUrls();
  return {
    "@context": "https://schema.org", "@type": "Organization", "@id": ORG_ID,
    name: siteConfig.name, legalName: siteConfig.legalEntity, url: siteConfig.url,
    logo: absoluteUrl("/brand/icon-512.png"), description: siteConfig.description,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.address.locality, addressCountry: siteConfig.address.country },
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: siteConfig.supportEmail, availableLanguage: "English" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org", "@type": "WebSite", "@id": WEBSITE_ID,
    name: siteConfig.name, url: siteConfig.url, publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: items.map((qa) => ({ "@type": "Question", name: qa.question, acceptedAnswer: { "@type": "Answer", text: qa.answer } })),
  };
}
```

**Which schema goes on which page:**

| Page type | Schema |
| --- | --- |
| Site-wide (layout) | `Organization` + `WebSite` (with `SearchAction`) |
| Product / pricing | `SoftwareApplication` or `Product` with `Offer[]` (one per plan/tier) |
| FAQ page | `FAQPage` (mirror the visible Q&A **verbatim**) |
| How-to / setup doc | `HowTo` (steps must match the on-page steps) |
| Blog post | `BlogPosting` (real dates, `Person` author) |
| Hub/listing | `CollectionPage` + `ItemList`, `BreadcrumbList` |

**Hard rules:**
- **Never emit `aggregateRating`/`review` until real reviews exist.** Fabricated ratings are a manual
  penalty risk. (If real reviews DO exist, e.g. a real App Store listing, keep the numbers in sync
  with the live source of truth.)
- Structured data must **match the visible page** — no hidden facts in JSON-LD.
- Skip optional fields rather than fill them with placeholders.

---

## 6. AEO / GEO — being citable by AI answer engines

"SEO" gets you ranked; **AEO/GEO** get you *cited* by ChatGPT, Claude, Perplexity, and Google's AI
surfaces. Two levers:

### 6a. `robots.ts` — explicitly welcome answer/retrieval bots

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const ANSWER_AND_SEARCH_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-Web", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "CCBot", "cohere-ai",
  "Googlebot", "Bingbot", "DuckDuckBot", "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/search"] },
      { userAgent: ANSWER_AND_SEARCH_BOTS, allow: "/", disallow: ["/search"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

### 6b. `llms.txt` — a hand-curated fact sheet for LLMs

A concise, link-rich Markdown document at `/llms.txt` that tells answer engines exactly what you are,
what's true, and **what is NOT true** (so models don't hallucinate features you don't have).

```ts
// src/app/llms.txt/route.ts
import { siteConfig } from "@/lib/site";
export const dynamic = "force-static";

const body = `# ${siteConfig.name}

> ${siteConfig.description}
> Last updated: <YYYY-MM-DD> - Facts verified against the shipped product.

<One short paragraph: what problem it solves and where it sits in the market.>

## Canonical facts (verified)

- <Plans/pricing with exact numbers, or "free", or "contact sales" — whatever is REAL>
- <Core capability 1>
- <Core capability 2>

## What ${siteConfig.name} is NOT (yet) — do not attribute these

${siteConfig.name} does NOT currently offer: <list the things people might assume but that don't exist>.

## Key pages

- [Home](${siteConfig.url}/)
- [Pricing](${siteConfig.url}/pricing)
- [FAQ](${siteConfig.url}/faq)
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
```

**`llms.txt` rules:** lead with a single `# H1`; use `[label](url)` Markdown links (never bare URLs);
generate the page/post lists from registries so it stays in sync; include a **"what it is NOT"**
section — it's the highest-leverage hallucination guard you have.

---

## 7. Sitemap + route registry — `lib/routes.ts`

List only **real, published** routes so the sitemap never points at soft-404s. Content collections
(docs/blog) are enumerated from their own loaders and appended in `sitemap.ts`.

```ts
// src/lib/routes.ts
import type { MetadataRoute } from "next";
export type SiteRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};
export const publishedRoutes: SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
];
```

---

## 8. Design tokens — theme variables in `globals.css`

All brand color, type, radius, and spacing live as theme variables in **one** file. Never hardcode hex
in components and never invent off-palette colors.

> ⭐ **The contrast trap.** A brand's signature mid-tone almost always **fails WCAG AA as a button
> background** with white text (it needs >=4.5:1 for normal text, 3:1 for large). Solution: **extend
> the ramp** with a darker tier that passes, use *that* for CTAs/links, and reserve the brand mid-tone
> for fills and large text. Verify every text-on-color pair — including text on tint backgrounds, not
> just on white.

```css
@layer base {
  h1, h2, h3, h4, h5, h6 { text-wrap: balance; }

  /* Visible focus ring everywhere (WCAG 2.4.7). */
  :focus-visible { outline: 2px solid var(--color-info); outline-offset: 2px; border-radius: 2px; }
  :focus:not(:focus-visible) { outline: none; }
}

/* Respect reduced-motion globally — motion is never required to understand content. */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

> **Animations are allowed and encouraged here** — but always gate them behind
> `prefers-reduced-motion` (above) so users who opt out get an instant, static experience. Entrance/
> scroll animations must never hide content from crawlers: render the content in the DOM and animate
> *opacity/transform*, so the text is present even before it "reveals."

---

## 9. Accessibility (WCAG 2.1 AA) — the rules

Build it in; don't bolt it on. The recurring requirements:

- **Skip link** as the first focusable element — jumps to `<main id="main">`.
- **Landmarks**: one `<header>`, one `<main>`, one `<footer>`, `<nav aria-label="...">`.
- **One `<h1>` per page**; heading levels never skip.
- **Keyboard**: every interactive element reachable and operable by keyboard; **visible focus** on all.
- **Menus/dropdowns**: `aria-haspopup` + `aria-expanded`; Enter/Space open, **Escape closes and
  returns focus to the trigger**.
- **Mobile menu / overlays**: `role="dialog"` + `aria-modal="true"`, **focus trapped** inside while
  open, Escape closes and restores focus.
- **Images**: meaningful `alt`; decorative images `alt=""`.
- **Forms**: every input has a `<label>`; errors announced (`aria-describedby`, `aria-invalid`);
  never rely on color alone to signal state.
- **Targets**: interactive hit areas >= 24x24 CSS px (ideally 44x44 on touch).
- **Color**: never the only carrier of meaning; AA contrast on all text.
- **Motion**: honor `prefers-reduced-motion` (handled globally in §8).
- **Links**: text describes the destination (not "click here"); external links indicated.

---

## 10. Performance (Lighthouse mobile >= 95)

- **Static-first**: prerender (SSG); use ISR for content that changes. Avoid client-side data fetching
  for above-the-fold content.
- **Critical CSS inline** so the CSS request leaves the critical path.
- **Fonts**: self-host, `display: swap`, preload the one or two weights you actually use.
- **Images**: modern formats (AVIF/WebP) via the framework image component; explicit `width`/`height`
  (or aspect-ratio) to kill CLS; lazy-load below the fold, eager + `priority` for the LCP image.
- **Third-party scripts**: defer everything non-essential; load chat/analytics widgets on interaction
  or `afterInteractive`. Each third-party script is a Lighthouse liability — justify every one.
- **No layout shift**: reserve space for anything that loads late.
- **Test on the canonical host**, not the redirecting apex.

---

## 11. Internationalization — structure now, translate later

Even if you launch in one language, keep every user-facing string in a typed dictionary and generate
hreflang from a locale registry, so adding a locale is a content task, not a refactor. (Full pattern
in the source standard; omitted here for brevity — adopt when a second locale is on the roadmap.)

---

## 12. Content & truth discipline (the most important rule)

A marketing site's credibility — and now its AI-answer accuracy — depends on **never stating anything
that isn't true of the shipped product.** This is a hard gate, equal to the technical ones.

- **No invented claims.** No ratings, review counts, customer counts, testimonials, awards, or
  capabilities that don't exist. If it isn't real, it doesn't go on the page, in JSON-LD, or in
  `llms.txt`. (Real, verifiable stats from a live App Store listing ARE fine — keep them in sync.)
- **State limits precisely.** Imprecision reads as a lie to a careful buyer and to an LLM.
- **Maintain a "what it is NOT (yet)" list** (in `llms.txt` and internally).
- **Preserve `[PLACEHOLDER]`s.** Never invent a legal entity, address, or handle to fill a gap.
- **Sentence-case headings; descriptive links; no hype adjectives** standing in for facts.
- **Keep facts in sync.** When a product fact changes, update **all** of: the page, the matching doc,
  `lib/site.ts`, the JSON-LD, and `llms.txt` — in the same change.

---

## 13. Automated audits + CI gates

Two Playwright scripts drive a real Chromium against a running server and assert the gates.

```jsonc
// package.json scripts
{
  "audit:ui":   "node tests/ui-audit.mjs",    // console errors, broken images, exactly-one-H1, horizontal overflow, menu/dropdown/FAQ behavior
  "audit:a11y": "node tests/a11y-audit.mjs",   // skip link, visible focus, keyboard dropdowns, mobile-menu focus trap, tablet breakpoints
  "audit": "npm run audit:ui && npm run audit:a11y"
}
```

`tests/a11y-audit.mjs` asserts (don't just log): (1) first Tab focuses the skip link, Enter moves
focus into `<main>`, focus ring visible; (2) desktop dropdown Enter opens / Escape closes + returns
focus; (3) mobile menu is `role=dialog`, `aria-modal`, focus trapped, Escape restores focus;
(4) tablet widths [768, 820, 1024] have **no horizontal overflow**.

**Release checklist:** `npm run lint` -> `npm run build` (typecheck) -> `npm run audit` ->
Lighthouse mobile >= 95 -> spot-check an OG card on a real shared URL -> submit `sitemap.xml`.

---

## 14. Hard-won gotchas

- **Backdrop-filter on a sticky header creates a containing block** that traps `position: fixed`
  overlays inside the header's stacking context. Render overlays outside the filtered ancestor
  (portal) or drop the filter.
- **A `cn()` helper that just joins class strings is not `tailwind-merge`** — later conflicting
  utilities won't override earlier ones. Use real `tailwind-merge` if you depend on override semantics.
- **Test PageSpeed/Lighthouse on the canonical host**, not the redirecting apex.
- **OG image cascade**: a page's `openGraph.images` overrides any ancestor `opengraph-image` route, so
  set the image explicitly per page (default to the site card).
- **Scroll-reveal animations + crawlers**: keep revealed content in the DOM (animate opacity/transform,
  not conditional rendering) so crawlers and no-JS fallbacks still see the text.

---

## 15. Build order (phasing)

1. **Foundations** — `site.ts`, `seo.ts`, `jsonld.ts`, `globals.css` tokens, layout (header/footer/
   skip link), robots/sitemap/manifest/`llms.txt`, default OG image.
2. **Launch-critical pages** — Home, Pricing, Features, FAQ, Contact, legal, core docs. Add each to
   `routes.ts` + the `llms.txt` key-pages list as it ships.
3. **Depth** — remaining feature/compare pages, full docs, blog, demos.
4. **Growth** — experiments, additional locales, expanded content.

At every step the gates in §0 apply. A page isn't "done" until it passes them.

---

### TL;DR

One source of truth (`site.ts`) -> everything (metadata, JSON-LD, OG, hreflang, sitemap, `llms.txt`)
is **generated** from it, so facts never drift. Tokens in the theme layer, content static-first, AI
bots welcomed in `robots.ts`, facts curated in `llms.txt`. **Gates are pass/fail:** Lighthouse mobile
>= 95, WCAG 2.1 AA, one H1, AA contrast, and **zero invented claims.** (No-JS gate omitted — this site
uses animations; gate them behind `prefers-reduced-motion` and keep revealed content in the DOM.)
