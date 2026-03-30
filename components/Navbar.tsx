"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#reviews", label: "Clients" },
    { href: "#contact", label: "Contact" },
    { href: "#blogs", label: "Resources" },
    { href: "#contact", label: "Book a demo", isButton: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-border px-[5%]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-[68px] gap-6" aria-label="Main navigation">

        <Link href="/" className="flex items-center flex-shrink-0" aria-label="MultiVariants home">
          <Image
            src="/images/logo.webp"
            alt="MultiVariants logo"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-1.5 flex-1 justify-center list-none" role="list">
          {navItems.map(({ href, label, isButton }) => {
            const isActive = href === "/" && pathname === "/";

            return (
            <li key={`${href}-${label}`}>
              <Link
                href={href}
                className={
                  isButton
                    ? "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-brand-border text-brand-text hover:border-primary hover:text-primary transition-all"
                    : isActive
                      ? "text-[#1c76bc] bg-primary-light text-sm font-semibold px-3 py-1.5 rounded-lg"
                      : "text-brand-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:text-primary hover:bg-primary-light transition-all"
                }
              >
                {label}
              </Link>
            </li>
            );
          })}
        </ul>

        <div className="flex items-center flex-shrink-0">
          <Link
            href="https://apps.shopify.com/"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-[#1c76bc] text-white hover:bg-[#165f96] hover:-translate-y-px hover:shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the app on Shopify
          </Link>
        </div>
      </nav>
    </header>
  );
}
