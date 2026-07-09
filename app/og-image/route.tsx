import { ImageResponse } from "next/og";

// Default social share card, served at a stable /og-image URL and referenced
// explicitly from metadata (root layout + lib/seo helper). We use a plain route
// handler rather than the app/opengraph-image file convention because Next
// reserves the /opengraph-image path, which caused explicit metadata references
// to it to be dropped on pages that set their own openGraph. Detail pages (blog
// posts, client stories) still override this with their own per-item image.
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1a1040 0%, #0f172a 45%, #0a1628 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 600,
            color: "#c7b2ff",
          }}
        >
          <span style={{ color: "#fbbf24", letterSpacing: 2 }}>★★★★★</span>
          Trusted by 13,000+ Shopify merchants
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginTop: 28,
          }}
        >
          <span>Bulk Variant Ordering</span>
          <span>for Shopify Stores</span>
        </div>

        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.72)",
            marginTop: 28,
            maxWidth: 940,
          }}
        >
          One-click bulk add-to-cart for product variants. Built for B2B,
          wholesale &amp; high-volume stores.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 52,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          MultiVariants
          <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
            &nbsp;· multivariants.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
