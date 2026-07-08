import Image from "next/image";
import AnimateIn from "./AnimateIn";
import { getPublicOpinions } from "@/lib/opinions";

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-primary to-accent",
  "from-amber-400 to-red-500",
  "from-green-400 to-cyan-500",
  "from-violet-500 to-pink-500",
  "from-orange-500 to-yellow-400",
  "from-cyan-500 to-blue-500",
];

export default async function Testimonials() {
  const opinions = await getPublicOpinions();
  if (opinions.length === 0) return null;

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
              <div className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-[13px] font-semibold border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green" aria-hidden="true" />
                <span className="text-amber-400" aria-hidden="true">★★★★★</span>
                <strong className="text-white">4.9</strong>
                <span className="text-white/60">on Shopify</span>
              </div>
              <span className="text-[13px] text-white/50">350+ verified reviews</span>
            </div>
          </div>
        </AnimateIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none" role="list">
          {opinions.map((o, i) => (
            <AnimateIn key={o.id} direction="up" delay={(i % 3) * 80}>
              <li className="h-full glass border-white/10 hover:border-white/25 rounded-[20px] p-7 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col">
                <span className="font-serif text-5xl leading-none text-accent/70" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-1 flex-1">
                  <p className="text-sm leading-relaxed text-white/70">{o.description}</p>
                </blockquote>
                {o.title && (
                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                    {o.logoUrl ? (
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10">
                        <Image
                          src={o.logoUrl}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain p-1"
                        />
                      </span>
                    ) : (
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} text-sm font-black text-white`}
                        aria-hidden="true"
                      >
                        {initials(o.title)}
                      </span>
                    )}
                    <p className="text-[14px] font-bold text-white">{o.title}</p>
                  </div>
                )}
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
