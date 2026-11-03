import BulkOrderCard from "./BulkOrderCard";
import DiscountCard from "./DiscountCard";
import FeatureCarousel from "./FeatureCarousel";
import FeaturesIntro from "./FeaturesIntro";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import InstallCta from "./InstallCta";
import Marquee from "./Marquee";
import ProductOptionsCard from "./ProductOptionsCard";
import RestrictionsCard from "./RestrictionsCard";
import WhySection from "./WhySection";
import { whatsNewJsonLd } from "./seo";

/**
 * The /whats-new landing page. `offer` adds the BFCM pill and neon sign; it is
 * only set by the offer variant, which proxy.ts serves for `?bfcm=offer`.
 */
export default function WhatsNewPage({ offer = false }: { offer?: boolean }) {
  return (
    <>
      {/* Rendered as a plain string child: React escapes `</script`, and `<` is
          unicode-escaped below, so no raw-HTML injection is needed. */}
      <script type="application/ld+json">{JSON.stringify(whatsNewJsonLd).replace(/</g, "\\u003c")}</script>
      <div className={offer ? "wn wn-offer" : "wn"} style={{ minWidth: 0, overflowX: "clip" }}>
        <Header />
        <main>
          <Hero offer={offer} />
          <Marquee />
          <FeaturesIntro />
          <FeatureCarousel>
            <BulkOrderCard />
            <DiscountCard />
            <ProductOptionsCard />
            <RestrictionsCard />
          </FeatureCarousel>
          <WhySection />
          <HowItWorks />
          <InstallCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
