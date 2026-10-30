import Image from "next/image";
import { EXTERNAL, INSTALL_URL } from "./links";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Why MultiVariants", href: "#why" },
  { label: "How it works", href: "#how" },
];

/** Floating pill header. Section links scroll in-page; Install opens the App Store. */
export default function Header() {
  return (
    <header style={{ position: "sticky", top: "0", zIndex: "50", padding: "18px 16px 0 16px" }}>
      <nav aria-label="Main" style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "10px 10px 10px 20px", background: "rgba(255,255,255,0.86)", backdropFilter: "blur(14px)", border: "1px solid #E7E7E1", borderRadius: "999px", boxShadow: "0 8px 30px -18px rgba(11,13,18,0.25)" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--wn-display), sans-serif", fontWeight: "800", fontSize: "19px", letterSpacing: "-0.02em" }}>
          <Image src="/images/whats-new/logo-mark.png" alt="" width={34} height={33} preload style={{ width: "34px", height: "auto", display: "block" }} />
          <span>MultiVariants</span>
        </a>
        <div className="navlinks" style={{ gap: "30px", fontSize: "15px", fontWeight: "500", color: "#3A3F4A" }}>
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a className="btn navcta" href={INSTALL_URL} {...EXTERNAL} style={{ display: "inline-flex", alignItems: "center", gap: "8px", flex: "none", whiteSpace: "nowrap", background: "#0B0D12", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", padding: "12px 22px", borderRadius: "999px" }}>
          <Image src="/images/whats-new/shopify-bag.png" alt="" width={15} height={17} style={{ width: "15px", height: "auto", display: "block" }} />
          Install app
        </a>
      </nav>
    </header>
  );
}
