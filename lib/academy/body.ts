/**
 * Shapes a CMS guide body for the Help Center article template. New eFoli help
 * guides follow one format — walkthrough, intro, "Before you start:", one
 * numbered list of steps, "You're done" — so the template recognises those
 * parts and marks them with classes for styling (globals.css `.academy-doc`):
 *
 * - the "Before you start:" paragraph gets `doc-callout`,
 * - the first <ol> gets `doc-steps` (and its own items are counted for the meta),
 * - the "You're done" heading and what follows it, up to the next <h2>, is
 *   wrapped in `<div class="doc-done">`.
 *
 * Only classes and one wrapper are added — nothing is removed or rewritten, so
 * custom HTML renders as authored. Older guides simply render as prose.
 * Ported from the PushBundle help centre (lib/docs/body.ts).
 */

function withClass(attrs: string, cls: string) {
  return /\bclass="/.test(attrs)
    ? attrs.replace(/\bclass="/, `class="${cls} `)
    : `${attrs} class="${cls}"`;
}

export function enhanceDocBody(html: string): { html: string; steps: number } {
  let steps = 0;

  let out = html.replace(
    /<p(\s[^>]*)?>(\s*(?:<(?:strong|b)>)?\s*Before you start)/i,
    (_, attrs = "", rest) => `<p${withClass(attrs, "doc-callout")}>${rest}`,
  );

  const ol = out.match(/<ol(\s[^>]*)?>/i);
  if (ol?.index !== undefined) {
    // Count only the list's own items, not those of a list nested in a step.
    let depth = 0;
    const tags = /<(\/?)(ol|ul|li)\b/gi;
    tags.lastIndex = ol.index;
    for (let t; (t = tags.exec(out)); ) {
      const [, close, tag] = t;
      if (tag.toLowerCase() === "li") {
        if (!close && depth === 1) steps++;
      } else {
        depth += close ? -1 : 1;
        if (depth === 0) break;
      }
    }
    const open = `<ol${withClass(ol[1] ?? "", "doc-steps")}>`;
    out = out.slice(0, ol.index) + open + out.slice(ol.index + ol[0].length);
  }

  out = out.replace(
    /(<h2\b[^>]*>\s*You(?:'|’|&#39;|&#8217;|&rsquo;)re done[\s\S]*?)(?=<h2\b|$)/i,
    (section) => `<div class="doc-done">${section}</div>`,
  );

  return { html: out, steps };
}
