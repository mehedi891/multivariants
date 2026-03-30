"use client";

import { useState } from "react";
import Link from "next/link";

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

  const inputCls = "w-full px-3.5 py-2.5 border-[1.5px] border-brand-border rounded-lg text-sm font-[inherit] text-brand-text bg-brand-alt transition-colors focus:outline-none focus:border-primary focus:bg-white";
  const labelCls = "block text-[13px] font-semibold mb-1.5 text-brand-text";

  return (
    <section className="bg-brand-alt px-[5%] py-20" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-[13px] font-semibold text-primary uppercase tracking-[1px] mb-3">
            Reach Out to Us
          </p>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Write to Us
          </h2>
          <p className="text-[17px] text-brand-muted max-w-lg mx-auto leading-relaxed">
            Have questions or want a personalized demo? Our team is happy to
            help you get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div className="bg-white rounded-[20px] p-10 shadow-md border border-brand-border">
            <h3 className="text-[22px] font-black mb-2">Send a Message</h3>
            <p className="text-sm text-brand-muted mb-7">
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
                className={`w-full py-3.5 rounded-xl text-base font-bold text-white transition-all ${sent ? "bg-brand-green cursor-default" : "bg-primary hover:bg-primary-dark hover:-translate-y-px"}`}
              >
                {sent ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-7 justify-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Contact Information</h3>
              <p className="text-[15px] text-brand-muted leading-relaxed">
                We&apos;re here to help your Shopify store grow. Reach out
                through any channel that&apos;s convenient for you.
              </p>
            </div>

            <dl className="flex flex-col gap-5">
              {[
                { icon: "🌐", label: "Website",       value: "multivariants.com",           href: "https://multivariants.com" },
                { icon: "✉️", label: "Support Email", value: "support@multivariants.com",   href: "mailto:support@multivariants.com" },
                { icon: "📍", label: "Location",      value: "DOHS Mirpur, Dhaka-1216, Bangladesh", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <dt className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </dt>
                  <dd>
                    <span className="block text-[12px] font-semibold text-brand-muted uppercase tracking-[0.5px] mb-0.5">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-[15px] font-semibold text-primary hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <address className="text-[15px] font-semibold text-brand-text not-italic">
                        {item.value}
                      </address>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="bg-primary-light rounded-[20px] p-6 border border-primary/10">
              <p className="font-bold text-primary mb-2">Free Plan Available</p>
              <p className="text-sm text-brand-muted mb-4 leading-relaxed">
                Start with our free plan — no credit card required. Upgrade any
                time as your business grows.
              </p>
              <Link
                href="https://apps.shopify.com/"
                className="block text-center py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start 7-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
