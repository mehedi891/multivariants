import LocaleLink from "@/components/LocaleLink";
import HelpIcon from "@/components/academy/HelpIcon";
import type { AcademyCategory } from "@/lib/academy/docs-data";
import { topicIcon } from "@/lib/academy/topics";

/**
 * Topic list beside a topic page. A sticky column on desktop; below lg it
 * becomes a horizontally scrolling row of chips.
 */
export default function TopicsNav({
  topics,
  current,
  label,
}: {
  topics: AcademyCategory[];
  current?: string;
  label: string;
}) {
  return (
    <nav aria-label={label} className="lg:sticky lg:top-24">
      <p className="mb-2.5 hidden text-xs font-bold uppercase tracking-[0.12em] text-hc-dim lg:block">
        {label}
      </p>
      <ul className="-mx-[5vw] flex gap-1.5 overflow-x-auto px-[5vw] pb-1 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:p-0">
        {topics.map((topic) => {
          const on = topic.slug === current;
          return (
            <li key={topic.slug} className="shrink-0">
              <LocaleLink
                href={`/academy/category/${topic.slug}`}
                aria-current={on ? "page" : undefined}
                className={`flex min-h-10 items-center gap-2.5 whitespace-nowrap rounded-[10px] border px-2.5 text-sm transition-colors lg:whitespace-normal lg:border-transparent ${
                  on
                    ? "border-hc-line bg-hc-indigo/[0.14] font-semibold text-hc-ink"
                    : "border-hc-line text-hc-muted hover:bg-white/[0.035] hover:text-hc-ink"
                }`}
              >
                <HelpIcon name={topicIcon(topic.slug)} className="h-4 w-4 shrink-0" />
                <span className="flex-1">{topic.title}</span>
                <span className="hidden text-xs text-hc-dim lg:inline">{topic.docs.length}</span>
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
