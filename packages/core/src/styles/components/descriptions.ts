export const descriptionsCss = /* css */ `
/* The horizontal ledger: each pair owns two shared tracks - term and
   detail - so the columns line up across every row, the way a table's
   columns do. */
[data-scope="descriptions"][data-part="root"] {
  margin: 0;
  inline-size: 100%;
  display: grid;
  grid-template-columns: repeat(
    var(--bs-desc-columns, 1),
    minmax(6em, max-content) minmax(0, 1fr)
  );
  gap: var(--bs-gap-sm) var(--bs-gap-xl);
  align-content: start;
  font-size: var(--bs-font-size-md);
}

[data-scope="descriptions"][data-part="item"] {
  grid-column: span var(--bs-desc-span, 2);
  display: grid;
  grid-template-columns: subgrid;
  padding-block: var(--bs-padding-sm);
  border-block-end: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="descriptions"][data-part="item"]:last-child {
  border-block-end: none;
}

[data-scope="descriptions"][data-part="term"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="descriptions"][data-part="detail"] {
  margin: 0;
  color: var(--bs-color-text-primary);
}

/* The vertical ledger: each pair stacked, for narrow measures. */
[data-scope="descriptions"][data-layout="vertical"] [data-part="item"] {
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: var(--bs-gap-xs);
}

[data-scope="descriptions"][data-layout="vertical"] [data-part="detail"] {
  color: var(--bs-color-text-secondary);
}

/* The framed ledger: cells close ranks over hairline paper - a 1px
   gutter between them draws the full grid, the term resting on inset
   paper inside its cell. */
[data-scope="descriptions"][data-bordered] {
  gap: 1px;
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-border);
  overflow: hidden;
}

[data-scope="descriptions"][data-bordered] [data-part="item"] {
  gap: 0;
  padding: 0;
  border-block-end: none;
  background: var(--bs-color-surface-1);
}

[data-scope="descriptions"][data-bordered] [data-part="term"] {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  background: var(--bs-color-surface-inset);
  border-inline-end: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="descriptions"][data-bordered] [data-part="detail"] {
  align-self: center;
  padding: var(--bs-padding-sm) var(--bs-padding-md);
}
`;
