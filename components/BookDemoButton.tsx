"use client";

import { useCallback, type ReactNode } from "react";

const CALENDLY_URL = "https://calendly.com/efolisupport";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

// Load the Calendly widget assets once, on first click, then resolve.
function ensureCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.getElementById("calendly-css")) {
      const link = document.createElement("link");
      link.id = "calendly-css";
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    if (window.Calendly) {
      resolve();
      return;
    }

    const existing = document.getElementById("calendly-js");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "calendly-js";
    script.src = CALENDLY_JS;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    document.body.appendChild(script);
  });
}

export default function BookDemoButton({
  className,
  children = "Book a Demo",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const handleClick = useCallback(async () => {
    await ensureCalendly();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  }, []);

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
