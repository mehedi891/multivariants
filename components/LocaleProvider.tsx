"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

/**
 * Client-side current-locale context.
 *
 * The site translates primarily by passing server-loaded copy down as props.
 * This context exists for the shared interactive widgets that are rendered on
 * several pages without locale props (the variant-table demo, the academy
 * explorer), so they can read the active locale without threading it through
 * every caller.
 */
const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
