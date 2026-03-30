import Link from "next/link";
import AnimateIn from "./AnimateIn";

export default function Hero() {
  const variantRows = [
    { size: "S",  black: 2, white: 0, navy: 1 },
    { size: "M",  black: 2, white: 0, navy: 1 },
    { size: "L",  black: 2, white: 0, navy: 1 },
    { size: "XL", black: 2, white: 0, navy: 1 },
  ];

  return (
    <section
      className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden px-[5%] py-16 md:py-20"
      style={{
        background: "linear-gradient(135deg, #1a1040 0%, #0f172a 45%, #0a1628 100%)",
      }}
      aria-label="Hero"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[100px]" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]" style={{ animationDelay: "2s" }} />
        <div className="animate-blob animation-delay-4000 absolute -bottom-20 left-1/3 h-[350px] w-[350px] rounded-full bg-indigo-600/20 blur-[100px]" style={{ animationDelay: "4s" }} />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: Copy ── */}
        <div>
          <AnimateIn direction="down" delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/80 glass shadow-lg">
              <span className="text-amber-400 tracking-wide" aria-hidden="true">★★★★★</span>
              Trusted by 13,000+ Shopify merchants
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={100}>
            <h1 className="mb-6 text-4xl font-black leading-[1.07] tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
              Bulk Variant Ordering
              <br />
              for{" "}
              <span className="text-gradient-warm">Shopify Stores</span>
            </h1>
          </AnimateIn>

          <AnimateIn direction="up" delay={200}>
            <p className="mb-10 max-w-[520px] text-base leading-relaxed text-white/65 sm:text-lg">
              Let customers order multiple product variants in seconds with a
              simple order form. Perfect for B2B, wholesale, and variant-heavy
              stores.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" delay={300}>
            <div className="mb-12 flex flex-wrap items-center gap-3">
              <Link
                href="https://apps.shopify.com/"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_rgba(92,106,196,0.5)] hover:bg-primary-dark hover:-translate-y-px hover:shadow-[0_0_40px_rgba(92,106,196,0.7)] transition-all sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install App Free
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-semibold text-white/80 glass hover:bg-white/15 transition-all sm:w-auto"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30">
                  <svg className="h-2.5 w-2.5 translate-x-[1px]" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                    <path d="M2 1.5L8 5L2 8.5V1.5Z" />
                  </svg>
                </span>
                View Demo
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={400}>
            <div className="grid max-w-[480px] grid-cols-3 divide-x divide-white/15">
              {[
                { value: "13,000+", label: "Merchants" },
                { value: "120+",    label: "Countries" },
                { value: "4.9★",    label: "App Rating" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4 first:pl-0">
                  <p className="text-2xl font-black text-white sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/50 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* ── Right: Glass variant card ── */}
        <AnimateIn direction="left" delay={200} className="w-full">
          <div className="relative w-full max-w-[560px] lg:ml-auto">
            {/* Glow behind card */}
            <div className="absolute inset-0 -z-10 rounded-[28px] bg-primary/20 blur-3xl scale-95" aria-hidden="true" />

            <div className="glass rounded-[24px] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)] sm:p-7 animate-float">
              {/* Card header */}
              <div className="mb-5 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl sm:h-14 sm:w-14 sm:text-3xl border border-white/20">
                  👕
                </div>
                <div>
                  <p className="text-base font-bold text-white sm:text-xl">Premium Cotton T-Shirt</p>
                  <p className="mt-1 text-sm font-medium text-white/55">$29.99 per unit</p>
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-4 gap-2 border-b border-white/10 pb-2 text-xs font-semibold text-white/40 sm:text-sm">
                <span>Size</span>
                <span className="text-center">Black</span>
                <span className="text-center">White</span>
                <span className="text-center">Navy</span>
              </div>

              {/* Rows */}
              {variantRows.map((row) => (
                <div key={row.size} className="grid grid-cols-4 items-center gap-2 border-b border-white/8 py-2.5 text-sm">
                  <span className="font-bold text-white/90">{row.size}</span>
                  <span className="text-center">
                    <span className={`inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold sm:w-12 ${row.black > 0 ? "bg-accent/20 text-accent border border-accent/30" : "bg-white/5 text-white/30 border border-white/10"}`}>{row.black}</span>
                  </span>
                  <span className="text-center">
                    <span className="inline-flex h-8 w-10 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-white/30 border border-white/10 sm:w-12">{row.white}</span>
                  </span>
                  <span className="text-center">
                    <span className={`inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold sm:w-12 ${row.navy > 0 ? "bg-primary/30 text-primary-light border border-primary/30" : "bg-white/5 text-white/30 border border-white/10"}`}>{row.navy}</span>
                  </span>
                </div>
              ))}

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40">Total: 12 items</p>
                  <p className="mt-1 text-xl font-black text-white">$359.88</p>
                </div>
                <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(92,106,196,0.5)] hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(92,106,196,0.7)] transition-all">
                  Add All to Cart
                </button>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-4 glass rounded-2xl px-4 py-2.5 shadow-xl sm:-bottom-5 sm:left-6">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-amber-400 border border-accent/30">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M11.7 1.1a1 1 0 00-1.8.3L7.7 8H4.6a1 1 0 00-.8 1.6l3.8 5.3a1 1 0 001.8-.3l2.2-6.6h3.1a1 1 0 00.8-1.6l-3.8-5.3z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[13px] font-bold text-white">10x Faster</p>
                  <p className="text-[11px] text-white/45">Than default Shopify</p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
