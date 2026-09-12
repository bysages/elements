export const highlightCss = /* css */ `
/* Search hits are strokes of pigment on the page, not neon. The highlight
   component renders bare <mark> elements with no anatomy hook, so this is
   the document-wide typographic default — a consumer class can override. */
mark {
  padding: 0 0.125em;
  border-radius: var(--bs-radius-sm);
  background: color-mix(in oklab, var(--bs-color-primary) 16%, transparent);
  color: inherit;
}
`;
