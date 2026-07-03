"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

type Feature = { title: string; desc?: string };

type Price = { amount: string; period: string; regular?: string; save?: string };

type Plan = {
  name: string;
  icon: string;
  popular?: boolean;
  description: string;
  // Genuinely free tier (Starter). Paid plans use `monthly`/`annual`.
  free?: boolean;
  monthly?: Price;
  annual?: Price;
  featuresHeading?: string;
  features: Feature[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    icon: "✨",
    free: true,
    description: "Free forever. Core variant display essentials to get started.",
    features: [
      { title: "Variant Image Icon Display", desc: "Show all variant images as icons for easy selection." },
      { title: "Out-of-Stock Badge", desc: "Highlight unavailable variants with a clear “Out-of-Stock” label." },
      { title: "Hide Out-of-Stock Variants", desc: "Automatically remove unavailable variants from the listing." },
      { title: "Visual Button Customization", desc: "Customize the Add to Cart button to match your store's design seamlessly." },
      { title: "Flexible Price Display", desc: "Show variant prices per unit or as a total cost." },
    ],
  },
  {
    name: "Standard",
    icon: "⚡",
    monthly: { amount: "$12.99", period: "/month" },
    annual: { amount: "$124.70", regular: "$155.88", period: "/year", save: "20%" },
    description: "Everything you need to simplify variant ordering and enable bulk purchases.",
    features: [
      { title: "Variants Listing with Quantity Box", desc: "Display all variants in a list with a quantity box for quick bulk ordering." },
      { title: "Inventory Tracking & Stock Display", desc: "Show real-time stock levels to manage availability." },
      { title: "B2B Wholesale Pricing", desc: "Offer catalog pricing for bulk and wholesale buyers." },
      { title: "Show Total Order Price", desc: "Automatically display the total price for all selected variants and quantities." },
      { title: "Apply to Specific or Grouped Products", desc: "Create multiple rules for individual products or grouped product types with customized display settings." },
      { title: "Variants Option Display: Select", desc: "Choose to display variant options in a drop-down (select) menu." },
      { title: "Custom Out-of-Stock Badge", desc: "Upload and display a unique badge for sold-out items." },
      { title: "Display Layout", desc: "Choose a predefined layout for each ruleset to apply a unique theme to individual or grouped products." },
      { title: "Flexible Variant Display", desc: "Choose from list, grid, or matrix layouts." },
      { title: "Sticky Add to Cart Button", desc: "Always visible for easy checkout." },
      { title: "Global Cart Restriction", desc: "Set minimum and maximum limits for order value, item count, and quantity across multiple products in the cart." },
      { title: "Customer Eligibility", desc: "Restrict your bulk order table to specific customers by login status, customer tag, or customer list." },
    ],
  },
  {
    name: "Professional",
    icon: "👑",
    popular: true,
    monthly: { amount: "$29.99", period: "/month" },
    annual: { amount: "$287.90", regular: "$359.88", period: "/year", save: "20%" },
    description: "Everything in Standard, plus advanced controls for scaling B2B and wholesale.",
    featuresHeading: "Everything in Standard, plus:",
    features: [
      { title: "Custom Text Fields for Variants", desc: "Allow customers to add personalized text or comments for each variant." },
      { title: "Checkout Button", desc: "Skip the cart and go straight to checkout after selection." },
      { title: "Incremental Quantity or Bundle Quantity", desc: "Sell variants in preset bundle quantities with a drop-down selection or set step qty like 6." },
      { title: "Variants Option Display: Swatch", desc: "Customize which options appear as swatches." },
      { title: "Custom CSS", desc: "Style the display to match your store theme with custom CSS." },
      { title: "Min/Max Quantity of Variant/Total", desc: "Set min and max quantity limits per variant or for the total combined quantity." },
      { title: "Limit Variant Orders", desc: "e.g., Min/Max 6 flavors." },
      { title: "Minimum Quantity per Option", desc: "Set minimum order quantity per variant option. e.g., Red - 12 pcs." },
      { title: "Product Options", desc: "Add custom input fields to product pages — text, dropdowns, swatches, file uploads, and more — with optional pricing per option." },
    ],
  },
];

