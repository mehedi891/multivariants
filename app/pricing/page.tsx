import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

type Plan = {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  discount?: string;
  note?: string;
  icon: string;
  popular?: boolean;
  bullets: string[];
};

type ComparisonCell = string | boolean;

type ComparisonRow = {
  feature: string;
  development: ComparisonCell;
  standard: ComparisonCell;
  professional: ComparisonCell;
};

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";
const demoLink = "https://multivariant.myshopify.com/collections/all";

const plans: Plan[] = [
  {
    name: "Development Stores",
    price: "Free",
    subtitle: "Perfect for testing before go-live",
    description:
      "For developers and merchants who want to test MultiVariants before launching their store.",
    icon: "⭐",
    bullets: [
      "Free for development stores",
      "Access all features for development and testing",
      "Full feature preview before launch",
      "24/7 live support",
    ],
  },
  {
    name: "Standard Plan",
    price: "$12.99",
    subtitle: "/ month",
    description:
      "Ideal for Shopify stores that want to simplify variant ordering and enable bulk purchases.",
    discount: "20% discount on annual plans",
    note: "Example: Minimum cart value $100 • Minimum order items 12",
    icon: "⚡",
    bullets: [
      "Display all variants with quantity input",
      "Variant combination list display",
      "Variant inventory validation",
      "Show total order price",
      "Product rule management",
      "Custom out-of-stock badges",
      "Sticky action buttons",
      "Global cart restrictions",
    ],
  },
  {
    name: "Professional Plan",
    price: "$29.99",
    subtitle: "/ month",
    description:
      "Includes all Standard features with advanced controls for scaling B2B and wholesale stores.",
    discount: "20% discount on annual plans",
    note: "Example: Bundle quantities of 10, 20, 50, 100 units",
    icon: "👑",
    popular: true,
    bullets: [
      "Everything in Standard",
      "Variant custom text fields",
      "Direct checkout button",
      "Variant bundle quantity dropdown",
      "Advanced variant display modes",
      "Theme customization and custom CSS",
      "Min/max quantity rules per variant",
      "Min/max order value restrictions",
    ],
  },
];

