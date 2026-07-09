import type { Metadata } from "next";

const SITE_URL = "https://multivariants.com";

// Generated share card served by app/og-image/route.tsx. Referenced explicitly
// because a page that defines its own `openGraph` replaces the root's entirely,
// so the image must be restated per page.
const OG_IMAGE = "/og-image";

type PageMetaInput = {
  /** Page title WITHOUT the brand suffix — the layout template appends "| MultiVariants". */
  title: string;
  description: string;
  /** Relative path, e.g. "/features" (use "/" for home). Canonicals stay relative so preview deploys self-correct via metadataBase. */
  path: string;
  /** Optional social-card title override; defaults to `${title} | MultiVariants`. */
  ogTitle?: string;
};

/**
 * Builds per-page metadata with a unique OpenGraph + Twitter card.
 *
 * Without this, a page that sets only `title`/`description` inherits the ROOT
 * OpenGraph wholesale, so every page shares the homepage's social title (M1).
 * The share image is supplied automatically by the `app/opengraph-image` file
 * convention, which merges in regardless of this openGraph object.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = ogTitle ?? `${title} | MultiVariants`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: "MultiVariants",
      title: socialTitle,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
      creator: "@multivariants",
    },
  };
}
