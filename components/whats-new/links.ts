// Destinations for the /whats-new landing page. Same URLs the main site's
// Navbar and Footer use. External links open in a new tab; links back into
// multivariants.com open in the same tab.

export const SITE_URL = "https://multivariants.com";

export const INSTALL_URL =
  "https://apps.shopify.com/multivariants?ref=efolillc&utm_source=multivariants&utm_medium=cta&utm_campaign=getapp";

/** Spread onto an <a> that leaves multivariants.com. */
export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/MultiVariantsApp" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/multivariants/" },
  { label: "X", href: "https://twitter.com/multivariants" },
];

export const SUPPORT_EMAIL_HREF = "mailto:support@multivariants.com";

export const HIRE_EXPERT_URL =
  "https://shopexperts.com/partners/multivariants-shopify-experts?utm_source=multivariants&utm_medium=footer&utm_campaign=hire-an-expert";

export const INTEGRATION_LINKS = [
  { label: "Discount Ray", href: "https://discountray.com/" },
  { label: "Shopify", href: "https://shopify.com/" },
];

export const EFOLI_APPS = [
  { label: "DiscountRay", desc: "Custom Price", href: "https://discountray.com/" },
  { label: "QuotWay", desc: "B2B Quote-Negotiation", href: "https://www.quotway.com" },
  { label: "OrderRules", desc: "Store Open Limits", href: "https://orderrules.com" },
  { label: "EmbedUp", desc: "Affiliate Buy Button", href: "https://embedup.com" },
  { label: "Push Bundle", desc: "Build a Box App", href: "https://pushbundle.com/" },
];
