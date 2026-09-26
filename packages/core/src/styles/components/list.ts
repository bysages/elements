export const listCss = /* css */ `
/* A ledger of rows: Leading carries the mark, Content the title and
   its quiet echo, Actions the way out. The hairline between rows is
   the bordered variant's; the hover wash belongs to the interactive
   registers — a row that reads as clickable must answer the pointer. */
[data-scope="list"][data-part="root"] {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
}

[data-scope="list"][data-part="item"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

/* The bordered variant draws one hairline between rows — never before
   the first, so the ledger starts clean. */
[data-scope="list"][data-part="root"][data-bordered]
  [data-scope="list"][data-part="item"]
  + [data-scope="list"][data-part="item"] {
  border-block-start: 1px solid var(--bs-color-border);
}

/* A row the caller made clickable (role="button") owns the pointer and
   the hover wash; focus rides the inset halo, since the row is the
   full bleed of its container. */
[data-scope="list"][data-part="item"][role="button"] {
  cursor: pointer;
}

[data-scope="list"][data-part="root"][data-hoverable] [data-scope="list"][data-part="item"]:hover,
[data-scope="list"][data-part="item"][role="button"]:hover {
  background: var(--bs-color-surface-0);
}

[data-scope="list"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="list"][data-part="leading"] {
  display: flex;
  flex: none;
  align-items: center;
}

[data-scope="list"][data-part="content"] {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  min-inline-size: 0;
}

[data-scope="list"][data-part="title"] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="list"][data-part="description"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="list"][data-part="actions"] {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--bs-gap-sm);
  margin-inline-start: auto;
}
`;
