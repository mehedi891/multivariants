/**
 * Structured data as a plain <script> text child — no raw-HTML injection.
 * React 19 renders a <script>'s string child as-is; escaping `<` keeps any
 * "</script>" inside the data from closing the tag early.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data).replace(/</g, "\\u003c")}
    </script>
  );
}
