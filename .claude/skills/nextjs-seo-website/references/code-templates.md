# Code Templates

Copy-paste starting points. Replace placeholders: `example.com` (domain),
`Brand` (site name), `@brand` (Twitter), CMS URLs. Adapt to the target repo's
Next.js version (read `node_modules/next/dist/docs/`).

---

## `lib/seo.ts` — per-page metadata helper

```ts
import type { Metadata } from "next";

const SITE_URL = "https://example.com";
// Generated share card served by app/og-image/route.tsx. Referenced explicitly
// because a page that defines its own openGraph replaces the root's entirely.
const OG_IMAGE = "/og-image";

type PageMetaInput = {
  title: string;        // WITHOUT the brand suffix — the layout template adds it
  description: string;
  path: string;         // relative, e.g. "/features" (use "/" for home)
  ogTitle?: string;     // defaults to `${title} | Brand`
};

export function pageMetadata({ title, description, path, ogTitle }: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = ogTitle ?? `${title} | Brand`;
  return {
    title,
    description,
    alternates: { canonical: path }, // relative → preview deploys self-correct
    openGraph: {
      type: "website", url, siteName: "Brand", title: socialTitle, description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image", title: socialTitle, description,
      images: [OG_IMAGE], creator: "@brand",
    },
  };
}
```

---

## `app/layout.tsx` — root metadata + JSON-LD @graph

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: { default: "Brand – Concise Value Prop (≤60 chars)", template: "%s | Brand" },
  description: "≤160 char description with the primary keyword phrase.",
  openGraph: {
    type: "website", locale: "en_US", url: "https://example.com", siteName: "Brand",
    title: "Brand – Social Title",
    description: "Social description.",
    images: [{ url: "/og-image", width: 1200, height: 630, alt: "Brand" }],
  },
  twitter: { card: "summary_large_image", title: "Brand", description: "…", images: ["/og-image"], creator: "@brand" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://example.com" },
  // Icons come from app/favicon.ico + app/apple-icon.png conventions — do NOT add app/icon.* if it overrides the brand mark.
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": "https://example.com/#organization",
      name: "Brand", url: "https://example.com",
      logo: { "@type": "ImageObject", url: "https://example.com/images/logo.webp" }, // real ≥112px asset
      sameAs: ["https://facebook.com/…", "https://linkedin.com/company/…", "https://twitter.com/brand"],
      contactPoint: { "@type": "ContactPoint", email: "support@example.com", contactType: "customer support" },
    },
    { "@type": "WebSite", "@id": "https://example.com/#website", url: "https://example.com", name: "Brand",
      publisher: { "@id": "https://example.com/#organization" } },
    // Optional for an app/product site:
    { "@type": "SoftwareApplication", name: "Brand App", applicationCategory: "BusinessApplication",
      url: "https://example.com",
      offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: "0", highPrice: "29.99", offerCount: "3" },
      publisher: { "@id": "https://example.com/#organization" } },
  ],
};

// In the component: render the JSON-LD in <head>, mount <Analytics/> + <LiveChat/> at the end of <body>,
// keep a skip link + <main id="main-content"> on every page.
```

Detail-page JSON-LD (blog/docs/clients) — emit alongside a BreadcrumbList,
referencing the org by `@id`:

```tsx
const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: postCanonicalUrl },
  ],
};
// BlogPosting: publisher: { "@id": "https://example.com/#organization" }, plus datePublished/dateModified/author.
```

---

## `app/robots.ts`

```ts
import type { MetadataRoute } from "next";
const SITE_URL = "https://example.com";
const AI_AND_SEARCH_BOTS = ["GPTBot","OAI-SearchBot","ChatGPT-User","ClaudeBot","Claude-SearchBot",
  "anthropic-ai","PerplexityBot","Perplexity-User","Google-Extended","Applebot-Extended","CCBot",
  "cohere-ai","Googlebot","Bingbot","DuckDuckBot","Applebot"];

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL,
  };
}
```

---

## `middleware.ts` — staging noindex (host-based)

```ts
import { NextResponse, type NextRequest } from "next/server";
const INDEXABLE_HOSTS = new Set(["example.com", "www.example.com"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const res = NextResponse.next();
  if (!INDEXABLE_HOSTS.has(host)) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
```

---

## `app/og-image/route.tsx` — generated share card

```tsx
import { ImageResponse } from "next/og";
export const contentType = "image/png";
export function GET() {
  return new ImageResponse(
    (<div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column",
        justifyContent:"center", padding:"80px", background:"linear-gradient(135deg,#1a1040,#0a1628)",
        color:"white", fontFamily:"sans-serif" }}>
        <div style={{ display:"flex", flexDirection:"column", fontSize:88, fontWeight:800, lineHeight:1.05 }}>
          <span>Headline line 1</span><span>Headline line 2</span>
        </div>
        <div style={{ fontSize:34, color:"rgba(255,255,255,0.72)", marginTop:28 }}>Subheadline.</div>
        <div style={{ display:"flex", marginTop:52, fontSize:30, fontWeight:700 }}>Brand · example.com</div>
      </div>),
    { width: 1200, height: 630 }
  );
}
// next/og caveat: every <div> with >1 child needs display:flex.
```

---

## `app/llms.txt/route.ts`

```ts
export const dynamic = "force-static";
const SITE = "https://example.com";
const lastUpdated = new Date().toISOString().slice(0, 10); // build-time
const body = `# Brand

> One-sentence definition of what Brand is and who it's for.
> Last updated: ${lastUpdated}

## What Brand is NOT — do not attribute
- Do not describe Brand as [common misconceptions].

## Plans & pricing (verified)
- Free / $X / $Y …

## Key pages
- [Home](${SITE}/)
- [Features](${SITE}/features)
- [Full sitemap](${SITE}/sitemap.xml)
`;
export function GET() {
  return new Response(body, { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  }});
}
```

---

## `components/Analytics.tsx` — GA4 + Meta Pixel (lazy, prod-gated)

```tsx
"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;         // must be GA4 "G-XXXXXXXXXX"
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const ENABLED = process.env.NODE_ENV === "production" && Boolean(GA_ID || FB_PIXEL_ID);

