import type { PostStatus } from "@/app/blog/public-api";

const STATUS_STYLES: Record<PostStatus, string> = {
  DRAFT: "bg-amber-400/20 text-amber-200 border-amber-300/40",
  PUBLISHED: "bg-emerald-400/20 text-emerald-200 border-emerald-300/40",
  SCHEDULED: "bg-sky-400/20 text-sky-200 border-sky-300/40",
  ARCHIVED: "bg-white/10 text-white/70 border-white/25",
};

type PreviewBannerProps = {
  status?: PostStatus;
  locale?: string;
  /** Path to return to after leaving preview. */
  exitRedirect?: string;
};

export default function PreviewBanner({
  status,
  locale,
  exitRedirect,
}: PreviewBannerProps) {
  const exitHref = exitRedirect
    ? `/api/preview/exit?redirect=${encodeURIComponent(exitRedirect)}`
    : "/api/preview/exit";

  return (
    <div
      role="status"
      className="sticky top-0 z-[60] border-b border-amber-300/30 bg-amber-500/15 px-[5%] py-2.5 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-amber-200">
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M1.8 10S4.9 4.2 10 4.2 18.2 10 18.2 10 15.1 15.8 10 15.8 1.8 10 1.8 10Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="10" r="2.4" />
            </svg>
            Preview
          </span>

          {status && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] ${STATUS_STYLES[status]}`}
            >
              {status}
            </span>
          )}

          {locale && (
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75">
              {locale}
            </span>
          )}

          <span className="text-xs text-amber-100/80 sm:text-sm">
            You are viewing unpublished content. This page is not indexed.
          </span>
        </div>

        {/* prefetch={false} equivalent — a plain anchor never prefetches, so the
            draft cookie is not cleared by a hover. */}
        <a
          href={exitHref}
          className="shrink-0 rounded-lg border border-amber-300/45 bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-100 transition-colors hover:bg-amber-400/30 hover:text-white"
        >
          Exit preview
        </a>
      </div>
    </div>
  );
}
