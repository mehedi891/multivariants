import WhatsNewPage from "@/components/whats-new/WhatsNewPage";
import { whatsNewOfferMetadata } from "@/components/whats-new/seo";

/**
 * /whats-new/offer — the landing page plus the BFCM pill and neon sign, for
 * everyone except free and uninstalled merchants (they get /whats-new).
 *
 * Never indexed: noindex here and in an X-Robots-Tag header from proxy.ts, kept
 * out of the sitemap, and no structured data. proxy.ts also forwards it to
 * /whats-new once the deal ends (lib/whats-new-offer.ts).
 */
export const metadata = whatsNewOfferMetadata;

export default function OfferPage() {
  return <WhatsNewPage offer />;
}