const faqs = [
  {
    q: "Do you offer a free plan?",
    a: "Yes. Development stores can use MultiVariants for free to test all major capabilities before launch.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. Paid plans include a 7-day free trial so you can evaluate fit before committing.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can switch plans anytime based on your store's ordering volume and requirements.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel at any time from your Shopify app billing settings.",
  },
  {
    q: "Will uninstalling the app affect my theme?",
    a: "No permanent theme damage is made. We follow safe integration patterns and can help with cleanup if needed.",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Bulk variant ordering table",
    development: true,
    standard: true,
    professional: true,
  },
  {
    feature: "Min/Max quantity rules",
    development: "Preview only",
    standard: true,
    professional: true,
  },
  {
    feature: "Variant inventory validation",
    development: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Bundle quantity dropdown",
    development: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Custom text fields per variant",
    development: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Theme customization and custom CSS",
    development: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Global cart restrictions",
    development: "Preview only",
    standard: true,
    professional: true,
  },
  {
    feature: "Support level",
    development: "24/7 chat",
    standard: "Priority chat",
    professional: "Priority + live call",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing plans for every Shopify store. Start with free development access and scale with Standard or Professional plans.",
  alternates: { canonical: "https://multivariants.com/pricing" },
};

export default function PricingPage() {
  const renderComparisonCell = (value: ComparisonCell, emphasize = false) => {
    if (typeof value === "boolean") {
      if (value) {
        return (
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
              emphasize
                ? "bg-[#6e72ff]/25 text-[#aeb3ff]"
                : "bg-accent/20 text-accent"
            }`}
            aria-label="Included"
          >
            ✓
          </span>
        );
      }
      return (
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/45"
          aria-label="Not included"
        >
          —
        </span>
      );
    }

    return (
      <span className={emphasize ? "font-semibold text-[#c5c9ff]" : ""}>
        {value}
      </span>
    );
  };

  return (
    <>
      <Navbar />
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
                Pricing
              </span>
              <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Simple Pricing for Every Shopify Store
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Start using MultiVariants to simplify bulk ordering for your
                customers. Choose the plan that fits your store size and ordering
                needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:w-auto"
                >
                  Get the App on Shopify
                </Link>
                <Link
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 transition-all hover:border-primary hover:text-primary sm:w-auto"
                >
                  View Demo
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

          <div className="relative z-10 mx-auto max-w-6xl">
            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {plans.map((plan, idx) => (
                <li key={plan.name} className={plan.popular ? "lg:-mt-3" : ""}>
                  <AnimateIn direction="up" delay={idx * 70}>
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                        plan.popular
                          ? "border-[#6e72ff]/80 bg-gradient-to-b from-[#1c1f44]/95 to-[#0d1329]/98 shadow-[0_24px_46px_rgba(90,94,255,0.28)]"
                          : "border-white/15 bg-gradient-to-b from-[#1a223e]/92 to-[#0c1328]/96 backdrop-blur-xl"
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div
                          className={`absolute -right-10 -top-8 h-28 w-28 rounded-full blur-2xl ${
                            plan.popular ? "bg-[#6e72ff]/35" : "bg-primary/20"
                          }`}
                        />
                        <div
                          className={`absolute -left-8 bottom-8 h-24 w-24 rounded-full blur-2xl ${
                            plan.popular ? "bg-accent/20" : "bg-[#6e72ff]/15"
                          }`}
                        />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                      </div>

                      {plan.popular && (
                        <div className="absolute inset-x-0 top-0 z-20 h-14 border-b border-[#8d8fff]/55 bg-gradient-to-r from-[#5a5eff] via-[#6e72ff] to-[#6e72ff]">
                          <p className="pt-3 text-center text-xl leading-none text-white/80">
                            ✦
                          </p>
                          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                            Most Popular
                          </p>
                        </div>
                      )}

                      <div
                        className={`relative z-10 flex items-center gap-3 ${
                          plan.popular ? "pt-11" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                            plan.popular
                              ? "border border-[#8d8fff]/40 bg-[#6e72ff]/20 shadow-[0_0_24px_rgba(110,114,255,0.28)]"
                              : "border border-accent/35 bg-accent/15 shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                          }`}
                        >
                          {plan.icon}
                        </span>
                        <h2 className="text-[1.75rem] font-black leading-tight text-white">
                          {plan.name}
                        </h2>
                      </div>

                      <div className="relative z-10 mt-5 flex items-end gap-1">
                        <p
                          className={`text-4xl font-black leading-none ${
                            plan.popular ? "text-[#8f95ff]" : "text-white"
                          }`}
                        >
                          {plan.price}
                        </p>
                        {plan.price !== "Free" && (
                          <span className="pb-1 text-sm text-white/55">
                            {plan.subtitle}
                          </span>
                        )}
                      </div>

                      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                        {plan.description}
                      </p>

                      {plan.discount && (
                        <p className="relative z-10 mt-3 text-sm font-semibold text-accent">
                          {plan.discount}
                        </p>
                      )}

                      {plan.popular && (
                        <div className="relative z-10 mt-4 h-2 w-full rounded-full bg-white/15">
                          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#6e72ff] to-[#8f95ff]" />
                        </div>
                      )}

                      <ul className="relative z-10 mt-5 space-y-2.5">
                        {plan.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-white/75 sm:text-[15px]">
                            <span className="mt-1 text-accent">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.note && (
                        <p className="relative z-10 mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-relaxed text-white/45">
                          {plan.note}
                        </p>
                      )}

                      <Link
                        href={appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative z-10 mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          plan.popular
                            ? "bg-gradient-to-r from-[#5a5eff] to-[#6e72ff] text-white hover:brightness-110"
                            : "border border-white/20 bg-white/5 text-white/80 hover:border-primary hover:text-primary-light"
                        }`}
                      >
                        Get the App on Shopify
                      </Link>
                    </article>
                  </AnimateIn>
                </li>
              ))}
            </ul>
          </div>
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
                  Plan Comparison
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.26] text-white sm:text-4xl">
                  Compare Features Across Plans
                </h2>
                <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
                  Pick the right plan quickly by comparing core capabilities side
                  by side.
                </p>
              </div>

              <ul className="mt-8 space-y-3 md:hidden">
                {comparisonRows.map((row, index) => (
                  <li key={row.feature}>
                    <AnimateIn direction="up" delay={index * 35}>
                      <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                        <p className="text-sm font-semibold text-white">
                          {row.feature}
                        </p>
                        <dl className="mt-3 space-y-2.5 text-sm text-white/75">
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-white/60">Development</dt>
                            <dd>{renderComparisonCell(row.development)}</dd>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-white/60">Standard</dt>
                            <dd>{renderComparisonCell(row.standard)}</dd>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <dt className="font-medium text-[#c5c9ff]">Professional</dt>
                            <dd>{renderComparisonCell(row.professional, true)}</dd>
                          </div>
                        </dl>
                      </article>
                    </AnimateIn>
                  </li>
                ))}
              </ul>

              <div className="mt-8 hidden overflow-x-auto rounded-3xl border border-white/15 glass shadow-[0_18px_42px_rgba(0,0,0,0.35)] md:block">
                <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr className="text-sm uppercase tracking-wide text-white/55">
                      <th className="border-b border-white/10 px-5 py-4 font-semibold sm:px-6">
                        Feature
                      </th>
                      <th className="border-b border-white/10 px-5 py-4 font-semibold sm:px-6">
                        Development
                      </th>
                      <th className="border-b border-white/10 px-5 py-4 font-semibold sm:px-6">
                        Standard
                      </th>
                      <th className="border-b border-white/10 bg-[#6e72ff]/10 px-5 py-4 font-semibold text-[#c5c9ff] sm:px-6">
                        Professional
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={`transition-colors duration-200 hover:bg-white/[0.05] ${
                          index % 2 === 0 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <td className="border-b border-white/10 px-5 py-4 text-sm font-medium text-white/85 sm:px-6 sm:text-[15px]">
                          {row.feature}
                        </td>
                        <td className="border-b border-white/10 px-5 py-4 text-sm text-white/70 sm:px-6 sm:text-[15px]">
                          {renderComparisonCell(row.development)}
                        </td>
                        <td className="border-b border-white/10 px-5 py-4 text-sm text-white/70 sm:px-6 sm:text-[15px]">
                          {renderComparisonCell(row.standard)}
                        </td>
                        <td className="border-b border-white/10 bg-[#6e72ff]/8 px-5 py-4 text-sm text-white/80 sm:px-6 sm:text-[15px]">
                          {renderComparisonCell(row.professional, true)}
                        </td>
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
                Trusted by Shopify Merchants Worldwide
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                MultiVariants is used by 13,000+ Shopify merchants across 120+
                countries to simplify variant ordering and increase average
                order value.
              </p>
              <Link
                href={appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:w-auto"
              >
                Start Free Trial
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
                Frequently Asked Questions
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
                Everything you need to know before choosing your plan.
              </p>
              <ul className="mt-8 space-y-4">
                {faqs.map((item, index) => (
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
      <Footer />
    </>
  );
}
