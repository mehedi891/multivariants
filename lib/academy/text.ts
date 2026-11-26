/** Fills `{name}` placeholders in a copy template. Safe to use in client components. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Picks the singular or plural template for `n` and fills `{n}`. */
export function plural(n: number, one: string, other: string) {
  return fill(n === 1 ? one : other, { n });
}
