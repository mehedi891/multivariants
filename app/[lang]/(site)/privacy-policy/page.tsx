import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPrivacyContent } from "@/i18n/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

/**
 * The policy text is stored as plain strings so translators never touch markup.
 * It contains exactly two clickable things — the site URL and the support email
 * — so those are turned into links here rather than embedding HTML in the JSON.
 */
function linkify(text: string): React.ReactNode[] {
  return text.split(/(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          className="text-primary-light hover:text-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-primary-light hover:text-accent">
          {part}
        </a>
      );
    }
    return part;
  });
}

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const { meta } = await getPrivacyContent(locale);
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/privacy-policy",
    locale,
  });
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = await getDictionary(locale);
  const content = await getPrivacyContent(locale);
  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                {content.badge}
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                {content.effectiveDate}
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <AnimateIn direction="up">
              <article className="rounded-3xl border border-white/16 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
                <div className="space-y-6 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                  {content.blocks.map((block, i) => {
                    if (block.type === "h2") {
                      return (
                        <h2
                          key={i}
                          className="text-xl font-black leading-[1.28] text-white sm:text-2xl"
                        >
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === "h3") {
                      return (
                        <h3
                          key={i}
                          className="text-base font-bold leading-[1.35] text-white sm:text-lg"
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "ul") {
                      return (
                        <ul key={i} className="ml-5 list-disc space-y-2">
                          {block.items?.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{linkify(block.text ?? "")}</p>;
                  })}
                </div>
              </article>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
