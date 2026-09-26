import { labelCss } from "./shared";

export const numberInputCss =
  labelCss("number-input") +
  /* css */ `
[data-scope="number-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The field and its stepper column: the input reserves the inline end so the
   triggers read as part of the same seal, not a button bolted on. */
[data-scope="number-input"][data-part="control"] {
  position: relative;
  display: flex;
}

[data-scope="number-input"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-md)
    calc(var(--bs-space-6) + var(--bs-space-1));
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-variant-numeric: tabular-nums;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

/* With the scrubber riding the inline start, the value yields its width:
   :has keeps the pairing structural so no wrapper class is needed. */
[data-scope="number-input"][data-part="control"]:has([data-part="scrubber"])
  [data-part="input"] {
  padding-inline-start: calc(var(--bs-space-6) + var(--bs-space-1));
}

[data-scope="number-input"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="number-input"][data-part="input"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="number-input"][data-part="input"]:focus,
[data-scope="number-input"][data-part="input"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="number-input"][data-part="input"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="number-input"][data-part="input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The stepper: two halves of one column, split by a hairline. Hover is
   light on the paper; focus rides the inset ring so it never spills past
   the field edge. */
[data-scope="number-input"][data-part="increment-trigger"],
[data-scope="number-input"][data-part="decrement-trigger"] {
  position: absolute;
  inset-inline-end: 1px;
  display: grid;
  place-items: center;
  inline-size: var(--bs-space-6);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="number-input"][data-part="increment-trigger"] {
  inset-block-start: 1px;
  inset-block-end: 50%;
  border-start-end-radius: var(--bs-radius-sm);
  border-bottom: 1px solid var(--bs-color-border);
}

[data-scope="number-input"][data-part="decrement-trigger"] {
  inset-block-start: 50%;
  inset-block-end: 1px;
  border-end-end-radius: var(--bs-radius-sm);
}

[data-scope="number-input"][data-part="increment-trigger"]:hover:not([data-disabled]),
[data-scope="number-input"][data-part="decrement-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="number-input"][data-part="increment-trigger"]:focus-visible,
[data-scope="number-input"][data-part="decrement-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="number-input"][data-part="increment-trigger"]:active:not([data-disabled]),
[data-scope="number-input"][data-part="decrement-trigger"]:active:not([data-disabled]) {
  background: var(--bs-color-surface-inset);
}

[data-scope="number-input"][data-part="increment-trigger"][data-disabled],
[data-scope="number-input"][data-part="decrement-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The scrubber: a quiet grip on the inline start — the field becomes a
   dial you drag, so the cursor says so. */
[data-scope="number-input"][data-part="scrubber"] {
  position: absolute;
  inset-block: 1px;
  inset-inline-start: 1px;
  display: grid;
  place-items: center;
  inline-size: var(--bs-space-6);
  color: var(--bs-color-text-tertiary);
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
}

[data-scope="number-input"][data-part="scrubber"]:hover {
  color: var(--bs-color-text-primary);
}

[data-scope="number-input"][data-part="scrubber"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="number-input"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-variant-numeric: tabular-nums;
}
`;
