import Link from "next/link";
import AnimateIn from "./AnimateIn";

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

export default function CTASection() {
  return (
    <section className="px-[5%] py-16 lg:py-20" aria-labelledby="cta-heading">
      <AnimateIn direction="up">
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] px-6 py-16 text-center shadow-[0_24px_60px_rgba(60,80,190,0.35)] sm:px-10 lg:py-20"
          style={{
            background:
              "linear-gradient(115deg, #4338ca 0%, #4f7fd6 52%, #47C1BF 100%)",
          }}
        >
          {/* Soft light + noise accents */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2
              id="cta-heading"
              className="text-3xl font-black leading-[1.15] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl"
            >
              Unlock MultiVariants&rsquo; Full Potential — Risk-Free!
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Get started in one click and discover how one-click bulk ordering can
              transform your Shopify store&rsquo;s sales.
            </p>
            <div className="mt-8">
              <Link
                href={appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-px hover:bg-white hover:text-primary sm:text-base"
              >
                Start Your Free Trial
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
