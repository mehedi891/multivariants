import LocaleLink from "@/components/LocaleLink";
import BookDemoButton from "@/components/BookDemoButton";
import HelpIcon from "@/components/academy/HelpIcon";
import { buttonGradient, buttonLine, card, eyebrowGreen } from "@/components/academy/styles";
import type { AcademyContent } from "@/i18n/content";

/** "Still stuck?" support band closing every Help Center page. */
export default function HelpCta({ content }: { content: AcademyContent["help"] }) {
  return (
    <div
      className={`relative flex flex-wrap items-center justify-between gap-6 overflow-hidden p-[26px] sm:p-10 ${card}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(500px 220px at 90% 0%, rgba(31,226,231,0.16), transparent 70%)",
            "radial-gradient(500px 260px at 0% 100%, rgba(87,102,250,0.2), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="relative max-w-xl">
        <p className={eyebrowGreen}>{content.eyebrow}</p>
        <h2 className="mb-1.5 mt-1.5 text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-hc-ink">
          {content.title}
        </h2>
        <p className="text-hc-muted">{content.body}</p>
      </div>
      <div className="relative flex flex-wrap gap-2.5">
        <LocaleLink href="/contact" className={buttonGradient}>
          <HelpIcon name="chat" className="h-4 w-4" />
          {content.contact}
        </LocaleLink>
        <BookDemoButton className={buttonLine}>{content.setup}</BookDemoButton>
      </div>
    </div>
  );
}
