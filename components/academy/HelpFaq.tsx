import { card, eyebrow, sectionTitle } from "@/components/academy/styles";

type Item = { id: string; question: string; answer: string };

/**
 * "Quick answers" on the Help Center home: native <details> accordions, so it
 * needs no JavaScript and the answers stay in the page for search engines.
 * The first answer starts open, as in the design.
 */
export default function HelpFaq({
  items,
  eyebrowText,
  title,
}: {
  items: Item[];
  eyebrowText: string;
  title: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="help-faq-title" className="px-[5%] py-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <p className={eyebrow}>{eyebrowText}</p>
        <h2 id="help-faq-title" className={sectionTitle}>
          {title}
        </h2>
        <div className="mt-6 grid max-w-[860px] gap-2.5">
          {items.map((item, i) => (
            <details key={item.id} open={i === 0} className={`group px-5 ${card}`}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-[18px] font-semibold text-hc-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-[22px] leading-none text-hc-dim transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mb-[18px] whitespace-pre-line text-hc-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