export default function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="relative z-10 mx-auto max-w-6xl">
      {/* Billing toggle */}
      <AnimateIn direction="up">
        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1 backdrop-blur-xl"
            role="tablist"
            aria-label="Billing period"
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
              Monthly Plan
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
              Annual Plan
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                  annual ? "bg-brand-green/15 text-brand-green" : "bg-brand-green/20 text-brand-green"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </AnimateIn>

      <ul className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan, idx) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <li key={plan.name} className={plan.popular ? "lg:-mt-3" : ""}>
              <AnimateIn direction="up" delay={idx * 70}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                    plan.popular
                      ? "border-[#6e72ff]/80 bg-gradient-to-b from-[#1c1f44]/95 to-[#0d1329]/98 shadow-[0_24px_46px_rgba(90,94,255,0.28)]"
                      : "border-white/15 bg-gradient-to-b from-[#1a223e]/92 to-[#0c1328]/96 backdrop-blur-xl"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                      className={`absolute -right-10 -top-8 h-28 w-28 rounded-full blur-2xl ${
                        plan.popular ? "bg-[#6e72ff]/35" : "bg-primary/20"
                      }`}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  </div>

                  {plan.popular && (
                    <div className="absolute inset-x-0 top-0 z-20 border-b border-[#8d8fff]/55 bg-gradient-to-r from-[#5a5eff] via-[#6e72ff] to-[#6e72ff] py-1.5">
                      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                        ✦ Most Popular
                      </p>
                    </div>
                  )}

                  <div className={`relative z-10 flex items-center gap-3 ${plan.popular ? "pt-9" : ""}`}>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                        plan.popular
                          ? "border border-[#8d8fff]/40 bg-[#6e72ff]/20 shadow-[0_0_24px_rgba(110,114,255,0.28)]"
                          : "border border-accent/35 bg-accent/15 shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                      }`}
                    >
                      {plan.icon}
                    </span>
                    <h2 className="text-[1.75rem] font-black leading-tight text-white">{plan.name}</h2>
                  </div>

                  {/* Price */}
                  <div className="relative z-10 mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <p
                      className={`text-4xl font-black leading-none ${
                        plan.popular ? "text-[#8f95ff]" : "text-white"
                      }`}
                    >
                      {plan.free ? "Free" : price?.amount}
                    </p>
                    {!plan.free && price && (
                      <span className="pb-1 text-sm text-white/55">{price.period}</span>
                    )}
                    {price?.regular && (
                      <span className="pb-1 text-sm font-medium text-white/40 line-through">
                        {price.regular}
                      </span>
                    )}
                    {price?.save && (
                      <span className="mb-1 rounded-full bg-brand-green/15 px-2 py-0.5 text-[11px] font-bold text-brand-green">
                        Save {price.save}
                      </span>
                    )}
                  </div>
                  {price?.regular && (
                    <p className="relative z-10 mt-1.5 text-xs text-white/45">
                      Billed annually at {price.amount} ({price.regular} regular)
                    </p>
                  )}

                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                    {plan.description}
                  </p>

                  <Link
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#5a5eff] to-[#6e72ff] text-white hover:brightness-110"
                        : "border border-white/20 bg-white/5 text-white/80 hover:border-primary hover:text-primary-light"
                    }`}
                  >
                    {plan.free ? "Get Started Free" : "Start 7-day FREE Trial"}
                  </Link>

                  {plan.featuresHeading && (
                    <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-wide text-accent">
                      {plan.featuresHeading}
                    </p>
                  )}

                  <ul className="relative z-10 mt-4 space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f.title} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-accent">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-white sm:text-[15px]">{f.title}</p>
                          {f.desc && (
                            <p className="mt-0.5 text-[13px] leading-relaxed text-white/55">{f.desc}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimateIn>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
