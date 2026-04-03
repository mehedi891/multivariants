import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import ApiEmptyState from "@/components/ApiEmptyState";
import { getPublicChangelogs } from "@/app/changelog/public-api";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Track recent MultiVariants releases, features, improvements, and fixes.",
  alternates: { canonical: "/changelog" },
};

type PageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

const PAGE_SIZE = 20;

function pickFirst(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function safePage(value: string | undefined) {
  const parsed = Number(value ?? "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function toChangelogHref(page: number) {
  return page > 1 ? `/changelog?page=${page}` : "/changelog";
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function hasInlineImage(contentHtml?: string) {
  if (!contentHtml) return false;
  return /<img\b/i.test(contentHtml);
}

function hexToRgba(hex: string, alpha: number) {
  const safeHex = hex.trim().replace("#", "");
  if (!/^[0-9A-Fa-f]{6}$/.test(safeHex)) {
    return `rgba(71, 193, 191, ${alpha})`;
  }

  const r = Number.parseInt(safeHex.slice(0, 2), 16);
  const g = Number.parseInt(safeHex.slice(2, 4), 16);
  const b = Number.parseInt(safeHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default async function ChangelogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedPage = safePage(pickFirst(params.page));
  const { changelogs, totalPages, currentPage, error } = await getPublicChangelogs({
    page: requestedPage,
    limit: PAGE_SIZE,
  });

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
                Follow the latest feature launches, improvements, and fixes shipped
                across MultiVariants.
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
              <div className="absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-primary/70 via-primary/45 to-transparent" />

              {changelogs.length === 0 ? (
                <ApiEmptyState
                  title="No changelog entries yet"
                  description="New updates, improvements, and fixes will appear here once published."
                  helpText="Please check back shortly."
                  error={error}
                  showDebugDetails={process.env.NODE_ENV !== "production"}
                />
              ) : (
                <ul className="space-y-6">
                  {changelogs.map((entry, index) => (
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
                              {formatDate(entry.publishedAt)}
                            </span>
                            <span className="rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-light">
                              {entry.version}
                            </span>
                            <span
                              className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                              style={{
                                color: entry.labelColor,
                                borderColor: hexToRgba(entry.labelColor, 0.55),
                                backgroundColor: hexToRgba(entry.labelColor, 0.17),
                              }}
                            >
                              {entry.labelName}
                            </span>
                          </div>

                          <h2 className="mt-3 text-xl font-black leading-[1.3] text-white sm:text-2xl">
                            {entry.title}
                          </h2>

                          {entry.contentHtml ? (
                            <div
                              className="mt-3 space-y-5 text-sm leading-relaxed text-white/[0.82] sm:text-[15px] [&_p]:text-white/[0.82] [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:text-white/[0.86] [&_a]:font-medium [&_a]:text-primary-light [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent [&_a:hover]:decoration-accent [&_img]:my-4 [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-white/16 [&_img]:bg-white/[0.03] [&_img]:object-contain"
                              dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                            />
                          ) : (
                            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                              {entry.summary}
                            </p>
                          )}

                          {entry.imageSrc && !hasInlineImage(entry.contentHtml) && (
                            <div className="mt-5 rounded-xl border border-white/20 bg-white/[0.04] p-2.5 sm:p-3">
                              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-lg bg-[#0b1120]">
                                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0b1120]/30 to-transparent" />
                                <Image
                                  src={entry.imageSrc}
                                  alt={`${entry.title} preview`}
                                  fill
                                  unoptimized={isRemoteImage(entry.imageSrc)}
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
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                  <Link
                    href={toChangelogHref(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                      currentPage === 1
                        ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                        : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    Prev
                  </Link>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                    <Link
                      key={p}
                      href={toChangelogHref(p)}
                      aria-current={p === currentPage ? "page" : undefined}
                      className={`h-9 w-9 rounded-full border text-center text-xs font-semibold leading-9 transition-all ${
                        p === currentPage
                          ? "border-primary/48 bg-primary/18 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.28)]"
                          : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link
                    href={toChangelogHref(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                      currentPage === totalPages
                        ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                        : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    Next
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
