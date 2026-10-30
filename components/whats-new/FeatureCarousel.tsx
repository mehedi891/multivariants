"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const GAP = 12; // matches `.fstack { gap: 12px }` on mobile

/**
 * Wraps the four feature cards. On desktop the CSS stacks them as sticky
 * cards and this component does nothing visible. On phones (≤640px) the CSS
 * turns the stack into a horizontal scroll-snap carousel; this keeps the dots
 * in sync with the scroll position and auto-advances every 3.5s while the
 * carousel is on screen — pausing for 6s after the shopper touches it.
 */
export default function FeatureCarousel({ children }: { children: ReactNode }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const slideWidth = () => (stack.querySelector<HTMLElement>(".fsec")?.offsetWidth ?? 0) + GAP;
    const currentIndex = () => Math.round(stack.scrollLeft / slideWidth());

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(currentIndex()));
    };
    stack.addEventListener("scroll", onScroll, { passive: true });

    let holdUntil = 0;
    const hold = () => {
      holdUntil = Date.now() + 6000;
    };
    const holdEvents = ["touchstart", "pointerdown", "wheel"] as const;
    holdEvents.forEach((e) => stack.addEventListener(e, hold, { passive: true }));

    let visible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.5 },
    );
    observer.observe(stack);

    let timer: number | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => {
        // Not scrollable (desktop layout), off screen, or recently touched.
        if (!visible || Date.now() < holdUntil || stack.scrollWidth <= stack.clientWidth + 4) return;
        stack.scrollTo({ left: ((currentIndex() + 1) % count) * slideWidth(), behavior: "smooth" });
      }, 3500);
    }

    return () => {
      cancelAnimationFrame(frame);
      stack.removeEventListener("scroll", onScroll);
      holdEvents.forEach((e) => stack.removeEventListener(e, hold));
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [count]);

  return (
    <>
      <div ref={stackRef} className="fstack">
        {children}
      </div>
      <div className="fdots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={i === active ? "on" : undefined} />
        ))}
      </div>
    </>
  );
}
