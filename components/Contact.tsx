"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

type Status = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // When the form was mounted — used for bot-detection timing on the server.
  const mountedAt = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          elapsed: Date.now() - mountedAt.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const sent = status === "sent";
  const submitting = status === "submitting";

  // Dark inputs; the -webkit-autofill overrides stop the browser from painting
  // the field white on autofill.
  const inputCls =
    "w-full rounded-xl border border-white/12 bg-[#0c1428]/80 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-primary/55 focus:bg-[#0c1428] focus:ring-2 focus:ring-primary/25 [&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#0c1428] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]";
  const labelCls = "mb-1.5 block text-[13px] font-semibold text-white/70";

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
            <h1 id="contact-heading" className="text-3xl font-black leading-[1.32] tracking-tight text-white mb-4 md:text-4xl">
              Write to Us
            </h1>
            <p className="text-[17px] text-white/55 max-w-lg mx-auto leading-relaxed">
              Have questions or want a personalized demo? Our team is happy to help you get started.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Form */}
          <AnimateIn direction="right">
            <div className="glass rounded-[24px] p-8 sm:p-10 border-white/15">
              <h2 className="text-[22px] font-black mb-2 text-white">Send a Message</h2>
              <p className="text-sm text-white/50 mb-7">
                Fill in the form and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelCls}>Full Name</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" strokeLinecap="round" />
                        </svg>
                      </span>
                      <input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" className={`${inputCls} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email Address</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 5.5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <input id="email" name="email" type="email" placeholder="john@example.com" required autoComplete="email" className={`${inputCls} pl-11`} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>Phone No.</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
                      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <path d="M6.5 3.5a1.8 1.8 0 0 1 1.8 1.4l.5 2.2a1.8 1.8 0 0 1-.5 1.7l-1.2 1.1a12 12 0 0 0 5.8 5.8l1.1-1.2a1.8 1.8 0 0 1 1.7-.5l2.2.5a1.8 1.8 0 0 1 1.4 1.8v2A1.8 1.8 0 0 1 18.6 21 15.5 15.5 0 0 1 3 5.4a1.8 1.8 0 0 1 1.9-1.9z" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+()\-\s]*"
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^\d+()\-\s]/g, "");
                      }}
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>Message</label>
                  <textarea id="message" name="message" placeholder="Tell us how we can help you..." rows={5} required className={`${inputCls} resize-y`} />
                </div>

                {/* Honeypot — hidden from users, bots tend to fill it */}
                <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                  <label htmlFor="company">Company (leave this empty)</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "sent" && (
                  <p
                    role="status"
                    className="flex items-center gap-2 rounded-xl border border-brand-green/40 bg-brand-green/10 px-4 py-3 text-sm font-medium text-brand-green"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Thanks! Your message has been sent — we&apos;ll get back to you within 24 hours.
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16h.01" strokeLinecap="round" />
                    </svg>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || sent}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition-all ${
                    sent
                      ? "cursor-default bg-brand-green"
                      : submitting
                        ? "cursor-wait bg-primary/70"
                        : "bg-gradient-to-r from-[#5a5eff] to-primary hover:-translate-y-px hover:brightness-110 shadow-[0_10px_28px_rgba(92,106,196,0.4)]"
                  }`}
                >
                  {sent ? (
                    <>
                      Message Sent!
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                        <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  ) : submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimateIn>

          {/* Info */}
          <AnimateIn direction="left" delay={150}>
            <div className="flex flex-col gap-7 justify-center">
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-2 text-white">Contact Information</h2>
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
                  href="https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp"
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
