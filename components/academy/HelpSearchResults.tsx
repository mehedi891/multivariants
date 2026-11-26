"use client";

import { useSearchParams } from "next/navigation";
import LocaleLink from "@/components/LocaleLink";
import DocRow from "@/components/academy/DocRow";
import HelpSearch, { Highlighted } from "@/components/academy/HelpSearch";
import { card } from "@/components/academy/styles";
import { searchDocs, type HelpIndexEntry } from "@/lib/academy/search";
import { fill } from "@/lib/academy/text";
import type { AcademyContent } from "@/i18n/content";

/**
 * /academy/search results. Reads `?q=` in the browser — the page shell is
 * prerendered, so this sits under a Suspense boundary.
 */
export default function HelpSearchResults({
  docs,
  content,
}: {
  docs: HelpIndexEntry[];
  content: Pick<AcademyContent, "search" | "results" | "article">;
}) {
  const q = (useSearchParams().get("q") ?? "").trim();
  const results = searchDocs(docs, q);
  const topics = new Set(results.map((d) => d.topicName)).size;
  const r = content.results;

  return (
    <>
      {/* key: a new ?q= (e.g. from the back button) resets the box. */}
      <HelpSearch key={q} docs={docs} ui={content.search} initialQuery={q} size="md" />

      <div role="status" className="mt-8">
        {q ? (
          <>
            <p className="text-2xl font-extrabold tracking-[-0.02em] text-hc-ink">
              {fill(results.length === 1 ? r.countOne : r.countOther, { n: results.length, q })}
            </p>
            {results.length > 0 && (
              <p className="mt-1 text-hc-muted">
                {fill(topics === 1 ? r.acrossOne : r.acrossOther, { n: topics })}
              </p>
            )}
          </>
        ) : (
          <p className="text-hc-muted">{r.prompt}</p>
        )}
      </div>

      {q && results.length === 0 && (
        <p className={`mt-6 p-10 text-center text-hc-muted ${card}`}>
          {r.empty}{" "}
          <LocaleLink href="/contact" className="font-semibold text-hc-link underline underline-offset-4">
            {r.askTeam}
          </LocaleLink>
          .
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-5 grid gap-2.5">
          {results.map((doc) => (
            <li key={doc.slug}>
              <DocRow
                doc={doc}
                topic={doc.topicName}
                minRead={content.article.minRead}
                title={<Highlighted text={doc.title} query={q} />}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
