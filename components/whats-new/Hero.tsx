import Image from "next/image";
import type { ReactNode } from "react";
import { BfcmNeonSign, BfcmPill } from "./BfcmOffer";
import { EXTERNAL, INSTALL_URL } from "./links";

// Feature icons, shared by the "4 separate apps" cards and the MultiVariants panel.
const ICONS: Record<string, { stroke: string; tint: string; paths: ReactNode }> = {
  restrictions: {
    stroke: "#2F5FD0",
    tint: "#E8F1FD",
    paths: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  discount: {
    stroke: "#C2551E",
    tint: "#FDF0E6",
    paths: (
      <>
        <path d="M3 12V4h8l10 10-8 8L3 12Z" />
        <circle cx="7.5" cy="8.5" r="1.3" />
      </>
    ),
  },
  options: {
    stroke: "#7B4BB0",
    tint: "#F3ECFC",
    paths: (
      <>
        <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="10" cy="17" r="2" />
      </>
    ),
  },
  bulk: {
    stroke: "#0B7A55",
    tint: "#E6F4EE",
    paths: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
};

const APPS = [
  { icon: "restrictions", title: "Order Restrictions", sub: "Min / max · increments", top: 44, delay: "0.0s", y: 96, begin: "0s" },
  { icon: "discount", title: "Discount", sub: "Quantity tiers", top: 180, delay: "-0.6s", y: 232, begin: "1.2s" },
  { icon: "options", title: "Product Options", sub: "Swatches · add-ons", top: 316, delay: "-1.2s", y: 368, begin: "2.4s" },
  { icon: "bulk", title: "Bulk Order Form", sub: "Variant grid ordering", top: 452, delay: "-1.8s", y: 504, begin: "3.6s" },
];

const TICKS = ["Order restrictions", "Discount tiers", "Product options", "Bulk orders"];

function Icon({ name, size }: { name: string; size: number }) {
  const i = ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={i.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {i.paths}
    </svg>
  );
}

function Check({ size, stroke, width }: { size: number; stroke: string; width: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

const newBadge = (
  <a className="hero-badge" href="#bulk" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 8px", background: "#FFFFFF", border: "1px solid #E7E7E1", borderRadius: "999px", fontSize: "14px", fontWeight: "500", boxShadow: "0 6px 20px -14px rgba(11,13,18,0.3)" }}>
    <span style={{ background: "#0B7A55", color: "#FFFFFF", fontSize: "12px", fontWeight: "700", padding: "3px 9px", borderRadius: "999px" }}>NEW</span>
    <span>Bulk Order for wholesale buyers</span>
  </a>
);

/**
 * Hero: headline + CTAs, and the animated "4 separate apps → 1 app" diagram.
 * `offer` adds the BFCM pill beside the NEW badge and the neon sign above the
 * MultiVariants panel; without it the hero renders exactly as before.
 */
export default function Hero({ offer = false }: { offer?: boolean }) {
  return (
    <section className="hero" id="top" aria-labelledby="wn-hero-title" style={{ position: "relative", padding: "72px 16px 0 16px", textAlign: "center" }}>
      <div className="hero-glow" aria-hidden="true" style={{ position: "absolute", inset: "-120px 0 auto 0", height: "760px", background: "radial-gradient(48% 52% at 50% 30%, rgba(59,191,138,0.16), rgba(250,250,247,0) 70%), radial-gradient(30% 40% at 82% 18%, rgba(200,242,90,0.22), rgba(250,250,247,0) 70%)", pointerEvents: "none" }} />
      <div className="hero-copy" style={{ position: "relative", maxWidth: "980px", margin: "0 auto" }}>
        {offer ? (
          <div className="hero-badges">
            <BfcmPill />
            {newBadge}
          </div>
        ) : (
          newBadge
        )}
        <h1 id="wn-hero-title" className="hero-h" style={{ margin: "14px 0 0 0", fontSize: "clamp(40px, 6.6vw, 84px)", lineHeight: "1.16", letterSpacing: "-0.045em", fontWeight: "800" }}>
          Four Shopify apps
          <br />
          Replaced by{" "}
          <span style={{ display: "inline-block", background: "#0B7A55", color: "#FFFFFF", padding: "0 0.15em 0.25em 0.15em", marginTop: "0.08em", lineHeight: "0.6", letterSpacing: "-0.03em", borderRadius: "0.16em", transform: "rotate(-1.5deg)" }}>
            one
          </span>
        </h1>
        <p className="hero-p" style={{ margin: "18px auto 0 auto", maxWidth: "780px", fontSize: "clamp(17px, 2vw, 20px)", lineHeight: "1.6", color: "#5B6170" }}>
          Order restrictions, tiered discounts, product options and bulk orders — all in one Shopify app, with one setup and one dashboard.
        </p>
        <div className="hero-btns" style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <a className="btn hero-cta1" href={INSTALL_URL} {...EXTERNAL} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#0B0D12", color: "#FFFFFF", fontWeight: "600", fontSize: "16px", padding: "16px 26px", borderRadius: "999px" }}>
            <Image src="/images/whats-new/shopify-bag.png" alt="" width={18} height={21} style={{ width: "18px", height: "auto", display: "block" }} />
            Install on Shopify
          </a>
          <a className="btn hero-cta2" href="#features" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFFFFF", color: "#0B0D12", fontWeight: "600", fontSize: "16px", padding: "16px 26px", borderRadius: "999px", border: "1px solid #DCDCD5" }}>
            Explore all features
          </a>
        </div>
        <div className="hero-ticks" style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "10px 22px", justifyContent: "center", fontSize: "14px", color: "#5B6170" }}>
          {TICKS.map((t) => (
            <span key={t} style={{ display: "inline-flex", gap: "7px", alignItems: "center" }}>
              <Check size={16} stroke="#0B7A55" width="2.4" />
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="hs-wrap" style={{ position: "relative", maxWidth: "1180px", margin: "64px auto 0 auto" }}>
        <div className="m41" role="img" aria-label="Four separate apps — Order Restrictions, Discount, Product Options and Bulk Orders — combine into one MultiVariants app">
          <div className="m41-stage" aria-hidden="true">
            <div style={{ position: "absolute", left: "0", top: "0", fontSize: "14px", fontWeight: "700", letterSpacing: "0.14em", color: "#8A909C" }}>
              4 SEPARATE APPS
            </div>
            <div style={{ position: "absolute", left: "560px", top: "28px", fontSize: "14px", fontWeight: "700", letterSpacing: "0.14em", color: "#0B7A55" }}>1 APP</div>
            {APPS.map((a, i) => (
              <div key={a.title} className="m41-app" style={{ position: "absolute", left: "0", top: `${a.top}px`, width: "300px", height: "104px", background: "#FFFFFF", border: "1.5px dashed #D4D4CE", borderRadius: "20px", padding: "0 20px", display: "flex", alignItems: "center", gap: "16px", animationDelay: a.delay }}>
                <span style={{ width: "58px", height: "58px", flex: "none", borderRadius: "16px", background: ICONS[a.icon].tint, display: "grid", placeItems: "center" }}>
                  <Icon name={a.icon} size={28} />
                </span>
                <span style={{ flex: "1", minWidth: "0" }}>
                  <b style={{ display: "block", fontFamily: "var(--wn-display), sans-serif", fontSize: "21px", letterSpacing: "-0.01em" }}>{a.title}</b>
                  <span style={{ display: "block", marginTop: "3px", fontSize: "15px", color: "#6B7280" }}>{a.sub}</span>
                </span>
                <span style={{ position: "absolute", top: "-12px", right: "16px", fontSize: "12px", fontWeight: "700", color: "#0B7A55", background: "#F6FBF8", border: "1px solid #D7ECE2", borderRadius: "999px", padding: "3px 10px" }}>
                  App {i + 1}
                </span>
              </div>
            ))}
            <svg style={{ position: "absolute", left: "0", top: "0", overflow: "visible" }} width="960" height="640" viewBox="0 0 960 640">
              {APPS.map((a) => {
                const d = `M300 ${a.y} C 430 ${a.y}, 440 300, 556 300`;
                return (
                  <g key={a.y}>
                    <path d={d} fill="none" stroke="#DCDCD5" strokeWidth="3" />
                    <path className="m41-flow" d={d} fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" />
                    <circle r="6" opacity="0" fill="#C8F25A" stroke="#0B7A55" strokeWidth="2">
                      <animateMotion dur="4.8s" repeatCount="indefinite" begin={a.begin} path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1" />
                      <set attributeName="opacity" to="1" begin={a.begin} />
                    </circle>
                  </g>
                );
              })}
              <path d="M546 290 L560 300 L546 310" fill="none" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="m41-main" style={{ position: "absolute", left: "560px", top: "58px", width: "400px", height: "484px", background: "#FFFFFF", border: "2px solid #0B7A55", borderRadius: "28px", padding: "26px", boxShadow: "0 0 0 8px rgba(11,122,85,0.08), 0 40px 80px -36px rgba(11,13,18,0.45)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "64px", height: "64px", flex: "none", borderRadius: "18px", background: "#F2F2EE", display: "grid", placeItems: "center" }}>
                  <Image src="/images/whats-new/logo-mark.png" alt="" width={44} height={43} style={{ width: "44px", height: "auto", display: "block" }} />
                </span>
                <span style={{ flex: "1" }}>
                  <b style={{ display: "block", fontFamily: "var(--wn-display), sans-serif", fontSize: "28px", letterSpacing: "-0.02em" }}>MultiVariants</b>
                  <span style={{ display: "block", marginTop: "2px", fontSize: "15px", color: "#5B6170" }}>All four, in one app</span>
                </span>
                <span style={{ fontSize: "13px", fontWeight: "800", color: "#0B0D12", background: "#C8F25A", borderRadius: "999px", padding: "6px 12px" }}>4-in-1</span>
                {offer && <BfcmNeonSign />}
              </div>
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {APPS.map((a) => (
                  <div key={a.title} style={{ display: "flex", alignItems: "center", gap: "14px", background: "#F6FBF8", border: "1px solid #D7ECE2", borderRadius: "14px", padding: "12px 14px" }}>
                    <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "11px", background: ICONS[a.icon].tint, display: "grid", placeItems: "center" }}>
                      <Icon name={a.icon} size={20} />
                    </span>
                    <b style={{ flex: "1", fontSize: "18px", fontWeight: "600" }}>{a.title}</b>
                    <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#0B7A55", display: "grid", placeItems: "center" }}>
                      <Check size={14} stroke="#FFFFFF" width="3.2" />
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600", color: "#0B7A55" }}>
                <span>1 install</span>
                <span>1 setup</span>
                <span>1 dashboard</span>
              </div>
            </div>
            <div style={{ position: "absolute", left: "50%", top: "588px", transform: "translateX(-50%)", whiteSpace: "nowrap", background: "#0B0D12", color: "#FFFFFF", borderRadius: "999px", padding: "12px 22px", fontFamily: "var(--wn-display), sans-serif", fontWeight: "700", fontSize: "18px" }}>
              Replace 4 apps with 1 —{" "}
              <span style={{ color: "#C8F25A" }}>MultiVariants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
