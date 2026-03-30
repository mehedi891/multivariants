@AGENTS.md

# MultiVariants Website — Project Guide

## Tech Stack
- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 (no CSS modules — all utility classes)
- **React:** 19.2.4

## Commands
```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build (must pass before committing)
npm run lint    # ESLint check
```

## Project Structure
```
app/
  layout.tsx              # Root layout — Inter font, JSON-LD schema, full SEO metadata
  page.tsx                # Homepage — imports all section components in order
  globals.css             # Tailwind directives only (@tailwind base/components/utilities)
  sitemap.ts              # Auto-generates /sitemap.xml
  robots.ts               # Auto-generates /robots.txt
  favicon.ico             # App favicon

components/
  Navbar.tsx              # "use client" — sticky nav, usePathname active states, logo
  Hero.tsx                # Full-viewport hero, variant table mockup, stat pills
  WhySection.tsx          # Before/after comparison: without vs with MultiVariants
  VariantTableDemoSection.tsx  # "use client" — live interactive variant order table
  WhyMultivariantsSection.tsx  # 4 benefit cards (Bulk Add, Sales, Install, Language)
  IntegrationsSection.tsx      # Integration list + Easy Setup / Fast / Secure cards
  StatsBanner.tsx         # Full-width purple gradient stats (13K merchants, 120 countries)
  Features.tsx            # 3 key features: Mix n Match, Restrictions, Incremental Qty
  Testimonials.tsx        # 6 customer review cards with gradient avatars
  Blogs.tsx               # 3 blog post cards with emoji headers
  Contact.tsx             # "use client" — contact form + info panel
  Footer.tsx              # Dark footer, 4-col grid, social links
  NewsletterForm.tsx      # "use client" — email signup with success state

public/
  images/logo.webp        # Brand logo (used in Navbar + Footer)
```

## Page Section Order
`Navbar → Hero → WhySection → VariantTableDemoSection → WhyMultivariantsSection → IntegrationsSection → StatsBanner → Features → Testimonials → Blogs → Contact → Footer`

## Tailwind Design Tokens
All custom tokens are in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#5C6AC4` | Main brand purple, buttons, links |
| `primary-dark` | `#3f4eae` | Hover state for primary |
| `primary-light` | `#F4F5FF` | Tinted backgrounds, badges |
| `accent` | `#47C1BF` | Teal highlight, gradient ends |
| `brand-green` | `#50B83C` | Shopify CTA buttons |
| `brand-text` | `#1a1a2e` | Main body text |
| `brand-muted` | `#6b7280` | Secondary / subtext |
| `brand-border` | `#e5e7eb` | Borders, dividers |
| `brand-alt` | `#f9fafb` | Section backgrounds |
| `brand-dark` | `#0f1117` | Footer background |
| `animate-pulse2` | custom keyframe | Hero badge dot pulse |

## Component Rules
- **Server Components by default.** Only add `"use client"` when the component needs `useState`, `useEffect`, or browser event handlers.
- **Client components:** `Navbar`, `VariantTableDemoSection`, `Contact`, `NewsletterForm`
- **No CSS modules.** All styling is done with Tailwind utility classes.
- **No inline `<style>` tags.**

## Logo
- Path: `/images/logo.webp` (inside `public/images/`)
- Navbar: `h-10 w-auto object-contain`
- Footer: same + `brightness-0 invert` (renders white on dark background)

## SEO Setup
- Metadata defined in `app/layout.tsx` (title template, description, OG, Twitter cards, robots)
- Per-page metadata override in `app/page.tsx`
- JSON-LD `SoftwareApplication` schema with `AggregateRating` in root layout
- `/sitemap.xml` and `/robots.txt` auto-generated via `app/sitemap.ts` and `app/robots.ts`
- Canonical URL: `https://multivariants.com`

## Animations & Interactions
- Hover lift: `hover:-translate-y-px` or `hover:-translate-y-1`
- Hover shadows: `hover:shadow-lg`, `hover:shadow-2xl`
- Transitions: `transition-all`, `transition-colors`
- Hero badge dot: `animate-pulse2` (custom keyframe in tailwind.config.js)
- Form success state: button color switches to `bg-brand-green`, resets after 3s

## Responsive Breakpoints
- Mobile-first; key breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Nav links hidden on mobile (visible `md:flex`)
- Feature sections: single column mobile → two columns `lg:`
- Footer: `1 col → sm:2 cols → lg:4 cols`

## Section Padding Convention
```
px-[5%] py-12 sm:py-16 lg:py-20   ← standard section
px-[5%] py-16                      ← banner sections
```

## Common Patterns
```tsx
// Section wrapper
<section className="bg-brand-alt px-[5%] py-20" id="section-id" aria-labelledby="heading-id">
  <div className="max-w-6xl mx-auto">

// Section heading block
<p className="text-[13px] font-semibold text-primary uppercase tracking-[1px] mb-3">Label</p>
<h2 id="heading-id" className="text-3xl md:text-4xl font-black tracking-tight mb-4">Title</h2>

// Primary CTA button
<Link href="..." className="inline-flex items-center px-7 py-3.5 bg-brand-green text-white rounded-xl text-base font-semibold hover:bg-green-700 hover:-translate-y-px transition-all">

// Outline button
<Link href="..." className="inline-flex items-center px-7 py-3.5 border-[1.5px] border-brand-border text-brand-text rounded-xl hover:border-primary hover:text-primary transition-all">

// Feature/review card
<div className="bg-white rounded-[20px] p-7 border border-brand-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
```
