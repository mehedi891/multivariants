import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import AcademyExplorer from "@/components/AcademyExplorer";
import { getPublicAcademyCategories } from "@/app/academy/public-api";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Browse MultiVariants help docs by category. Learn setup, quantity rules, layout customization, and integrations.",
  alternates: { canonical: "/academy" },
};

export default async function AcademyPage() {
  const { categories, error } = await getPublicAcademyCategories();

  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <section
          className="relative overflow-hidden px-[5%] py-16 lg:py-24"
          style={{
            background:
              "linear-gradient(170deg, #0a0f1e 0%, #0f172a 48%, #1a1040 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 top-6 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-10 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[90px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <AnimateIn direction="up">
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-light">
                Docs
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                MultiVariants Academy
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Help docs for setup, restrictions, bulk ordering workflows, and
                integrations. Start with a category and open any guide.
              </p>
            </AnimateIn>
          </div>
        </section>

        {categories.length === 0 && (
          <section className="bg-[#101830] px-[5%] py-4">
            <div className="mx-auto max-w-6xl rounded-xl border border-white/14 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
              No docs found from API. Check `CMS_API_BASE_URL`, `DOCS_API_PATH`, and `DOCS_SITE`.
              {error ? ` (${error})` : ""}
            </div>
          </section>
        )}

        <AcademyExplorer categories={categories} />
      </main>
      <Footer />
    </>
  );
}
