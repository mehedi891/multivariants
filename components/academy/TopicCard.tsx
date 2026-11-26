import LocaleLink from "@/components/LocaleLink";
import HelpIcon from "@/components/academy/HelpIcon";
import { card, iconTile } from "@/components/academy/styles";
import type { AcademyCategory } from "@/lib/academy/docs-data";
import { topicIcon } from "@/lib/academy/topics";

/**
 * Topic card on the Help Center home: icon, name, guide count, description,
 * its first three guides and a link to the topic page.
 */
export default function TopicCard({
  topic,
  description,
  countLabel,
  viewAllLabel,
}: {
  topic: AcademyCategory;
  description?: string;
  /** Already-filled "{n} guides". */
  countLabel: string;
  /** Already-filled "View all {n} guides". */
  viewAllLabel: string;
}) {
  const href = `/academy/category/${topic.slug}`;
  return (
    <div className={`flex flex-col gap-3 p-[22px] hover:border-hc-line-hover ${card}`}>
      <LocaleLink href={href} className="group flex items-center gap-3">
        <span className={`h-[42px] w-[42px] rounded-xl ${iconTile}`}>
          <HelpIcon name={topicIcon(topic.slug)} />
        </span>
        {/* A <div>, not a <span>: a heading isn't valid inside a span. */}
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold leading-[1.3] text-hc-ink transition-colors group-hover:text-hc-link">
            {topic.title}
          </h3>
          <span className="text-xs text-hc-dim">{countLabel}</span>
        </div>
      </LocaleLink>

      {description && <p className="text-sm text-hc-muted">{description}</p>}

      <ul className="border-t border-hc-line">
        {topic.docs.slice(0, 3).map((doc) => (
          <li key={doc.slug}>
            <LocaleLink
              href={`/academy/${doc.slug}`}
              className="flex items-start gap-2 border-b border-hc-line py-2 text-sm text-hc-ink/90 transition-colors hover:text-hc-link"
            >
              <HelpIcon name="doc" className="mt-1 h-3.5 w-3.5 shrink-0 text-hc-dim" />
              <span>{doc.title}</span>
            </LocaleLink>
          </li>
        ))}
      </ul>

      <LocaleLink
        href={href}
        className="group mt-auto inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-hc-link"
      >
        {viewAllLabel}
        <HelpIcon
          name="arrow"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </LocaleLink>
    </div>
  );
}
