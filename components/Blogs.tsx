import Link from "next/link";

const posts = [
  {
    emoji: "🛒",
    bg: "from-[#EEF2FF] to-[#e0e7ff]",
    tag: "Bulk Ordering",
    title: "How Bulk Add to Cart Reduces Cart Abandonment by Up to 50%",
    excerpt: "Learn how simplifying the variant selection process with a single-click bulk add experience keeps customers engaged and converts more visits into sales.",
    date: "March 20, 2026",
    read: "5 min read",
  },
  {
    emoji: "📦",
    bg: "from-[#F0FFF4] to-[#dcfce7]",
    tag: "B2B Strategies",
    title: "Top 7 Strategies to Increase Wholesale Sales on Shopify in 2026",
    excerpt: "Discover actionable tactics B2B merchants use to grow their wholesale revenue, from smart pricing to streamlined ordering workflows powered by MultiVariants.",
    date: "March 10, 2026",
    read: "7 min read",
  },
  {
    emoji: "🌍",
    bg: "from-[#FFF7ED] to-[#fed7aa]",
    tag: "International Growth",
    title: "Expanding Your Shopify Store Globally with Multi-Language Support",
    excerpt: "A step-by-step guide on using MultiVariants' localization features to enter new markets, configure translations, and serve international customers seamlessly.",
    date: "February 25, 2026",
    read: "6 min read",
  },
];

export default function Blogs() {
  return (
    <section className="px-[5%] py-20" id="blogs" aria-labelledby="blogs-heading">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-[13px] font-semibold text-primary uppercase tracking-[1px] mb-2">
              Resources
            </p>
            <h2 id="blogs-heading" className="text-3xl md:text-4xl font-black tracking-tight">
              Latest News and Blogs
            </h2>
          </div>
          <Link href="#" className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold border-[1.5px] border-brand-border text-brand-text hover:border-primary hover:text-primary transition-all whitespace-nowrap">
            See All Blogs
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none" role="list">
          {posts.map((p) => (
            <li key={p.title} className="bg-white rounded-[20px] overflow-hidden border border-brand-border shadow-sm hover:-translate-y-1 hover:shadow-2xl transition-all flex flex-col">
              <div className={`h-[180px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-5xl`} aria-hidden="true">
                {p.emoji}
              </div>
              <article className="p-6 flex flex-col flex-1">
                <p className="text-[12px] font-semibold text-primary uppercase tracking-[0.5px] mb-2">{p.tag}</p>
                <h3 className="text-[17px] font-bold mb-2.5 leading-snug">{p.title}</h3>
                <p className="text-[13px] text-brand-muted leading-relaxed mb-4 flex-1">{p.excerpt}</p>
                <p className="text-[12px] text-brand-muted flex items-center gap-1.5">
                  <time>{p.date}</time>
                  <span aria-hidden="true">·</span>
                  {p.read}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
