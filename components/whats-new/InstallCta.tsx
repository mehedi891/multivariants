import Image from "next/image";
import { EXTERNAL, INSTALL_URL } from "./links";

/** Closing green call-to-action box. */
export default function InstallCta() {
  return (
    <section id="install" aria-labelledby="wn-install-title" style={{ padding: "40px 16px 80px 16px" }}>
      <div className="cta-box" style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", overflow: "hidden", borderRadius: "32px", background: "#0B7A55", color: "#FFFFFF", padding: "clamp(40px, 7vw, 88px) clamp(24px, 6vw, 72px)", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: "-120px", bottom: "-160px", width: "520px", height: "520px", borderRadius: "50%", border: "70px solid rgba(200,242,90,0.18)" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "-80px", top: "-120px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div className="cta-copy" style={{ position: "relative", flex: "1 1 520px" }}>
          <h2 id="wn-install-title" style={{ margin: "0", fontSize: "clamp(36px, 5.4vw, 68px)", lineHeight: "1.16", letterSpacing: "-0.04em", fontWeight: "800" }}>
            Stop juggling apps.
            <br />
            Start selling smarter.
          </h2>
          <p style={{ margin: "20px 0 0 0", fontSize: "18px", lineHeight: "1.6", color: "#D8F0E5", maxWidth: "520px" }}>
            Order restrictions, tiered discounts, product options and bulk orders — installed once, managed in one place.
          </p>
        </div>
        <div className="cta-actions" style={{ position: "relative", flex: "0 1 270px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "270px", marginLeft: "auto", marginRight: "auto" }}>
          <a className="btn" href={INSTALL_URL} {...EXTERNAL} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "#C8F25A", color: "#0B0D12", fontWeight: "700", fontSize: "17px", padding: "18px 26px", borderRadius: "999px" }}>
            <Image src="/images/whats-new/shopify-bag.png" alt="" width={20} height={23} style={{ width: "20px", height: "auto", display: "block" }} />
            Install MultiVariants
          </a>
          <a className="btn" href="#features" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.08)", color: "#FFFFFF", fontWeight: "600", fontSize: "16px", padding: "16px 26px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.35)" }}>
            Explore the features
          </a>
          <span style={{ textAlign: "center", fontSize: "13px", color: "#CDEBDD" }}>Works with your Shopify store</span>
        </div>
      </div>
    </section>
  );
}
