import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

type FeatureItem = {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  demoLabel: string;
  imageSrc?: string;
  demoUrl?: string;
  reverse?: boolean;
};

type SupportItem = {
  label: string;
  detail: string;
  kind:
    | "installation"
    | "customization"
    | "feature-assistance"
    | "collaboration"
    | "live-support";
};

const appLink =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";
const demoLink = "https://multivariant.myshopify.com/collections/all";

const featureItems: FeatureItem[] = [
  {
    icon: "🧩",
    title: "Mix and Match Orders",
    subtitle: "Let customers build their own bundle",
    desc: "Let buyers combine sizes, colors, and variants in one order without bouncing between product pages.",
    bullets: [
      "Set quantity rules for complete bundles",
      "Create flexible bulk packs for B2B buyers",
      "Reduce drop-offs during large orders",
    ],
    demoLabel: "Mix and Match bundle preview",
    imageSrc: "/images/features/mix-n-match-box.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/mix-n-match",
  },
  {
    icon: "✅",
    title: "Apply Multiple Restrictions",
    subtitle: "Control ordering rules with precision",
    desc: "Control minimum, maximum, and variant-level quantities to keep orders valid and profitable.",
    bullets: [
      "Min/Max quantity by product or variant",
      "Block invalid combinations instantly",
      "Prevent operational mistakes at checkout",
    ],
    demoLabel: "Order rule validation panel",
    imageSrc: "/images/features/apply-restriction-minmax-value.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/minimum-order-limit",
    reverse: true,
  },
  {
    icon: "➕",
    title: "Incremental Quantity Increase",
    subtitle: "Sell in fixed quantity steps",
    desc: "Offer fixed quantity steps like packs of 6 or 12 for warehouse-friendly, predictable order volumes.",
    bullets: [
      "Supports interval-based quantities",
      "Improves stock and packing efficiency",
      "Perfect for wholesale pack sales",
    ],
    demoLabel: "Increment quantity selector",
    imageSrc: "/images/features/incremental-inc.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/quantity-interval",
  },
  {
    icon: "📦",
    title: "Bundle Quantity for Product Variants",
    subtitle: "Group variants into smarter packs",
    desc: "Set bundle quantities across variants and let customers complete orders quickly with less manual input.",
    bullets: [
      "Bundle-based variant ordering",
      "Faster add-to-cart for repeated SKUs",
      "Higher average order size",
    ],
    demoLabel: "Variant bundle matrix",
    imageSrc: "/images/features/bundle-qty-demo.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/bundle-quantity",
    reverse: true,
  },
  {
    icon: "📱",
    title: "Bulk Ordering from Any Device",
    subtitle: "Desktop, tablet, and mobile ready",
    desc: "Fully responsive bulk-order experience for desktop, tablet, and mobile storefronts.",
    bullets: [
      "Optimized for touch and keyboard input",
      "Consistent UI across screen sizes",
      "Better usability for field buyers",
    ],
    demoLabel: "Mobile bulk-order layout",
    imageSrc: "/images/features/any-device.webp",
    demoUrl: "https://multivariant.myshopify.com",
  },
  {
    icon: "🧱",
    title: "Customize Variant Display Layout",
    subtitle: "Present variants your way",
    desc: "Choose table style, list style, and display behavior based on your catalog and customer workflow.",
    bullets: [
      "Flexible layout controls",
      "Clean variant grouping",
      "Works with complex product catalogs",
    ],
    demoLabel: "Layout configuration preview",
    imageSrc: "/images/features/customize-variants-display-layout.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/all",
    reverse: true,
  },
  {
    icon: "🛒",
    title: "Cart Restrictions",
    subtitle: "Keep every order valid before checkout",
    desc: "Apply order constraints before checkout so customers always submit valid cart quantities.",
    bullets: [
      "Prevent invalid or partial bulk orders",
      "Display clear validation messaging",
      "Reduce support tickets and manual edits",
    ],
    demoLabel: "Cart restriction summary",
    imageSrc: "/images/features/cart-estrictions.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/all",
  },
  {
    icon: "⚖️",
    title: "Fractional Quantity Support",
    subtitle: "Support decimal ordering where needed",
    desc: "Support decimal and weighted ordering where needed, ideal for select wholesale and specialty categories.",
    bullets: [
      "Decimal quantity compatibility",
      "Controlled rounding behavior",
      "Useful for measured goods and B2B units",
    ],
    demoLabel: "Fractional quantity control",
    imageSrc: "/images/features/fractional-qty.webp",
    demoUrl:
      "https://multivariant.myshopify.com/collections/fraction-value-quantity",
    reverse: true,
  },
  {
    icon: "⚙️",
    title: "Easy Setup — No Coding Required",
    subtitle: "Launch quickly with simple setup",
    desc: "Install quickly and configure without code. Launch your bulk-order flow in minutes.",
    bullets: [
      "Merchant-friendly setup",
      "Simple in-app configuration",
      "Fast onboarding for non-technical teams",
    ],
    demoLabel: "No-code setup wizard",
    imageSrc: "/images/features/easy-to-use-and-configure.webp",
    demoUrl: "https://multivariant.myshopify.com/collections/all",
  },
];

