import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the MultiVariants team for support, demos, and onboarding.",
  alternates: { canonical: "https://multivariants.com/contact" },
};

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
