import Link from "next/link";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localeMeta, localizePath, toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Branded, localized 404, rendered inside the [lang] layout.
 *
 * Without this file every notFound() — and every unmatched URL routed to the
 * [...rest] catch-all — fell through to Next's bare error document: no navbar
 * or footer, and no <html lang>. It receives no props, so the language comes
 * from the header proxy.ts sets. Next injects `noindex` on 404s automatically.
 */
export default async function NotFound() {
  const locale = toLocale((await headers()).get("x-mv-locale") ?? "");
  const dict = await getDictionary(locale);
  const t = dict.notFound;

  const popular = [
    { href: "/features", label: dict.nav.features },
    { href: "/pricing", label: dict.nav.pricing },
    { href: "/blog", label: dict.nav.blog },
    { href: "/academy", label: dict.nav.docs },
    { href: "/faq", label: dict.nav.faq },
  ];

  return (
    <div lang={localeMeta[locale].hreflang}>
      <Navbar locale={locale} dict={dict} />
      <main
        id="main-content"
        className="relative overflow-x-clip px-[5%] py-24 lg:py-32"
        style={{ background: "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-16 top-10 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px]" />
          <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-gradient text-7xl font-black leading-none sm:text-8xl">{t.eyebrow}</p>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60">{t.body}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={localizePath("/", locale)}
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-primary-dark"
            >
              {t.home}
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className="inline-flex items-center rounded-xl border-[1.5px] border-white/25 px-6 py-3 text-sm font-semibold text-white/75 transition-all hover:border-primary hover:text-primary"
            >
              {t.contact}
            </Link>
          </div>

          <nav aria-label={t.popular} className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">{t.popular}</h2>
            <ul className="mt-4 flex list-none flex-wrap justify-center gap-2" role="list">
              {popular.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizePath(item.href, locale)}
                    className="inline-flex min-h-11 items-center rounded-lg border border-white/15 px-4 text-sm font-medium text-white/75 transition-colors hover:border-primary/50 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
