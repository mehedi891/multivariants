"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  }

  const inputCls = "w-full px-3.5 py-2.5 border border-white/15 rounded-lg text-sm font-[inherit] text-white bg-white/8 placeholder-white/30 transition-colors focus:outline-none focus:border-accent focus:bg-white/12";
  const labelCls = "block text-[13px] font-semibold mb-1.5 text-white/70";

  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)" }}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn direction="up">
          <div className="text-center mb-12">
            <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest mb-3">
              Reach Out to Us
            </p>
            <h2 id="contact-heading" className="text-3xl font-black tracking-tight text-white mb-4 md:text-4xl">
              Write to Us
            </h2>
            <p className="text-[17px] text-white/55 max-w-lg mx-auto leading-relaxed">
              Have questions or want a personalized demo? Our team is happy to help you get started.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Form */}
          <AnimateIn direction="right">
            <div className="glass rounded-[24px] p-8 sm:p-10 border-white/15">
              <h3 className="text-[22px] font-black mb-2 text-white">Send a Message</h3>
              <p className="text-sm text-white/50 mb-7">
                Fill in the form and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="name" className={labelCls}>Full Name</label>
                  <input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" className={inputCls} />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className={labelCls}>Email Address</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com" required autoComplete="email" className={inputCls} />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className={labelCls}>Phone No.</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" className={inputCls} />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className={labelCls}>Message</label>
                  <textarea id="message" name="message" placeholder="Tell us how we can help you..." rows={5} required className={`${inputCls} resize-y`} />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl text-base font-bold text-white transition-all ${sent ? "bg-brand-green cursor-default" : "bg-primary hover:bg-primary-dark hover:-translate-y-px shadow-[0_0_20px_rgba(92,106,196,0.4)] hover:shadow-[0_0_30px_rgba(92,106,196,0.6)]"}`}
                >
                  {sent ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </AnimateIn>

          {/* Info */}
          <AnimateIn direction="left" delay={150}>
            <div className="flex flex-col gap-7 justify-center">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2 text-white">Contact Information</h3>
                <p className="text-[15px] text-white/55 leading-relaxed">
                  We&apos;re here to help your Shopify store grow. Reach out through any channel that&apos;s convenient for you.
                </p>
              </div>

              <dl className="flex flex-col gap-5">
                {[
                  { icon: "🌐", label: "Website",       value: "multivariants.com",           href: "https://multivariants.com" },
                  { icon: "✉️", label: "Support Email", value: "support@multivariants.com",   href: "mailto:support@multivariants.com" },
                  { icon: "📍", label: "Location",      value: "DOHS Mirpur, Dhaka-1216, Bangladesh", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <dt className="w-11 h-11 rounded-xl glass border-white/15 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
                      {item.icon}
                    </dt>
                    <dd>
                      <span className="block text-[12px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a href={item.href} className="text-[15px] font-semibold text-accent hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <address className="text-[15px] font-semibold text-white/80 not-italic">
                          {item.value}
                        </address>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="glass rounded-[20px] p-6 border-accent/25 bg-accent/8">
                <p className="font-bold text-accent mb-2">Free Plan Available</p>
                <p className="text-sm text-white/55 mb-4 leading-relaxed">
                  Start with our free plan — no credit card required. Upgrade any time as your business grows.
                </p>
                <Link
                  href="https://apps.shopify.com/"
                  className="block text-center py-3 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent/80 shadow-[0_0_16px_rgba(71,193,191,0.4)] hover:shadow-[0_0_24px_rgba(71,193,191,0.6)] transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start 7-Day Free Trial
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
