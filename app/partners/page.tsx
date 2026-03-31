import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import partners from "./partners.json";

type PartnerTheme =
  | "blue"
  | "orange"
  | "lime"
  | "cyan"
  | "slate"
  | "amber"
  | "rose"
  | "indigo"
  | "emerald"
  | "violet"
  | "purple";

type PartnerItem = {
  id: string;
  businessName: string;
  description: string;
  logoText: string;
  theme: PartnerTheme;
  websiteUrl: string;
};

const partnerItems = partners as PartnerItem[];

const themeClassMap: Record<PartnerTheme, string> = {
  blue: "bg-[#0d5fa6]/30 text-[#89c8ff] border-[#3b93d9]/45",
  orange: "bg-[#b36212]/28 text-[#ffd1a1] border-[#f39b3d]/45",
  lime: "bg-[#7c9e17]/28 text-[#defc8f] border-[#b5dc3a]/45",
  cyan: "bg-[#16818d]/28 text-[#99f3ff] border-[#3ccad8]/45",
  slate: "bg-[#44526c]/30 text-[#d1defa] border-[#6f82a8]/45",
  amber: "bg-[#a07a17]/28 text-[#ffebac] border-[#d4ab35]/45",
  rose: "bg-[#a43c5f]/28 text-[#ffd0de] border-[#dd6f93]/45",
  indigo: "bg-[#4c47b7]/28 text-[#d1cdff] border-[#7c76ef]/45",
  emerald: "bg-[#0f8a67]/28 text-[#b5ffe9] border-[#35c49a]/45",
  violet: "bg-[#7138b4]/28 text-[#e5ccff] border-[#9b6cd9]/45",
  purple: "bg-[#7d44c6]/28 text-[#ebd6ff] border-[#ac7de6]/45",
};

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Explore app partners that work seamlessly alongside MultiVariants for Shopify growth.",
  alternates: { canonical: "https://multivariants.com/partners" },
};

export default function PartnersPage() {
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
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
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

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {partnerItems.map((partner, index) => (
                <li key={partner.id}>
                  <AnimateIn direction="up" delay={(index % 3) * 70}>
                    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_42px_rgba(28,118,188,0.3)] sm:p-5">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                      <div className="flex min-h-[250px] flex-col">
                        <span
                          className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-sm font-black tracking-wide shadow-[0_0_18px_rgba(255,255,255,0.08)] ${themeClassMap[partner.theme]}`}
                        >
                          {partner.logoText}
                        </span>
                        <h3 className="mt-3 break-words text-lg font-black leading-[1.26] text-white sm:text-xl">
                          {partner.businessName}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                          {partner.description}
                        </p>

                        <div className="mt-auto pt-4">
                          <Link
                            href={partner.websiteUrl}
                            className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-all hover:border-primary hover:text-primary-light"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </article>
                  </AnimateIn>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
