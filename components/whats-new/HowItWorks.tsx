import type { CSSProperties } from "react";

/** "Live in five guided steps" — animated onboarding timeline. */
export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="wn-how-title" style={{ padding: "80px 16px 40px 16px" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.16em", color: "#0B7A55" }}>HOW IT WORKS</div>
          <h2 id="wn-how-title" style={{ margin: "14px 0 0 0", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "800" }}>
            Live in five guided steps
          </h2>
          <p style={{ margin: "14px auto 0 auto", maxWidth: "560px", fontSize: "17px", lineHeight: "1.6", color: "#5B6170" }}>
            A guided onboarding takes you from install to live — no setup guesswork.
          </p>
        </div>
        <ol className="stps">
          <li className="stp-track" aria-hidden="true">
            <span className="stp-fill" />
          </li>
          <li className="stp" style={{ "--d": "0s" } as CSSProperties}>
            <span className="stp-dot">
              <span>1</span>
            </span>
            <div className="stp-card">
              <span style={{ fontFamily: "var(--wn-mono), monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#0B7A55" }}>STEP 01</span>
              <h3 style={{ display: "block", margin: "6px 0 0 0", fontFamily: "var(--wn-display), sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}>Welcome</h3>
              <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.5", color: "#5B6170" }}>
                Install MultiVariants and open the guided onboarding.
              </span>
              <span aria-hidden="true" style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", background: "#0B0D12", color: "#FFFFFF", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  Install app
                </span>
              </span>
            </div>
          </li>
          <li className="stp" style={{ "--d": "2s" } as CSSProperties}>
            <span className="stp-dot">
              <span>2</span>
            </span>
            <div className="stp-card">
              <span style={{ fontFamily: "var(--wn-mono), monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#0B7A55" }}>STEP 02</span>
              <h3 style={{ display: "block", margin: "6px 0 0 0", fontFamily: "var(--wn-display), sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}>
                Choose feature
              </h3>
              <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.5", color: "#5B6170" }}>
                Pick one feature — or several. You can mix them freely.
              </span>
              <span aria-hidden="true" style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", background: "#E6F4EE", color: "#0B7A55" }}>
                  Restrictions
                </span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", border: "1px solid #DCDCD5" }}>Discount</span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", border: "1px solid #DCDCD5" }}>Options</span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", border: "1px solid #DCDCD5" }}>Bulk</span>
              </span>
            </div>
          </li>
          <li className="stp" style={{ "--d": "4s" } as CSSProperties}>
            <span className="stp-dot">
              <span>3</span>
            </span>
            <div className="stp-card">
              <span style={{ fontFamily: "var(--wn-mono), monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#0B7A55" }}>STEP 03</span>
              <h3 style={{ display: "block", margin: "6px 0 0 0", fontFamily: "var(--wn-display), sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}>Configure</h3>
              <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.5", color: "#5B6170" }}>
                Set your rules while the storefront preview updates live.
              </span>
              <span aria-hidden="true" style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", border: "1px solid #DCDCD5" }}>Min 12</span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", border: "1px solid #DCDCD5" }}>Max 120</span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", background: "#F3F9DF", color: "#4A6A06" }}>
                  ● Live preview
                </span>
              </span>
            </div>
          </li>
          <li className="stp" style={{ "--d": "6s" } as CSSProperties}>
            <span className="stp-dot">
              <span>4</span>
            </span>
            <div className="stp-card">
              <span style={{ fontFamily: "var(--wn-mono), monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#0B7A55" }}>STEP 04</span>
              <h3 style={{ display: "block", margin: "6px 0 0 0", fontFamily: "var(--wn-display), sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}>Activate</h3>
              <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.5", color: "#5B6170" }}>
                Switch it on for your store with a single toggle.
              </span>
              <span aria-hidden="true" style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "600" }}>
                  <span style={{ width: "34px", height: "20px", borderRadius: "999px", background: "#0B7A55", position: "relative" }}>
                    <span style={{ position: "absolute", right: "2px", top: "2px", width: "16px", height: "16px", borderRadius: "50%", background: "#FFFFFF" }} />
                  </span>
                  Active
                </span>
              </span>
            </div>
          </li>
          <li className="stp" style={{ "--d": "8s" } as CSSProperties}>
            <span className="stp-dot">
              <span>5</span>
            </span>
            <div className="stp-card">
              <span style={{ fontFamily: "var(--wn-mono), monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#0B7A55" }}>STEP 05</span>
              <h3 style={{ display: "block", margin: "6px 0 0 0", fontFamily: "var(--wn-display), sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}>Done</h3>
              <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.5", color: "#5B6170" }}>
                You&apos;re live. Come back and add the next feature any time.
              </span>
              <span aria-hidden="true" style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "999px", padding: "4px 9px", background: "#0B0D12", color: "#C8F25A" }}>
                  ✓ Live on your store
                </span>
              </span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
