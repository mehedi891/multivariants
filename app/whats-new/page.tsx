import WhatsNewPage from "@/components/whats-new/WhatsNewPage";
import { whatsNewMetadata } from "@/components/whats-new/seo";

export const metadata = whatsNewMetadata;

export default function Page() {
  return <WhatsNewPage />;
}
