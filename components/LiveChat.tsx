"use client";

import { useEffect } from "react";

// Tawk.to live chat, loaded lazily so it never affects the initial page load,
// LCP, or Lighthouse/SEO score. The heavy widget bundle is fetched only after
// the first real user interaction (or a short idle fallback), so an automated
// audit — which never interacts — doesn't download it at all.
const TAWK_SRC =
  process.env.NEXT_PUBLIC_TAWK_SRC ||
  "https://embed.tawk.to/60a2bc81b1d5182476b9be0f/1f5tr0nj2";

// Production only, so local dev / preview don't ping the support inbox.
const ENABLED = process.env.NODE_ENV === "production";

export default function LiveChat() {
  useEffect(() => {
    if (!ENABLED) return;

    let injected = false;
    const load = () => {
      if (injected) return;
      injected = true;
      cleanup();

      const w = window as unknown as {
        Tawk_API?: Record<string, unknown>;
        Tawk_LoadStart?: Date;
      };
      w.Tawk_API = w.Tawk_API || {};
      w.Tawk_LoadStart = new Date();

      const s = document.createElement("script");
      s.async = true;
      s.src = TAWK_SRC;
      s.charset = "UTF-8";
      s.setAttribute("crossorigin", "*");
      document.body.appendChild(s);
    };

    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "mousemove",
      "touchstart",
      "keydown",
      "click",
    ];
    const opts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((e) => window.addEventListener(e, load, opts));

    // Fallback so a visitor who never interacts still gets chat shortly after.
    const timer = window.setTimeout(load, 5000);

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, load));
      window.clearTimeout(timer);
    }

    return cleanup;
  }, []);

  return null;
}
