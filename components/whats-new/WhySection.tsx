import Image from "next/image";

/** "Why stitch four apps together" — the usual stack vs. the MultiVariants orb. */
export default function WhySection() {
  return (
    <section id="why" aria-labelledby="wn-why-title" style={{ padding: "100px 16px 60px 16px" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.16em", color: "#0B7A55" }}>WHY MULTIVARIANTS</div>
        <h2 id="wn-why-title" style={{ margin: "14px auto 0 auto", maxWidth: "1100px", fontSize: "clamp(30px, 4.4vw, 56px)", lineHeight: "1.14", letterSpacing: "-0.04em", fontWeight: "800" }}>
          Why stitch four apps together
          <br className="dbr" />
          {" "}when one does it all?
        </h2>
        <p style={{ margin: "20px auto 0 auto", maxWidth: "620px", fontSize: "18px", lineHeight: "1.6", color: "#5B6170" }}>
          Separate apps mean separate settings that don&apos;t know about each other. In MultiVariants, your rules, offers and pages are built to work as one.
        </p>
      </div>
      <div className="why-row" style={{ maxWidth: "1180px", margin: "56px auto 0 auto", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "stretch" }}>
        <div className="why-before" style={{ flex: "1 1 380px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E2E2DB", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", boxShadow: "0 30px 60px -40px rgba(11,13,18,0.35)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <span>
              <h3 className="why-title" style={{ display: "block", margin: "0", fontFamily: "var(--wn-display), sans-serif", fontSize: "24px", letterSpacing: "-0.02em" }}>The usual stack</h3>
              <span style={{ display: "block", marginTop: "4px", fontSize: "14px", color: "#5B6170" }}>Four apps that don&apos;t talk to each other</span>
            </span>
            <span style={{ flex: "none", fontSize: "13px", fontWeight: "700", color: "#FFFFFF", background: "#C0392B", borderRadius: "999px", padding: "6px 12px" }}>
              4 apps
            </span>
          </div>
          <div className="why-stack" aria-hidden="true" style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: "1" }}>
            <div className="ws-item" style={{ flex: "1", display: "flex", alignItems: "center", gap: "14px", background: "#FAFAF7", border: "1px solid #E2E2DB", borderRadius: "14px", padding: "14px 16px", position: "relative" }}>
              <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "11px", background: "#0B0D12", display: "grid", placeItems: "center", fontWeight: "800", fontSize: "15px", color: "#FFFFFF" }}>
                1
              </span>
              <span style={{ flex: "1", minWidth: "0", textAlign: "left" }}>
                <b style={{ display: "block", fontSize: "16px", fontWeight: "700" }}>An order limits app</b>
                <span className="ws-sub" style={{ display: "block", marginTop: "2px", fontSize: "13px", color: "#5B6170" }}>Its own setup · its own settings</span>
              </span>
              <span className="ws-tag" style={{ flex: "none", fontSize: "11px", fontWeight: "600", color: "#8C3A2B", background: "#FDECEA", borderRadius: "999px", padding: "4px 9px" }}>
                Separate
              </span>
            </div>
            <div className="ws-item" style={{ flex: "1", display: "flex", alignItems: "center", gap: "14px", background: "#FAFAF7", border: "1px solid #E2E2DB", borderRadius: "14px", padding: "14px 16px", position: "relative" }}>
              <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "11px", background: "#0B0D12", display: "grid", placeItems: "center", fontWeight: "800", fontSize: "15px", color: "#FFFFFF" }}>
                2
              </span>
              <span style={{ flex: "1", minWidth: "0", textAlign: "left" }}>
                <b style={{ display: "block", fontSize: "16px", fontWeight: "700" }}>A quantity discount app</b>
                <span className="ws-sub" style={{ display: "block", marginTop: "2px", fontSize: "13px", color: "#5B6170" }}>Its own setup · its own settings</span>
              </span>
              <span className="ws-tag" style={{ flex: "none", fontSize: "11px", fontWeight: "600", color: "#8C3A2B", background: "#FDECEA", borderRadius: "999px", padding: "4px 9px" }}>
                Separate
              </span>
            </div>
            <div className="ws-item" style={{ flex: "1", display: "flex", alignItems: "center", gap: "14px", background: "#FAFAF7", border: "1px solid #E2E2DB", borderRadius: "14px", padding: "14px 16px", position: "relative" }}>
              <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "11px", background: "#0B0D12", display: "grid", placeItems: "center", fontWeight: "800", fontSize: "15px", color: "#FFFFFF" }}>
                3
              </span>
              <span style={{ flex: "1", minWidth: "0", textAlign: "left" }}>
                <b style={{ display: "block", fontSize: "16px", fontWeight: "700" }}>A product options app</b>
                <span className="ws-sub" style={{ display: "block", marginTop: "2px", fontSize: "13px", color: "#5B6170" }}>Its own setup · its own settings</span>
              </span>
              <span className="ws-tag" style={{ flex: "none", fontSize: "11px", fontWeight: "600", color: "#8C3A2B", background: "#FDECEA", borderRadius: "999px", padding: "4px 9px" }}>
                Separate
              </span>
            </div>
            <div className="ws-item" style={{ flex: "1", display: "flex", alignItems: "center", gap: "14px", background: "#FAFAF7", border: "1px solid #E2E2DB", borderRadius: "14px", padding: "14px 16px", position: "relative" }}>
              <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "11px", background: "#0B0D12", display: "grid", placeItems: "center", fontWeight: "800", fontSize: "15px", color: "#FFFFFF" }}>
                4
              </span>
              <span style={{ flex: "1", minWidth: "0", textAlign: "left" }}>
                <b style={{ display: "block", fontSize: "16px", fontWeight: "700" }}>A bulk / wholesale order app</b>
                <span className="ws-sub" style={{ display: "block", marginTop: "2px", fontSize: "13px", color: "#5B6170" }}>Its own setup · its own settings</span>
              </span>
              <span className="ws-tag" style={{ flex: "none", fontSize: "11px", fontWeight: "600", color: "#8C3A2B", background: "#FDECEA", borderRadius: "999px", padding: "4px 9px" }}>
                Separate
              </span>
            </div>
          </div>
          <div className="ws-note" style={{ display: "none" }}>Each with its own setup, settings and dashboard</div>
          <ul style={{ margin: "24px 0 0 0", padding: "20px 0 0 0", borderTop: "1px solid #EFEFEA", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "15px", fontWeight: "500", color: "#2A2E37", textAlign: "left" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "22px", height: "22px", flex: "none", borderRadius: "50%", background: "#FDECEA", display: "grid", placeItems: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="3.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <span>Four onboardings and four dashboards to learn</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "22px", height: "22px", flex: "none", borderRadius: "50%", background: "#FDECEA", display: "grid", placeItems: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="3.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <span>Rules and discounts configured in different places</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "22px", height: "22px", flex: "none", borderRadius: "50%", background: "#FDECEA", display: "grid", placeItems: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="3.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <span>No single preview of what shoppers actually see</span>
            </li>
          </ul>
        </div>
        <div style={{ flex: "1.25 1 460px", minWidth: "0", background: "#0B0D12", color: "#FFFFFF", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "radial-gradient(50% 60% at 50% 55%, rgba(59,191,138,0.25), rgba(11,13,18,0) 70%)" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: "0", fontFamily: "var(--wn-display), sans-serif", fontSize: "20px" }}>With MultiVariants</h3>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#0B0D12", background: "#C8F25A", borderRadius: "999px", padding: "4px 10px" }}>1 app</span>
          </div>
          <div aria-hidden="true" className="orb-stage">
            <span className="orb-ring" style={{ width: "98%", height: "98%", animationDelay: "-4s" }} />
            <span className="orb-ring" style={{ width: "78%", height: "78%", animationDelay: "-2s" }} />
            <span className="orb-ring" style={{ width: "58%", height: "58%" }} />
            <span className="orb-sweep" />
            <svg className="orb-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="orb-curve" d="M0 30 C 14 30, 18 50, 31 50" />
              <path className="orb-curve" d="M0 70 C 14 70, 18 50, 31 50" />
              <path className="orb-curve" d="M100 30 C 86 30, 82 50, 69 50" />
              <path className="orb-curve" d="M100 70 C 86 70, 82 50, 69 50" />
              <line className="orb-flow" x1="50" y1="10" x2="50" y2="31" />
              <line className="orb-flow" x1="50" y1="90" x2="50" y2="69" />
              <line className="orb-flow" x1="23" y1="50" x2="31" y2="50" />
              <line className="orb-flow" x1="77" y1="50" x2="69" y2="50" />
            </svg>
            <span className="orb-p orb-pt" />
            <span className="orb-p orb-pb" style={{ animationDelay: "-0.6s" }} />
            <span className="orb-p orb-pl" style={{ animationDelay: "-1.2s" }} />
            <span className="orb-p orb-pr" style={{ animationDelay: "-1.8s" }} />
            <span className="orb-core">
              <span className="orb-mono" style={{ fontSize: "9px", color: "#7FD3AE" }}>ONE APP</span>
              <span style={{ width: "38%", aspectRatio: "1", borderRadius: "50%", background: "#FFFFFF", display: "grid", placeItems: "center", boxShadow: "0 0 24px rgba(59,191,138,0.45)" }}>
                <Image src="/images/whats-new/logo-mark.png" alt="" width={40} height={39} style={{ width: "62%", height: "auto", display: "block" }} />
              </span>
              <span style={{ fontFamily: "var(--wn-display), sans-serif", fontWeight: "700", fontSize: "14px", color: "#E7F3EC" }}>MultiVariants</span>
            </span>
            <span className="orb-node" style={{ left: "50%", top: "32%" }} />
            <span className="orb-node" style={{ left: "50%", top: "68%", animationDelay: "-0.7s" }} />
            <span className="orb-node" style={{ left: "32%", top: "50%", animationDelay: "-1.4s" }} />
            <span className="orb-node" style={{ left: "68%", top: "50%", animationDelay: "-2.1s" }} />
            <span className="orb-label orb-mono" style={{ left: "50%", top: "5%", transform: "translate(-50%, -50%)" }}>RESTRICTIONS</span>
            <span className="orb-label orb-mono" style={{ left: "50%", top: "95%", transform: "translate(-50%, -50%)" }}>BULK ORDERS</span>
            <span className="orb-label orb-mono" style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}>DISCOUNTS</span>
            <span className="orb-label orb-mono" style={{ right: "0", top: "50%", transform: "translateY(-50%)" }}>OPTIONS</span>
          </div>
          <ul style={{ position: "relative", margin: "30px 0 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#D3D7DE" }}>
            <li>
              <span style={{ color: "#C8F25A" }}>✓</span>
              {" "}One onboarding — pick any feature, mix them freely
            </li>
            <li>
              <span style={{ color: "#C8F25A" }}>✓</span>
              {" "}Restrictions and discounts set right on the page they apply to
            </li>
            <li>
              <span style={{ color: "#C8F25A" }}>✓</span>
              {" "}One live preview with limits and savings already applied
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
