import type { Dictionary } from "@/i18n/dictionaries";
import { promo } from "@/lib/promo";

function Dot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`text-white/70 ${className}`}>
      •
    </span>
  );
}

/** Fills `{discount}` and `{code}` in the offer copy, highlighting both. */
function renderOffer(template: string) {
  // Non-breaking space keeps the code from wrapping onto its own line.
  return template
    .replace(" {code}", " {code}")
    .split(/(\{discount\}|\{code\})/)
    .map((part, i) =>
      part === "{discount}" || part === "{code}" ? (
        <span key={i} className="text-amber-200">
          {part === "{discount}" ? promo.discount : promo.code}
        </span>
      ) : (
        part
      ),
    );
}

export default function PromoBanner({
  copy,
  endsLabel,
}: {
  copy: Dictionary["promo"];
  /** Localized "Only until December 12". */
  endsLabel: string;
}) {
  return (
    <aside
      aria-label={copy.ariaLabel}
      style={{ background: "linear-gradient(90deg, #1f4f8f 0%, #285f80 50%, #2a6e60 100%)" }}
    >
      <a
        href={promo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block px-[5%] py-2.5 text-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      >
        {/* One line from lg up (title from xl); narrower screens stack the
            offer above the deadline rather than wrapping mid-separator. */}
        <span className="mx-auto flex max-w-6xl flex-col items-center gap-0.5 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.06em] sm:text-xs lg:flex-row lg:justify-center lg:gap-x-2.5 lg:text-[13px]">
          <span className="hidden xl:inline">
            <span aria-hidden="true">🔥</span> {copy.title}
          </span>
          <Dot className="hidden xl:inline" />
          <span>
            <span aria-hidden="true" className="xl:hidden">
              🔥{" "}
            </span>
            {renderOffer(copy.offer)}
          </span>
          <Dot className="hidden lg:inline" />
          <span className="inline-flex items-center gap-2.5">
            <span>{endsLabel}</span>
            <Dot />
            <span className="inline-flex items-center gap-1 underline decoration-white/50 underline-offset-4 transition-colors group-hover:decoration-white">
              {copy.cta}
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </a>
    </aside>
  );
}
