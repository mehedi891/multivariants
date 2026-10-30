import Image from "next/image";

/**
 * Card 2 — Tiered Discounts: a product page with quantity-tier discount cards and a tier progress bar.
 * Visual markup ported 1:1 from the design file.
 */
export default function DiscountCard() {
  return (
    <section id="discounts" className="fsec fsec-2" aria-labelledby="feature-discounts-title" style={{ padding: "60px 16px" }}>
      {/* Text equivalent of the mockup below (which is aria-hidden) for screen readers and crawlers. */}
      <h3 id="feature-discounts-title" className="wn-sr">Tiered Discounts</h3>
      <p className="wn-sr">Reward bigger orders automatically. Build tiers, connect them to a page, and the savings show up right in the shopper’s total.</p>
      <ul className="wn-sr">
        <li>Unlock tiers on total quantity or on total order value — chosen per discount set.</li>
        <li>Offer a percentage off or a fixed amount off, set tier by tier.</li>
        <li>Add as many tiers as you need; the highest qualifying tier is the one applied.</li>
        <li>Connect a saved discount set in a click — then edit, change or disconnect it any time.</li>
      </ul>
      <div style={{ maxWidth: "1180px", margin: "0 auto", background: "#F3F3EE", borderRadius: "28px", padding: "clamp(28px, 5vw, 64px)", display: "flex", flexWrap: "wrap-reverse", gap: "48px", alignItems: "center" }}>
        <div className="mock" style={{ flex: "1.15 1 460px", minWidth: "0", position: "relative" }}>
          <div className="mk mock-disc">
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-12px", top: "110px", zIndex: "3", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -22px rgba(11,13,18,0.4)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#E6F4EE", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 12V4h8l10 10-8 8L3 12Z" />
                  <circle cx="7.5" cy="8.5" r="1.3" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>Discount tiers</b>
                <span style={{ color: "#6B7280" }}>7% · 10% · 15% off</span>
              </span>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", right: "-10px", top: "150px", zIndex: "3", animationDelay: "-2s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -18px rgba(11,13,18,0.6)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#C8F25A", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>15+ pcs → 10% off</b>
                <span style={{ color: "#A7ADB8" }}>Tier unlocked in cart</span>
              </span>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-12px", top: "470px", zIndex: "3", animationDelay: "-4s", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -22px rgba(11,13,18,0.4)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F2F0E6", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 18h16M7 14l4-4 3 3 5-6" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>Tier progress</b>
                <span style={{ color: "#6B7280" }}>1 more unit to 15% off</span>
              </span>
            </div>
            <div aria-hidden="true" style={{ background: "#FFFFFF", border: "1px solid #E2E2DB", borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 80px -48px rgba(11,13,18,0.45)", color: "#0B0D12", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "11px 16px", background: "#F4F4F0", borderBottom: "1px solid #E7E7E1" }}>
                <span style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E6A19B" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E9CF8C" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9FD3A9" }} />
                </span>
                <span style={{ flex: "1", maxWidth: "420px", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "7px", fontSize: "11px", color: "#6B7280", padding: "4px 12px", textAlign: "center" }}>
                  storyland.myshopify.com/products/overshirt
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "32px", padding: "22px 26px" }}>
                <div style={{ aspectRatio: "1", border: "1px solid #ECECE6", borderRadius: "12px", overflow: "hidden", background: "#E9E9E9", alignSelf: "start" }}>
                  <Image src="/images/whats-new/overshirt-rust.jpg" alt="" width={640} height={640} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ minWidth: "0" }}>
                  <b className="mock-title" style={{ display: "block", fontFamily: "var(--wn-display), sans-serif", fontSize: "24px", letterSpacing: "-0.02em" }}>
                    Discount Feature
                  </b>
                  <div style={{ marginTop: "10px", fontSize: "16px" }}>
                    <span style={{ color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                    {" "}
                    <span style={{ marginLeft: "6px" }}>€9.00</span>
                  </div>
                  <div style={{ marginTop: "16px", fontSize: "12px", letterSpacing: "0.22em" }}>BULK DISCOUNTS</div>
                  <div style={{ marginTop: "12px", display: "flex", gap: "2px", maxWidth: "420px" }}>
                    <div style={{ flex: "1", borderRadius: "4px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 6px 16px -12px rgba(11,13,18,.35)" }}>
                      <div style={{ background: "linear-gradient(135deg,#2A2E37,#0B0D12)", color: "#FFFFFF", textAlign: "center", padding: "16px 6px" }}>
                        <div style={{ fontFamily: "var(--wn-display), sans-serif", fontSize: "30px", fontWeight: "500" }}>7%</div>
                        <div style={{ marginTop: "4px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em" }}>DISCOUNT</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px 6px 14px 6px" }}>
                        <div style={{ fontSize: "11px", color: "#6B7280" }}>For quantities</div>
                        <div style={{ marginTop: "6px", fontSize: "15px" }}>10+</div>
                      </div>
                    </div>
                    <div style={{ flex: "1", borderRadius: "4px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 14px 30px -14px rgba(11,13,18,.45)", transform: "translateY(-4px)" }}>
                      <div style={{ background: "linear-gradient(135deg,#0F6B4C,#0B4F38)", color: "#FFFFFF", textAlign: "center", padding: "16px 6px" }}>
                        <div style={{ fontFamily: "var(--wn-display), sans-serif", fontSize: "30px", fontWeight: "500" }}>10%</div>
                        <div style={{ marginTop: "4px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em" }}>DISCOUNT</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px 6px 14px 6px" }}>
                        <div style={{ fontSize: "11px", color: "#6B7280" }}>For quantities</div>
                        <div style={{ marginTop: "6px", fontSize: "15px" }}>15+</div>
                      </div>
                    </div>
                    <div style={{ flex: "1", borderRadius: "4px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 6px 16px -12px rgba(11,13,18,.35)" }}>
                      <div style={{ background: "linear-gradient(135deg,#2FAE6F,#0B7A55)", color: "#FFFFFF", textAlign: "center", padding: "16px 6px" }}>
                        <div style={{ fontFamily: "var(--wn-display), sans-serif", fontSize: "30px", fontWeight: "500" }}>15%</div>
                        <div style={{ marginTop: "4px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em" }}>DISCOUNT</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px 6px 14px 6px" }}>
                        <div style={{ fontSize: "11px", color: "#6B7280" }}>For quantities</div>
                        <div style={{ marginTop: "6px", fontSize: "15px" }}>25+</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "11px", color: "#6B7280" }}>*Discount is applied to each unit.</div>
                  <div style={{ marginTop: "10px", fontSize: "13px" }}>Color</div>
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", background: "#0B0D12", color: "#FFFFFF" }}>
                      Rust
                    </span>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", border: "1px solid #D4D4CE" }}>Olive</span>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", border: "1px solid #D4D4CE" }}>Sand</span>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "13px" }}>Size</div>
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", background: "#0B0D12", color: "#FFFFFF" }}>
                      Small
                    </span>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", border: "1px solid #D4D4CE" }}>Medium</span>
                    <span style={{ display: "inline-flex", padding: "9px 16px", borderRadius: "999px", fontSize: "14px", border: "1px solid #D4D4CE" }}>Large</span>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "13px" }}>Quantity</div>
                  <div style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "34px", border: "1px solid #D4D4CE", borderRadius: "999px", padding: "10px 20px", fontSize: "15px" }}>
                    <span>−</span>
                    <span>24</span>
                    <span>+</span>
                  </div>
                  <div style={{ marginTop: "10px", border: "1px solid #E7E7E1", borderRadius: "10px", background: "#FAFAF7", padding: "14px 16px" }}>
                    <div style={{ fontSize: "13px" }}>
                      Add{" "}
                      <b>1</b>
                      {" "}more to save{" "}
                      <b style={{ color: "#0B7A55" }}>15%</b>
                      {" "}on every unit — you&apos;re on 10% now.
                    </div>
                    <div style={{ position: "relative", margin: "12px 8px 0 0", height: "8px", borderRadius: "99px", background: "#E7E7E1" }}>
                      <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "95%", borderRadius: "99px", background: "linear-gradient(90deg,#2A2E37,#0B7A55 55%,#2FAE6F)" }} />
                      <span style={{ position: "absolute", left: "40%", top: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #0B7A55", transform: "translate(-50%,-50%)" }} />
                      <span style={{ position: "absolute", left: "60%", top: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #0B7A55", transform: "translate(-50%,-50%)" }} />
                      <span style={{ position: "absolute", left: "100%", top: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #B9BCC4", transform: "translate(-50%,-50%)" }} />
                    </div>
                    <div style={{ position: "relative", height: "30px", marginRight: "8px", fontSize: "11px", textAlign: "center" }}>
                      <span style={{ position: "absolute", left: "40%", top: "6px", transform: "translateX(-50%)", color: "#0B7A55" }}>
                        <b style={{ display: "block" }}>10</b>
                        7%
                      </span>
                      <span style={{ position: "absolute", left: "60%", top: "6px", transform: "translateX(-50%)", color: "#0B7A55" }}>
                        <b style={{ display: "block" }}>15</b>
                        10%
                      </span>
                      <span style={{ position: "absolute", left: "100%", top: "6px", transform: "translateX(-50%)" }}>
                        <b style={{ display: "block" }}>25</b>
                        15%
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px", border: "1.5px solid #0B0D12", borderRadius: "999px", padding: "13px", textAlign: "center", fontSize: "15px" }}>
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
