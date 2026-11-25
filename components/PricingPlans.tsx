"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";
import type { PricingContent } from "@/i18n/content";
import type { Dictionary } from "@/i18n/dictionaries";
import { ANNUAL_SAVE, LIMIT_KEYS, PLAN_SPECS, formatLimit, planCopy } from "@/lib/pricing";

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

export default function PricingPlans({
  content,
  dict,
}: {
  content: PricingContent;
  dict: Dictionary;
}) {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="relative z-10 mx-auto max-w-7xl">
      {/* Billing toggle */}
      <AnimateIn direction="up">
        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1 backdrop-blur-xl"
            role="tablist"
            aria-label={content.billing.aria}
          >
            <button
              type="button"
              role="tab"
              aria-selected={!annual}
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !annual ? "bg-white text-[#111a31] shadow" : "text-white/65 hover:text-white"
              }`}
            >
              {content.billing.monthly}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={annual}
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                annual ? "bg-white text-[#111a31] shadow" : "text-white/65 hover:text-white"
              }`}
            >
              {content.billing.annual}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                  annual ? "bg-brand-green/15 text-brand-green" : "bg-brand-green/20 text-brand-green"
                }`}
              >
                {content.billing.save}
              </span>
            </button>
          </div>
        </div>
      </AnimateIn>

      <ul className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {PLAN_SPECS.map((spec, idx) => {
          const plan = planCopy(content, spec.id);
          const amount = annual ? spec.annual?.amount : spec.monthly;
          const regular = annual ? spec.annual?.regular : undefined;
          const period = annual ? content.billing.perYear : content.billing.perMonth;
          const limits = LIMIT_KEYS.flatMap((key) => {
            const value = spec.limits[key];
            return value === undefined ? [] : [{ key, value: formatLimit(key, value, content) }];
          });

          return (
            <li key={spec.id} className={spec.popular ? "xl:-mt-3" : ""}>
              <AnimateIn direction="up" delay={idx * 70}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 sm:p-6 xl:p-5 ${
                    spec.popular
                      ? "border-[#6e72ff]/80 bg-gradient-to-b from-[#1c1f44]/95 to-[#0d1329]/98 shadow-[0_24px_46px_rgba(90,94,255,0.28)]"
                      : "border-white/15 bg-gradient-to-b from-[#1a223e]/92 to-[#0c1328]/96 backdrop-blur-xl"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                      className={`absolute -right-10 -top-8 h-28 w-28 rounded-full blur-2xl ${
                        spec.popular ? "bg-[#6e72ff]/35" : "bg-primary/20"
                      }`}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  </div>

                  {spec.popular && (
                    <div className="absolute inset-x-0 top-0 z-20 border-b border-[#8d8fff]/55 bg-gradient-to-r from-[#5a5eff] via-[#6e72ff] to-[#6e72ff] py-1.5">
                      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                        {content.billing.mostPopular}
                      </p>
                    </div>
                  )}

                  <div className={`relative z-10 flex items-center gap-3 ${spec.popular ? "pt-9" : ""}`}>
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${
                        spec.popular
                          ? "border border-[#8d8fff]/40 bg-[#6e72ff]/20 shadow-[0_0_24px_rgba(110,114,255,0.28)]"
                          : "border border-accent/35 bg-accent/15 shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                      }`}
                    >
                      {spec.icon}
                    </span>
                    <h2 className="text-[1.75rem] font-black leading-tight text-white xl:text-2xl">
                      {plan.name}
                    </h2>
                  </div>

                  {/* Price */}
                  <div className="relative z-10 mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <p
                      className={`text-4xl font-black leading-none xl:text-[2rem] ${
                        spec.popular ? "text-[#8f95ff]" : "text-white"
                      }`}
                    >
                      {spec.free ? content.billing.free : amount}
                    </p>
                    {!spec.free && <span className="pb-1 text-sm text-white/55">{period}</span>}
                    {regular && (
                      <span className="pb-1 text-sm font-medium text-white/40 line-through">
                        {regular}
                      </span>
                    )}
                    {regular && (
                      <span className="mb-1 rounded-full bg-brand-green/15 px-2 py-0.5 text-[11px] font-bold text-brand-green">
                        {content.billing.saveLabel.replace("{percent}", ANNUAL_SAVE)}
                      </span>
                    )}
                  </div>
                  {amount && regular && (
                    <p className="relative z-10 mt-1.5 text-xs text-white/45">
                      {content.billing.billedAnnually
                        .replace("{amount}", amount)
                        .replace("{regular}", regular)}
                    </p>
                  )}

                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60 sm:text-[15px] xl:text-sm">
                    {plan.description}
                  </p>

                  <Link
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      spec.popular
                        ? "bg-gradient-to-r from-[#5a5eff] to-[#6e72ff] text-white hover:brightness-110"
                        : "border border-white/20 bg-white/5 text-white/80 hover:border-primary hover:text-primary-light"
                    }`}
                  >
                    {spec.free ? dict.cta.getStartedFree : dict.cta.startTrialShort}
                  </Link>

                  <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-wide text-accent">
                    {plan.featuresHeading}
                  </p>

                  {plan.features.length > 0 && (
                    <ul className="relative z-10 mt-4 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-px text-accent" aria-hidden="true">
                            ✓
                          </span>
                          <p className="text-sm font-medium leading-snug text-white/90">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Limits */}
                  <div className="relative z-10 mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                      {content.limits.heading}
                    </p>
                    <dl className="mt-3 space-y-2">
                      {limits.map(({ key, value }) => (
                        <div key={key} className="flex items-baseline justify-between gap-3 text-sm">
                          <dt className="text-white/60">{content.limits[key]}</dt>
                          <dd className="shrink-0 font-semibold text-white">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Upcoming features (Max) — styled apart so they never read as shipped */}
                  {plan.comingSoon.length > 0 && (
                    <div className="relative z-10 mt-6 border-t border-white/10 pt-5">
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                        {content.billing.comingSoon}
                        <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-200">
                          {plan.comingSoon.length}
                        </span>
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {plan.comingSoon.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-px text-white/35" aria-hidden="true">
                              ◷
                            </span>
                            <p className="text-sm leading-snug text-white/55">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </AnimateIn>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
