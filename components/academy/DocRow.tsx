import LocaleLink from "@/components/LocaleLink";
import HelpIcon from "@/components/academy/HelpIcon";
import { card, cardHover, iconTile } from "@/components/academy/styles";
import { fill } from "@/lib/academy/text";

/**
 * One guide as a full-width row — popular guides, a topic's guide list and
 * search results. Leads with its position in the topic when `number` is set,
 * otherwise a document tile.
 */
export default function DocRow({
  doc,
  minRead,
  number,
  topic,
  title,
}: {
  doc: { slug: string; title: string; readingMinutes?: number };
  /** "{n} min read" template. */
  minRead: string;
  number?: number;
  /** Topic name shown before the read time. */
  topic?: string;
  /** Overrides the plain title (e.g. with search highlights). */
  title?: React.ReactNode;
}) {
  const meta = [topic, doc.readingMinutes ? fill(minRead, { n: doc.readingMinutes }) : null].filter(
    Boolean,
  );

  return (
    <LocaleLink
      href={`/academy/${doc.slug}`}
      className={`group flex items-center gap-3.5 px-4 py-4 sm:px-[18px] ${card} ${cardHover}`}
    >
      {number ? (
        <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] border border-hc-line text-[13px] text-hc-dim">
          {number}
        </span>
      ) : (
        <span className={`h-9 w-9 rounded-[10px] ${iconTile}`}>
          <HelpIcon name="doc" className="h-[18px] w-[18px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug text-hc-ink">{title ?? doc.title}</span>
        {meta.length > 0 && (
          <span className="mt-0.5 block text-[13px] text-hc-dim">{meta.join(" · ")}</span>
        )}
      </span>
      <HelpIcon
        name="arrow"
        className="h-[18px] w-[18px] shrink-0 text-hc-dim transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-hc-cyan"
      />
    </LocaleLink>
  );
}
