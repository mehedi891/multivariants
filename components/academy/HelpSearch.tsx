"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LocaleLink from "@/components/LocaleLink";
import HelpIcon from "@/components/academy/HelpIcon";
import { useLocale } from "@/components/LocaleProvider";
import { localizePath } from "@/i18n/config";
import { highlight, searchDocs, type HelpIndexEntry } from "@/lib/academy/search";
import type { AcademyContent } from "@/i18n/content";

/** Title with the matched words marked. */
export function Highlighted({ text, query }: { text: string; query: string }) {
  return highlight(text, query).map((s, i) =>
    s.hit ? (
      <mark key={i} className="rounded-[3px] bg-hc-cyan/[0.22] px-px text-inherit">
        {s.text}
      </mark>
    ) : (
      s.text
    ),
  );
}

/**
 * Help Center search — a WAI-ARIA combobox with instant suggestions (↑/↓ to
 * move, Enter to open, Esc to close) and `/` to focus it from anywhere. It is a
 * real GET form to /academy/search, so Enter still searches with JavaScript
 * off; with it on, the form navigates client-side.
 */
export default function HelpSearch({
  docs,
  ui,
  initialQuery = "",
  size = "lg",
  chips,
}: {
  docs: HelpIndexEntry[];
  ui: AcademyContent["search"];
  initialQuery?: string;
  size?: "lg" | "md";
  /** Suggested searches under the box (hero only). */
  chips?: string[];
}) {
  const id = useId();
  const listId = `${id}-list`;
  const router = useRouter();
  const locale = useLocale();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const q = query.trim();
  const results = useMemo(() => searchDocs(docs, q).slice(0, 6), [docs, q]);
  const searchHref = `/academy/search?q=${encodeURIComponent(q)}`;
  // The suggestions, then the "see all" row.
  const options = [...results.map((d) => `/academy/${d.slug}`), searchHref];
  const expanded = open && q.length > 0;

  // `/` focuses the search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) {
        return;
      }
      e.preventDefault();
      input.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(localizePath(href, locale));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!q) return;
      e.preventDefault();
      setOpen(true);
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (a + step + options.length) % options.length);
    } else if (e.key === "Escape") {
      if (expanded) e.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expanded && active >= 0) go(options[active]);
    else if (q) go(searchHref);
    else input.current?.focus();
  };

  const lg = size === "lg";

  return (
    <div>
      <form
        role="search"
        action={localizePath("/academy/search", locale)}
        method="get"
        onSubmit={onSubmit}
        // The hero box is 640px wide; its chip row below may use the full width.
        className={`relative ${lg ? "mx-auto max-w-[640px]" : ""}`}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
        }}
      >
        <div
          className={`flex items-center gap-3 border border-hc-line bg-hc-panel transition-[border-color,box-shadow] focus-within:border-hc-line-hover focus-within:shadow-[0_0_0_4px_rgba(87,102,250,0.18)] ${
            lg
              ? "rounded-2xl py-1.5 pl-[18px] pr-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              : "rounded-xl py-1 pl-4 pr-1"
          }`}
        >
          <HelpIcon name="search" className="h-5 w-5 shrink-0 text-hc-dim" />
          <label htmlFor={`${id}-q`} className="sr-only">
            {ui.label}
          </label>
          <input
            ref={input}
            id={`${id}-q`}
            name="q"
            type="search"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-activedescendant={expanded && active >= 0 ? `${id}-opt-${active}` : undefined}
            placeholder={ui.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={`min-w-0 flex-1 bg-transparent text-hc-ink outline-none placeholder:text-hc-dim ${
              lg ? "h-12 text-[17px]" : "h-10 text-[15px]"
            }`}
          />
          <kbd
            title={ui.shortcut}
            className="hidden rounded-md border border-hc-line px-[7px] py-0.5 font-sans text-xs text-hc-dim sm:inline"
          >
            /
          </kbd>
          <button
            type="submit"
            className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-hc-grad font-semibold text-white shadow-hc transition-[filter] hover:brightness-110 ${
              lg ? "h-12 px-5 text-sm" : "h-10 px-4 text-sm"
            }`}
          >
            {ui.button}
          </button>
        </div>

        {/* Kept mounted (hidden when collapsed) so aria-controls always resolves. */}
        <div
          id={listId}
          role="listbox"
          aria-label={ui.label}
          hidden={!expanded}
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[14px] border border-hc-line bg-hc-panel text-left shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          {results.map((doc, i) => (
            <LocaleLink
              key={doc.slug}
              id={`${id}-opt-${i}`}
              href={`/academy/${doc.slug}`}
              role="option"
              aria-selected={active === i}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center gap-3 border-b border-hc-line px-4 py-[11px] ${
                active === i ? "bg-hc-cyan/10" : ""
              }`}
            >
              <HelpIcon name="doc" className="h-4 w-4 shrink-0 text-hc-dim" />
              <span className="min-w-0">
                <span className="block text-hc-ink">
                  <Highlighted text={doc.title} query={q} />
                </span>
                <span className="block text-xs text-hc-dim">{doc.topicName}</span>
              </span>
            </LocaleLink>
          ))}
          <LocaleLink
            id={`${id}-opt-${results.length}`}
            href={searchHref}
            role="option"
            aria-selected={active === results.length}
            tabIndex={-1}
            onClick={() => setOpen(false)}
            onMouseEnter={() => setActive(results.length)}
            className={`flex items-center justify-center gap-1.5 px-4 py-[11px] text-sm font-semibold text-hc-link ${
              active === results.length ? "bg-hc-cyan/10" : ""
            }`}
          >
            {results.length ? ui.seeAll : ui.noQuickMatch}
            <HelpIcon name="arrow" className="h-4 w-4" />
          </LocaleLink>
        </div>
      </form>

      {chips && chips.length > 0 && (
        <div className="mt-[18px] flex flex-wrap items-center justify-center gap-2">
          <span className="px-1 text-[13px] text-hc-dim">{ui.popular}</span>
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setQuery(chip);
                setOpen(true);
                setActive(-1);
                input.current?.focus();
              }}
              className="min-h-9 rounded-full border border-hc-line bg-white/[0.035] px-3 text-[13px] text-hc-muted transition-colors hover:border-hc-line-hover hover:text-hc-ink"
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
