/** "Everything in one app" intro above the feature cards. */
export default function FeaturesIntro() {
  return (
    <section id="features" aria-labelledby="wn-features-title" style={{ padding: "120px 16px 40px 16px" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px 60px", alignItems: "end", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 520px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.16em", color: "#0B7A55" }}>EVERYTHING IN ONE APP</div>
          <h2 id="wn-features-title" style={{ margin: "14px 0 0 0", fontSize: "clamp(34px, 4.6vw, 58px)", lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "800" }}>
            Four ordering tools.
            <br />
            One place to run them.
          </h2>
        </div>
        <p style={{ flex: "1 1 360px", maxWidth: "440px", margin: "0", fontSize: "18px", lineHeight: "1.6", color: "#5B6170" }}>
          Each one could be its own app. In MultiVariants they share one setup — and you can mix them freely, you&apos;re never limited to one.
        </p>
      </div>
    </section>
  );
}
