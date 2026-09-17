import { ImageResponse } from "next/og";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Default social share card, served at a stable /og-image URL and referenced
// explicitly from metadata (root layout + lib/seo helper). We use a plain route
// handler rather than the app/opengraph-image file convention because Next
// reserves the /opengraph-image path, which caused explicit metadata references
// to it to be dropped on pages that set their own openGraph. Detail pages (blog
// posts, client stories) still override this with their own per-item image.
export const contentType = "image/png";

export async function GET(req: Request) {
  const lang = new URL(req.url).searchParams.get("lang") ?? "";
  const { ogImage: t } = await getDictionary(toLocale(lang));

  // Translations run longer than the English they replace. Shrink the headline
  // when its longest line would otherwise wrap and crowd the footer, so a copy
  // edit can never break the card's layout.
  const longest = Math.max(t.titleLine1.length, t.titleLine2.length);
  const titleSize = longest > 24 ? 68 : longest > 21 ? 78 : 88;

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
          {/* SVG stars: the image renderer's built-in font has no ★ glyph, so
              the character rendered as five empty boxes. */}
          <span style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </span>
          {t.badge}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginTop: 28,
          }}
        >
          <span>{t.titleLine1}</span>
          <span>{t.titleLine2}</span>
        </div>

        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.72)",
            marginTop: 28,
            maxWidth: 940,
          }}
        >
          {t.subtitle}
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
