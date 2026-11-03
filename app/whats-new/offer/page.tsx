import type { Metadata } from "next";
import WhatsNewPage from "@/components/whats-new/WhatsNewPage";
import { whatsNewMetadata } from "@/components/whats-new/seo";

/**
 * Offer variant of /whats-new: the same page plus the BFCM pill and neon sign.
 *
 * Never linked or requested directly — proxy.ts rewrites /whats-new?bfcm=offer
 * here while lib/whats-new-offer.ts says the deal is live, and a direct request
 * for /whats-new/offer falls through to the 404. Kept out of search results: its
 * canonical (from whatsNewMetadata) is the plain /whats-new page.
 */
export const metadata: Metadata = {
  ...whatsNewMetadata,
  robots: { index: false, follow: true },
};

export default function OfferPage() {
  return <WhatsNewPage offer />;
}
