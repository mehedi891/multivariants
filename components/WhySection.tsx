import AnimateIn from "./AnimateIn";

type Point = { icon: "clock" | "cursor" | "cart" | "bolt"; text: string };

const withoutPoints: Point[] = [
  { icon: "clock",  text: "Select variant, add to cart, repeat... for each item" },
  { icon: "cursor", text: "20+ clicks to order 5 different sizes" },
  { icon: "cart",   text: "Customers abandon bulk orders" },
];
const withPoints: Point[] = [
  { icon: "bolt",   text: "Add all variants in one simple table view" },
  { icon: "cursor", text: "3 clicks to order any number of variants" },
  { icon: "cart",   text: "Higher conversion, larger orders" },
];

function PointIcon({ icon, tone }: { icon: Point["icon"]; tone: "red" | "green" }) {
  const c = tone === "red" ? "#f87171" : "#34d399";
  if (icon === "clock") return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.8" aria-hidden="true">
      <circle cx="10" cy="10" r="8.2"/><path d="M10 5.6V10l3 1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (icon === "cursor") return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.8" aria-hidden="true">
      <path d="M3.8 3.2L14.7 8.2L9.4 9.7L7.8 15L3.8 3.2Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (icon === "cart") return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.8" aria-hidden="true">
      <path d="M2.8 4h1.8L6.1 12h8.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.4 6.2h9l-1.2 4.9H7.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.2" cy="15.5" r="1.2"/><circle cx="13.2" cy="15.5" r="1.2"/>
    </svg>
  );
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.9" aria-hidden="true">
      <path d="M11.1 2.8L6.6 10.5H10.2L8.9 17.2L13.4 9.5H9.8L11.1 2.8Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function WhySection() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
      id="why"
      aria-labelledby="problem-heading"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimateIn direction="up">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-accent">The Problem</p>
            <h2 id="problem-heading" className="text-3xl font-black leading-[1.26] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
              The Problem with Default Shopify Ordering
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              Shopify&apos;s default variant selector forces customers to add products one at a time.
              This frustrates bulk buyers and kills wholesale conversions.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
          {/* Without */}
          <AnimateIn direction="right" delay={100}>
            <article className="h-full rounded-3xl p-6 lg:p-8 glass border-red-500/20 hover:border-red-400/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] transition-all duration-300">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 5L15 15M15 5L5 15" strokeLinecap="round"/>
                  </svg>
                </span>
                <h3 className="text-xl font-black text-white sm:text-2xl">Without MultiVariants</h3>
              </div>
              <ul className="mb-5 space-y-3.5">
                {withoutPoints.map((p) => (
                  <li key={p.text} className="flex items-center gap-3 text-[15px] text-white/60">
                    <PointIcon icon={p.icon} tone="red" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-medium text-white/50 mb-3">Typical experience:</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {["Select Size ▼", "Select Color ▼", "Add 1 item"].map((t, i) => (
                    <span key={t} className="flex items-center gap-2">
                      {i > 0 && <span className="text-white/25">→</span>}
                      <span className={`rounded-lg px-3 py-1.5 font-medium ${i === 2 ? "bg-red-500/20 text-red-400 border border-red-500/20" : "bg-white/8 text-white/60 border border-white/10"}`}>{t}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-red-400">Repeat for each variant... 😵</p>
              </div>
            </article>
          </AnimateIn>

          {/* With */}
          <AnimateIn direction="left" delay={200}>
            <article className="h-full rounded-3xl p-6 lg:p-8 glass border-emerald-500/20 hover:border-emerald-400/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(52,211,153,0.12)] transition-all duration-300">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M4.8 10.5L8.3 13.8L15.2 6.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h3 className="text-xl font-black text-white sm:text-2xl">With MultiVariants</h3>
              </div>
              <ul className="mb-5 space-y-3.5">
                {withPoints.map((p) => (
                  <li key={p.text} className="flex items-center gap-3 text-[15px] text-white/60">
                    <PointIcon icon={p.icon} tone="green" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-medium text-white/50 mb-3">MultiVariants experience:</p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold text-white/40 mb-2">
                  <span>Size</span><span>Black</span><span>White</span><span>Navy</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <span className="font-bold text-white/80">S</span>
                  {[2, 3, 1].map((n, i) => (
                    <span key={i} className="rounded-lg bg-emerald-500/20 py-1 font-bold text-emerald-400 border border-emerald-500/20">{n}</span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-emerald-400">Add all 6 items with one click! ✨</p>
              </div>
            </article>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
