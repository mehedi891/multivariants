/**
 * Shared helpers for rendering CMS-authored HTML (blog posts, client stories).
 *
 * The CMS returns raw HTML from the editor, much of it migrated from WordPress.
 * These helpers normalise it for display: extract readable text, wrap tables so
 * they can scroll, and build the table of contents from the real headings.
 */

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// Decode HTML entities so extracted text (TOC, meta description, summaries)
// reads as real characters instead of raw "&#8217;" etc.
export function decodeHtmlEntities(value: string) {
  return value
    .replaceAll(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replaceAll(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replaceAll(/&nbsp;/g, " ")
    .replaceAll(/&rsquo;/g, "’")
    .replaceAll(/&lsquo;/g, "‘")
    .replaceAll(/&rdquo;/g, "”")
    .replaceAll(/&ldquo;/g, "“")
    .replaceAll(/&hellip;/g, "…")
    .replaceAll(/&mdash;/g, "—")
    .replaceAll(/&ndash;/g, "–")
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/&apos;/g, "'")
    .replaceAll(/&lt;/g, "<")
    .replaceAll(/&gt;/g, ">")
    .replaceAll(/&amp;/g, "&");
}

export function stripHtml(value: string) {
  return decodeHtmlEntities(value.replaceAll(/<[^>]*>/g, ""));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

// WordPress-imported content often bakes its own "Table of Contents" (a heading
// plus a list of anchor links) into the body. That duplicates the generated
// sidebar TOC, so strip it here — the sidebar TOC is regenerated from the real
// section headings below. If the content has no inline TOC, this is a no-op.
function stripInlineToc(html: string): string {
  return html.replace(
    /<(h[1-4])\b[^>]*>([\s\S]*?)<\/\1>\s*(?:<(ul|ol)\b[^>]*>[\s\S]*?<\/\3>)?/gi,
    (match, _tag, inner) => {
      const text = stripHtml(inner).replaceAll(/\s+/g, " ").trim().toLowerCase();
      return text === "table of contents" || text === "contents" ? "" : match;
    }
  );
}

/**
 * Give every h2/h3 a stable id and collect them into a table of contents.
 * Tables are wrapped so wide ones scroll instead of blowing out the layout.
 */
export function buildContentWithToc(contentHtml: string): {
  contentWithAnchors: string;
  tocItems: TocItem[];
} {
  const usedIds = new Map<string, number>();
  const tocItems: TocItem[] = [];
  const contentWithTableWrap = stripInlineToc(contentHtml).replaceAll(
    /<table\b[\s\S]*?<\/table>/gi,
    (tableHtml) => `<div class="post-table-wrap">${tableHtml}</div>`
  );

  const contentWithAnchors = contentWithTableWrap.replaceAll(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const text = stripHtml(inner).replaceAll(/\s+/g, " ").trim();
      if (!text) return match;

      const existingIdMatch = attrs.match(/\sid=["']([^"']+)["']/i);
      const baseId = existingIdMatch?.[1] ?? (slugify(text) || "section");
      const seen = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, seen + 1);
      const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

      tocItems.push({ id, text, level });

      const nextAttrs = existingIdMatch
        ? attrs.replace(existingIdMatch[0], ` id="${id}"`)
        : `${attrs} id="${id}"`;

      return `<${tag}${nextAttrs}>${inner}</${tag}>`;
    }
  );

  return { contentWithAnchors, tocItems };
}
