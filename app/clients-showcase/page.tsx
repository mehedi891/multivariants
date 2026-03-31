import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import clients from "./clients.json";

type ClientItem = {
  id: string;
  logo: string;
  businessName: string;
  description: string;
  readMoreUrl: string;
};

const clientItems = clients as ClientItem[];

export const metadata: Metadata = {
  title: "Clients Showcase",
  description:
    "Explore businesses that use MultiVariants to scale bulk variant ordering on Shopify.",
  alternates: { canonical: "https://multivariants.com/clients-showcase" },
};

export default function ClientsShowcasePage() {
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
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.38] tracking-tight text-white sm:text-4xl lg:text-5xl">
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
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {clientItems.map((client, index) => (
                <li key={client.id}>
                  <AnimateIn direction="up" delay={(index % 3) * 70}>
                    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_38px_rgba(28,118,188,0.28)] sm:p-5">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div className="flex min-h-[220px] flex-col">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 text-[12px] font-black tracking-wide text-accent shadow-[0_0_18px_rgba(71,193,191,0.22)]">
                          {client.logo}
                        </span>
                        <h2 className="mt-3 break-words text-lg font-black leading-tight text-white sm:text-xl">
                          {client.businessName}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                          {client.description}
                        </p>

                        <div className="mt-auto pt-4">
                          <Link
                            href={client.readMoreUrl}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
