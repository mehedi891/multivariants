import { whatsNewOffer } from "@/lib/whats-new-offer";
import CopyCode from "./CopyCode";

// The two BFCM elements of /whats-new/offer, ported from the design file
// multivariants-landing-bfcm-neon_3.html. Rendered only when Hero gets `offer`;
// styles live in whats-new.css under "BFCM".

/** Neon "BFCM" pill shown beside the NEW badge; jumps to the closing install CTA. */
export function BfcmPill() {
  return (
    <a className="bfcm-pill" href="#install" aria-label={`BFCM: 41% off for life on install — use code ${whatsNewOffer.code}`}>
      <span>BFCM</span>
      <span>
        <b>41% off for life</b> on install
      </span>
    </a>
  );
}

/**
 * Neon sign hanging above the MultiVariants panel in the hero diagram. It lives
 * inside the diagram, which is decorative and hidden from assistive tech, so it
 * is aria-hidden too — the pill above carries the offer and code for screen
 * readers.
 */
export function BfcmNeonSign() {
  return (
    <div className="bfx-top bfx-neon" aria-hidden="true">
      <span className="ne-wire l" />
      <span className="ne-wire r" />
      <div className="ne-box">
        <div className="ne-1">BLACK <span className="fl">FRI</span>DAY</div>
        <div className="ne-2"><span>41% OFF</span>FOREVER</div>
        <div className="ne-3">USE CODE <CopyCode code={whatsNewOffer.code} /> ON INSTALL</div>
      </div>
    </div>
  );
}
