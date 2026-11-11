"use client";

import { useEffect } from "react";
import { isProductionHost } from "@/lib/production-hosts";

/**
 * Microsoft Clarity (session recordings + heatmaps), in cookieless mode.
 *
 * - Where: production builds (same NODE_ENV rule as Analytics and LiveChat)
 *   served from a production domain (lib/production-hosts.ts). Local dev,
 *   preview deploys and the *.vercel.app alias never reach the Clarity project.
 * - When: after the visitor's first scroll / mousemove / touchstart / keydown /
 *   click, or a 5 s idle fallback, whichever comes first. Even then the tag is
 *   added inside an idle callback, so it never delays the interaction that
 *   triggered it, the page load, or LCP. An audit that never interacts loads
 *   it only after the fallback.
 * - Cookies: the site has no consent banner, so Clarity is told consent is
 *   denied and runs in its no-consent mode. It sets no _clck/_clsk cookies and
 *   gives each page view its own ID, so recordings cover single page views and
 *   aren't stitched into multi-page visits.
 * - Clarity follows client-side route changes on its own; no page-view code.
 */

// Public project ID (it ships in the tag URL anyway). Override per environment
// with NEXT_PUBLIC_CLARITY_ID to point a deploy at a different project.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "zbunhpouwy";

const ENABLED = process.env.NODE_ENV === "production";

const INTERACTION_EVENTS = [
  "scroll",
  "mousemove",
  "touchstart",
  "keydown",
  "click",
] as const;
const IDLE_FALLBACK_MS = 5000;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;

type ClarityQueue = ((...args: unknown[]) => void) & { q?: IArguments[] };
type ClarityWindow = Window & {
  clarity?: ClarityQueue;
  /** Set once the tag is added, so remounts and locale switches never add a
   *  second copy (Clarity warns "CL001 Multiple Clarity tags" if they do). */
  __mvClarityLoaded?: boolean;
};

function addClarityTag(w: ClarityWindow) {
  if (w.__mvClarityLoaded) return;
  w.__mvClarityLoaded = true;

  // Microsoft's queue stub, kept in its original form: calls made before the
  // tag arrives are queued as the real `arguments` objects and replayed by
  // the tag. If an ad blocker stops the tag, calls keep queuing and nothing
  // throws.
  w.clarity =
    w.clarity ||
    function () {
      // eslint-disable-next-line prefer-rest-params -- vendor queue format
      (w.clarity!.q = w.clarity!.q || []).push(arguments);
    };
  w.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });

  const script = document.createElement("script");
  script.id = "clarity";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`;
  document.head.appendChild(script);
}

export default function Clarity() {
  useEffect(() => {
    if (!ENABLED || !CLARITY_ID) return;
    if (!isProductionHost(window.location.hostname)) return;
    const w = window as ClarityWindow;
    if (w.__mvClarityLoaded) return;

    let scheduled = false;
    let idleId: number | undefined;
    let deferTimer: number | undefined;

    const add = () => addClarityTag(w);

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      removeTriggers();
      // Safari has no requestIdleCallback; a 0 ms timeout still moves the
      // work out of the interaction's event handler.
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(add, {
          timeout: IDLE_CALLBACK_TIMEOUT_MS,
        });
      } else {
        deferTimer = window.setTimeout(add, 0);
      }
    };

    const opts: AddEventListenerOptions = { once: true, passive: true };
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, schedule, opts));
    const fallbackTimer = window.setTimeout(schedule, IDLE_FALLBACK_MS);

    function removeTriggers() {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, schedule));
      window.clearTimeout(fallbackTimer);
    }

    return () => {
      removeTriggers();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (deferTimer !== undefined) window.clearTimeout(deferTimer);
    };
  }, []);

  return null;
}
