import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getFeaturesContent, type FeaturesContent } from "@/i18n/content";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

type FeatureItem = {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  demoLabel: string;
  imageSrc?: string;
  demoUrl?: string;
  reverse?: boolean;
};

type SupportItem = {
  label: string;
  detail: string;
  kind:
    | "installation"
    | "customization"
    | "feature-assistance"
    | "collaboration"
    | "live-support";
};

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";
const demoLink = "https://multivariant.myshopify.com/collections/all";

// Icons, screenshots and demo links are structural and stay in code; the
// translated title/subtitle/desc/bullets are merged onto them by index from
// messages/features/<locale>.json.
const featureVisuals = [
  { icon: "🧩", imageSrc: "/images/features/mix-n-match-box.webp", demoUrl: "https://multivariant.myshopify.com/collections/mix-n-match" },
  { icon: "✅", imageSrc: "/images/features/apply-restriction-minmax-value.webp", demoUrl: "https://multivariant.myshopify.com/collections/minimum-order-limit" },
  { icon: "➕", imageSrc: "/images/features/incremental-inc.webp", demoUrl: "https://multivariant.myshopify.com/collections/quantity-interval" },
  { icon: "📦", imageSrc: "/images/features/bundle-qty-demo.webp", demoUrl: "https://multivariant.myshopify.com/collections/bundle-quantity" },
  { icon: "📱", imageSrc: "/images/features/any-device.webp", demoUrl: "https://multivariant.myshopify.com" },
  { icon: "🧱", imageSrc: "/images/features/customize-variants-display-layout.webp", demoUrl: "https://multivariant.myshopify.com/collections/all" },
  { icon: "🛒", imageSrc: "/images/features/cart-estrictions.webp", demoUrl: "https://multivariant.myshopify.com/collections/all" },
  { icon: "⚖️", imageSrc: "/images/features/fractional-qty.webp" },
  { icon: "⚙️", imageSrc: "/images/features/easy-to-use-and-configure.webp", demoUrl: "https://multivariant.myshopify.com/collections/all" },
];

function buildFeatureItems(t: FeaturesContent): FeatureItem[] {
  return featureVisuals.map((v, i) => {
    const copy = t.core.items[i];
    return {
      ...v,
      title: copy?.title ?? "",
      subtitle: copy?.subtitle ?? "",
      desc: copy?.desc ?? "",
      bullets: copy?.bullets ?? [],
      demoLabel: copy?.demoLabel ?? "",
    };
  });
}

const supportKinds = ["installation", "customization", "feature-assistance", "collaboration", "live-support"] as const;

function buildSupportItems(t: FeaturesContent): SupportItem[] {
  return supportKinds.map((kind, i) => ({
    kind,
    label: t.support.items[i]?.label ?? "",
    detail: t.support.items[i]?.detail ?? "",
  }));
}

const benefitIcons = ["⚡", "💰", "🛒", "🎛️", "🎨", "📱", "✨", "🎯", "⚙️", "🤝", "🚀", "📈"];

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const { meta } = await getFeaturesContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/features",
    locale,
  });
}

function SupportIcon({ kind }: { kind: SupportItem["kind"] }) {
  if (kind === "installation") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7 16v2.5A2.5 2.5 0 0 0 9.5 21h5A2.5 2.5 0 0 0 17 18.5V16" />
        <path d="M12 3v11" />
        <path d="M8.5 10.5 12 14l3.5-3.5" />
      </svg>
    );
  }
  if (kind === "customization") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="12" height="12" rx="2" />
        <path d="M8 16v4M6 20h4" />
        <path d="M15 15l2.4.4 1 1.8-1.4 2 1 1.8-1.6 1.1-1.7-1-1.8 1h-2l-.8-1.8 1.1-1.6-1.1-1.8 1.1-1.8 2-.3" />
      </svg>
    );
  }
  if (kind === "feature-assistance") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m7 8 4 4-4 4" />
        <path d="M13 8h8M13 12h8M13 16h8" />
      </svg>
    );
  }
  if (kind === "collaboration") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 9a3 3 0 0 1 5.1-2.1l1.3 1.3a3 3 0 0 1 0 4.2l-1.5 1.5" />
        <path d="M15 15a3 3 0 0 1-5.1 2.1L8.6 15.8a3 3 0 0 1 0-4.2l1.5-1.5" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="11" height="8" rx="2" />
      <rect x="10" y="10" width="11" height="8" rx="2" />
      <path d="M16.5 14.5h2M17.5 13.5v2" />
      <path d="M6.5 8.5h4" />
    </svg>
  );
}