const supportItems: SupportItem[] = [
  {
    kind: "installation",
    label: "Installation",
    detail: "Guided setup for your theme and product templates.",
  },
  {
    kind: "customization",
    label: "Customization",
    detail: "Custom logic, styling, and workflow tuning for your store.",
  },
  {
    kind: "feature-assistance",
    label: "Feature Assistance",
    detail: "Hands-on help with quantity rules and advanced options.",
  },
  {
    kind: "collaboration",
    label: "Collaboration",
    detail: "Work directly with our team on your exact use case.",
  },
  {
    kind: "live-support",
    label: "Video/Audio Live Support",
    detail: "Real-time troubleshooting over call and screen share.",
  },
];

const merchantBenefits = [
  "Faster ordering for B2B and wholesale",
  "Higher average order value",
  "Reduced cart abandonment",
  "Flexible quantity and bundle control",
  "Works with modern Shopify themes",
  "Mobile-friendly purchasing flow",
  "Cleaner variant selection experience",
  "Lower operational error rate",
  "Customizable layouts and rules",
  "Strong support and onboarding",
  "Simple install and fast go-live",
  "Built to scale with growth",
];

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore MultiVariants features for bulk ordering, restrictions, incremental quantities, bundle rules, and more.",
  alternates: { canonical: "https://multivariants.com/features" },
};

