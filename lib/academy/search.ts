/**
 * Help Center search — runs in the browser over a small index of guide titles
 * (same rules as the PushBundle help centre). Every word must appear in the
 * title or the topic name; title hits weigh more, and a hit at the start of a
 * word more still. Ties keep the CMS order.
 */

/** Just what search and its result rows need — keeps guide bodies off the client. */
export type HelpIndexEntry = {
  slug: string;
  title: string;
  topicName: string;
  readingMinutes?: number;
};

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N} ]+/gu, " ");

const words = (q: string) => norm(q).split(/\s+/).filter(Boolean);

export function searchDocs<T extends HelpIndexEntry>(docs: T[], query: string): T[] {
  const terms = words(query);
  if (!terms.length) return [];

  const scored: Array<{ doc: T; score: number }> = [];
  for (const doc of docs) {
    const title = norm(doc.title);
    const topic = norm(doc.topicName);
    let score = 0;
    const all = terms.every((t) => {
      const at = title.indexOf(t);
      if (at >= 0) score += at === 0 || title.includes(` ${t}`) ? 3 : 2;
      else if (topic.includes(t)) score += 1;
      else return false;
      return true;
    });
    if (all) scored.push({ doc, score });
  }
  // Array.sort is stable, so equal scores keep the CMS order.
  return scored.sort((a, b) => b.score - a.score).map((s) => s.doc);
}

/** Splits `text` into plain and matched segments, for rendering highlights. */
export function highlight(text: string, query: string) {
  const terms = words(query)
    .filter((t) => t.length > 1)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return [{ text, hit: false }];
  // Splitting on a capture group puts the matches at the odd indexes.
  return text
    .split(new RegExp(`(${terms.join("|")})`, "iu"))
    .map((part, i) => ({ text: part, hit: i % 2 === 1 }))
    .filter((s) => s.text);
}
