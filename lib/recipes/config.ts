/**
 * Recipe Contents — the CMS's second blog-style stream (setup guides, tips,
 * copy-paste solutions), shown on MultiVariants as "Spill The Sauce".
 *
 * Served at `/spill-the-sauce` (route folder `app/[lang]/(site)/spill-the-sauce`).
 * This MUST match the CMS value (Sites → MultiVariants → Recipe Contents URL
 * path) so "View live", draft preview and on-demand revalidation land here.
 * Client-safe (no env, no fetch) so the Navbar can import it.
 */
export const RECIPES_SEGMENT = "spill-the-sauce";
export const RECIPES_PATH = `/${RECIPES_SEGMENT}`;
