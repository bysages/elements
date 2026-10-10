export const orderListCss = /* css */ `
/* A ledger the reader rewrites: rows ride one hairline vessel, the
   grip is the drag affordance, and the arrow stack waits at the row's
   trailing edge — visible but quiet until hover gives it full ink. */
[data-scope="order-list"][data-part="list"] {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--bs-padding-xs);
  list-style: none;
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}

[data-scope="order-list"][data-part="item"] {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-xs) var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  cursor: grab;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="order-list"][data-part="item"]:hover {
  background: color-mix(in oklab, var(--bs-color-text-primary) 5%, transparent);
}

[data-scope="order-list"][data-part="item"][data-dragging] {
  opacity: 0.4;
  cursor: grabbing;
}

/* The landing seam: one line of primary ink on the edge the pointer
   chose — above the row it drops before, below the row it drops
   after. The row itself never moves until the drop commits. */
[data-scope="order-list"][data-part="item"][data-drop-line]::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  block-size: 2px;
  border-radius: 1px;
  background: var(--bs-color-primary);
  pointer-events: none;
  z-index: 1;
}

[data-scope="order-list"][data-part="item"][data-drop-line="top"]::after {
  top: -2px;
}

[data-scope="order-list"][data-part="item"][data-drop-line="bottom"]::after {
  bottom: -2px;
}

[data-scope="order-list"][data-part="grip"] {
  color: var(--bs-color-text-quaternary, var(--bs-color-text-tertiary));
  font-size: var(--bs-font-size-xs);
  letter-spacing: -0.1em;
  user-select: none;
}

[data-scope="order-list"][data-part="label"] {
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="order-list"][data-part="controls"] {
  display: flex;
  gap: calc(var(--bs-gap-xs) / 2);
  opacity: 0;
  transition: opacity var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="order-list"][data-part="item"]:hover [data-scope="order-list"][data-part="controls"],
[data-scope="order-list"][data-part="item"]:focus-within [data-scope="order-list"][data-part="controls"] {
  opacity: 1;
}

[data-scope="order-list"][data-part="move"] {
  display: inline-flex;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border-radius: var(--bs-radius-xs, var(--bs-radius-sm));
}

/* Each step rides the shared ghost square: the native button, cursor,
   halo and disabled state are the recipe's; the family keeps only this
   interior register and its hover ink. */
[data-scope="order-list"][data-part="move"] [data-scope="button"][data-part="root"] {
  inline-size: 100%;
  block-size: 100%;
  padding: 0;
  border-radius: inherit;
  color: var(--bs-color-text-tertiary);
}

[data-scope="order-list"][data-part="move"] [data-scope="button"] svg {
  inline-size: 0.75rem;
  block-size: 0.75rem;
}

[data-scope="order-list"][data-part="move"] [data-scope="button"][data-part="root"]:hover:not(:disabled) {
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
}

[data-scope="order-list"][data-part="move"] [data-scope="button"][data-part="root"]:disabled {
  background: transparent;
  color: var(--bs-color-text-tertiary);
  opacity: 0.35;
}

[data-scope="order-list"][data-part="move"] [data-scope="button"][data-part="root"]:focus-visible {
  border-color: transparent;
}
`;
