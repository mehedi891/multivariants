import Link from "next/link";
import AnimateIn from "./AnimateIn";

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0f0b26 100%)" }}
      aria-labelledby="cta-heading"
    >
      <AnimateIn direction="up">
        <div className="relative mx-auto max-w-6xl">
          {/* Outer glow behind the card */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60 blur-3xl"
            aria-hidden="true"
            style={{ background: "linear-gradient(120deg, rgba(92,106,196,0.45), rgba(71,193,191,0.35))" }}
          />

          <div
            className="noise relative overflow-hidden rounded-[32px] px-6 py-16 text-center ring-1 ring-white/15 sm:px-10 lg:py-20"
            style={{
              background:
                "linear-gradient(130deg, #3b2f92 0%, #5C6AC4 40%, #4f7bc9 68%, #47C1BF 100%)",
            }}
          >
            {/* Decorative light accents */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-28 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
              <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                Get Started Today
              </span>

              <h2
                id="cta-heading"
                className="mt-5 text-3xl/[1.3] font-black tracking-tight text-white text-balance sm:text-4xl/[1.3] lg:text-[3.25rem]/[1.3]"
              >
                Ready to Sell More with Bulk Variant Ordering?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Add one-click bulk add-to-cart to your Shopify store and watch your
                average order value grow — risk-free.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(0,0,0,0.35)] sm:text-base"
                >
                  Get the App on Shopify
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-full border border-white/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15 sm:text-base"
                >
                  View Pricing
                </Link>
              </div>

              <p className="mt-6 text-[13px] font-medium text-white/70">
                Free plan available · 7-day free trial · No coding required
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
