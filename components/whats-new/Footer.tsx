import Image from "next/image";
import Link from "next/link";
import BookDemoButton from "@/components/BookDemoButton";
import {
  EFOLI_APPS,
  EXTERNAL,
  HIRE_EXPERT_URL,
  INTEGRATION_LINKS,
  SOCIAL_LINKS,
  SUPPORT_EMAIL_HREF,
} from "./links";

const colTitle = { fontSize: "12px", letterSpacing: "0.14em", color: "#FFFFFF" } as const;

/** Dark footer. Same destinations as the main site footer. */
export default function Footer() {
  return (
    <footer style={{ background: "#0B0D12", color: "#A7ADB8", padding: "72px 16px 32px 16px" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "44px 48px" }}>
        <div style={{ flex: "1.5 1 300px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "#FFFFFF", fontFamily: "var(--wn-display), sans-serif", fontWeight: "800", fontSize: "19px" }}>
            <Image src="/images/whats-new/logo-mark-white.png" alt="" width={34} height={33} style={{ width: "34px", height: "auto", display: "block" }} />
            <span>MultiVariants</span>
          </Link>
          <p style={{ margin: "20px 0 0 0", maxWidth: "340px", fontSize: "15px", lineHeight: "1.6", color: "#A7ADB8" }}>
            Let your customers order multiple variants and quantities of the same product in just one click. Increase your sales and conversion rate with our bulk ordering solution.
          </p>
          <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} {...EXTERNAL} className="soc" aria-label={s.label}>{s.label}</a>
            ))}
          </div>
        </div>
        <nav aria-label="Useful Links" style={{ flex: "1 1 170px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <b style={colTitle}>USEFUL LINKS</b>
          <Link href="/changelog" className="flink">Changelog</Link>
          <Link href="/faq" className="flink">FAQ</Link>
          <BookDemoButton className="flink wn-linkbtn">Book a Demo</BookDemoButton>
          <a href={SUPPORT_EMAIL_HREF} className="flink">Support</a>
          <a href={HIRE_EXPERT_URL} {...EXTERNAL} className="flink">Hire a MultiVariants Expert</a>
          <Link href="/privacy-policy" className="flink">Privacy Policy</Link>
        </nav>
        <nav aria-label="Integration" style={{ flex: "1 1 170px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <b style={colTitle}>INTEGRATION</b>
          {INTEGRATION_LINKS.map((l) => (
            <a key={l.label} href={l.href} {...EXTERNAL} className="flink">{l.label}</a>
          ))}
        </nav>
        <nav aria-label="More by eFoli" style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <b style={colTitle}>MORE BY EFOLI</b>
          {EFOLI_APPS.map((app) => (
            <a key={app.label} href={app.href} {...EXTERNAL} className="flink" style={{ display: "block" }}>
              <b style={{ display: "block", color: "#E7E9EE", fontSize: "15px", fontWeight: "600" }}>{app.label}</b>
              <span style={{ display: "block", marginTop: "2px", fontSize: "13px", color: "#8A909C" }}>{app.desc}</span>
            </a>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: "1180px", margin: "56px auto 0 auto", paddingTop: "24px", borderTop: "1px solid #23262F", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#8A909C" }}>
        <span>
          ©2026 | MultiVariants — A Product of{" "}
          <b style={{ color: "#FFFFFF" }}>eFoli</b>
        </span>
        <span style={{ display: "flex", gap: "22px" }}>
          <Link href="/privacy-policy" className="flink">Privacy Policy</Link>
          <Link href="/changelog" className="flink">Changelog</Link>
          <a href="/llms.txt" className="flink">llms.txt</a>
        </span>
      </div>
    </footer>
  );
}
