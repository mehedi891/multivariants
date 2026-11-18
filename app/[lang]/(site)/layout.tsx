import { SitePromoBanner } from "@/components/PromoBanner";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Chrome shared by every regular page: the promo bar above the navbar. (Each
 * page renders its own Navbar and Footer.)
 *
 * It lives in this route group rather than the root [lang] layout because a page
 * can't remove what a parent layout renders, and CMS landing pages
 * (../(landing)/[slug]) must be able to hide the whole header. Route groups
 * don't change URLs.
 */
export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <>
      <SitePromoBanner locale={locale} dict={dict} />
      {children}
    </>
  );
}
