import LocaleLink from "@/components/LocaleLink";

export type Crumb = { label: string; href?: string };

/** Help Center breadcrumb trail; the last crumb (no `href`) is the current page. */
export default function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-hc-dim">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {item.href ? (
              <LocaleLink href={item.href} className="transition-colors hover:text-hc-ink">
                {item.label}
              </LocaleLink>
            ) : (
              <span aria-current="page" className="text-hc-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
