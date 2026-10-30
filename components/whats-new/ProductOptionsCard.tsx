import Image from "next/image";

/**
 * Card 3 — Product Options: design-location checkboxes, customization radios and form fields.
 * Visual markup ported 1:1 from the design file.
 */
export default function ProductOptionsCard() {
  return (
    <section id="options" className="fsec fsec-3" aria-labelledby="feature-options-title" style={{ padding: "60px 16px" }}>
      {/* Text equivalent of the mockup below (which is aria-hidden) for screen readers and crawlers. */}
      <h3 id="feature-options-title" className="wn-sr">Product Options</h3>
      <p className="wn-sr">Add custom options to any product — checkboxes, colour swatches, sizes, choices and file uploads — with add-on prices that update the total.</p>
      <ul className="wn-sr">
        <li>Checkbox and radio options, such as front, back or both sides.</li>
        <li>Colour swatches and size buttons, so picking a variant takes one tap.</li>
        <li>Add-on pricing shown beside each option and added to the total.</li>
        <li>File upload fields so shoppers can upload their own design — SVG, PDF or PNG.</li>
      </ul>
      <div style={{ maxWidth: "1180px", margin: "0 auto", background: "#F3F3EE", borderRadius: "28px", padding: "clamp(28px, 5vw, 64px)", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
        <div className="mock" style={{ flex: "1.15 1 460px", minWidth: "0", position: "relative" }}>
          <div className="mk mock-opt">
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-14px", top: "120px", zIndex: "3", animationDelay: "0s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 20px 40px -20px rgba(11,13,18,0.6)", textAlign: "left" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A7ADB8" }}>Price add-ons</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginTop: "4px", fontFamily: "var(--wn-display), sans-serif" }}>+€12.00 in options</div>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", right: "-14px", top: "-26px", zIndex: "3", animationDelay: "-2s", background: "#C8F25A", color: "#0B0D12", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 20px 40px -20px rgba(11,13,18,0.6)", textAlign: "left" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#3A4A12" }}>Design locations</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginTop: "4px", fontFamily: "var(--wn-display), sans-serif" }}>Left chest + Full front</div>
            </div>
            <div aria-hidden="true" className="mh-chip" style={{ position: "absolute", left: "-14px", top: "470px", zIndex: "3", animationDelay: "-4s", background: "#0B0D12", color: "#FFFFFF", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 20px 40px -20px rgba(11,13,18,0.6)", textAlign: "left" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A7ADB8" }}>Customization</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginTop: "4px", fontFamily: "var(--wn-display), sans-serif" }}>Printed design</div>
            </div>
            <div aria-hidden="true" className="mo-frame" style={{ background: "#FFFFFF", border: "1px solid #E2E2DB", borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 80px -48px rgba(11,13,18,0.45)", color: "#0B0D12", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "11px 16px", background: "#F4F4F0", borderBottom: "1px solid #E7E7E1" }}>
                <span style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E6A19B" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E9CF8C" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9FD3A9" }} />
                </span>
                <span style={{ flex: "1", maxWidth: "420px", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "7px", fontSize: "11px", color: "#6B7280", padding: "4px 12px", textAlign: "center" }}>
                  storyland.myshopify.com/products/softstyle-hoodie
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "74px minmax(0, 1fr) minmax(0, 1.25fr)", gap: "18px", padding: "18px 22px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ display: "block", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", background: "#F5FBFF", border: "2px solid #0B0D12" }}>
                    <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={90} height={90} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                  <span style={{ display: "block", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", background: "#F5FBFF", border: "1px solid #ECECE6" }}>
                    <Image src="/images/whats-new/hoodie-red.jpg" alt="" width={90} height={90} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                  <span style={{ display: "block", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", background: "#F5FBFF", border: "1px solid #ECECE6" }}>
                    <Image src="/images/whats-new/hoodie-pink.jpg" alt="" width={90} height={90} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                  <span style={{ display: "block", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", background: "#F5FBFF", border: "1px solid #ECECE6" }}>
                    <Image src="/images/whats-new/hoodie-brown.jpg" alt="" width={90} height={90} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                </div>
                <div>
                  <div style={{ position: "relative", aspectRatio: "0.9", borderRadius: "14px", overflow: "hidden", background: "#F5FBFF" }}>
                    <Image src="/images/whats-new/hoodie-navy.jpg" alt="" width={516} height={512} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <span style={{ position: "absolute", left: "10px", top: "50%", width: "28px", height: "28px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,.15)", display: "grid", placeItems: "center", fontSize: "14px", color: "#6B7280", transform: "translateY(-50%)" }}>
                      ‹
                    </span>
                    <span style={{ position: "absolute", right: "10px", top: "50%", width: "28px", height: "28px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,.15)", display: "grid", placeItems: "center", fontSize: "14px", transform: "translateY(-50%)" }}>
                      ›
                    </span>
                  </div>
                </div>
                <div style={{ minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                    <b className="mock-title" style={{ fontFamily: "var(--wn-display), sans-serif", fontSize: "24px", letterSpacing: "-0.02em" }}>Product Options</b>
                    <b style={{ fontSize: "17px" }}>€7.20</b>
                  </div>
                  <div style={{ marginTop: "14px", fontSize: "12px", fontWeight: "600" }}>
                    Select Design Locations{" "}
                    <span style={{ color: "#C23030" }}>*</span>
                  </div>
                  <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "6px" }}>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1.5px solid #2F5FD0", background: "#F3F6FD", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="13.3" y="7" width="2.2" height="2.2" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#2F5FD0" }}>Left Chest</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="8.5" y="7" width="2.2" height="2.2" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Right Chest</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="9.3" y="6.6" width="5.4" height="1.8" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Center Chest</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1.5px solid #2F5FD0", background: "#F3F6FD", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="9" y="7" width="6" height="9.5" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#2F5FD0" }}>Full Front</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€3.00)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="18.7" y="8.6" width="1.4" height="2.6" fill="#3DB4F2" transform="rotate(12 19.4 9.9)" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Left Sleeve</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <rect x="3.9" y="8.6" width="1.4" height="2.6" fill="#3DB4F2" transform="rotate(-12 4.6 9.9)" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Right Sleeve</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3Q12 4.2 8.5 3Z" fill="#FFFFFF" />
                        <rect x="10.8" y="4.6" width="2.4" height="1" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Back Collar</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3Q12 4.2 8.5 3Z" fill="#FFFFFF" />
                        <rect x="9.3" y="6.4" width="5.4" height="1.8" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Upper Back</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€1.50)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3Q12 4.2 8.5 3Z" fill="#FFFFFF" />
                        <rect x="9" y="6.4" width="6" height="10.5" fill="#3DB4F2" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Full Back</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€3.00)</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", border: "1px solid #E2E2DB", background: "#FFFFFF", borderRadius: "9px", padding: "7px 2px 6px", fontSize: "10px", textAlign: "center" }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="1" strokeLinejoin="round">
                        <path d="M8.5 3 5 4.5 3 9l-.6 11h3.1L7 11.5V21h10v-9.5l1.5 8.5h3.1L21 9l-2-4.5L15.5 3a3.5 3.5 0 0 1-7 0Z" fill="#FFFFFF" />
                        <circle cx="15.8" cy="15.6" r="3.6" fill="#FFFFFF" stroke="#2F5FD0" strokeWidth="1.1" />
                        <path d="m13.3 13.1 5 5" stroke="#2F5FD0" strokeWidth="1.1" />
                      </svg>
                      <b style={{ fontWeight: "600", color: "#0B0D12" }}>Blank Item</b>
                      <span style={{ color: "#8A8F99", fontSize: "9px" }}>(+€0.00)</span>
                    </span>
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "10px", color: "#8A8F99" }}>
                    Select all that apply and then upload file with corresponding upload option below.
                  </div>
                  <div style={{ marginTop: "9px", fontSize: "12px", fontWeight: "600" }}>
                    Customization Type{" "}
                    <span style={{ color: "#C23030" }}>*</span>
                  </div>
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ flex: "1", display: "flex", alignItems: "center", gap: "8px", border: "1.5px solid #2F5FD0", background: "#F3F6FD", borderRadius: "9px", padding: "7px 10px", fontSize: "12px" }}>
                      <span style={{ width: "13px", height: "13px", borderRadius: "50%", flex: "none", border: "4px solid #2F5FD0" }} />
                      <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "6px", background: "#DCE6FA", display: "grid", placeItems: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2F5FD0" strokeWidth="2" strokeLinejoin="round">
                          <path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0Z" />
                        </svg>
                      </span>
                      <b style={{ fontWeight: "600" }}>Printed Design</b>
                      <span style={{ color: "#8A8F99" }}>(+€3.00)</span>
                    </span>
                    <span style={{ flex: "1", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E2E2DB", borderRadius: "9px", padding: "7px 10px", fontSize: "12px" }}>
                      <span style={{ width: "13px", height: "13px", borderRadius: "50%", flex: "none", border: "1.5px solid #B9BCC4" }} />
                      <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "6px", background: "#F2F2EE", display: "grid", placeItems: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinejoin="round">
                          <path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0Z" />
                        </svg>
                      </span>
                      <b style={{ fontWeight: "600" }}>Embroidered Design</b>
                      <span style={{ color: "#8A8F99" }}>(+€4.50)</span>
                    </span>
                    <span style={{ flex: "1", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E2E2DB", borderRadius: "9px", padding: "7px 10px", fontSize: "12px" }}>
                      <span style={{ width: "13px", height: "13px", borderRadius: "50%", flex: "none", border: "1.5px solid #B9BCC4" }} />
                      <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "6px", background: "#F2F2EE", display: "grid", placeItems: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinejoin="round">
                          <path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0Z" />
                        </svg>
                      </span>
                      <b style={{ fontWeight: "600" }}>Blank Item (No Customization)</b>
                      <span style={{ color: "#8A8F99" }}>(+€0.00)</span>
                    </span>
                  </div>
                  <div style={{ marginTop: "12px", fontSize: "12px", fontWeight: "600" }}>E-mail Address and Phone Number for Proof Approval</div>
                  <div style={{ marginTop: "7px", height: "34px", border: "1px solid #D9D9D2", borderRadius: "9px", background: "#FFFFFF", display: "flex", alignItems: "center", padding: "0 12px", fontSize: "12px", color: "#A3A8B2" }}>
                    name@store.com · +1 555 0100
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "10px", color: "#8A8F99" }}>We will not start production on your order till you approve the proof.</div>
                  <div style={{ marginTop: "12px", fontSize: "12px", fontWeight: "600" }}>Special Requests or Instructions</div>
                  <div style={{ marginTop: "3px", fontSize: "11px", color: "#6B7280" }}>Additional Instruction</div>
                  <div style={{ position: "relative", marginTop: "6px", height: "58px", border: "1px solid #D9D9D2", borderRadius: "9px", background: "#FFFFFF", padding: "8px 12px", fontSize: "12px", color: "#A3A8B2" }}>
                    e.g. Use Pantone 286 C for the logo
                    <svg style={{ position: "absolute", right: "4px", bottom: "4px" }} width="8" height="8" viewBox="0 0 8 8" stroke="#B9BCC4" strokeWidth="1">
                      <path d="M7 1 1 7M7 4 4 7" />
                    </svg>
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "10px", color: "#8A8F99" }}>If trouble uploading file please email your file to: support@storyland.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
