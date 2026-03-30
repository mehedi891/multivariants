import React from "react";
import Link from "next/link";

export default function StatsBanner() {
  return (
    <section
      className="bg-gradient-to-r from-primary via-primary-dark to-[#2d3a9e] px-[5%] py-16"
      aria-label="Key statistics"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-8">

        {[
          { num: "13,000", suffix: "+", label: "B2B and B2C Shopify Merchants" },
          { num: "120",    suffix: "+", label: "Countries Worldwide" },
          { num: "350",    suffix: "+", label: "5-Star Reviews" },
        ].map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="text-center flex-1 min-w-[140px]">
              <p className="text-5xl font-black text-white tracking-[-2px] leading-none">
                {s.num}<span className="text-accent">{s.suffix}</span>
              </p>
              <p className="text-sm text-white/75 font-medium mt-1.5">{s.label}</p>
            </div>
            {i < 2 && (
              <div className="hidden md:block w-px h-16 bg-white/20" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}

        <div className="text-center">
          <p className="text-white/80 mb-4 text-[15px]">Free plan available · 7-Day Trial</p>
          <Link
            href="https://apps.shopify.com/"
            className="inline-flex items-center px-7 py-3.5 bg-brand-green text-white rounded-xl text-base font-semibold hover:bg-green-700 hover:-translate-y-px hover:shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the App on Shopify
          </Link>
        </div>
      </div>
    </section>
  );
}
