"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Renders CMS-authored HTML exactly as the editor saved it. Nothing is
 * sanitized: custom HTML blocks (`<div data-html-block>`), iframes, inline
 * `<style>` and `<script>` all reach the page untouched.
 *
 * Scripts: on a full page load the browser runs them while parsing the server
 * HTML. After a client-side navigation the HTML is inserted via innerHTML,
 * which never runs `<script>` tags — so on a client-only mount each script is
 * re-created in place, in document order, to run it exactly once.
 *
 * Iframes are capped at the column width so fixed-width embeds (e.g. 560px
 * YouTube players) don't get clipped on phones.
 */

const EXECUTABLE_SCRIPT_TYPE = /^(?:|text\/javascript|application\/javascript|module)$/i;

const noopSubscribe = () => () => {};

async function runScripts(root: HTMLElement) {
  for (const original of Array.from(root.querySelectorAll("script"))) {
    if (!EXECUTABLE_SCRIPT_TYPE.test(original.type.trim())) continue;

    const script = document.createElement("script");
    for (const { name, value } of Array.from(original.attributes)) {
      script.setAttribute(name, value);
    }
    script.text = original.text;

    // Like the HTML parser, wait for a blocking external script before running
    // the next one, so inline code that depends on it finds it loaded.
    const blocking = script.src && !script.hasAttribute("async") && !script.hasAttribute("defer");
    const loaded = blocking
      ? new Promise<void>((resolve) => {
          script.onload = script.onerror = () => resolve();
        })
      : null;

    original.replaceWith(script);
    if (loaded) await loaded;
  }
}

export default function CmsHtml({ html, className = "" }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // True only while hydrating server HTML, whose scripts the parser already ran.
  const hydrating = useSyncExternalStore(noopSubscribe, () => false, () => true);
  const scriptsRanFor = useRef<string | null>(hydrating ? html : null);

  useEffect(() => {
    if (!ref.current || scriptsRanFor.current === html) return;
    scriptsRanFor.current = html;
    void runScripts(ref.current);
  }, [html]);

  return (
    <div
      ref={ref}
      className={`[&_iframe]:max-w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
