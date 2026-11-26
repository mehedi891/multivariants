import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Help Center typeface (Plus Jakarta Sans, from the redesign). Applied to the
 * academy pages' <main> only, so the shared Navbar and Footer keep Inter.
 * Defined once here so every academy page shares one font instance.
 */
export const helpFont = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
