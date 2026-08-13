# SEO / AEO / GEO Audit Workflow

For an **existing** site, audit before implementing. Fan out read-only agents
across the areas below in parallel, each returning a findings table, then
synthesize one deliverable and get approval before touching code.

## Rules
- **Audit only** — agents must NOT modify files. No `npm run build`/`dev`/lint
  that could trip a `postbuild` (e.g. IndexNow submission).
- Every finding needs: file path + line, quoted evidence, impact, a specific
  fix, a severity (Critical/High/Medium/Low/Opportunity) and a status
  (Confirmed / Likely / Improvement / Requires-prod-verify).
- **Verify the highest-severity findings yourself** (curl the live site, check
  assets exist) before writing them up — don't trust a single agent pass.

## The 6 parallel agents (one per slice)
1. **Crawling & indexing** — robots, sitemap coverage + resilience, canonicals,
   redirects, trailing slash, staging noindex, SSR vs client rendering, orphan
   pages, `/api` exposure, CMS-outage 404s.
2. **Metadata inventory** — every route's title/description/canonical/OG/Twitter;
   duplicate/missing/over-length; dynamic pages using `generateMetadata`; the
   OG-inheritance trap (pages that set `openGraph` losing the root image);
   missing OG-image/icon assets.
3. **Headings, semantics, internal linking** — one `<h1>` per page, landmark
   elements, alt text, descriptive links, nav/footer link validity (dead `#`
   links), breadcrumbs, orphan pages, contextual internal links.
4. **Structured data** — inventory all JSON-LD, validate types/required props,
   consistency with visible content, gaps (Organization/WebSite/BreadcrumbList/
   Product/FAQPage), self-serving Review / AggregateRating risks.
5. **AEO / GEO / content** — question-based headings + direct answers, FAQ,
   comparison/use-case pages, entity clarity + consistency, sourced first-party
   facts, trust pages (About/Terms/Privacy), author E-E-A-T, llms.txt value,
   thin/promotional copy, keyword cannibalization.
6. **Performance / a11y / analytics** — image optimization + `remotePatterns`,
   font wiring, client vs server components, LCP risks (hidden hero), layout
   shift, contrast + focus states, analytics/verification presence, secret
   exposure in client code.

## Deliverable
A single `docs/SEO-AEO-GEO-AUDIT.md`:
executive summary + top-5 priorities · implementation overview · findings table
with IDs · page-level audit · metadata rewrites · structured-data plan ·
content gaps · a phased plan (Critical → High → AEO/GEO → validation) · quick
wins · open questions.

## Live verification (run against the deployed URL)
- Asset 404s: OG image, icons.
- `robots.txt` + `X-Robots-Tag` on prod vs staging.
- Sitemap URL count (is dynamic content present, or static-only?).
- Per-page `og:title`/`og:image`.
- Blog-post / doc JSON-LD types.
- Legacy-redirect final destinations (200?).

## Then implement in phases
1. **Critical** — missing OG/icon assets, per-page OpenGraph, staging noindex,
   CMS-outage 404s, empty sitemap, dead links.
2. **High** — Organization/WebSite/Breadcrumb/pricing schema, metadata length,
   font wiring, internal linking, sourced stats.
3. **AEO/GEO** — About/Terms/comparison/use-case pages, author E-E-A-T,
   `<ul>` bullets, llms.txt link.
4. **Validation** — analytics + Search Console/Bing verification, contrast +
   focus a11y sweep, branded 404/error pages, Rich Results monitoring.

Verify + commit each phase separately; get approval between phases.
