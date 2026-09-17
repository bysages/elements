export const ellipsisCss = /* css */ `
/* One line, cut: the overflow knife draws the ellipsis at the box edge.
   The element is a span, stood up as a block — the cut only works on a
   block-level box. */
[data-scope="ellipsis"][data-part="root"] {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* N lines, clamped: the box-line algorithm counts the lines the
   wrapper hands over in --bs-ellipsis-lines. Word wrapping stays on —
   a long word must never force the clamp to cut mid-glyph. */
[data-scope="ellipsis"][data-part="root"][data-multiline] {
  display: -webkit-box;
  overflow-wrap: break-word;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--bs-ellipsis-lines);
}
`;
