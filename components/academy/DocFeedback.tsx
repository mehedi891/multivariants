"use client";

import { useState } from "react";
import { card } from "@/components/academy/styles";
import type { AcademyContent } from "@/i18n/content";

/**
 * "Was this guide helpful?" — each vote is sent to Google Analytics as a
 * `doc_feedback` event ({ doc_slug, helpful: "yes" | "no" }), the same event
 * the PushBundle help centre sends, so guides that need work show up in GA4.
 * GA only loads in production (components/Analytics.tsx); elsewhere the vote
 * just shows the thank-you message.
 */
export default function DocFeedback({
  slug,
  content,
}: {
  slug: string;
  content: AcademyContent["article"]["feedback"];
}) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  const send = (helpful: "yes" | "no") => {
    setVote(helpful);
    const { gtag } = window as unknown as { gtag?: (...args: unknown[]) => void };
    gtag?.("event", "doc_feedback", { doc_slug: slug, helpful });
  };

  return (
    <div className={`flex min-h-[72px] flex-wrap items-center gap-3 px-5 py-4 ${card}`}>
      <p role="status" className="mr-auto font-semibold text-hc-ink">
        {vote === null ? content.question : vote === "yes" ? content.thanksYes : content.thanksNo}
      </p>
      {vote === null && (
        <div className="flex gap-2">
          {(["yes", "no"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => send(v)}
              className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-hc-line px-3.5 text-sm text-hc-ink transition-colors hover:border-hc-line-hover"
            >
              <span aria-hidden="true">{v === "yes" ? "👍" : "👎"}</span>
              {v === "yes" ? content.yes : content.no}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
