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
  border: 1px solid var(--bs-color-border);
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
  gap: 2px;
  opacity: 0;
  transition: opacity var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="order-list"][data-part="item"]:hover [data-scope="order-list"][data-part="controls"],
[data-scope="order-list"][data-part="item"]:focus-within [data-scope="order-list"][data-part="controls"] {
  opacity: 1;
}

[data-scope="order-list"][data-part="move"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-xs, var(--bs-radius-sm));
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="order-list"][data-part="move"]:hover:not(:disabled) {
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
}

[data-scope="order-list"][data-part="move"]:disabled {
  opacity: 0.35;
  cursor: default;
}

[data-scope="order-list"][data-part="move"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
