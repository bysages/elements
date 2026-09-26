export const masonryCss = /* css */ `
/* The wall of uneven heights, cut by the browser's multi-column
   layout. Filling runs down each column before crossing to the next —
   the order is column-first; a row-flow wall needs grid masonry, which
   browsers do not ship yet. */
[data-scope="masonry"][data-part="root"] {
  column-count: var(--bs-masonry-columns, 3);
  column-gap: var(--bs-masonry-gap, var(--bs-gap-md));
}

/* Each stone stays whole — never split across two columns — and the
   gap below it holds the next stone of the column at the named
   distance. */
[data-scope="masonry"][data-part="root"] > * {
  break-inside: avoid;
  margin-block-end: var(--bs-masonry-gap, var(--bs-margin-md));
}
`;
