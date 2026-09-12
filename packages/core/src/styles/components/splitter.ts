export const splitterCss = /* css */ `
/* The splitter is a room divided: one hairline carries the divide, and a
   thumb rides it as the handle's ink. Both live on the resize trigger's
   pseudo-elements so the hit area stays generous. */
[data-scope="splitter"][data-part="root"] {
  display: flex;
  inline-size: 100%;
  min-block-size: 20rem;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  overflow: hidden;
}

[data-scope="splitter"][data-part="panel"] {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--bs-padding-md);
  color: var(--bs-color-text-secondary);
}

[data-scope="splitter"][data-part="resize-trigger"] {
  position: relative;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  cursor: col-resize;
}

[data-scope="splitter"][data-part="resize-trigger"][data-orientation="horizontal"] {
  min-inline-size: var(--bs-space-2);
  margin-inline: calc(var(--bs-space-2) / -2);
  cursor: col-resize;
}

[data-scope="splitter"][data-part="resize-trigger"][data-orientation="vertical"] {
  min-block-size: var(--bs-space-2);
  margin-block: calc(var(--bs-space-2) / -2);
  cursor: row-resize;
}

/* The divide itself: a 1px hairline laid beside the thumb. */
[data-scope="splitter"][data-part="resize-trigger"]::before {
  content: "";
  position: absolute;
  background: var(--bs-color-border);
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="splitter"][data-part="resize-trigger"][data-orientation="horizontal"]::before {
  inline-size: 1px;
  block-size: 100%;
  inset-block: 0;
  inset-inline-end: calc(var(--bs-space-2) / 2);
}

[data-scope="splitter"][data-part="resize-trigger"][data-orientation="vertical"]::before {
  inline-size: 100%;
  block-size: 1px;
  inset-block-end: calc(var(--bs-space-2) / 2);
  inset-inline: 0;
}

/* Grabbing the string: the hairline and the thumb both turn primary —
   the divide answers to the hand. */
[data-scope="splitter"][data-part="resize-trigger"]:hover::before,
[data-scope="splitter"][data-part="resize-trigger"][data-dragging]::before {
  background: var(--bs-color-primary);
}

[data-scope="splitter"][data-part="resize-trigger"][data-disabled] {
  cursor: default;
}

[data-scope="splitter"][data-part="resize-trigger"][data-disabled]::before {
  background: var(--bs-color-border);
}

[data-scope="splitter"][data-part="resize-trigger"]:focus-visible {
  outline: none;
}

[data-scope="splitter"][data-part="resize-trigger"]:focus-visible::before {
  background: var(--bs-color-primary);
}

/* The thumb is the visible handle: a small paper seal with its own
   hairline and shadow, focusing as a control. */
[data-scope="splitter"][data-part="resize-trigger-indicator"] {
  position: relative;
  z-index: 1;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-tertiary);
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 200ms var(--bs-ease-out);
}

[data-scope="splitter"][data-part="resize-trigger-indicator"][data-orientation="horizontal"] {
  inline-size: 100%;
  block-size: var(--bs-space-5);
}

[data-scope="splitter"][data-part="resize-trigger-indicator"][data-orientation="vertical"] {
  inline-size: var(--bs-space-5);
  block-size: 100%;
}

[data-scope="splitter"][data-part="resize-trigger"]:hover [data-scope="splitter"][data-part="resize-trigger-indicator"],
[data-scope="splitter"][data-part="resize-trigger"][data-dragging] [data-scope="splitter"][data-part="resize-trigger-indicator"] {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="splitter"][data-part="resize-trigger"]:focus-visible [data-scope="splitter"][data-part="resize-trigger-indicator"] {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="splitter"][data-part="resize-trigger"][data-disabled] [data-scope="splitter"][data-part="resize-trigger-indicator"] {
  visibility: hidden;
}
`;
