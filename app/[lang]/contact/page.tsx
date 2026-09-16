import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us – Support, Demos & Onboarding",
  description:
    "Contact the MultiVariants team for Shopify bulk-ordering support, live demos, setup help, and onboarding. We're here to help you get selling faster.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
