import AnimateIn from "./AnimateIn";

const integrationItems = [
  { title: "All Shopify Themes", desc: "Works with any theme out of the box" },
  { title: "GemPages",           desc: "Full compatibility with page builder" },
  { title: "PageFly",            desc: "Seamless integration" },
  { title: "Shogun",             desc: "Drag and drop ready" },
];

const benefitItems = [
  { key: "setup",       title: "Easy Setup",         desc: "Install and configure in under 5 minutes. No coding required." },
  { key: "performance", title: "Fast Performance",   desc: "Optimized code that won't slow down your store." },
  { key: "security",    title: "Secure & Reliable",  desc: "Built on Shopify's secure infrastructure with 99.9% uptime." },
];

function BenefitIcon({ kind }: { kind: string }) {
  if (kind === "setup") return (
    <svg className="h-6 w-6 text-accent" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M7.4 3.3h5.2l.6 2 1.9 1.1 2-.4 2.1 3.7-1.5 1.4v2.2l1.5 1.4-2.1 3.7-2-.4-1.9 1.1-.6 2H7.4l-.6-2-1.9-1.1-2 .4-2.1-3.7L2.3 13v-2.2L.8 9.4 2.9 5.7l2 .4L6.8 5l.6-1.7Z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="11" r="2.2"/>
    </svg>
  );
  if (kind === "performance") return (
    <svg className="h-6 w-6 text-accent" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M11.1 2.7 6.3 10h3.5L8.8 17.3l4.9-7.3h-3.5l.9-7.3Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg className="h-6 w-6 text-accent" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M10 2.5 16 4.8v5c0 3.6-2.4 6.8-6 7.7-3.6-.9-6-4.1-6-7.7v-5l6-2.3Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function IntegrationsSection() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(150deg, #052e16 0%, #064e3b 50%, #0f172a 100%)" }}
      id="integrations"
      aria-labelledby="integrations-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* Left */}
        <AnimateIn direction="right">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-semibold text-emerald-400 border border-emerald-500/30">
              Integrations
            </span>
            <h2 id="integrations-heading" className="mt-2 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Works with Your Existing Setup
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
              MultiVariants integrates seamlessly with all Shopify themes and popular page builders. No complex configuration needed.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {integrationItems.map((item, i) => (
                <AnimateIn key={item.title} direction="up" delay={i * 80}>
                  <article className="rounded-2xl p-4 glass border-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-emerald-400" aria-hidden="true">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="10" cy="10" r="8"/>
                          <path d="M6.3 10.2 8.9 12.7 13.8 7.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <p className="mt-1 text-xs text-white/45">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {benefitItems.map((item, i) => (
            <AnimateIn key={item.title} direction="left" delay={i * 120}>
              <article className="rounded-3xl p-5 glass border-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition-all duration-300 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25" aria-hidden="true">
                    <BenefitIcon kind={item.key} />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-white sm:text-xl">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55 sm:text-base">{item.desc}</p>
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
