import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import ApiEmptyState from "@/components/ApiEmptyState";
import { getPublicClients } from "@/app/clients-showcase/public-api";

export const metadata: Metadata = {
  title: "Clients Showcase",
  description:
    "Explore businesses that use MultiVariants to scale bulk variant ordering on Shopify.",
  alternates: { canonical: "/clients-showcase" },
};

type PageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

const PAGE_SIZE = 10;

function pickFirst(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function safePage(value: string | undefined) {
  const parsed = Number(value ?? "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function toShowcaseHref(page: number) {
  return page > 1 ? `/clients-showcase?page=${page}` : "/clients-showcase";
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export default async function ClientsShowcasePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedPage = safePage(pickFirst(params.page));

  const { clients: clientItems, totalPages, currentPage, error } = await getPublicClients({
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
            <div className="absolute -left-20 top-10 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[80px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                Featured Clients
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
                Businesses Growing with MultiVariants
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                A showcase of merchants using MultiVariants to improve bulk ordering,
                increase conversion, and simplify complex variant workflows.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(170deg, #0b1223 0%, #111a31 45%, #171238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-16 h-[280px] w-[280px] rounded-full bg-primary/12 blur-[70px]" />
            <div className="absolute right-[-80px] bottom-8 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            {clientItems.length === 0 ? (
              <ApiEmptyState
                title="No client stories available"
                description="Client showcase stories will appear here once published."
                helpText="Please check back soon."
                error={error}
                showDebugDetails={process.env.NODE_ENV !== "production"}
              />
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {clientItems.map((client, index) => (
                  <li key={client.id}>
                    <AnimateIn direction="up" delay={(index % 3) * 70}>
                      <article className="group relative h-full overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_38px_rgba(28,118,188,0.28)] sm:p-5">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        <div className="flex min-h-[220px] flex-col">
                          {client.logoUrl ? (
                            <div className="relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-accent/35 bg-accent/10 shadow-[0_0_18px_rgba(71,193,191,0.22)]">
                              <Image
                                src={client.logoUrl}
                                alt={client.title}
                                fill
                                unoptimized={isRemoteImage(client.logoUrl)}
                                sizes="44px"
                                className="object-contain p-1"
                              />
                            </div>
                          ) : (
                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 text-[12px] font-black tracking-wide text-accent shadow-[0_0_18px_rgba(71,193,191,0.22)]">
                              {initials(client.title)}
                            </span>
                          )}
                          <h2 className="mt-3 break-words text-lg font-black leading-tight text-white sm:text-xl">
                            {client.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                            {client.excerpt}
                          </p>
                          <div className="mt-auto pt-4">
                            <Link
                              href={`/clients-showcase/${client.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-all hover:border-primary hover:text-primary-light"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </article>
                    </AnimateIn>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                <Link
                  href={toShowcaseHref(Math.max(1, currentPage - 1))}
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
                    href={toShowcaseHref(p)}
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
                  href={toShowcaseHref(Math.min(totalPages, currentPage + 1))}
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
        </section>
      </main>
      <Footer />
    </>
  );
}
