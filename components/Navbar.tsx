"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",        label: "Home" },
  { href: "#features",label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Clients" },
  { href: "#contact", label: "Contact" },
  { href: "#blogs",   label: "Resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a1040 0%, #0f172a 45%, #0a1628 100%)",
      }}
      className={`sticky top-0 z-50 px-[5%] transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-[68px] gap-6" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="MultiVariants home">
          <Image
            src="/images/logo.webp"
            alt="MultiVariants logo"
            width={140}
            height={48}
            className="h-10 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center list-none" role="list">
          {navItems.map(({ href, label }) => {
            const isActive = href === "/" && pathname === "/";
            return (
              <li key={href + label}>
                <Link
                  href={href}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary-light bg-primary/20 font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          <Link
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 text-white/70 hover:border-primary hover:text-primary transition-all"
          >
            Book a Demo
          </Link>
          <Link
            href="https://apps.shopify.com/"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark hover:-translate-y-px hover:shadow-[0_0_20px_rgba(92,106,196,0.5)] transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the App
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass rounded-2xl mx-0 mb-4 p-4 shadow-xl border-white/15">
          <ul className="flex flex-col gap-1 list-none mb-4" role="list">
            {navItems.map(({ href, label }) => (
              <li key={href + label}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center py-2.5 rounded-xl text-sm font-semibold border border-white/20 text-white/70 hover:border-primary hover:text-primary transition-all"
            >
              Book a Demo
            </Link>
            <Link
              href="https://apps.shopify.com/"
              className="block text-center py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the App on Shopify
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