function SupportIcon({ kind }: { kind: SupportItem["kind"] }) {
  if (kind === "installation") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7 16v2.5A2.5 2.5 0 0 0 9.5 21h5A2.5 2.5 0 0 0 17 18.5V16" />
        <path d="M12 3v11" />
        <path d="M8.5 10.5 12 14l3.5-3.5" />
      </svg>
    );
  }
  if (kind === "customization") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="12" height="12" rx="2" />
        <path d="M8 16v4M6 20h4" />
        <path d="M15 15l2.4.4 1 1.8-1.4 2 1 1.8-1.6 1.1-1.7-1-1.8 1h-2l-.8-1.8 1.1-1.6-1.1-1.8 1.1-1.8 2-.3" />
      </svg>
    );
  }
  if (kind === "feature-assistance") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m7 8 4 4-4 4" />
        <path d="M13 8h8M13 12h8M13 16h8" />
      </svg>
    );
  }
  if (kind === "collaboration") {
    return (
      <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 9a3 3 0 0 1 5.1-2.1l1.3 1.3a3 3 0 0 1 0 4.2l-1.5 1.5" />
        <path d="M15 15a3 3 0 0 1-5.1 2.1L8.6 15.8a3 3 0 0 1 0-4.2l1.5-1.5" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#9bc4f0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="11" height="8" rx="2" />
      <rect x="10" y="10" width="11" height="8" rx="2" />
      <path d="M16.5 14.5h2M17.5 13.5v2" />
      <path d="M6.5 8.5h4" />
    </svg>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-20 top-10 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[80px] animate-pulse [animation-duration:8s]" />
            <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[80px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="text-center">
                <span className="inline-flex rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                  Features
                </span>
                <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Powerful Bulk Ordering Features for Shopify Stores
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
                  MultiVariants helps your customers place large variant orders
                  quickly and accurately. From quantity logic to restriction
                  control, everything is built for conversion and speed.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all sm:w-auto"
                  >
                    Get App on Shopify
                  </Link>
                  <Link
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 hover:border-primary hover:text-primary transition-all sm:w-auto"
                  >
                    Live Demo
                  </Link>
                </div>
              </div>
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
            <div className="absolute left-[-120px] top-16 h-[280px] w-[280px] rounded-full bg-primary/12 blur-[70px] animate-pulse [animation-duration:8s]" />
            <div className="absolute right-[-80px] bottom-8 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[80px] animate-pulse [animation-duration:10s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                  Core Capabilities
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Modern Features Built for High-Converting Bulk Orders
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                  Everything below is designed to make large variant ordering
                  faster, cleaner, and easier for customers across devices.
                </p>
              </div>
            </AnimateIn>

            <ul className="space-y-6 sm:space-y-7 lg:space-y-8">
              {featureItems.map((item, index) => (
                <li key={item.title}>
                  <AnimateIn direction="up" delay={(index % 2) * 80}>
                    <article className="rounded-3xl border border-white/12 glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] sm:p-6 lg:p-7">
                      <div
                        className={`grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8 ${
                          item.reverse ? "lg:[direction:rtl]" : ""
                        }`}
                      >
                        <div className={item.reverse ? "[direction:ltr]" : ""}>
                          <div className="mb-4 flex items-start gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-xl ring-1 ring-accent/30">
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <h3 className="break-words text-xl font-black leading-tight text-white sm:text-2xl lg:text-[1.85rem]">
                                {item.title}
                              </h3>
                              <p className="mt-0.5 text-xs text-white/45 sm:text-sm lg:text-base">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed text-white/60 sm:text-[15px] lg:text-base">
                            {item.desc}
                          </p>

                          <div className="mt-3 space-y-2.5">
                            {item.bullets.map((b) => (
                              <p key={b} className="text-sm leading-relaxed text-white/60 sm:text-[15px] lg:text-base">
                                {b}
                              </p>
                            ))}
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                              href={appLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#49a874] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3f9968] transition-all sm:w-auto"
                            >
                              Get the app on Shopify
                              <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                              href={item.demoUrl ?? demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:border-primary hover:text-primary-light transition-all sm:w-auto"
                            >
                              Live Demo
                            </Link>
                          </div>
                        </div>

                        <div className={item.reverse ? "[direction:ltr]" : ""}>
                          {item.imageSrc ? (
                            <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.02] p-3 sm:p-4">
                              <div className="relative w-full overflow-hidden rounded-2xl bg-white/95 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] aspect-[4/3] sm:aspect-[16/10]">
                                <Image
                                  src={item.imageSrc}
                                  alt={`${item.title} screenshot`}
                                  fill
                                  className="object-contain object-center"
                                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 44vw, (min-width: 640px) 88vw, 92vw"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-8 text-center">
                              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl text-white/45">
                                {item.icon}
                              </span>
                              <p className="mt-4 text-base font-medium text-white/35 sm:text-lg">
                                {item.title} Screenshot
                              </p>
                              <p className="mt-1 text-xs text-white/25 sm:text-sm">
                                {item.demoLabel}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </AnimateIn>
                </li>
              ))}
            </ul>

            <AnimateIn direction="up" delay={120}>
              <section className="relative mt-12 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#1c2546]/90 via-[#171f3f]/90 to-[#101a36]/95 px-5 py-9 shadow-[0_22px_56px_rgba(0,0,0,0.4)] sm:px-8 lg:mt-14 lg:px-12 lg:py-12">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute -left-20 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute -right-20 top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                </div>

                <div className="relative z-10">
                  <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-flex rounded-full border border-primary/35 bg-primary/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                      Premium Support
                    </span>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                      Customer Support Is Our USP
                    </h2>
                    <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                      Questions at midnight? No sweat. Our team is available
                      24/7 to solve real merchant problems with fast responses,
                      practical guidance, and personalized support for complex
                      B2B and wholesale workflows.
                    </p>
                  </div>

                  <div className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-3 text-center sm:grid-cols-3">
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">24/7</p>
                      <p>Global coverage</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">&lt;5 min</p>
                      <p>Average first response</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
                      <p className="font-bold text-primary-light">Live call</p>
                      <p>Screen-share support</p>
                    </div>
                  </div>

                  <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {supportItems.map((item) => (
                      <li
                        key={item.label}
                        className="group rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_34px_rgba(28,118,188,0.28)] lg:min-h-[210px]"
                      >
                        <div className="flex h-full items-start gap-3">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:bg-primary/25">
                            <SupportIcon kind={item.kind} />
                          </span>
                          <div className="min-w-0">
                            <p className="break-words text-base font-bold leading-snug text-white sm:text-lg">
                              {item.label}
                            </p>
                            <p className="mt-1.5 break-words text-sm leading-relaxed text-white/65 sm:text-[15px]">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#16243a] px-[5%] py-14">
          <AnimateIn direction="up">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center text-2xl font-black text-white sm:text-3xl">
                Why Merchants Choose MultiVariants
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {merchantBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/70 sm:text-[15px]">
                    <span className="mt-1.5 text-accent">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </section>

        <section
          className="px-[5%] py-14"
          style={{
            background:
              "linear-gradient(180deg, #0e1730 0%, #121f38 100%)",
          }}
        >
          <AnimateIn direction="up">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Built for Bulk Variant Ordering
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                From first-time setup to advanced quantity logic, MultiVariants
                gives your store everything needed for high-converting bulk orders.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all sm:w-auto"
                >
                  Get App on Shopify
                </Link>
                <Link
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/75 hover:border-primary hover:text-primary transition-all sm:w-auto"
                >
                  Live Demo
                </Link>
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
