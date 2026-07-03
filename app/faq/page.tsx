import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { getPublicFaqs, type PublicFaqItem } from "./public-api";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about MultiVariants — bulk add to cart, Mix n Match, order restrictions, quantity increments, pricing, installation, and support for Shopify.",
  alternates: { canonical: "https://multivariants.com/faq" },
};

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

function FaqAccordion({ item, delay }: { item: PublicFaqItem; delay: number }) {
  return (
    <li>
      <AnimateIn direction="up" delay={delay}>
        <details className="group overflow-hidden rounded-2xl border border-white/16 bg-gradient-to-b from-white/[0.09] to-white/[0.03] shadow-[0_14px_36px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40 open:border-primary/45">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold text-white marker:hidden [&::-webkit-details-marker]:hidden sm:text-lg">
            {item.question}
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/15 text-primary-light transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm leading-relaxed text-white/70 sm:text-[15px]">
            {item.answer}
          </div>
        </details>
      </AnimateIn>
    </li>
  );
}

export default async function FaqPage() {
  const { categories, uncategorized } = await getPublicFaqs();

  const allItems: PublicFaqItem[] = [
    ...categories.flatMap((c) => c.faqs),
    ...uncategorized,
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const hasContent = allItems.length > 0;

  return (
    <>
      {hasContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
            <div className="absolute -left-16 top-6 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                Support
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Everything you need to know about MultiVariants — bulk ordering,
                restrictions, quantity rules, pricing, and support.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            {!hasContent ? (
              <p className="mx-auto max-w-md text-center text-white/60">
                FAQs are on the way. In the meantime, reach us at{" "}
                <a
                  href="mailto:support@multivariants.com"
                  className="text-primary-light hover:underline"
                >
                  support@multivariants.com
                </a>
                .
              </p>
            ) : (
              <div className="space-y-12">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <AnimateIn direction="up">
                      <h2 className="text-xl font-black text-white sm:text-2xl">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="mt-1.5 text-sm text-white/55">
                          {cat.description}
                        </p>
                      )}
                    </AnimateIn>
                    <ul className="mt-5 space-y-4">
                      {cat.faqs.map((item, i) => (
                        <FaqAccordion key={item.id} item={item} delay={i * 40} />
                      ))}
                    </ul>
                  </div>
                ))}

                {uncategorized.length > 0 && (
                  <div>
                    {categories.length > 0 && (
                      <AnimateIn direction="up">
                        <h2 className="text-xl font-black text-white sm:text-2xl">
                          More Questions
                        </h2>
                      </AnimateIn>
                    )}
                    <ul className={`${categories.length > 0 ? "mt-5" : ""} space-y-4`}>
                      {uncategorized.map((item, i) => (
                        <FaqAccordion key={item.id} item={item} delay={i * 40} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <AnimateIn direction="up" delay={80}>
              <div className="mt-12 rounded-3xl border border-white/16 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-7 text-center shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-9">
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  Still have questions?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                  Our team is happy to help with setup, custom workflows, and
                  anything else you need to get selling faster.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:-translate-y-px"
                  >
                    Get the App on Shopify
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl border-[1.5px] border-white/25 px-6 py-3 text-sm font-semibold text-white/75 transition-all hover:border-primary hover:text-primary"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