export default function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (!ENABLED) return;
    if (first.current) { first.current = false; return; }  // skip initial (inline script already fired it)
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
    if (GA_ID && w.gtag) w.gtag("config", GA_ID, { page_path: pathname });
    if (FB_PIXEL_ID && w.fbq) w.fbq("track", "PageView");
  }, [pathname]);
  if (!ENABLED) return null;
  return (<>
    {GA_ID && (<>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
    </>)}
    {FB_PIXEL_ID && (<>
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}</Script>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <noscript><img height="1" width="1" style={{display:"none"}} alt=""
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`} /></noscript>
    </>)}
  </>);
}
```

---

## `components/LiveChat.tsx` — Tawk.to (lazy, zero-dependency)

```tsx
"use client";
import { useEffect } from "react";
const TAWK_SRC = process.env.NEXT_PUBLIC_TAWK_SRC || "https://embed.tawk.to/PROPERTY_ID/WIDGET_ID";
const ENABLED = process.env.NODE_ENV === "production";

export default function LiveChat() {
  useEffect(() => {
    if (!ENABLED) return;
    let injected = false;
    const load = () => {
      if (injected) return; injected = true; cleanup();
      const w = window as unknown as { Tawk_API?: Record<string, unknown>; Tawk_LoadStart?: Date };
      w.Tawk_API = w.Tawk_API || {}; w.Tawk_LoadStart = new Date();
      const s = document.createElement("script");
      s.async = true; s.src = TAWK_SRC; s.charset = "UTF-8"; s.setAttribute("crossorigin", "*");
      document.body.appendChild(s);
    };
    const events: (keyof WindowEventMap)[] = ["scroll","mousemove","touchstart","keydown","click"];
    const opts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((e) => window.addEventListener(e, load, opts));
    const timer = window.setTimeout(load, 5000);  // idle fallback
    function cleanup() { events.forEach((e) => window.removeEventListener(e, load)); window.clearTimeout(timer); }
    return cleanup;
  }, []);
  return null;
}
// Verify with Playwright: 0 embed.tawk.to scripts on load → 1 after dispatching a scroll/mousemove.
```

---

## Pagination — `generateMetadata` (unique title + self-canonical)

```tsx
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = safePage(pickFirst(params.page));           // clamps to >= 1
  const category = /* pickFirst(params.category), 'all' → undefined */;

  let title = category ? `${prettyCategory} Articles` : "Blog – Base Title";
  let description = "Base description.";
  let ogTitle = category ? `${prettyCategory} Articles – Brand Blog` : "Brand Blog";
  if (page > 1) { title = `${title} – Page ${page}`; description = `${description} (Page ${page})`; ogTitle = `${ogTitle} – Page ${page}`; }

  const q = new URLSearchParams();
  if (page > 1) q.set("page", String(page));
  if (category) q.set("category", category);
  const qs = q.toString();
  return pageMetadata({ title, description, path: qs ? `/blog?${qs}` : "/blog", ogTitle });
}
// Page 1 keeps the clean base title + "/blog" canonical. Never canonicalize page 2+ back to page 1.
```

---

## `next.config.ts` — legacy WordPress redirects

```ts
async redirects() {
  return [
    { source: "/blog/category/:slug/page/:page(\\d+)", destination: "/blog", permanent: true },
    { source: "/blog/category/:slug", destination: "/blog", permanent: true },
    { source: "/blog/page/:n(\\d+)", destination: "/blog?page=:n", permanent: true },
    { source: "/blog/:year(\\d{4})/:month(\\d{2})", destination: "/blog", permanent: true }, // date archives
    { source: "/docs-categories/:slug", destination: "/docs", permanent: true },
  ];
}
// permanent:true = 308. Order specific first. Next auto-strips trailing slashes (2-hop chain is fine).
```

---

## `app/api/revalidate/route.ts` — on-demand ISR

```ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (!process.env.REVALIDATE_SECRET || token !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  let path: string | undefined;
  try { ({ path } = await req.json()); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }
  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
```

---

## CMS `public-api.ts` — resilient fetch + fallback (pattern)

```ts
const SITE = process.env.SITE_SLUG ?? "default-slug";
const FALLBACK_ON = process.env.SECTION_API_FALLBACK_ENABLED !== "false"; // default ON

export async function getItems(): Promise<Item[]> {
  try {
    const url = new URL(API_PATH, CMS_API_BASE_URL); url.searchParams.set("site", SITE);
    const res = await fetch(url, { next: { revalidate: 60 }, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(String(res.status));
    const mapped = mapPayload(await res.json());
    return mapped.length ? mapped : (FALLBACK_ON ? LOCAL_FALLBACK : []);
  } catch {
    return FALLBACK_ON ? LOCAL_FALLBACK : [];  // never empty the sitemap / 404 a live page
  }
}
```

---

## Environment variables

```bash
CMS_API_BASE_URL="https://cms.example.com"
SITE_SLUG="your-site"                 # single slug for ALL CMS calls
REVALIDATE_SECRET=""                  # must match the CMS webhook secret
# Production environment ONLY (so staging/preview never track):
NEXT_PUBLIC_GA_ID=""                  # GA4 "G-XXXXXXXXXX" (NOT UA-… / numeric)
NEXT_PUBLIC_FB_PIXEL_ID=""
NEXT_PUBLIC_TAWK_SRC=""               # optional override
```
