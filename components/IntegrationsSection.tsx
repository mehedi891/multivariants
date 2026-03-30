const integrationItems = [
  {
    title: "All Shopify Themes",
    desc: "Works with any theme out of the box",
  },
  {
    title: "GemPages",
    desc: "Full compatibility with page builder",
  },
  {
    title: "PageFly",
    desc: "Seamless integration",
  },
  {
    title: "Shogun",
    desc: "Drag and drop ready",
  },
];

const benefitItems = [
  {
    key: "setup",
    title: "Easy Setup",
    desc: "Install and configure in under 5 minutes. No coding required.",
  },
  {
    key: "performance",
    title: "Fast Performance",
    desc: "Optimized code that won't slow down your store.",
  },
  {
    key: "security",
    title: "Secure & Reliable",
    desc: "Built on Shopify's secure infrastructure with 99.9% uptime.",
  },
];

function RightIcon({ kind }: { kind: "setup" | "performance" | "security" }) {
  if (kind === "setup") {
    return (
      <svg className="h-6 w-6 text-[#49a874]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <path d="M7.4 3.3h5.2l.6 2 1.9 1.1 2-.4 2.1 3.7-1.5 1.4v2.2l1.5 1.4-2.1 3.7-2-.4-1.9 1.1-.6 2H7.4l-.6-2-1.9-1.1-2 .4-2.1-3.7L2.3 13v-2.2L.8 9.4 2.9 5.7l2 .4L6.8 5l.6-1.7Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="11" r="2.2" />
      </svg>
    );
  }

  if (kind === "performance") {
    return (
      <svg className="h-6 w-6 text-[#49a874]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <path d="M11.1 2.7 6.3 10h3.5L8.8 17.3l4.9-7.3h-3.5l.9-7.3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 text-[#49a874]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M10 2.5 16 4.8v5c0 3.6-2.4 6.8-6 7.7-3.6-.9-6-4.1-6-7.7v-5l6-2.3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IntegrationsSection() {
  return (
    <section className="bg-[#f4f7fb] px-[5%] py-14 sm:py-16 lg:py-20" id="integrations" aria-labelledby="integrations-heading">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex rounded-full bg-[#e3f3ea] px-4 py-1.5 text-[1rem] font-semibold text-[#49a874]">
            Integrations
          </span>

          <h2
            id="integrations-heading"
            className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#1f2938] sm:text-5xl lg:text-[3.35rem]"
          >
            Works with Your Existing Setup
          </h2>

          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[#5f6f86] sm:text-[1.22rem]">
            MultiVariants integrates seamlessly with all Shopify themes and
            popular page builders. No complex configuration needed.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {integrationItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e3eaf2] bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#b8c9df] hover:shadow-[0_14px_24px_rgba(15,23,42,0.10)] sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center text-[#49a874]" aria-hidden="true">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9">
                      <circle cx="10" cy="10" r="8" />
                      <path d="M6.3 10.2 8.9 12.7 13.8 7.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base font-bold leading-tight text-[#1f2938] sm:text-[1.05rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#627189] sm:text-[0.98rem]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {benefitItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[#d6dee8] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#adc0d8] hover:shadow-[0_20px_34px_rgba(15,23,42,0.12)] sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5f3ec]" aria-hidden="true">
                  <RightIcon kind={item.key as "setup" | "performance" | "security"} />
                </span>
                <div>
                  <h3 className="text-[1.55rem] font-black leading-tight text-[#1f2938] sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[1.02rem] leading-relaxed text-[#5f6f86] sm:text-[1.1rem]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
