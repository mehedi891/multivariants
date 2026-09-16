export type BlogSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  imageSrc?: string;
  imageAlt?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  publishedAt: string; // ISO 8601 date
  author: string;
  heroImageSrc: string;
  heroImageAlt: string;
  sections: BlogSection[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "how-bulk-add-to-cart-reduces-cart-abandonment",
    title: "How Bulk Add to Cart Reduces Cart Abandonment by Up to 50%",
    excerpt:
      "Learn why one-click multi-variant ordering removes buyer friction and improves checkout completion in B2B and wholesale flows.",
    tag: "Bulk Ordering",
    readTime: "5 min read",
    publishedAt: "2026-03-20",
    author: "MultiVariants Team",
    heroImageSrc: "/images/features/customize-variants-display-layout.webp",
    heroImageAlt: "Bulk variant ordering table on a storefront",
    sections: [
      {
        heading: "Why Variant Friction Causes Drop-Off",
        paragraphs: [
          "When buyers must repeat the same add-to-cart action for every size and color, the ordering flow feels slow and error-prone.",
          "The longer it takes to complete an order, the more likely buyers are to postpone checkout or reduce their purchase size.",
        ],
      },
      {
        heading: "What Bulk Add to Cart Fixes",
        paragraphs: [
          "A table-based multi-variant interface lets buyers set all needed quantities in one place and commit in one action.",
          "This dramatically reduces click count, context switching, and repeated validation errors during checkout.",
        ],
        points: [
          "Fewer steps from selection to checkout",
          "Lower cognitive load for large orders",
          "Higher confidence before final add-to-cart",
        ],
        imageSrc: "/images/features/mix-n-match-box.webp",
        imageAlt: "Example mix and match variant ordering interface",
      },
      {
        heading: "Implementation Tip",
        paragraphs: [
          "Start by enabling bulk ordering on your highest-traffic variant-heavy products first, then expand after measuring conversion lift.",
        ],
      },
    ],
  },
  {
    slug: "top-strategies-to-increase-wholesale-sales-on-shopify",
    title: "Top 7 Strategies to Increase Wholesale Sales on Shopify in 2026",
    excerpt:
      "A practical playbook for growing B2B revenue with better ordering UX, quantity logic, and catalog presentation.",
    tag: "B2B Strategies",
    readTime: "7 min read",
    publishedAt: "2026-03-10",
    author: "Growth Team",
    heroImageSrc: "/images/features/bundle-qty-demo.webp",
    heroImageAlt: "Wholesale-focused variant bundle interface",
    sections: [
      {
        heading: "Optimize the Order Flow First",
        paragraphs: [
          "Before investing in paid acquisition, remove ordering friction for repeat buyers and wholesale accounts.",
          "Fast bulk selection and clear quantity validation have immediate impact on conversion and average order value.",
        ],
      },
      {
        heading: "Use Rules to Protect Margin",
        paragraphs: [
          "Min and max quantity limits help you control operational cost while keeping checkout predictable.",
          "Combined with increment controls, these rules reduce fulfillment mistakes and support overhead.",
        ],
        points: [
          "Set product-level min and max values",
          "Add variant-level restrictions where required",
          "Use quantity increments for pack-size ordering",
        ],
      },
      {
        heading: "Measure What Matters",
        paragraphs: [
          "Track checkout completion rate, average order value, and order editing workload after enabling bulk ordering.",
        ],
        imageSrc: "/images/features/apply-restriction-minmax-value.webp",
        imageAlt: "Restriction settings for wholesale ordering",
      },
    ],
  },
  {
    slug: "expanding-shopify-store-globally-with-multi-language-support",
    title: "Expanding Your Shopify Store Globally with Multi-Language Support",
    excerpt:
      "How to prepare your variant-heavy catalog for international buyers without increasing operational complexity.",
    tag: "International Growth",
    readTime: "6 min read",
    publishedAt: "2026-02-25",
    author: "Product Marketing",
    heroImageSrc: "/images/features/any-device.webp",
    heroImageAlt: "Responsive multilingual ordering experience",
    sections: [
      {
        heading: "Localization Beyond Translation",
        paragraphs: [
          "Global growth requires not only translated labels, but also consistent quantity behavior and validation messages per market.",
          "The order flow should feel native on every storefront variation and device type.",
        ],
      },
      {
        heading: "Keep Variant Selection Consistent",
        paragraphs: [
          "Use one layout pattern per region where possible so buyers can build trust quickly during repeated purchases.",
          "Document your quantity and restriction logic to align support and merchandising teams.",
        ],
        points: [
          "Standardize key action labels",
          "Keep error messages concise and localizable",
          "Test mobile checkout in each target language",
        ],
      },
      {
        heading: "Rollout Strategy",
        paragraphs: [
          "Launch in one pilot market first, validate conversion and support metrics, then expand to additional locales.",
        ],
        imageSrc: "/images/features/easy-to-use-and-configure.webp",
        imageAlt: "No-code configuration experience for localization-friendly setup",
      },
    ],
  },
  {
    slug: "how-to-configure-cart-restrictions-without-breaking-checkout",
    title: "How to Configure Cart Restrictions Without Breaking Checkout",
    excerpt:
      "A step-by-step framework for applying quantity and value restrictions while preserving a smooth buyer experience.",
    tag: "Restriction Features",
    readTime: "6 min read",
    publishedAt: "2026-01-30",
    author: "Support Engineering",
    heroImageSrc: "/images/features/cart-estrictions.webp",
    heroImageAlt: "Cart restriction management view",
    sections: [
      {
        heading: "Start with One Restriction Type",
        paragraphs: [
          "Introduce one rule type at a time and validate behavior end-to-end before combining multiple restrictions.",
        ],
      },
      {
        heading: "Use Buyer-Friendly Messaging",
        paragraphs: [
          "Restrictions should explain exactly what buyers need to change to continue checkout.",
          "Avoid generic error text that forces support tickets.",
        ],
        points: [
          "Show minimum required values",
          "Show current selected quantity",
          "Highlight the affected variant or product row",
        ],
      },
      {
        heading: "Validate on Mobile and Desktop",
        paragraphs: [
          "Rule behavior should be identical across breakpoints, especially for sticky add-to-cart actions and summary totals.",
        ],
      },
    ],
  },
  {
    slug: "incremental-quantity-best-practices-for-pack-size-selling",
    title: "Incremental Quantity Best Practices for Pack-Size Selling",
    excerpt:
      "How to use quantity increments to streamline wholesale operations and avoid invalid order combinations.",
    tag: "Quantity Control",
    readTime: "5 min read",
    publishedAt: "2025-12-18",
    author: "Operations Team",
    heroImageSrc: "/images/features/incremental-inc.webp",
    heroImageAlt: "Incremental quantity control interface",
    sections: [
      {
        heading: "When Increments Work Best",
        paragraphs: [
          "Increment controls are ideal when products must be sold in fixed packs or case sizes.",
          "They prevent edge-case orders that create fulfillment delays and manual corrections.",
        ],
      },
      {
        heading: "Configuration Checklist",
        paragraphs: [
          "Set step size, optional min and max range, and test behavior with direct input and plus/minus controls.",
        ],
        points: [
          "Define clear step size",
          "Display allowed quantity range",
          "Surface helpful validation messages",
        ],
      },
      {
        heading: "Operational Benefits",
        paragraphs: [
          "Consistent pack-size ordering improves picking speed, inventory predictability, and buyer confidence.",
        ],
      },
    ],
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];

  return getAllBlogPosts()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => (a.tag === current.tag ? -1 : 1) - (b.tag === current.tag ? -1 : 1))
    .slice(0, limit);
}

