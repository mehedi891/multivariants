const ITEMS = [
  "Min & max quantities",
  "Order increments",
  "Variant rules",
  "CSV upload & download",
  "Quantity tiers",
  "Order-value tiers",
  "Percentage or fixed off",
  "See options drawer",
  "Bulk orders",
  "Grid & list layouts",
  "Customer eligibility",
  "9 colour presets",
  "Custom CSS",
  "Mobile admin",
];

/**
 * Endless scrolling strip of feature highlights. The list is rendered twice so
 * the CSS translateX(-50%) loop is seamless; the second copy is hidden from
 * assistive tech so each item is announced once.
 */
export default function Marquee() {
  return (
    <div className="marq-wrap" role="marquee" aria-label="Feature highlights" style={{ marginTop: "88px", borderTop: "1px solid #E7E7E1", borderBottom: "1px solid #E7E7E1", background: "#F2F2EC", padding: "22px 0", overflow: "hidden" }}>
      <div className="marq">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} aria-hidden={i >= ITEMS.length || undefined} style={{ display: "inline-flex", alignItems: "center", gap: "14px", whiteSpace: "nowrap", fontFamily: "var(--wn-display), sans-serif", fontWeight: "700", fontSize: "18px", color: "#0B0D12" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0B7A55" }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
