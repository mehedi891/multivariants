"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  threshold?: number;
}

const TRANSITION = "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)";

const hiddenTransform: Record<NonNullable<Props["direction"]>, string> = {
  up:    "translateY(30px)",
  down:  "translateY(-30px)",
  left:  "translateX(36px)",
  right: "translateX(-36px)",
  scale: "scale(0.92)",
};

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // transition must always be present so the browser can animate
  // the property change when visible flips to true
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : hiddenTransform[direction],
    transition: TRANSITION,
    transitionDelay: visible && delay ? `${delay}ms` : "0ms",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