export default async function FeaturesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const content = await getFeaturesContent(locale);
  const featureItems = buildFeatureItems(content);
  const supportItems = buildSupportItems(content);
  const merchantBenefits = content.benefits.items.map((text, i) => ({
    icon: benefitIcons[i] ?? "",
    text,
  }));
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-20 top-10 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[80px] animate-pulse [animation-duration:8s]" />
            <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[80px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="text-center">
                <span className="inline-flex rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                  {content.hero.badge}
                </span>
                <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
                  {content.hero.title}
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
                  {content.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all sm:w-auto"
                  >
                    {content.hero.primary}
                  </Link>
                  <Link
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 hover:border-primary hover:text-primary transition-all sm:w-auto"
                  >
                    {content.hero.secondary}
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(170deg, #0b1223 0%, #111a31 45%, #171238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-16 h-[280px] w-[280px] rounded-full bg-primary/12 blur-[70px] animate-pulse [animation-duration:8s]" />
            <div className="absolute right-[-80px] bottom-8 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[80px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                  {content.core.badge}
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.26] tracking-tight text-white sm:text-4xl">
                  {content.core.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                  {content.core.subtitle}
                </p>
              </div>
            </AnimateIn>

            <ul className="space-y-6 sm:space-y-7 lg:space-y-8">
              {featureItems.map((item, index) => (
                <li key={item.title}>
                  <AnimateIn direction="up" delay={(index % 2) * 80}>
                    <article className="rounded-3xl border border-white/12 glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] sm:p-6 lg:p-7">
                      <div
                        className={`grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8 ${
                          item.reverse ? "lg:[direction:rtl]" : ""
                        }`}
                      >
                        <div className={item.reverse ? "[direction:ltr]" : ""}>
                          <div className="mb-6 flex items-start gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-xl ring-1 ring-accent/30">
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <h3 className="break-words text-xl font-black leading-tight text-white sm:text-2xl lg:text-[1.85rem]">
                                {item.title}
                              </h3>
                              <p className="mt-1.5 text-xs text-white/45 sm:text-sm lg:text-base">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed text-white/60 sm:text-[15px] lg:text-base">
                            {item.desc}
                          </p>

                          <ul className="mt-3 space-y-2.5">
                            {item.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/60 sm:text-[15px] lg:text-base">
                                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                              href={appLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-all sm:w-auto"
                            >
                              {content.core.getApp}
                              <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                              href={item.demoUrl ?? demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:border-primary hover:text-primary-light transition-all sm:w-auto"
                            >
                              {content.core.liveDemo}
                            </Link>
                          </div>
                        </div>

                        <div className={item.reverse ? "[direction:ltr]" : ""}>
                          {item.imageSrc ? (
                            <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.02] p-3 sm:p-4">
                              <div className="relative w-full overflow-hidden rounded-2xl bg-white/95 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] aspect-[4/3] sm:aspect-[16/10]">
                                <Image
                                  src={item.imageSrc}
                                  alt={`${item.title} screenshot`}
                                  fill
                                  className="object-contain object-center"
                                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 44vw, (min-width: 640px) 88vw, 92vw"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-8 text-center">
                              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl text-white/45">
                                {item.icon}
                              </span>
                              <p className="mt-4 text-base font-medium text-white/35 sm:text-lg">
                                {item.title} Screenshot
                              </p>
                              <p className="mt-1 text-xs text-white/25 sm:text-sm">
                                {item.demoLabel}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </AnimateIn>
                </li>
              ))}
            </ul>

            <AnimateIn direction="up" delay={120}>
              <section className="relative mt-12 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#1c2546]/90 via-[#171f3f]/90 to-[#101a36]/95 px-5 py-9 shadow-[0_22px_56px_rgba(0,0,0,0.4)] sm:px-8 lg:mt-14 lg:px-12 lg:py-12">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute -left-20 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute -right-20 top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                </div>

                <div className="relative z-10">
                  <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-flex rounded-full border border-primary/35 bg-primary/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                      {content.support.badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-black leading-[1.26] tracking-tight text-white sm:text-4xl">
                      {content.support.title}
                    </h2>
                    <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                      {content.support.subtitle}
                    </p>
                  </div>

                  <div className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-3 text-center sm:grid-cols-3">
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">24/7</p>
                      <p>Global coverage</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">&lt;5 min</p>
                      <p>Average first response</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">Live call</p>
                      <p>Screen-share support</p>
                    </div>
                  </div>

                  <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    {supportItems.map((item, i) => (
                      <li
                        key={item.label}
                        className={`group rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_34px_rgba(28,118,188,0.28)] lg:col-span-2 lg:min-h-[210px] ${
                          i === 3 ? "lg:col-start-2" : ""
                        }`}
                      >
                        <div className="flex h-full items-start gap-3">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:bg-primary/25">
                            <SupportIcon kind={item.kind} />
                          </span>
                          <div className="min-w-0">
                            <p className="break-words text-base font-bold leading-snug text-white sm:text-lg">
                              {item.label}
                            </p>
                            <p className="mt-1.5 break-words text-sm leading-relaxed text-white/65 sm:text-[15px]">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#16243a] px-[5%] py-14">
          <AnimateIn direction="up">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center text-2xl font-black text-white sm:text-3xl">
                {content.benefits.title}
              </h2>
              <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {merchantBenefits.map((b) => (
                  <li
                    key={b.text}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_34px_rgba(28,118,188,0.25)]"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 text-lg transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:bg-primary/25">
                      {b.icon}
                    </span>
                    <span className="text-sm font-semibold text-white/85 sm:text-[15px]">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </section>

        <section
          className="px-[5%] py-14"
          style={{
            background:
              "linear-gradient(180deg, #0e1730 0%, #121f38 100%)",
          }}
        >
          <AnimateIn direction="up">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-black leading-[1.26] text-white sm:text-4xl">
                {content.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                {content.cta.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all sm:w-auto"
                >
                  {content.cta.primary}
                </Link>
                <Link
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 hover:border-primary hover:text-primary transition-all sm:w-auto"
                >
                  {content.cta.secondary}
                </Link>
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
