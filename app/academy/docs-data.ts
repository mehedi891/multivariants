export type AcademySection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type AcademyDoc = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  lastUpdated: string;
  sections: AcademySection[];
};

export type AcademyCategory = {
  slug: string;
  title: string;
  description: string;
  docs: AcademyDoc[];
};

export const academyCategories: AcademyCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Set up MultiVariants and launch your first bulk-order flow.",
    docs: [
      {
        slug: "install-and-connect",
        title: "Install and Connect MultiVariants",
        excerpt:
          "Step-by-step setup guide for installing the app and verifying the first working product page.",
        readTime: "4 min read",
        lastUpdated: "March 28, 2026",
        sections: [
          {
            heading: "Before You Install",
            paragraphs: [
              "Confirm your store has at least one product with multiple variants so you can validate the UI immediately after install.",
              "If your storefront is heavily customized, create a staging theme and test there first to avoid disrupting live traffic.",
            ],
          },
          {
            heading: "Installation Flow",
            paragraphs: [
              "Install MultiVariants from the Shopify App Store and approve required permissions.",
              "Open the app dashboard and run the onboarding wizard to connect your active theme.",
            ],
            points: [
              "Open Shopify Admin and navigate to Apps",
              "Install MultiVariants and approve permissions",
              "Run onboarding and select the target theme",
              "Save and publish settings",
            ],
          },
          {
            heading: "Verification Checklist",
            paragraphs: [
              "Open a variant-heavy product page and confirm the quantity grid appears.",
              "Add quantities to multiple variants and ensure one-click add-to-cart updates the cart correctly.",
            ],
          },
        ],
      },
      {
        slug: "first-bulk-order-table",
        title: "Create Your First Bulk Order Table",
        excerpt:
          "Learn the fastest way to render a clean variant table for B2B and wholesale buyers.",
        readTime: "5 min read",
        lastUpdated: "March 14, 2026",
        sections: [
          {
            heading: "Choose the Product Scope",
            paragraphs: [
              "Start with one collection or one product type to keep the rollout controlled.",
              "Use the app filters to enable the table only where buyers benefit from multi-variant ordering.",
            ],
          },
          {
            heading: "Configure Table Basics",
            paragraphs: [
              "Set row and column mapping so attributes like size and color are easy to scan.",
              "Enable inventory-aware inputs so unavailable combinations cannot be submitted.",
            ],
            points: [
              "Rows: primary option like size",
              "Columns: secondary option like color",
              "Input mode: quantity fields with plus/minus controls",
              "CTA: one global add-to-cart action",
            ],
          },
          {
            heading: "Run a Buyer Test",
            paragraphs: [
              "Ask a team member to place a mock wholesale order from a mobile and desktop device.",
              "Track time-to-complete and compare against your old single-variant order flow.",
            ],
          },
        ],
      },
      {
        slug: "launch-checklist",
        title: "Go-Live Checklist for MultiVariants",
        excerpt:
          "Final checks before launching to production, including UX, restriction logic, and support readiness.",
        readTime: "6 min read",
        lastUpdated: "February 27, 2026",
        sections: [
          {
            heading: "Storefront Checks",
            paragraphs: [
              "Validate the variant table across your top-selling product templates.",
              "Confirm sticky action buttons and totals remain visible on smaller screens.",
            ],
          },
          {
            heading: "Rule and Validation Checks",
            paragraphs: [
              "Review all min, max, and increment rules to avoid contradictory constraints.",
              "Make sure buyer-facing validation copy is clear and actionable.",
            ],
          },
          {
            heading: "Support Readiness",
            paragraphs: [
              "Prepare an internal troubleshooting note with screenshots and escalation paths.",
              "Set a post-launch monitoring window to review conversion and cart-abandonment changes.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "rules-and-quantities",
    title: "Rules and Quantities",
    description: "Configure quantity logic, restrictions, and advanced ordering controls.",
    docs: [
      {
        slug: "set-min-max-rules",
        title: "Set Min and Max Rules",
        excerpt:
          "Apply product-level and variant-level constraints without breaking checkout flow.",
        readTime: "5 min read",
        lastUpdated: "March 28, 2026",
        sections: [
          {
            heading: "Rule Types",
            paragraphs: [
              "Use product-level rules to enforce total order thresholds.",
              "Use variant-level rules to force minimums on strategic SKUs or colors.",
            ],
            points: [
              "Minimum quantity per product",
              "Maximum quantity per product",
              "Minimum quantity per variant",
              "Maximum quantity per variant",
            ],
          },
          {
            heading: "Priority and Conflicts",
            paragraphs: [
              "If multiple rules apply, keep priorities documented so support teams can explain behavior quickly.",
              "Avoid setting a variant minimum that exceeds the product maximum.",
            ],
          },
          {
            heading: "Buyer Messaging",
            paragraphs: [
              "Show validation messages next to affected inputs whenever possible.",
              "Use plain language that tells buyers exactly how to fix the order.",
            ],
          },
        ],
      },
      {
        slug: "quantity-increments",
        title: "Enable Quantity Increments",
        excerpt:
          "Force order quantities in fixed steps such as 6, 12, or 24 for pack-size operations.",
        readTime: "4 min read",
        lastUpdated: "March 05, 2026",
        sections: [
          {
            heading: "When to Use Increments",
            paragraphs: [
              "Use increments for warehouse packs, carton sizing, or factory minimums.",
              "This is especially useful for wholesale catalogs where odd quantities are operationally expensive.",
            ],
          },
          {
            heading: "Setup",
            paragraphs: [
              "Choose the step value and optional min and max boundaries.",
              "Test with manual input and plus/minus controls to verify both paths enforce the same rule.",
            ],
            points: [
              "Step value example: 12",
              "Allowed sequence example: 12, 24, 36, 48",
              "Optional minimum and maximum caps",
            ],
          },
          {
            heading: "Edge Cases",
            paragraphs: [
              "Check behavior when inventory drops below the next increment.",
              "Define fallback messaging so buyers understand why they cannot proceed.",
            ],
          },
        ],
      },
      {
        slug: "mix-and-match-bundles",
        title: "Configure Mix and Match Bundles",
        excerpt:
          "Let buyers build a valid bundle by selecting multiple variants under one set of rules.",
        readTime: "6 min read",
        lastUpdated: "April 01, 2026",
        sections: [
          {
            heading: "Bundle Strategy",
            paragraphs: [
              "Define bundle minimum and maximum values based on margin and shipping constraints.",
              "Map variants clearly so buyers can complete bundles without leaving the page.",
            ],
          },
          {
            heading: "Constraint Model",
            paragraphs: [
              "Use total item constraints for the bundle and optional requirements for key variants.",
              "Example: total minimum 6 items with at least 2 units from a featured variant group.",
            ],
          },
          {
            heading: "Conversion Optimization",
            paragraphs: [
              "Display progress indicators so buyers see how close they are to a valid bundle.",
              "Place the add-to-cart action and validation state in a sticky footer on mobile.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "display-and-theme",
    title: "Display and Theme",
    description: "Control how variants appear and behave across templates and devices.",
    docs: [
      {
        slug: "choose-layout-mode",
        title: "Choose the Best Variant Layout",
        excerpt:
          "Pick between table, list, or grouped layouts based on catalog complexity and buyer behavior.",
        readTime: "4 min read",
        lastUpdated: "October 06, 2025",
        sections: [
          {
            heading: "Layout Options",
            paragraphs: [
              "Table layout works best when buyers compare many combinations quickly.",
              "List layout can be better when products have fewer variants or custom descriptions.",
            ],
          },
          {
            heading: "Selection Criteria",
            paragraphs: [
              "Use table layout for wholesale and B2B workflows.",
              "Use grouped layout when attributes need guided selection order.",
            ],
            points: [
              "High variant count: table",
              "Low variant count: list",
              "Guided configuration: grouped",
            ],
          },
          {
            heading: "Testing",
            paragraphs: [
              "A/B test layout mode on top products and compare completion rate and average order value.",
            ],
          },
        ],
      },
      {
        slug: "customize-labels-and-badges",
        title: "Customize Labels, States, and Badges",
        excerpt:
          "Align labels and state colors with your brand while keeping quantity actions clear.",
        readTime: "5 min read",
        lastUpdated: "January 19, 2026",
        sections: [
          {
            heading: "UI Labels",
            paragraphs: [
              "Rename action labels to match your store language and buyer segment.",
              "Use short labels that fit on mobile without truncation.",
            ],
          },
          {
            heading: "State Styling",
            paragraphs: [
              "Ensure available, low-stock, and unavailable states are visually distinct.",
              "Keep contrast high enough for accessibility and fast scanning.",
            ],
          },
          {
            heading: "Consistency Rules",
            paragraphs: [
              "Apply the same state vocabulary across product cards, table inputs, and cart summary.",
            ],
            points: [
              "In stock",
              "Low stock",
              "Out of stock",
              "Rule conflict",
            ],
          },
        ],
      },
      {
        slug: "mobile-docs-ux",
        title: "Mobile Optimization for Bulk Ordering",
        excerpt:
          "Improve touch interactions and sticky actions so bulk ordering remains usable on mobile.",
        readTime: "5 min read",
        lastUpdated: "February 14, 2026",
        sections: [
          {
            heading: "Touch Targets",
            paragraphs: [
              "Increase input controls and button hit areas for faster quantity updates.",
              "Avoid tightly packed controls that cause accidental taps.",
            ],
          },
          {
            heading: "Sticky Actions",
            paragraphs: [
              "Pin totals and primary add-to-cart actions near the viewport bottom.",
              "Keep validation messages visible without requiring full-page scrolling.",
            ],
          },
          {
            heading: "Performance",
            paragraphs: [
              "Reduce unnecessary visual effects on low-end devices to keep interactions responsive.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "integrations-and-support",
    title: "Integrations and Support",
    description: "Compatibility guidance, app coexistence, and escalation workflows.",
    docs: [
      {
        slug: "theme-and-builder-compatibility",
        title: "Theme and Page Builder Compatibility",
        excerpt:
          "Deploy MultiVariants safely with Shopify themes and page builders like GemPages and PageFly.",
        readTime: "5 min read",
        lastUpdated: "May 31, 2025",
        sections: [
          {
            heading: "Supported Surfaces",
            paragraphs: [
              "MultiVariants is designed to work across modern Shopify themes and common page builders.",
              "Always test the product template after theme updates or app block changes.",
            ],
          },
          {
            heading: "Recommended Rollout",
            paragraphs: [
              "Enable on a duplicate theme first and compare visual spacing and variant state rendering.",
              "Publish only after verifying checkout flow and analytics events.",
            ],
          },
          {
            heading: "Known Risk Areas",
            paragraphs: [
              "Conflicts usually come from highly customized product templates or aggressive script injections.",
            ],
            points: [
              "Custom liquid loops",
              "Duplicate quantity handlers",
              "Third-party cart scripts",
            ],
          },
        ],
      },
      {
        slug: "working-with-other-apps",
        title: "Use MultiVariants with Other Shopify Apps",
        excerpt:
          "Best practices for combining MultiVariants with discount, checkout, and upsell tools.",
        readTime: "6 min read",
        lastUpdated: "December 10, 2025",
        sections: [
          {
            heading: "Integration Model",
            paragraphs: [
              "Treat MultiVariants as the ordering layer and keep discounts or upsells downstream when possible.",
              "Validate event order so cart and checkout apps receive clean quantity payloads.",
            ],
          },
          {
            heading: "Conflict Prevention",
            paragraphs: [
              "Disable duplicate input scripts from overlapping apps on the same template.",
              "When debugging, isolate one app at a time and test from a clean browser session.",
            ],
          },
          {
            heading: "Monitoring",
            paragraphs: [
              "Track checkout completion and cart update errors after adding a new app integration.",
            ],
          },
        ],
      },
      {
        slug: "support-escalation",
        title: "Support and Escalation Playbook",
        excerpt:
          "What to include when contacting support for faster diagnosis and resolution.",
        readTime: "3 min read",
        lastUpdated: "July 09, 2025",
        sections: [
          {
            heading: "Required Details",
            paragraphs: [
              "Include affected product URLs, theme name, screenshots, and exact reproduction steps.",
              "If possible, share whether the issue appears on both desktop and mobile.",
            ],
            points: [
              "Store URL",
              "Theme and template name",
              "Affected variants and expected behavior",
              "Browser and device",
            ],
          },
          {
            heading: "Response Expectations",
            paragraphs: [
              "Most setup and rule issues can be triaged quickly when reproduction details are complete.",
              "Complex integration issues may require coordinated testing windows with your team.",
            ],
          },
          {
            heading: "Escalation Criteria",
            paragraphs: [
              "Escalate immediately when checkout is blocked, prices are incorrect, or restrictions fail silently.",
            ],
          },
        ],
      },
    ],
  },
];

export function getAcademyCategories() {
  return academyCategories;
}

export function getAcademyDocBySlug(docSlug: string) {
  for (const category of academyCategories) {
    const doc = category.docs.find((item) => item.slug === docSlug);
    if (doc) return { category, doc };
  }
  return null;
}

export function getAllAcademyDocs() {
  return academyCategories.flatMap((category) =>
    category.docs.map((doc) => ({
      categorySlug: category.slug,
      categoryTitle: category.title,
      ...doc,
    }))
  );
}
