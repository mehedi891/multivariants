import { notFound } from "next/navigation";

/**
 * Catch-all under [lang]. Renders the branded 404 for any unmatched path.
 *
 * Needed because the root <html> layout now lives under `[lang]` (so `lang` can
 * be set per locale), leaving no root-level not-found to catch unmatched URLs.
 * Calling notFound() here surfaces `[lang]/not-found.tsx` inside the locale
 * layout, complete with navbar and footer.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
