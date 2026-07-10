import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import ApiEmptyState from "@/components/ApiEmptyState";
import { getPublicPartners } from "@/app/partners/public-api";

const PAGE_SIZE = 12;

function toPartnersHref(page: number) {
  return page > 1 ? `/partners?page=${page}` : "/partners";
}

// Condensed page list: first, last, and a window around the current page.
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  const items: (number | "ellipsis")[] = [1];
  if (left > 2) items.push("ellipsis");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Math.floor(Number(pageParam) || 1));
  let title = "App Partners & Integrations";
  let description =
    "Explore app partners that work seamlessly alongside MultiVariants for Shopify growth.";
  if (page > 1) {
    title = `${title} – Page ${page}`;
    description = `${description} (Page ${page})`;
  }
  return pageMetadata({
    title,
    description,
    path: page > 1 ? `/partners?page=${page}` : "/partners",
  });
}

const themeClassMap = [
  "bg-[#0d5fa6]/30 text-[#89c8ff] border-[#3b93d9]/45",
  "bg-[#b36212]/28 text-[#ffd1a1] border-[#f39b3d]/45",
  "bg-[#7c9e17]/28 text-[#defc8f] border-[#b5dc3a]/45",
  "bg-[#16818d]/28 text-[#99f3ff] border-[#3ccad8]/45",
  "bg-[#44526c]/30 text-[#d1defa] border-[#6f82a8]/45",
  "bg-[#a07a17]/28 text-[#ffebac] border-[#d4ab35]/45",
  "bg-[#a43c5f]/28 text-[#ffd0de] border-[#dd6f93]/45",
  "bg-[#4c47b7]/28 text-[#d1cdff] border-[#7c76ef]/45",
  "bg-[#0f8a67]/28 text-[#b5ffe9] border-[#35c49a]/45",
  "bg-[#7138b4]/28 text-[#e5ccff] border-[#9b6cd9]/45",
  "bg-[#7d44c6]/28 text-[#ebd6ff] border-[#ac7de6]/45",
];

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { partners: partnerItems, error } = await getPublicPartners();

  const { page: pageParam } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(partnerItems.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = partnerItems.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #090f1f 0%, #10192f 45%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[300px] w-[300px] rounded-full bg-primary/18 blur-[85px]" />
            <div className="absolute -right-16 bottom-10 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                Partners
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl/tight">
                Powerful Partners in the MultiVariants Ecosystem
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Discover partner apps and solutions that combine with MultiVariants
                to unlock better ordering, marketing, checkout, and retention workflows.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(180deg, #0c1224 0%, #121d37 52%, #19133a 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-14 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-90px] bottom-12 h-[270px] w-[270px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <h2 className="text-center text-3xl font-black leading-[1.28] text-white sm:text-4xl">
                Explore Our Partners
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
                Integrated tools trusted by merchants to enhance growth across
                storefront operations.
              </p>
            </AnimateIn>

            {partnerItems.length === 0 ? (
              <div className="mt-8">
                <ApiEmptyState
                  title="No partners available yet"
                  description="Partner listings will appear here once they are published."
                  helpText="Please check back shortly."
                  error={error}
                  showDebugDetails={process.env.NODE_ENV !== "production"}
                />
              </div>
            ) : (
              <>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {pageItems.map((partner, index) => (
                  <li key={partner.id}>
                    <AnimateIn direction="up" delay={(index % 3) * 70}>
                      <article className="group relative h-full overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_42px_rgba(28,118,188,0.3)] sm:p-5">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                        <div className="flex min-h-[250px] flex-col">
                          {partner.logoUrl ? (
                            <div className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/18 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.08)]">
                              <Image
                                src={partner.logoUrl}
                                alt={partner.title}
                                fill
                                unoptimized={isRemoteImage(partner.logoUrl)}
                                sizes="56px"
                                className="object-contain p-1.5"
                              />
                            </div>
                          ) : (
                            <span
                              className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-sm font-black tracking-wide shadow-[0_0_18px_rgba(255,255,255,0.08)] ${themeClassMap[index % themeClassMap.length]}`}
                            >
                              {getInitials(partner.title)}
                            </span>
                          )}
                          <h3 className="mt-3 break-words text-lg font-black leading-[1.26] text-white sm:text-xl">
                            {partner.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                            {partner.description}
                          </p>

                          <div className="mt-auto pt-4">
                            <a
                              href={partner.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-all hover:border-primary hover:text-primary-light"
                            >
                              View More
                            </a>
                          </div>
                        </div>
                      </article>
                    </AnimateIn>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav
                  className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
                  aria-label="Partners pagination"
                >
                  <Link
                    href={toPartnersHref(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                      currentPage === 1
                        ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                        : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    Prev
                  </Link>

                  {getPageItems(currentPage, totalPages).map((item, idx) =>
                    item === "ellipsis" ? (
                      <span
                        key={`e${idx}`}
                        aria-hidden="true"
                        className="h-9 w-9 text-center text-xs font-semibold leading-9 text-white/[0.4]"
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={item}
                        href={toPartnersHref(item)}
                        aria-current={item === currentPage ? "page" : undefined}
                        aria-label={`Page ${item}`}
                        className={`h-9 w-9 rounded-full border text-center text-xs font-semibold leading-9 transition-all ${
                          item === currentPage
                            ? "border-primary/48 bg-primary/18 text-primary-light shadow-[0_0_16px_rgba(92,106,196,0.28)]"
                            : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                        }`}
                      >
                        {item}
                      </Link>
                    )
                  )}

                  <Link
                    href={toPartnersHref(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                      currentPage === totalPages
                        ? "pointer-events-none border-white/12 bg-white/[0.03] text-white/[0.4]"
                        : "border-white/18 bg-white/[0.05] text-white/[0.78] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    Next
                  </Link>
                </nav>
              )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
