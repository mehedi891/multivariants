/**
 * Shared Tailwind class strings for the Help Center (/academy) pages, so the
 * card, heading and button styles from the redesign stay identical everywhere.
 */

/** Page-width wrapper inside a `px-[5%]` section (matches the Navbar). */
export const container = "mx-auto max-w-6xl";

/** Glassy card surface. Add `cardHover` when the whole card is a link. */
export const card = "rounded-[18px] border border-hc-line bg-white/[0.035] transition-colors duration-200";
export const cardHover = "hover:border-hc-line-hover hover:bg-white/[0.065]";

export const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-hc-orange";
export const eyebrowGreen = "text-xs font-bold uppercase tracking-[0.14em] text-hc-green";

export const sectionTitle =
  "mt-2 text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-hc-ink";

const button =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-[18px] text-sm font-semibold transition-all";
export const buttonGradient = `${button} bg-hc-grad text-white shadow-hc hover:brightness-110`;
export const buttonLine = `${button} border border-[rgba(110,125,255,0.55)] text-hc-link hover:bg-hc-indigo/[0.14]`;

/** Icon tile used for topics and guides. */
export const iconTile = "grid shrink-0 place-items-center bg-hc-indigo/[0.14] text-hc-chip";
