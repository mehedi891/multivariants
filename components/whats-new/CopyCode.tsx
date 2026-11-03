"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The promo code on the neon sign: click to copy it, and "COPIED" flashes over
 * it for 1.4s. Out of the tab order because the sign sits inside the hero
 * diagram, which is aria-hidden; keyboard and screen-reader users get the code
 * from the BFCM pill's label instead.
 */
export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    const flash = () => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1400);
    };
    // Flash either way, like the design: the code is printed right there if
    // the clipboard is unavailable or the write is refused.
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(flash, flash);
    else flash();
  };

  return (
    <button type="button" className={copied ? "ne-code ok" : "ne-code"} tabIndex={-1} title="Click to copy code" onClick={copy}>
      <b>{code}</b>
      <span className="ne-copied">COPIED</span>
    </button>
  );
}
