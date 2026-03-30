import Link from "next/link";
import AnimateIn from "./AnimateIn";

const posts = [
  {
    emoji: "🛒",
    grad: "from-primary/30 to-accent/20",
    tag: "Bulk Ordering",
    title: "How Bulk Add to Cart Reduces Cart Abandonment by Up to 50%",
    excerpt: "Learn how simplifying the variant selection process with a single-click bulk add experience keeps customers engaged and converts more visits into sales.",
    date: "March 20, 2026",
    read: "5 min read",
  },
  {
    emoji: "📦",
    grad: "from-emerald-500/25 to-teal-500/20",
    tag: "B2B Strategies",
    title: "Top 7 Strategies to Increase Wholesale Sales on Shopify in 2026",
    excerpt: "Discover actionable tactics B2B merchants use to grow their wholesale revenue, from smart pricing to streamlined ordering workflows powered by MultiVariants.",
    date: "March 10, 2026",
    read: "7 min read",
  },
  {
    emoji: "🌍",
    grad: "from-amber-500/25 to-orange-500/20",
    tag: "International Growth",
    title: "Expanding Your Shopify Store Globally with Multi-Language Support",
    excerpt: "A step-by-step guide on using MultiVariants' localization features to enter new markets, configure translations, and serve international customers seamlessly.",
    date: "February 25, 2026",
    read: "6 min read",
  },
];

export default function Blogs() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)" }}
      id="blogs"
      aria-labelledby="blogs-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn direction="up">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest mb-2">
                Resources
              </p>
              <h2 id="blogs-heading" className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Latest News and Blogs
              </h2>
            </div>
            <Link href="#" className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold border-[1.5px] border-white/25 text-white/70 hover:border-primary hover:text-primary transition-all whitespace-nowrap glass">
              See All Blogs
            </Link>
          </div>
        </AnimateIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none" role="list">
          {posts.map((p, i) => (
            <AnimateIn key={p.title} direction="up" delay={i * 100}>
              <li className="h-full glass rounded-[20px] overflow-hidden border-white/10 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(92,106,196,0.2)] transition-all duration-300 flex flex-col">
                <div className={`h-[180px] bg-gradient-to-br ${p.grad} flex items-center justify-center text-5xl border-b border-white/10`} aria-hidden="true">
                  {p.emoji}
                </div>
                <article className="p-6 flex flex-col flex-1">
                  <p className="text-[12px] font-semibold text-primary-light uppercase tracking-[0.5px] mb-2">{p.tag}</p>
                  <h3 className="text-[17px] font-bold mb-2.5 leading-snug text-white">{p.title}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed mb-4 flex-1">{p.excerpt}</p>
                  <p className="text-[12px] text-white/35 flex items-center gap-1.5">
                    <time>{p.date}</time>
                    <span aria-hidden="true">·</span>
                    {p.read}
                  </p>
                </article>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
