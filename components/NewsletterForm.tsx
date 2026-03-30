"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <label htmlFor="footer-email" className="sr-only">Email address</label>
      <input
        id="footer-email"
        type="email"
        placeholder="Your Email Address"
        autoComplete="email"
        required
        className="flex-1 min-w-0 px-3.5 py-2.5 bg-white/10 border border-white/15 border-r-0 rounded-l-lg text-white text-[13px] placeholder-white/35 focus:outline-none focus:border-primary font-[inherit]"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-primary text-white rounded-r-lg text-[13px] font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap font-[inherit]"
      >
        {subscribed ? "Subscribed!" : "Subscribe"}
      </button>
    </form>
  );
}
