import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the MultiVariants Privacy Policy regarding collection, use, disclosure, and protection of personal data.",
  alternates: { canonical: "https://multivariants.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
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
                Legal
              </span>
              <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                Effective date: September 01, 2020
              </p>
            </AnimateIn>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-[5%] py-14 lg:py-20"
          style={{
            background:
              "linear-gradient(180deg, #0d1327 0%, #111b33 52%, #181238 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-primary/12 blur-[75px]" />
            <div className="absolute right-[-80px] bottom-10 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <AnimateIn direction="up">
              <article className="rounded-3xl border border-white/16 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
                <div className="space-y-6 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                  <p>
                    MultiVariants (“us”, “we”, or “our”) operates the{" "}
                    <a
                      href="https://multivariants.com/"
                      className="text-primary-light hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://multivariants.com/
                    </a>{" "}
                    website and the MultiVariants app (the “Service”).
                  </p>

                  <p>
                    This page informs you of our policies regarding the
                    collection, use, and disclosure of personal data when you
                    use our Service and the choices you have associated with
                    that data.
                  </p>

                  <p>
                    We use your data to provide and improve the Service. By
                    using the Service, you agree to the collection and use of
                    information in accordance with this policy. Unless otherwise
                    defined in this Privacy Policy, terms used in this Privacy
                    Policy have the same meanings as in our Terms and
                    Conditions.
                  </p>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Information Collection And Use
                    </h2>
                    <p className="mt-3">
                      We collect several different types of information for
                      various purposes to provide and improve our Service to
                      you.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Types of Data Collected
                    </h2>

                    <h3 className="mt-4 text-lg font-bold text-white">
                      Personal Data
                    </h3>
                    <p className="mt-2">
                      While using our Service, we may ask you to provide us with
                      certain personally identifiable information that can be
                      used to contact or identify you (“Personal Data”).
                      Personally, identifiable information may include, but is
                      not limited to:
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Cookies and Usage Data</li>
                    </ul>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      Usage Data
                    </h3>
                    <p className="mt-2">
                      We may also collect information that your browser sends
                      whenever you visit our Service or when you access the
                      Service by or through a mobile device (“Usage Data”).
                    </p>
                    <p className="mt-2">
                      This Usage Data may include information such as your
                      computer’s Internet Protocol address (e.g. IP address),
                      browser type, browser version, the pages of our Service
                      that you visit, the time and date of your visit, the time
                      spent on those pages, unique device identifiers and other
                      diagnostic data.
                    </p>
                    <p className="mt-2">
                      When you access the Service by or through a mobile device,
                      this Usage Data may include information such as the type
                      of mobile device you use, your mobile device unique ID,
                      the IP address of your mobile device, your mobile
                      operating system, the type of mobile Internet browser you
                      use, unique device identifiers and other diagnostic data.
                    </p>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      Tracking & Cookies Data
                    </h3>
                    <p className="mt-2">
                      We use cookies and similar tracking technologies to track
                      the activity on our Service and hold certain information.
                    </p>
                    <p className="mt-2">
                      Cookies are files with a small amount of data which may
                      include an anonymous unique identifier. Cookies are sent
                      to your browser from a website and stored on your device.
                      Tracking technologies also used are beacons, tags, and
                      scripts to collect and track information and to improve
                      and analyze our Service. You can instruct your browser to
                      refuse all cookies or to indicate when a cookie is being
                      sent. However, if you do not accept cookies, you may not
                      be able to use some portions of our Service.
                    </p>
                    <p className="mt-2">Examples of Cookies we use:</p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      <li>
                        Session Cookies. We use Session Cookies to operate our
                        Service.
                      </li>
                      <li>
                        Preference Cookies. We use Preference Cookies to
                        remember your preferences and various settings.
                      </li>
                      <li>
                        Security Cookies. We use Security Cookies for security
                        purposes.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Use of Data
                    </h2>
                    <p className="mt-3">
                      MultiVariants uses the collected data for various
                      purposes:
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      <li>To provide and maintain the Service</li>
                      <li>To notify you about changes to our Service</li>
                      <li>
                        To allow you to participate in interactive features of
                        our Service when you choose to do so
                      </li>
                      <li>To provide customer care and support</li>
                      <li>
                        To provide analysis or valuable information so that we
                        can improve the Service
                      </li>
                      <li>To monitor the usage of the Service</li>
                      <li>To detect, prevent and address technical issues</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Transfer of Data
                    </h2>
                    <p className="mt-3">
                      Your information, including Personal Data, may be
                      transferred to — and maintained on — computers located
                      outside of your state, province, country, or other
                      governmental jurisdiction where the data protection laws
                      may differ from those from your jurisdiction.
                    </p>
                    <p className="mt-2">
                      If you are located outside Bangladesh and choose to
                      provide information to us, please note that we transfer
                      the data, including Personal Data, to Bangladesh and
                      process it there.
                    </p>
                    <p className="mt-2">
                      Your consent to this Privacy Policy followed by your
                      submission of such information represents your agreement
                      to that transfer.
                    </p>
                    <p className="mt-2">
                      MultiVariants will take all steps reasonably necessary to
                      ensure that your data is treated securely and in
                      accordance with this Privacy Policy and no transfer of
                      your Personal Data will take place to an organization or a
                      country unless there are adequate controls in place
                      including the security of your data and other personal
                      information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Disclosure Of Data
                    </h2>
                    <h3 className="mt-4 text-lg font-bold text-white">
                      Legal Requirements
                    </h3>
                    <p className="mt-2">
                      MultiVariants may disclose your Personal Data in the good
                      faith belief that such action is necessary to:
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      <li>To comply with a legal obligation</li>
                      <li>
                        To protect and defend the rights or property of
                        MultiVariants
                      </li>
                      <li>
                        To prevent or investigate possible wrongdoing in
                        connection with the Service
                      </li>
                      <li>
                        To protect the personal safety of users of the Service
                        or the public
                      </li>
                      <li>To protect against legal liability</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Security Of Data
                    </h2>
                    <p className="mt-3">
                      The security of your data is important to us, but remember
                      that no method of transmission over the Internet, or
                      method of electronic storage is 100% secure. While we
                      strive to use commercially acceptable means to protect
                      your Personal Data, we cannot guarantee its absolute
                      security.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Service Providers
                    </h2>
                    <p className="mt-3">
                      We may employ third party companies and individuals to
                      facilitate our Service (“Service Providers”), to provide
                      the Service on our behalf, to perform Service-related
                      services or to assist us in analyzing how our Service is
                      used.
                    </p>
                    <p className="mt-2">
                      These third parties have access to your Personal Data only
                      to perform these tasks on our behalf and are obligated not
                      to disclose or use it for any other purpose.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Links To Other Sites
                    </h2>
                    <p className="mt-3">
                      Our Service may contain links to other sites that are not
                      operated by us. If you click on a third-party link, you
                      will be directed to that third party’s site. We strongly
                      advise you to review the Privacy Policy of every site you
                      visit.
                    </p>
                    <p className="mt-2">
                      We have no control over and assume no responsibility for
                      the content, privacy policies, or practices of any third
                      party sites or services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Children’s Privacy
                    </h2>
                    <p className="mt-3">
                      Our Service does not address anyone under the age of 18
                      (“Children”).
                    </p>
                    <p className="mt-2">
                      We do not knowingly collect personally identifiable
                      information from anyone under the age of 18. If you are a
                      parent or guardian and you are aware that your Children
                      has provided us with Personal Data, please contact us. If
                      we become aware that we have collected Personal Data from
                      children without verification of parental consent, we take
                      steps to remove that information from our servers.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Changes To This Privacy Policy
                    </h2>
                    <p className="mt-3">
                      We may update our Privacy Policy from time to time. We
                      will notify you of any changes by posting the new Privacy
                      Policy on this page.
                    </p>
                    <p className="mt-2">
                      We will let you know via email and/or a prominent notice
                      on our Service, prior to the change becoming effective and
                      update the “effective date” at the top of this Privacy
                      Policy.
                    </p>
                    <p className="mt-2">
                      You are advised to review this Privacy Policy periodically
                      for any changes. Changes to this Privacy Policy are
                      effective when they are posted on this page.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black leading-[1.28] text-white sm:text-2xl">
                      Contact Us
                    </h2>
                    <p className="mt-3">
                      If you have any questions about this Privacy Policy,
                      please contact us by email:{" "}
                      <a
                        href="mailto:support@multivariants.com"
                        className="text-primary-light hover:text-accent"
                      >
                        support@multivariants.com
                      </a>
                    </p>
                  </section>
                </div>
              </article>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
