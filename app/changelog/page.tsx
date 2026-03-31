import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import changelog from "./changelog.json";

type ChangelogTag =
  | "Major"
  | "Feature"
  | "Improvement"
  | "Performance"
  | "Support";

type ChangelogEntry = {
  id: string;
  date: string;
  version: string;
  tag: ChangelogTag;
  title: string;
  summary: string;
  highlights: string[];
  imageSrc?: string;
};

const entries = changelog as ChangelogEntry[];

const tagStyle: Record<ChangelogTag, string> = {
  Major: "bg-[#6e72ff]/22 text-[#b9bcff] border-[#8b90ff]/35",
  Feature: "bg-accent/18 text-accent border-accent/35",
  Improvement: "bg-[#3ca7ff]/18 text-[#9fd8ff] border-[#5cb9ff]/30",
  Performance: "bg-[#ffb24a]/18 text-[#ffd8a1] border-[#ffc36d]/35",
  Support: "bg-[#ff7ab6]/18 text-[#ffc3df] border-[#ff96c7]/35",
};

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Track recent MultiVariants releases, features, improvements, and fixes.",
  alternates: { canonical: "https://multivariants.com/changelog" },
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px] animate-pulse [animation-duration:8s]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                Changelog
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Product Updates & Release Notes
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Follow the latest feature launches, improvements, and fixes
                shipped across MultiVariants.
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
            <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px] animate-pulse [animation-duration:8s]" />
            <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-primary/45 to-transparent" />

              <ul className="space-y-6">
                {entries.map((entry, index) => (
                  <li key={entry.id} className="group relative pl-10">
                    <AnimateIn direction="up" delay={index * 55}>
                      <span
                        className="absolute left-0 top-6 inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/55 bg-[#1b2448] text-[10px] font-bold text-primary-light shadow-[0_0_18px_rgba(92,106,196,0.55)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-primary"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>

                      <article className="group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#1b2440]/96 to-[#0f1830]/96 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_22px_50px_rgba(28,118,188,0.28)] sm:p-6">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full border border-white/25 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                            {entry.date}
                          </span>
                          <span className="rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-light">
                            {entry.version}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${tagStyle[entry.tag]}`}
                          >
                            {entry.tag}
                          </span>
                        </div>

                        <h2 className="mt-3 text-xl font-black leading-[1.3] text-white sm:text-2xl">
                          {entry.title}
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                          {entry.summary}
                        </p>

                        <ul className="mt-4 space-y-2.5">
                          {entry.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-white/[0.88] sm:text-[15px]"
                            >
                              <span className="mt-1 text-accent">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {entry.imageSrc && (
                          <div className="mt-5 rounded-xl border border-white/20 bg-white/[0.04] p-2.5 sm:p-3">
                            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-lg bg-[#0b1120]">
                              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0b1120]/30 to-transparent" />
                              <Image
                                src={entry.imageSrc}
                                alt={`${entry.title} preview`}
                                fill
                                className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                sizes="(min-width: 1024px) 52vw, 92vw"
                              />
                            </div>
                          </div>
                        )}
                      </article>
                    </AnimateIn>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
