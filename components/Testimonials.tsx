import AnimateIn from "./AnimateIn";

const reviews = [
  {
    text: "This app has completely transformed how our B2B customers order. They can now select multiple variants in one go — our average order value increased by 40% in the first month!",
    initials: "JS", name: "James Sullivan", store: "FashionHub Pro · United States",
    gradient: "from-primary to-accent",
  },
  {
    text: "Installation was a breeze — literally 5 minutes and it was live. The Mix n Match feature is exactly what our wholesale customers needed. Highly recommend!",
    initials: "ML", name: "Maria Lopes", store: "Wholesale Essentials · Brazil",
    gradient: "from-amber-400 to-red-500",
  },
  {
    text: "The multi-language support allowed us to expand into 3 new European markets. Support team is incredibly responsive and helpful. 10/10 app!",
    initials: "AK", name: "Anna Kowalski", store: "EuroStyle Shop · Germany",
    gradient: "from-green-400 to-cyan-500",
  },
  {
    text: "Incremental quantity feature is a game-changer for our wholesale business. No more customers ordering non-pack quantities. Cart abandonment dropped significantly.",
    initials: "RC", name: "Raj Chandra", store: "BulkMart India · India",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    text: "We run a large uniforms store and the ability to set restrictions per variant is brilliant. Customers always order within our minimum requirements now.",
    initials: "TN", name: "Tom Nguyen", store: "UniformWorld · Australia",
    gradient: "from-orange-500 to-yellow-400",
  },
  {
    text: "Absolutely the best bulk order app on Shopify. Our corporate clients love how easy it is to place large orders with multiple variants. Revenue up 60% since install!",
    initials: "SK", name: "Sarah Kim", store: "CorpGear · Canada",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1a1040 60%, #0f172a 100%)" }}
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn direction="up">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div>
              <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest mb-3">
                Opinions That Matter
              </p>
              <h2 id="reviews-heading" className="text-3xl font-black tracking-tight text-white md:text-4xl">
                We Are All Growing Together
              </h2>
            </div>
            <div
              className="flex flex-col items-end gap-1.5"
              role="img"
              aria-label="4.9 out of 5 stars, 350+ reviews on Shopify"
            >
              <div className="inline-flex items-center gap-1.5 glass-light rounded-full px-4 py-2 text-[13px] font-semibold border-white/30">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green" aria-hidden="true" />
                <span className="text-amber-400" aria-hidden="true">★★★★★</span>
                <strong className="text-brand-text">4.9</strong>
                <span className="text-brand-muted">on Shopify</span>
              </div>
              <span className="text-[13px] text-white/50">350+ verified reviews</span>
            </div>
          </div>
        </AnimateIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none" role="list">
          {reviews.map((r, i) => (
            <AnimateIn key={r.name} direction="up" delay={i * 80}>
              <li className="h-full glass border-white/10 hover:border-white/25 rounded-[20px] p-7 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col gap-3">
                <div className="text-amber-400 text-base tracking-widest" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="flex-1">
                  <p className="text-sm text-white/70 leading-relaxed italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-sm font-black text-white flex-shrink-0`} aria-hidden="true">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-white">{r.name}</p>
                    <p className="text-[12px] text-white/45">{r.store}</p>
                  </div>
                </div>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
