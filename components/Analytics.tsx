"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Public IDs (safe to expose — they ship in the client anyway). Set these ONLY
// in the Vercel Production environment so staging/preview deploys don't pollute
// analytics. Local dev is excluded via the NODE_ENV check below.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const ENABLED =
  process.env.NODE_ENV === "production" && Boolean(GA_ID || FB_PIXEL_ID);

/**
 * Google Analytics (gtag) + Facebook/Meta Pixel.
 *
 * The inline scripts fire the first PageView on load; this effect fires a fresh
 * PageView on client-side (SPA) route changes, which gtag/fbq don't do on their
 * own. The first run is skipped so the initial view isn't counted twice.
 */
export default function Analytics() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!ENABLED) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    if (GA_ID && typeof w.gtag === "function") {
      w.gtag("config", GA_ID, { page_path: pathname });
    }
    if (FB_PIXEL_ID && typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [pathname]);

  if (!ENABLED) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {FB_PIXEL_ID && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
