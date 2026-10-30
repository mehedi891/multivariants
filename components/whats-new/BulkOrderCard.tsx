import Image from "next/image";

/**
 * Card 1 — Bulk Order: a storefront product page with the variant-grid bulk order form.
 * Visual markup ported 1:1 from the design file.
 */
export default function BulkOrderCard() {
  return (
    <section id="bulk" className="fsec fsec-1" aria-labelledby="feature-bulk-title" style={{ padding: "60px 16px" }}>
      {/* Text equivalent of the mockup below (which is aria-hidden) for screen readers and crawlers. */}
      <h3 id="feature-bulk-title" className="wn-sr">Bulk Order</h3>
      <p className="wn-sr">A dedicated quick-order page where buyers add every product, variant and quantity at once — with your limits and discounts already built in.</p>
      <ul className="wn-sr">
        <li>Assign products your way — all products, or by collection, vendor, type, tag or hand-picked products.</li>
        <li>Grid or list layout, with 3, 4 or 5 products per row.</li>
        <li>Customer eligibility — all customers, logged-in customers only, specific customer tags or specific customers.</li>
        <li>Preview on desktop or mobile, share a draft demo, then set the page Active to go live.</li>
      </ul>
      <div style={{ maxWidth: "1180px", margin: "0 auto", background: "#F3F3EE", borderRadius: "28px", padding: "clamp(28px, 5vw, 64px)", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
        <div className="mock" style={{ flex: "1.15 1 460px", minWidth: "0", position: "relative" }}>
          <div className="mk mock-hero">
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-12px", top: "90px", zIndex: "3", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -22px rgba(11,13,18,0.4)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#E6F4EE", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>Order restrictions</b>
                <span style={{ color: "#6B7280" }}>MOQ 30 · Max 300</span>
              </span>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", right: "-10px", top: "120px", zIndex: "3", animationDelay: "-2s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -18px rgba(11,13,18,0.6)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#C8F25A", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 12V4h8l10 10-8 8L3 12Z" />
                  <circle cx="7.5" cy="8.5" r="1.3" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>100+ pcs → 10% off</b>
                <span style={{ color: "#A7ADB8" }}>Tier unlocked in cart</span>
              </span>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-12px", top: "430px", zIndex: "3", animationDelay: "-4s", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", boxShadow: "0 18px 40px -22px rgba(11,13,18,0.4)", fontSize: "13px", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F2F0E6", display: "grid", placeItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </span>
              <span>
                <b style={{ display: "block", fontWeight: "600" }}>Bulk orders</b>
                <span style={{ color: "#6B7280" }}>3 colours × 4 sizes</span>
              </span>
            </div>
            <div className="mh-frame" aria-hidden="true" style={{ position: "relative", background: "#FFFFFF", border: "1px solid #E2E2DB", borderRadius: "22px", boxShadow: "0 50px 100px -50px rgba(11,13,18,0.45), 0 0 0 8px rgba(255,255,255,0.6)", overflow: "hidden", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 18px", background: "#F4F4F0", borderBottom: "1px solid #E7E7E1" }}>
                <span style={{ display: "flex", gap: "7px" }}>
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#E6A19B" }} />
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#E9CF8C" }} />
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#9FD3A9" }} />
                </span>
                <span style={{ flex: "1", maxWidth: "420px", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "8px", fontSize: "12px", color: "#6B7280", padding: "6px 12px", textAlign: "center" }}>
                  storyland.myshopify.com/products/classic-hoodie
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", padding: "clamp(16px, 3vw, 32px)", textAlign: "left", color: "#0B0D12" }}>
                <div style={{ flex: "0.85 1 280px", minWidth: "0" }}>
                  <div style={{ background: "#F5FBFF", borderRadius: "16px", aspectRatio: "1", overflow: "hidden" }}>
                    <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={516} height={512} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "8px" }}>
                    <span style={{ aspectRatio: "1", borderRadius: "9px", overflow: "hidden", border: "1.5px solid #0B7A55" }}>
                      <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </span>
                    <span style={{ aspectRatio: "1", borderRadius: "9px", overflow: "hidden", border: "1px solid #ECECE6" }}>
                      <Image src="/images/whats-new/hoodie-pink.jpg" alt="" width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </span>
                    <span style={{ aspectRatio: "1", borderRadius: "9px", overflow: "hidden", border: "1px solid #ECECE6" }}>
                      <Image src="/images/whats-new/hoodie-red.jpg" alt="" width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </span>
                    <span style={{ aspectRatio: "1", borderRadius: "9px", overflow: "hidden", border: "1px solid #ECECE6" }}>
                      <Image src="/images/whats-new/hoodie-brown.jpg" alt="" width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </span>
                  </div>
                </div>
                <div style={{ flex: "1.35 1 420px", minWidth: "0" }}>
                  <b className="mock-title" style={{ display: "block", fontFamily: "var(--wn-display), sans-serif", fontSize: "24px", letterSpacing: "-0.02em" }}>
                    Bulk Order Feature
                  </b>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "15px", fontWeight: "600" }}>
                    €10.00{" "}
                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#6B7280" }}>per unit · MOQ 30 · Max 300</span>
                  </span>
                  <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: "#0B7A55", background: "#E6F4EE", borderRadius: "999px", padding: "4px 10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      Restrictions
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: "#0B7A55", background: "#E6F4EE", borderRadius: "999px", padding: "4px 10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      Discount tiers
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: "#0B7A55", background: "#E6F4EE", borderRadius: "999px", padding: "4px 10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      Product options
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: "#0B7A55", background: "#E6F4EE", borderRadius: "999px", padding: "4px 10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      Bulk order
                    </span>
                  </div>
                  <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <b>Bulk order</b>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#3A3F4A" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 6h16M7 12h10M10 18h4" />
                      </svg>
                      Filter
                    </span>
                  </div>
                  <div style={{ marginTop: "8px", border: "1px solid #ECECE6", borderRadius: "12px", overflowX: "auto" }}>
                    <div style={{ minWidth: "330px", display: "grid", gridTemplateColumns: "0.9fr repeat(4, minmax(0, 1fr))" }}>
                      <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", padding: "9px 4px", borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", background: "#FAFAF7" }}>
                        Colour ▾
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", padding: "9px 4px", borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", background: "#FAFAF7" }}>
                        S
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", padding: "9px 4px", borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", background: "#FAFAF7" }}>
                        M
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", padding: "9px 4px", borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", background: "#FAFAF7" }}>
                        L
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", padding: "9px 4px", borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", background: "#FAFAF7" }}>
                        XL
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", background: "#FAFAF7" }}>
                        <Image src="/images/whats-new/hoodie-pink.jpg" alt="" width={44} height={44} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", display: "block", background: "#FFFFFF", border: "1px solid #ECECE6" }} />
                        <span style={{ fontSize: "11px", fontWeight: "600" }}>Pink</span>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", background: "#FAFAF7" }}>
                        <Image src="/images/whats-new/hoodie-red.jpg" alt="" width={44} height={44} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", display: "block", background: "#FFFFFF", border: "1px solid #ECECE6" }} />
                        <span style={{ fontSize: "11px", fontWeight: "600" }}>Red</span>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#B4532A" }}>Only 15 left</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", background: "#FAFAF7" }}>
                        <Image src="/images/whats-new/hoodie-brown.jpg" alt="" width={44} height={44} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", display: "block", background: "#FFFFFF", border: "1px solid #ECECE6" }} />
                        <span style={{ fontSize: "11px", fontWeight: "600" }}>Brown</span>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                      <div style={{ borderRight: "1px solid #ECECE6", borderBottom: "1px solid #ECECE6", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <span style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCD5", borderRadius: "7px", fontSize: "12px", background: "#FFFFFF" }}>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>−</span>
                          <b style={{ padding: "4px 5px", minWidth: "20px", textAlign: "center" }}>10</b>
                          <span style={{ padding: "4px 7px", color: "#6B7280" }}>+</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "#0B7A55" }}>80 in stock</span>
                        <span style={{ fontSize: "10px", color: "#9CA0A8", textDecoration: "line-through" }}>€10.00</span>
                        <b style={{ fontSize: "12px" }}>€9.00</b>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", padding: "8px", fontSize: "12px", color: "#3A3F4A" }}>
                      <span style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#F2F2EE", display: "grid", placeItems: "center", color: "#A0A4AD" }}>
                        ‹
                      </span>
                      Page 1 of 3
                      <span style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#E7E7E1", display: "grid", placeItems: "center" }}>›</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "12px", border: "1px solid #ECECE6", borderRadius: "12px", padding: "11px 14px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                    <span>
                      <b style={{ display: "block" }}>Total units: 120</b>
                      <span style={{ fontSize: "12px", color: "#0B7A55", fontWeight: "600" }}>10% tier unlocked</span>
                    </span>
                    <span>
                      <span style={{ fontSize: "12px", color: "#9CA0A8", textDecoration: "line-through" }}>€1,200.00</span>
                      {" "}
                      <b style={{ fontSize: "17px" }}>€1,080.00</b>
                    </span>
                  </div>
                  <div style={{ marginTop: "12px", background: "#0B7A55", color: "#FFFFFF", borderRadius: "10px", padding: "12px", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>
                    Add to cart &amp; save 10%
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
