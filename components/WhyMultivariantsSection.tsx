import AnimateIn from "./AnimateIn";

const cards = [
  {
    icon: "🛒", title: "Allow Variants Bulk Add to Cart",
    grad: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/20 hover:border-blue-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(99,102,241,0.2)]",
    desc: "Customers quickly buy products with variations in bulk. Add multiple colors, sizes, or other options to the cart with just one click — reducing cart abandonment dramatically.",
  },
  {
    icon: "📈", title: "Increase Sales and Conversion",
    grad: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20 hover:border-emerald-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(52,211,153,0.2)]",
    desc: "Makes the bulk ordering process quick so customers can easily buy multiple product variants without hassle. Drives increased wholesale sales and revenue growth.",
  },
  {
    icon: "⚡", title: "Simple Installation",
    grad: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/20 hover:border-amber-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(251,191,36,0.2)]",
    desc: "A top-notch app with a simple, hassle-free setup. MultiVariants works seamlessly with all top eCommerce platforms and integrates without a single line of coding.",
  },
  {
    icon: "🌎", title: "Multi-Language Support",
    grad: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20 hover:border-purple-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(168,85,247,0.2)]",
    desc: "MultiVariants makes international expansion easy with multi-language capabilities. Easily localize your store for customers worldwide and grow beyond borders.",
  },
];

export default function WhyMultivariantsSection() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(170deg, #0a0f1e 0%, #0f172a 40%, #1a1040 100%)" }}
      id="why-multivariants"
      aria-labelledby="why-mv-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimateIn direction="up">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-primary-light">Why MultiVariants?</p>
            <h2 id="why-mv-heading" className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
              Variants Bulk Add to Cart for Shopify
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              Everything you need to streamline bulk ordering and grow your Shopify store&apos;s revenue.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c, i) => (
            <AnimateIn key={c.title} direction="up" delay={i * 100}>
              <article className={`h-full rounded-3xl p-6 glass ${c.border} ${c.glow} hover:-translate-y-1.5 transition-all duration-300`}>
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.grad} text-2xl border border-white/10`} aria-hidden="true">
                  {c.icon}
                </div>
                <h3 className="mb-3 text-lg font-black leading-tight text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{c.desc}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
