import Image from "next/image";

/**
 * Card 4 — Advanced Restrictions: a bulk order table locked until the variant rules are met.
 * Visual markup ported 1:1 from the design file.
 */
export default function RestrictionsCard() {
  return (
    <section id="restrictions" className="fsec fsec-4" aria-labelledby="feature-restrictions-title" style={{ padding: "60px 16px" }}>
      {/* Text equivalent of the mockup below (which is aria-hidden) for screen readers and crawlers. */}
      <h3 id="feature-restrictions-title" className="wn-sr">Advanced Restrictions</h3>
      <p className="wn-sr">Set the purchasing rules once and every product follows them — no more orders that are too small, too big or the wrong pack size.</p>
      <ul className="wn-sr">
        <li>Minimum and maximum quantities per product.</li>
        <li>Order increments, so shoppers buy in packs of 6, 12, 18 and so on.</li>
        <li>Variant rules — the minimum and maximum number of variants a shopper can pick per product.</li>
        <li>CSV upload and download to edit every rule in bulk, matched by SKU or product name.</li>
      </ul>
      <div style={{ maxWidth: "1180px", margin: "0 auto", background: "#F3F3EE", borderRadius: "28px", padding: "clamp(28px, 5vw, 64px)", display: "flex", flexWrap: "wrap-reverse", gap: "48px", alignItems: "center" }}>
        <div className="mock" style={{ flex: "1.15 1 460px", minWidth: "0", position: "relative" }}>
          <div className="mk mock-rest">
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-14px", top: "110px", zIndex: "3", animationDelay: "0s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 20px 40px -20px rgba(11,13,18,0.6)", textAlign: "left" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A7ADB8" }}>Per product</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginTop: "4px", fontFamily: "var(--wn-display), sans-serif" }}>Min 3 · Max 5 variants</div>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-14px", top: "440px", zIndex: "3", animationDelay: "-4s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 20px 40px -20px rgba(11,13,18,0.6)", textAlign: "left" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A7ADB8" }}>Add to cart</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginTop: "4px", fontFamily: "var(--wn-display), sans-serif" }}>Unlocks at 3 variants</div>
            </div>
            <div aria-hidden="true" style={{ background: "#FFFFFF", border: "1px solid #E2E2DB", borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 80px -48px rgba(11,13,18,0.45)", color: "#0B0D12", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "11px 16px", background: "#F4F4F0", borderBottom: "1px solid #E7E7E1" }}>
                <span style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E6A19B" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E9CF8C" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9FD3A9" }} />
                </span>
                <span style={{ flex: "1", maxWidth: "420px", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "7px", fontSize: "11px", color: "#6B7280", padding: "4px 12px", textAlign: "center" }}>
                  storyland.myshopify.com/products/limit-variants
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.82fr) minmax(0, 1.18fr)", gap: "30px", padding: "22px 26px" }}>
                <div style={{ alignSelf: "start" }}>
                  <div style={{ aspectRatio: "1", borderRadius: "14px", overflow: "hidden", background: "#F5FBFF" }}>
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
                <div style={{ minWidth: "0" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#6B7280" }}>STORYLAND DEMO STORE</div>
                  <b className="mock-title" style={{ display: "block", marginTop: "6px", fontFamily: "var(--wn-display), sans-serif", fontSize: "24px", letterSpacing: "-0.02em" }}>
                    Advanced Restrictions
                  </b>
                  <div style={{ marginTop: "6px", fontSize: "15px" }}>€10.00</div>
                  <div style={{ marginTop: "10px", background: "#F2F2EE", borderRadius: "10px", padding: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", fontSize: "13px", padding: "0 4px 10px 4px" }}>
                      <b>Bulk Order</b>
                      <span style={{ color: "#5B6170" }}>☰ Filter</span>
                    </div>
                    <div className="mv-rbanner" style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px", padding: "12px 14px", borderRadius: "10px", background: "linear-gradient(90deg,#FFF1D6,#FFF8EA)", border: "1.5px solid #F5B54A", boxShadow: "0 8px 20px -12px rgba(217,119,6,.55)" }}>
                      <span className="mv-lock" style={{ width: "42px", height: "42px", flex: "none", borderRadius: "12px", background: "#F59E0B", display: "grid", placeItems: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                          <rect x="5" y="11" width="14" height="10" rx="2" fill="#F59E0B" />
                          <path className="mv-shackle" d="M8 11V7a4 4 0 0 1 8 0v4" />
                          <circle cx="12" cy="16" r="1.4" fill="#FFFFFF" stroke="none" />
                        </svg>
                      </span>
                      <span style={{ flex: "1", minWidth: "0" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <b style={{ fontSize: "14px", color: "#92400E" }}>Order restriction applied</b>
                          <span style={{ fontSize: "9.5px", fontWeight: "800", letterSpacing: ".08em", color: "#FFFFFF", background: "#D97706", borderRadius: "999px", padding: "2px 7px" }}>
                            LOCKED
                          </span>
                        </span>
                        <span style={{ display: "block", marginTop: "2px", fontSize: "12px", color: "#B45309" }}>
                          Select{" "}
                          <b>minimum 3</b>
                          {" "}–{" "}
                          <b>maximum 5</b>
                          {" "}variants to unlock Add to Cart
                        </span>
                      </span>
                      <span style={{ width: "150px", flex: "none", textAlign: "right" }}>
                        <span style={{ display: "block", fontSize: "11px", color: "#92400E", fontWeight: "600" }}>
                          <b style={{ fontSize: "16px" }}>0</b>
                          {" "}/ 3 min · 5 max
                        </span>
                        <span style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
                          <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#FBC56E" }} />
                          <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#FBC56E" }} />
                          <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#FBC56E" }} />
                          <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#F1EEE6" }} />
                          <span style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#F1EEE6" }} />
                        </span>
                      </span>
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1.5px dashed #F5B54A", borderRadius: "8px", padding: "0 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "5px 0", borderBottom: "1px solid #EFEFEA" }}>
                        <span style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flex: "none", background: "#F5FBFF" }}>
                          <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <span style={{ width: "92px", flex: "none", fontSize: "12px", lineHeight: "1.6" }}>
                          Colour Navy
                          <br />
                          Size S
                        </span>
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF4E0", border: "1px solid #F5C26B", color: "#B45309", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                              <rect x="5" y="11" width="14" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                            Min 2 · Max 10 units
                          </span>
                        </span>
                        <span style={{ textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Quantity</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "18px", margin: "3px 0", border: "1px solid #DCDCD5", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", color: "#0B0D12" }}>
                            <span>−</span>
                            <b style={{ fontWeight: "500" }}>0</b>
                            <span>+</span>
                          </span>
                          <span style={{ display: "block", color: "#0B7A55" }}>10 in stock</span>
                        </span>
                        <span style={{ width: "92px", textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Price</span>
                          <b style={{ fontSize: "13px", color: "#0B0D12" }}>€10.00</b>
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "5px 0", borderBottom: "1px solid #EFEFEA" }}>
                        <span style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flex: "none", background: "#F5FBFF" }}>
                          <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <span style={{ width: "92px", flex: "none", fontSize: "12px", lineHeight: "1.6" }}>
                          Colour Navy
                          <br />
                          Size M
                        </span>
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF4E0", border: "1px solid #F5C26B", color: "#B45309", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                              <rect x="5" y="11" width="14" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                            Buy in multiples of 2
                          </span>
                        </span>
                        <span style={{ textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Quantity</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "18px", margin: "3px 0", border: "1px solid #DCDCD5", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", color: "#0B0D12" }}>
                            <span>−</span>
                            <b style={{ fontWeight: "500" }}>0</b>
                            <span>+</span>
                          </span>
                          <span style={{ display: "block", color: "#0B7A55" }}>20 in stock</span>
                        </span>
                        <span style={{ width: "92px", textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Price</span>
                          <b style={{ fontSize: "13px", color: "#0B0D12" }}>€10.00</b>
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "5px 0", borderBottom: "1px solid #EFEFEA" }}>
                        <span style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flex: "none", background: "#F5FBFF" }}>
                          <Image src="/images/whats-new/hoodie-red.jpg" alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <span style={{ width: "92px", flex: "none", fontSize: "12px", lineHeight: "1.6" }}>
                          Colour Red
                          <br />
                          Size L
                        </span>
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF4E0", border: "1px solid #F5C26B", color: "#B45309", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                              <rect x="5" y="11" width="14" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                            Max 6 per order
                          </span>
                        </span>
                        <span style={{ textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Quantity</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "18px", margin: "3px 0", border: "1px solid #DCDCD5", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", color: "#0B0D12" }}>
                            <span>−</span>
                            <b style={{ fontWeight: "500" }}>0</b>
                            <span>+</span>
                          </span>
                          <span style={{ display: "block", color: "#0B7A55" }}>10 in stock</span>
                        </span>
                        <span style={{ width: "92px", textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Price</span>
                          <b style={{ fontSize: "13px", color: "#0B0D12" }}>€10.00</b>
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "5px 0", borderBottom: "1px solid #EFEFEA" }}>
                        <span style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flex: "none", background: "#F5FBFF" }}>
                          <Image src="/images/whats-new/hoodie-pink.jpg" alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <span style={{ width: "92px", flex: "none", fontSize: "12px", lineHeight: "1.6" }}>
                          Colour Pink
                          <br />
                          Size S
                        </span>
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF4E0", border: "1px solid #F5C26B", color: "#B45309", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                              <rect x="5" y="11" width="14" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                            Min 3 units required
                          </span>
                        </span>
                        <span style={{ textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Quantity</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "18px", margin: "3px 0", border: "1px solid #DCDCD5", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", color: "#0B0D12" }}>
                            <span>−</span>
                            <b style={{ fontWeight: "500" }}>0</b>
                            <span>+</span>
                          </span>
                          <span style={{ display: "block", color: "#0B7A55" }}>6 in stock</span>
                        </span>
                        <span style={{ width: "92px", textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Price</span>
                          <b style={{ fontSize: "13px", color: "#0B0D12" }}>€12.00</b>
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "5px 0" }}>
                        <span style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", flex: "none", background: "#F5FBFF" }}>
                          <Image src="/images/whats-new/hoodie-pink.jpg" alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <span style={{ width: "92px", flex: "none", fontSize: "12px", lineHeight: "1.6" }}>
                          Colour Pink
                          <br />
                          Size M
                        </span>
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF4E0", border: "1px solid #F5C26B", color: "#B45309", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                              <rect x="5" y="11" width="14" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                            Limit 1 per customer
                          </span>
                        </span>
                        <span style={{ textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Quantity</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "18px", margin: "3px 0", border: "1px solid #DCDCD5", borderRadius: "6px", padding: "6px 12px", fontSize: "13px", color: "#0B0D12" }}>
                            <span>−</span>
                            <b style={{ fontWeight: "500" }}>0</b>
                            <span>+</span>
                          </span>
                          <span style={{ display: "block", color: "#0B7A55" }}>10 in stock</span>
                        </span>
                        <span style={{ width: "92px", textAlign: "center", fontSize: "10px", color: "#6B7280" }}>
                          <span style={{ display: "block" }}>Price</span>
                          <b style={{ fontSize: "13px", color: "#0B0D12" }}>€12.00</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ECECE6", borderRadius: "8px", padding: "10px 14px", fontSize: "12px" }}>
                    <span>
                      <b>Total Unit: 0</b>
                      <span style={{ display: "block", marginTop: "3px", textDecoration: "underline", color: "#3A3F4A" }}>View Selected Items</span>
                    </span>
                    <b style={{ fontSize: "15px" }}>€0.00</b>
                  </div>
                  <div style={{ marginTop: "10px", background: "#8E9196", color: "#FFFFFF", borderRadius: "6px", padding: "12px", textAlign: "center", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" />
                      <path className="mv-shackle" d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    Add to Cart
                    <span style={{ fontSize: "11px", opacity: ".85" }}>· Select at least 3 variants</span>
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
