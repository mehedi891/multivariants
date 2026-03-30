import Link from "next/link";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import NewsletterForm from "./NewsletterForm";

const usefulLinks = ["Changelog", "FAQ", "Privacy Policy", "DiscountRay – Discounted Pricing", "PushBundle"];
const integrationLinks = ["Discount Ray", "Shopify", "All Integrations", "Book a Demo", "Support"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white/75 px-[5%] pt-16 pb-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -bottom-20 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <AnimateIn direction="up">
            <div>
              <Link href="/" className="inline-flex items-center mb-4" aria-label="MultiVariants home">
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
                  {[{ href: "#", label: "Facebook", abbr: "FB" }, { href: "#", label: "Instagram", abbr: "IN" }, { href: "#", label: "Twitter", abbr: "TW" }].map((s) => (
                    <li key={s.abbr}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="w-9 h-9 rounded-lg glass border-white/15 flex items-center justify-center text-white/60 text-[13px] font-bold hover:bg-primary hover:border-primary hover:text-white transition-all"
                      >
                        {s.abbr}
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
              <h3 className="text-[14px] font-bold text-white mb-4">Useful Links</h3>
              <ul className="list-none flex flex-col gap-2.5" role="list">
                {usefulLinks.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[14px] text-white/55 hover:text-accent transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimateIn>

          {/* Integration */}
          <AnimateIn direction="up" delay={160}>
            <nav aria-label="Integration links">
              <h3 className="text-[14px] font-bold text-white mb-4">Integration</h3>
              <ul className="list-none flex flex-col gap-2.5" role="list">
                {integrationLinks.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[14px] text-white/55 hover:text-accent transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimateIn>

          {/* Newsletter */}
          <AnimateIn direction="up" delay={240}>
            <div>
              <h3 className="text-[14px] font-bold text-white mb-3">Subscribe to our Newsletter</h3>
              <p className="text-[14px] text-white/55 leading-relaxed mb-4">
                Get the latest updates, tips, and resources delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </AnimateIn>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between flex-wrap gap-4 text-[13px] text-white/40">
          <p>
            ©{new Date().getFullYear()} | MultiVariants — A Product of{" "}
            <strong className="text-white/55">eFoli</strong>
          </p>
          <nav aria-label="Legal links">
            <ul className="flex gap-5 list-none" role="list">
              {["Privacy Policy", "Terms of Service", "Changelog"].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-white/50 hover:text-accent transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
