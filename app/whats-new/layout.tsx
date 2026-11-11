import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Analytics from "@/components/Analytics";
import Clarity from "@/components/Clarity";
import "./whats-new.css";

/**
 * Root layout for the standalone /whats-new landing page.
 *
 * This is a second root layout next to app/[lang]/layout.tsx (there is no
 * app/layout.tsx), so the page ships with its own <html>, fonts and stylesheet
 * and none of the main site's chrome — no promo bar, navbar, footer or live
 * chat. English only: proxy.ts leaves /whats-new un-rewritten so it never
 * reaches the [lang] tree. Moving between this page and the main site is a
 * full page load, which keeps the two stylesheets from ever mixing.
 */

// Same families and weights the design file loaded from Google Fonts.
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--wn-sans",
});
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--wn-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--wn-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://multivariants.com"),
  title: "MultiVariants",
  authors: [{ name: "eFoli", url: "https://multivariants.com" }],
  creator: "eFoli",
  publisher: "eFoli",
  robots: {
    googleBot: {
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function WhatsNewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <Clarity />
      </body>
    </html>
  );
}
