import AnimateIn from "./AnimateIn";
import type { HomeContent } from "@/i18n/content";

// Icon + colour styling is structural, not language-dependent — the translated
// title/desc from messages/home/<locale>.json are merged onto these by index.
const cardStyles = [
  {
    icon: "🛒",
    grad: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/20 hover:border-blue-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(99,102,241,0.2)]",
  },
  {
    icon: "📈",
    grad: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(52,211,153,0.2)]",
  },
  {
    icon: "⚡",
    grad: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20 hover:border-amber-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(251,191,36,0.2)]",
  },
  {
    icon: "🌎",
    grad: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20 hover:border-purple-400/40",
    glow: "hover:shadow-[0_16px_40px_rgba(168,85,247,0.2)]",
  },
];

export default function WhyMultivariantsSection({
  content,
}: {
  content: HomeContent["whyMv"];
}) {
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
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-primary-light">{content.eyebrow}</p>
            <h2 id="why-mv-heading" className="text-3xl font-black tracking-tight text-white leading-[1.2] sm:text-4xl lg:text-[2.8rem]">
              {content.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              {content.subtitle}
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((c, i) => (
            <AnimateIn key={c.title} direction="up" delay={i * 100}>
              <article className={`h-full rounded-3xl p-6 glass ${cardStyles[i].border} ${cardStyles[i].glow} hover:-translate-y-1.5 transition-all duration-300`}>
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cardStyles[i].grad} text-2xl border border-white/10`} aria-hidden="true">
                  {cardStyles[i].icon}
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
