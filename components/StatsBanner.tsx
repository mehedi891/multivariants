import React from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

export default function StatsBanner() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-16"
      style={{ background: "linear-gradient(135deg, #0E1528 0%, #235BAF 50%, #1E1B4B 100%)" }}
      aria-label="Key statistics"
    >
      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-shift" style={{ backgroundSize: "200%" }} />
        <div className="absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <AnimateIn direction="up">
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-10">
          <div className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-between">
            {[
              { num: "13,000", suffix: "+", label: "B2B and B2C Shopify Merchants" },
              { num: "120",    suffix: "+", label: "Countries Worldwide" },
              { num: "341",    suffix: "",  label: "5-Star Reviews" },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="text-center flex-1 min-w-[140px] glass rounded-2xl px-6 py-5 border-white/15">
                  <p className="text-4xl font-black text-white tracking-tight leading-none sm:text-5xl">
                    {s.num}<span className="text-accent">{s.suffix}</span>
                  </p>
                  <p className="text-sm text-white/65 font-medium mt-2">{s.label}</p>
                </div>
                {i < 2 && <div className="hidden md:block w-px h-12 bg-white/15" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/65 mb-4 text-sm">Free plan available · 7-Day Trial</p>
            <Link
              href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp"
              className="inline-flex items-center px-7 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 hover:-translate-y-px hover:shadow-xl transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the App on Shopify →
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
