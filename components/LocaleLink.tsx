"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { barePathOf, isLocale, localizePath, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Locale-aware internal link.
 *
 * Auto-prefixes an internal `href` with the locale of the current URL, so
 * navigation stays inside the active language (on `/pt/blog`, a card linking
 * to `/blog/x` resolves to `/pt/blog/x`). External, mailto and hash hrefs
 * pass through untouched. It is a client component so it can read the URL, but
 * it can be rendered from server components.
 */
export default function LocaleLink({
  href,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  const first = pathname.split("/")[1] ?? "";
  const current: Locale = isLocale(first) ? first : defaultLocale;

  const isInternal = href.startsWith("/");
  return <Link href={isInternal ? localizePath(href, current) : href} {...props} />;
}

export { barePathOf };
