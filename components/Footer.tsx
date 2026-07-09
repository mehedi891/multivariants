import Link from "next/link";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import BookDemoButton from "./BookDemoButton";

const usefulLinks = [
  { label: "Changelog", href: "/changelog" },
  { label: "FAQ", href: "/faq" },
  { label: "Book a Demo", href: "#", demo: true },
  { label: "Support", href: "mailto:support@multivariants.com" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const integrationLinks = [
  { label: "Discount Ray", href: "https://discountray.com/" },
  { label: "Shopify", href: "https://shopify.com/" },
];

const appLinks = [
  { label: "DiscountRay", desc: "Custom Price", href: "https://discountray.com/" },
  { label: "QuotWay", desc: "B2B Quote-Negotiation", href: "https://www.quotway.com" },
  { label: "OrderRules", desc: "Store Open Limits", href: "https://orderrules.com" },
  { label: "EmbedUp", desc: "Affiliate Buy Button", href: "https://embedup.com" },
  { label: "Push Bundle", desc: "Build a Box App", href: "https://pushbundle.com/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "#" },
  { label: "Changelog", href: "/changelog" },
];

const socials = [
  {
    href: "https://www.facebook.com/MultiVariantsApp",
    label: "Facebook",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    href: "https://www.linkedin.com/company/multivariants/",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    href: "https://twitter.com/multivariants",
    label: "Twitter",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
];

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white/75 px-[5%] pt-16 pb-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -bottom-24 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 pb-12 mb-8 border-b border-white/10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:gap-12">

          {/* Brand */}
          <AnimateIn direction="up">
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center mb-5" aria-label="MultiVariants home">
                <Image
                  src="/images/logo.webp"
                  alt="MultiVariants logo"
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-[14px] text-white/55 leading-relaxed mb-6">
                Let your customers order multiple variants and quantities of the
                same product in just one click. Increase your sales and conversion
                rate with our bulk ordering solution.
              </p>
              <nav aria-label="Social links">
                <ul className="flex gap-2.5 list-none" role="list">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-0.5 transition-all"
                      >
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                          {s.icon}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </AnimateIn>

          {/* Useful Links */}
          <AnimateIn direction="up" delay={80}>
            <nav aria-label="Useful links">
              <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white/90 mb-4">
                Useful Links
              </h3>
              <ul className="list-none flex flex-col gap-3" role="list">
                {usefulLinks.map((l) =>
                  l.demo ? (
                    <li key={l.label}>
                      <BookDemoButton className="cursor-pointer text-left text-[14px] text-white/55 hover:text-accent transition-colors">
                        {l.label}
                      </BookDemoButton>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-white/55 hover:text-accent transition-colors"
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </AnimateIn>

          {/* Integration */}
          <AnimateIn direction="up" delay={160}>
            <nav aria-label="Integration links">
              <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white/90 mb-4">
                Integration
              </h3>
              <ul className="list-none flex flex-col gap-3" role="list">
                {integrationLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-white/55 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimateIn>

          {/* Our Apps */}
          <AnimateIn direction="up" delay={240}>
            <nav aria-label="Other apps by eFoli">
              <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white/90 mb-4">
                More by eFoli
              </h3>
              <ul className="list-none flex flex-col gap-1" role="list">
                {appLinks.map((app) => (
                  <li key={app.label}>
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                    >
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium text-white/80 group-hover:text-accent transition-colors">
                          {app.label}
                        </span>
                        <span className="block truncate text-[12px] text-white/40">{app.desc}</span>
                      </span>
                      <span className="text-accent">
                        <ExternalArrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimateIn>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between flex-wrap gap-4 text-[13px] text-white/40">
          <p>
            ©{new Date().getFullYear()} | MultiVariants — A Product of{" "}
            <strong className="text-white/55">eFoli</strong>
          </p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none" role="list">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-accent transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
