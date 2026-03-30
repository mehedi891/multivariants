import Link from "next/link";
import AnimateIn from "./AnimateIn";

function ShopifyBtn() {
  return (
    <Link href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp" className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-green text-white hover:bg-green-700 hover:-translate-y-px transition-all shadow-[0_0_16px_rgba(80,184,60,0.3)] hover:shadow-[0_0_24px_rgba(80,184,60,0.5)]" target="_blank" rel="noopener noreferrer">
      Get the App on Shopify
    </Link>
  );
}
function DemoBtn() {
  return (
    <Link href="#" className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/25 text-white/70 hover:border-primary hover:text-primary transition-all">
      Live Demo
    </Link>
  );
}

const features = [
  {
    badge: "Mix n Match",
    title: "Let Your Customers Build Their Own Box",
    body: "Mix and Match allows clients to submit orders that meet minimum or maximum order limits. A great way to increase sales by enabling customers to create a more personalized shopping experience.",
    demo: (
      <div className="glass rounded-[20px] p-6 border-white/15 min-h-[280px] flex flex-col gap-3">
        <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Build Your Box</p>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="font-bold text-[15px] mb-3 text-white">Premium T-Shirt Bundle</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Red ✓",  cls: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400" },
              { label: "Blue 2", cls: "border-primary/40 bg-primary/20 text-primary-light" },
              { label: "Green",  cls: "border-white/15 bg-white/5 text-white/40" },
              { label: "Black ✓",cls: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400" },
              { label: "White",  cls: "border-white/15 bg-white/5 text-white/40" },
              { label: "Navy 1", cls: "border-primary/40 bg-primary/20 text-primary-light" },
            ].map((v) => (
              <span key={v.label} className={`border-[1.5px] rounded-lg py-2 text-center text-[12px] font-semibold ${v.cls}`}>{v.label}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-3 text-[12px] font-semibold">
            <span className="flex-1 text-white/40">Total: 4 of 6 required</span>
            <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full w-[66%] bg-primary rounded-full" />
            </div>
          </div>
          <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-all">Add Box to Cart</button>
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    badge: "Apply Multiple Restrictions",
    title: "Minimum Order Value Restriction",
    body: "Apply multiple restrictions to a single product page, including per product and per variant restrictions. Set maximum order quantities, enforce minimums per color or size, and prevent overselling effortlessly.",
    highlight: { label: "Example:", text: "Max 5 T-shirts total, min 3 red. Customers must order 3 red + at least 2 of any other color." },
    demo: (
      <div className="glass rounded-[20px] p-6 border-white/15 min-h-[280px] flex flex-col gap-3">
        <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Order Restrictions</p>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col divide-y divide-white/10">
          {[
            { color: "#ef4444", label: "Red T-Shirt",   vals: [{ v: "Min 3", red: false }] },
            { color: "#3b82f6", label: "Blue T-Shirt",  vals: [{ v: "Min 0", red: false }] },
            { color: "#22c55e", label: "Green T-Shirt", vals: [{ v: "Min 0", red: false }] },
            { color: "#5C6AC4", label: "Total Order",   vals: [{ v: "Min 5", red: false }, { v: "Max 20", red: true }] },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2.5 py-2 last:pb-0 first:pt-0 text-[13px]">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
              <span className="flex-1 font-medium text-white/70">{r.label}</span>
              {r.vals.map((vv) => (
                <span key={vv.v} className={`text-xs font-bold px-2 py-0.5 rounded-md ${vv.red ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary-light"}`}>{vv.v}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    reverse: true,
  },
  {
    badge: "Incremental Quantity",
    title: "Add Incremental Quantity for Product Variants",
    body: "Set product quantity increments with the MultiVariants Professional plan. For a quantity of 12, specify increments of 12, 24, 36, 48, and 60. Perfect for bulk product sellers — prevents overselling of limited-stock items.",
    demo: (
      <div className="glass rounded-[20px] p-6 border-white/15 min-h-[280px] flex flex-col gap-3">
        <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Quantity Increments</p>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-[13px] font-semibold mb-2.5 text-white/80">Case of Cans (qty)</p>
          <div className="flex gap-1.5 flex-wrap mb-4">
            {[12, 24, 36, 48, 60].map((n) => (
              <span key={n} className={`border-[1.5px] rounded-md px-2.5 py-1 text-[12px] font-bold transition-all ${n === 24 ? "border-primary bg-primary text-white shadow-[0_0_12px_rgba(92,106,196,0.4)]" : "border-white/20 text-white/40"}`}>{n}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 justify-center mb-2.5">
            <button className="w-9 h-9 border-[1.5px] border-white/20 bg-white/5 rounded-lg text-lg font-semibold text-white/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all">−</button>
            <span className="w-16 text-center text-3xl font-black text-primary">24</span>
            <button className="w-9 h-9 border-[1.5px] border-white/20 bg-white/5 rounded-lg text-lg font-semibold text-white/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all">+</button>
          </div>
          <p className="text-[12px] text-white/40 text-center">Step: 12 · Range: 12 – 60</p>
        </div>
      </div>
    ),
    reverse: false,
  },
];

export default function Features() {
  return (
    <section
      className="relative px-[5%] py-16 lg:py-24 overflow-hidden"
      style={{ background: "linear-gradient(170deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)" }}
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn direction="up">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest mb-3">Key Features</p>
            <h2 id="features-heading" className="text-3xl font-black tracking-tight text-white mb-4 md:text-4xl">
              Everything You Need to Sell More
            </h2>
            <p className="text-[17px] text-white/55 max-w-xl mx-auto leading-relaxed">
              MultiVariants enables easy bulk ordering for eCommerce through key features that increase conversions, value, and revenues.
            </p>
          </div>
        </AnimateIn>

        <ul className="list-none flex flex-col gap-20" role="list">
          {features.map((f) => (
            <li key={f.badge} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${f.reverse ? "lg:[direction:rtl]" : ""}`}>
              <AnimateIn direction={f.reverse ? "left" : "right"} delay={100} className={f.reverse ? "[direction:ltr]" : ""}>
                <div>
                  <span className="inline-flex bg-primary/20 text-primary-light border border-primary/30 rounded-full px-3.5 py-1 text-[12px] font-semibold uppercase tracking-wider mb-4">
                    {f.badge}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mb-3 leading-snug text-white md:text-3xl">{f.title}</h3>
                  <p className="text-[16px] text-white/55 leading-[1.75] mb-4">{f.body}</p>
                  {"highlight" in f && f.highlight && (
                    <p className="text-[14px] bg-primary/15 px-4 py-3 rounded-xl border-l-4 border-primary text-white/80 mb-5">
                      <strong className="text-white">{f.highlight.label}</strong> {f.highlight.text}
                    </p>
                  )}
                  <div className="flex gap-3 flex-wrap">
                    <ShopifyBtn /><DemoBtn />
                  </div>
                </div>
              </AnimateIn>
              <AnimateIn direction={f.reverse ? "right" : "left"} delay={200} className={f.reverse ? "[direction:ltr]" : ""}>
                {f.demo}
              </AnimateIn>
            </li>
          ))}
        </ul>

        <AnimateIn direction="up" delay={100}>
          <div className="text-center mt-16 flex flex-col items-center gap-5">
            <Link href="#" className="inline-flex items-center px-7 py-3.5 rounded-xl text-base font-semibold border-[1.5px] border-white/25 text-white/70 hover:border-primary hover:text-primary transition-all glass">
              See All Features
            </Link>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2.5 text-[13px] font-semibold flex-wrap justify-center border-white/20">
              <span className="text-amber-400">★★★★★</span>
              <strong className="text-white">350+ reviews</strong>
              <span className="text-white/35">·</span>
              <Link href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-accent transition-colors">Get on Shopify</Link>
              <span className="text-white/35 text-[12px]">· Free plan · 7-Day Trial</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
