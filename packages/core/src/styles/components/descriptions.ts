export const descriptionsCss = /* css */ `
/* The horizontal ledger: term column, detail column, one hairline
   between rows — a table that never becomes one. */
[data-scope="descriptions"][data-part="root"] {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  font-size: var(--bs-font-size-md);
}

[data-scope="descriptions"][data-part="item"] {
  display: grid;
  grid-template-columns: minmax(6em, max-content) 1fr;
  gap: var(--bs-space-4);
  padding-block: var(--bs-space-2);
  border-block-end: 1px solid var(--bs-color-border);
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
[data-scope="descriptions"][data-part="root"][data-layout="vertical"] [data-part="item"] {
  grid-template-columns: 1fr;
  gap: var(--bs-space-1);
}

[data-scope="descriptions"][data-layout="vertical"] [data-part="detail"] {
  color: var(--bs-color-text-secondary);
}
`;
