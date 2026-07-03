import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import PricingPlans from "@/components/PricingPlans";

type ComparisonCell = string | boolean;

type ComparisonRow = {
  feature: string;
  starter: ComparisonCell;
  standard: ComparisonCell;
  professional: ComparisonCell;
};

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";
const demoLink = "https://multivariant.myshopify.com/collections/all";

const faqs = [
  {
    q: "Do you offer a free plan?",
    a: "Yes. The Starter plan is free forever and includes core variant display features, so you can start using MultiVariants at no cost.",
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
    feature: "Variant image icons & display",
    starter: true,
    standard: true,
    professional: true,
  },
  {
    feature: "Out-of-stock badge",
    starter: true,
    standard: "Custom",
    professional: "Custom",
  },
  {
    feature: "Hide out-of-stock variants",
    starter: true,
    standard: true,
    professional: true,
  },
  {
    feature: "Add to Cart button customization",
    starter: true,
    standard: true,
    professional: true,
  },
  {
    feature: "Flexible price display",
    starter: true,
    standard: true,
    professional: true,
  },
  {
    feature: "Bulk variant ordering with quantity box",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Inventory tracking & stock validation",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "B2B wholesale pricing",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Show total order price",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Apply to specific or grouped products",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Global cart restriction & customer eligibility",
    starter: false,
    standard: true,
    professional: true,
  },
  {
    feature: "Custom text fields per variant",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Direct checkout button",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Incremental / bundle quantity",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Swatch option display",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Custom CSS",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Min/Max quantity rules",
    starter: false,
    standard: false,
    professional: true,
  },
  {
    feature: "Product options (custom input fields)",
    starter: false,
    standard: false,
    professional: true,
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing plans for every Shopify store. Start free with the Starter plan and scale with Standard or Professional as your bulk ordering grows.",
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
              <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
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

          <PricingPlans />
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
                            <dt className="text-white/60">Starter</dt>
                            <dd>{renderComparisonCell(row.starter)}</dd>
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
                        Starter
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
                          {renderComparisonCell(row.starter)}
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
