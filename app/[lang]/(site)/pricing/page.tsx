import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPricingContent } from "@/i18n/content";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import PricingPlans from "@/components/PricingPlans";
import { LIMIT_KEYS, PLAN_SPECS, formatLimit, planCopy } from "@/lib/pricing";

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";
const demoLink = "https://multivariant.myshopify.com/collections/all";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const { meta } = await getPricingContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/pricing",
    locale,
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const content = await getPricingContent(locale);
  const plans = PLAN_SPECS.map((spec) => ({ spec, copy: planCopy(content, spec.id) }));

  // Features are cumulative, so each plan's own list becomes one group of rows
  // that is included in that plan and every plan above it.
  const featureGroups = plans
    .map(({ copy }, tier) => ({
      tier,
      label:
        tier === 0
          ? content.comparison.everyPlan
          : content.comparison.addedIn.replace("{plan}", copy.name),
      features: copy.features,
    }))
    .filter((group) => group.features.length > 0);

  const limitRows = LIMIT_KEYS.map((key) => ({
    key,
    label: content.limits[key],
    values: PLAN_SPECS.map((spec) => {
      const value = spec.limits[key];
      return value === undefined ? null : formatLimit(key, value, content);
    }),
  }));

  const renderCheck = (included: boolean, emphasize = false) =>
    included ? (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
          emphasize ? "bg-[#6e72ff]/25 text-[#aeb3ff]" : "bg-accent/20 text-accent"
        }`}
        aria-label={content.comparison.included}
      >
        ✓
      </span>
    ) : (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/45"
        aria-label={content.comparison.notIncluded}
      >
        —
      </span>
    );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar locale={locale} dict={dict} />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-20 top-10 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[80px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                {content.hero.badge}
              </span>
              <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                {content.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:w-auto"
                >
                  {content.hero.primary}
                </Link>
                <Link
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 transition-all hover:border-primary hover:text-primary sm:w-auto"
                >
                  {content.hero.secondary}
                </Link>
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
            <div className="absolute left-[-100px] top-24 h-[260px] w-[260px] rounded-full bg-primary/10 blur-[70px]" />
            <div className="absolute right-[-80px] bottom-8 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[75px]" />
          </div>

          <PricingPlans content={content} dict={dict} />
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-16"
          style={{
            background:
              "linear-gradient(180deg, #0f1732 0%, #131d38 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-primary/12 blur-[70px]" />
            <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-[#6e72ff]/15 blur-[70px]" />
          </div>

          <AnimateIn direction="up">
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="text-center">
                <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                  {content.comparison.badge}
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.26] text-white sm:text-4xl">
                  {content.comparison.title}
                </h2>
                <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
                  {content.comparison.subtitle}
                </p>
              </div>

              {/* Mobile: one card per group — every row in a group shares the same plans */}
              <div className="mt-8 space-y-4 md:hidden">
                {featureGroups.map((group) => (
                  <article
                    key={group.tier}
                    className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {group.label}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {plans.map(({ spec, copy }, planIdx) => {
                        const included = planIdx >= group.tier;
                        return (
                          <li
                            key={spec.id}
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              included
                                ? "bg-accent/15 text-accent"
                                : "bg-white/[0.06] text-white/35 line-through"
                            }`}
                          >
                            <span aria-hidden="true">{included ? "✓ " : ""}</span>
                            {copy.name}
                            <span className="sr-only">
                              {": "}
                              {included ? content.comparison.included : content.comparison.notIncluded}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {group.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
                          <span className="text-white/35" aria-hidden="true">
                            •
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}

                <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {content.limits.heading}
                  </h3>
                  <div className="mt-1 divide-y divide-white/10">
                    {limitRows.map((row) => (
                      <div key={row.key} className="py-3">
                        <p className="text-sm font-semibold text-white">{row.label}</p>
                        <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                          {plans.map(({ spec, copy }, planIdx) => (
                            <div key={spec.id} className="flex items-center justify-between gap-2">
                              <dt className="text-white/55">{copy.name}</dt>
                              <dd className="font-semibold text-white/85">
                                {row.values[planIdx] ?? <span className="text-white/35">—</span>}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="mt-8 hidden overflow-x-auto rounded-3xl border border-white/15 glass shadow-[0_18px_42px_rgba(0,0,0,0.35)] md:block">
                <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr className="text-sm uppercase tracking-wide text-white/55">
                      <th scope="col" className="border-b border-white/10 px-5 py-4 font-semibold sm:px-6">
                        {content.comparison.colFeature}
                      </th>
                      {plans.map(({ spec, copy }) => (
                        <th
                          key={spec.id}
                          scope="col"
                          className={`w-[14%] border-b border-white/10 px-3 py-4 text-center font-semibold ${
                            spec.popular ? "bg-[#6e72ff]/10 text-[#c5c9ff]" : ""
                          }`}
                        >
                          {copy.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {featureGroups.map((group) => (
                    <tbody key={group.tier}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={plans.length + 1}
                          className="border-b border-white/10 bg-white/[0.04] px-5 pb-2.5 pt-5 text-xs font-semibold uppercase tracking-wide text-accent sm:px-6"
                        >
                          {group.label}
                        </th>
                      </tr>
                      {group.features.map((feature) => (
                        <tr key={feature} className="transition-colors duration-200 hover:bg-white/[0.05]">
                          <th
                            scope="row"
                            className="border-b border-white/10 px-5 py-3 text-sm font-medium text-white/85 sm:px-6 sm:text-[15px]"
                          >
                            {feature}
                          </th>
                          {plans.map(({ spec }, planIdx) => (
                            <td
                              key={spec.id}
                              className={`border-b border-white/10 px-3 py-3 text-center ${
                                spec.popular ? "bg-[#6e72ff]/8" : ""
                              }`}
                            >
                              {renderCheck(planIdx >= group.tier, spec.popular)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  ))}
                  <tbody>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={plans.length + 1}
                        className="border-b border-white/10 bg-white/[0.04] px-5 pb-2.5 pt-5 text-xs font-semibold uppercase tracking-wide text-accent sm:px-6"
                      >
                        {content.limits.heading}
                      </th>
                    </tr>
                    {limitRows.map((row) => (
                      <tr key={row.key} className="transition-colors duration-200 hover:bg-white/[0.05]">
                        <th
                          scope="row"
                          className="border-b border-white/10 px-5 py-3 text-sm font-medium text-white/85 sm:px-6 sm:text-[15px]"
                        >
                          {row.label}
                        </th>
                        {plans.map(({ spec }, planIdx) => (
                          <td
                            key={spec.id}
                            className={`border-b border-white/10 px-3 py-3 text-center text-sm sm:text-[15px] ${
                              spec.popular ? "bg-[#6e72ff]/8 font-semibold text-[#c5c9ff]" : "text-white/75"
                            }`}
                          >
                            {row.values[planIdx] ?? <span className="text-white/35">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateIn>
        </section>

        <section className="bg-[#16243a] px-[5%] py-16">
          <AnimateIn direction="up">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-black leading-[1.26] text-white sm:text-4xl">
                {content.trust.title}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                {content.trust.subtitle}
              </p>
              <Link
                href={appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:w-auto"
              >
                {content.trust.cta}
              </Link>
            </div>
          </AnimateIn>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-16"
          style={{
            background:
              "linear-gradient(180deg, #0e1730 0%, #121f38 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-80px] top-10 h-56 w-56 rounded-full bg-[#6e72ff]/14 blur-[72px]" />
            <div className="absolute right-[-100px] bottom-0 h-60 w-60 rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <AnimateIn direction="up">
            <div className="relative z-10 mx-auto max-w-4xl">
              <h2 className="text-center text-3xl font-black leading-[1.26] text-white sm:text-4xl">
                {content.faq.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
                {content.faq.subtitle}
              </p>
              <ul className="mt-8 space-y-4">
                {content.faq.items.map((item, index) => (
                  <li key={item.q}>
                    <AnimateIn direction="up" delay={index * 45}>
                      <details className="group overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-4 shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-primary/35 sm:p-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-white sm:text-base">
                          <span>{item.q}</span>
                          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.06]">
                            <span className="absolute h-[2px] w-3.5 rounded bg-white/75" />
                            <span className="absolute h-[2px] w-3.5 rotate-90 rounded bg-white/75 transition-transform duration-300 group-open:rotate-0" />
                          </span>
                        </summary>
                        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-open:mt-3 group-open:grid-rows-[1fr] group-open:opacity-100">
                          <p className="overflow-hidden text-sm leading-relaxed text-white/65 sm:text-[15px]">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    </AnimateIn>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
