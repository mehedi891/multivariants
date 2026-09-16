import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import type { HomeContent } from "@/i18n/content";
import AnimateIn from "./AnimateIn";
import { getPublicOpinions, type Opinion } from "@/lib/opinions";

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase();
}

/**
 * Pick an avatar gradient from the opinion's id rather than its position in the
 * list: the same review appears in both marquee rows (and twice per row for the
 * loop), and a position-based colour would render the same merchant in a
 * different colour each time.
 */
function gradientFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

const AVATAR_GRADIENTS = [
  "from-primary to-accent",
  "from-amber-400 to-red-500",
  "from-green-400 to-cyan-500",
  "from-violet-500 to-pink-500",
  "from-orange-500 to-yellow-400",
  "from-cyan-500 to-blue-500",
];

/**
 * A single review card. Fixed width so the marquee track has a predictable
 * length; `review-marquee__card` is what the CSS dims/focuses on hover.
 */
function ReviewCard({
  opinion,
  content,
}: {
  opinion: Opinion;
  content: HomeContent["testimonials"];
}) {
  return (
    <article className="review-marquee__card relative flex h-[290px] w-[min(340px,78vw)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.025] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7">
      {/* Top shine + oversized decorative quote */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <span
        className="pointer-events-none absolute right-4 top-2 select-none font-serif text-[86px] leading-none text-white/[0.06]"
        aria-hidden="true"
      >
        &rdquo;
      </span>

      <div className="relative z-10 flex gap-0.5" aria-label={content.starsAria}>
        {[0, 1, 2, 3, 4].map((star) => (
          <svg
            key={star}
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] text-amber-400"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      <blockquote className="relative z-10 mt-4 flex-1 overflow-hidden">
        <p className="line-clamp-5 text-sm leading-relaxed text-white/75">{opinion.description}</p>
      </blockquote>

      {opinion.title && (
        <div className="relative z-10 mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
          {opinion.logoUrl ? (
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10">
              <Image src={opinion.logoUrl} alt="" fill unoptimized className="object-contain p-1.5" />
            </span>
          ) : (
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientFor(opinion.id)} text-sm font-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.35)]`}
              aria-hidden="true"
            >
              {initials(opinion.title)}
            </span>
          )}
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[14px] font-bold text-white">
              <span className="truncate">{opinion.title}</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.1 14.2l-3.6-3.6 1.4-1.4 2.2 2.2 4.9-4.9 1.4 1.4z" />
              </svg>
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/40">
              {content.verifiedMerchant}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export default async function Testimonials({
  content,
  dict,
}: {
  content: HomeContent["testimonials"];
  dict: Dictionary;
}) {
  const opinions = await getPublicOpinions();
  if (opinions.length === 0) return null;

  // Both rows carry every review, the second rotated by half the list, so the
  // two rows are never showing the same card at the same moment. Each row is
  // then repeated until it can span a wide viewport — with only a handful of
  // reviews a single pass would leave an empty stretch mid-loop.
  const rotate = (list: Opinion[], by: number) => [...list.slice(by), ...list.slice(0, by)];
  const fill = (row: Opinion[]) => {
    const out = [...row];
    while (out.length < 6) out.push(...row);
    return out;
  };
  const first = fill(opinions);
  const second = fill(rotate(opinions, Math.ceil(opinions.length / 2)));

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
                {content.eyebrow}
              </p>
              <h2 id="reviews-heading" className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {content.title}
              </h2>
            </div>
            <a
              href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=reviews&utm_campaign=rating"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-end gap-1.5"
              aria-label={content.ratingAria
                .replace("{rating}", "5.0")
                .replace("{count}", "355")}
            >
              <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-[13px] font-semibold border-white/20 transition-colors group-hover:border-primary/40">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green" aria-hidden="true" />
                <span className="text-amber-400" aria-hidden="true">★★★★★</span>
                <strong className="text-white">5.0</strong>
                <span className="text-white/60">{dict.common.onShopify}</span>
              </span>
              <span className="text-[13px] text-white/50 transition-colors group-hover:text-white/75">355 {dict.common.verifiedReviews} →</span>
            </a>
          </div>
        </AnimateIn>

      </div>

      {/* Two marquee rows travelling in opposite directions. Full-bleed (the
          section's 5% padding is cancelled) so cards run edge to edge. */}
      <div className="relative z-10 mt-12 -mx-[5%] flex flex-col gap-5">
        {[first, second].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="review-marquee"
            data-direction={rowIndex === 0 ? "right" : "left"}
          >
            <ul className="review-marquee__track list-none" role="list">
              {/* The sequence is rendered twice so the -50% loop is seamless.
                  The copy is hidden from assistive tech to avoid duplicates. */}
              {[0, 1].map((copy) =>
                row.map((o, i) => (
                  <li
                    key={`${copy}-${i}-${o.id}`}
                    className="review-marquee__item"
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    <ReviewCard opinion={o} content={content} />
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
