export const buttonCss = /* css */ `
/* The full control recipe, parameterized twice: the variant chooses how
   the button rests (filled, outlined, bare, washed) and the tone chooses
   the pigment it carries. Each variant declares its fill/ink defaults,
   semantic tones re-point the pigment, and hover/focus ride the same
   variables. Ink is the solemn default. */
[data-scope="button"][data-part="root"] {
  --_pigment: var(--bs-color-primary);
  --_fill: transparent;
  --_fill-hover: transparent;
  --_ink: var(--bs-color-text-secondary);
  --_edge: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-space-2);
  flex: none;
  block-size: var(--bs-control-height-md);
  /* One step wider than the shell register: buttons read by their
     silhouette, and 12px on a 32px body pinches the label (mainstream
     systems use 15-16px at this height, 24px at large). */
  padding: 0 var(--bs-padding-lg);
  border: 1px solid var(--_edge);
  border-radius: var(--bs-radius-sm);
  background: var(--_fill);
  color: var(--_ink);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="button"][data-part="root"][data-size="sm"] {
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  font-size: var(--bs-font-size-sm);
}

[data-scope="button"][data-part="root"][data-size="lg"] {
  block-size: var(--bs-control-height-lg);
  padding: 0 var(--bs-padding-xl);
}

[data-scope="button"][data-part="root"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

[data-scope="button"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
}
[data-scope="button"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="button"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="button"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
}

/* Solid: the flat pigment fill, no lit edge, no inner shadow. */
[data-scope="button"][data-part="root"][data-variant="solid"] {
  --_fill: var(--_pigment);
  --_fill-hover: color-mix(in oklab, var(--_pigment) 85%, black);
  --_ink: var(--bs-color-primary-text);
  box-shadow: none;
}

/* Outline: paper on a hairline, the hairline deepening on hover. */
[data-scope="button"][data-part="root"][data-variant="outline"] {
  --_fill: var(--bs-color-surface-2);
  --_ink: var(--bs-color-text-primary);
  --_edge: var(--bs-color-border);
}

/* Ghost: bare ink that borrows the subtle surface under the cursor. */
[data-scope="button"][data-part="root"][data-variant="ghost"] {
  --_fill-hover: var(--bs-color-surface-0);
  box-shadow: none;
}

/* Subtle: a wash of the pigment with the full ink on top. */
[data-scope="button"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 12%, transparent);
  --_fill-hover: color-mix(in oklab, var(--_pigment) 20%, transparent);
  --_ink: var(--_pigment);
  box-shadow: none;
}

[data-scope="button"][data-part="root"][data-variant="outline"]:hover:not(:disabled),
[data-scope="button"][data-part="root"][data-variant="outline"]:focus-visible {
  --_edge: var(--bs-color-border-strong);
}

[data-scope="button"][data-part="root"]:hover:not(:disabled) {
  background: var(--_fill-hover);
}

[data-scope="button"][data-part="root"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="button"][data-part="root"]:active:not(:disabled) {
  box-shadow: none;
}

[data-scope="button"][data-part="root"]:disabled {
  --_fill: var(--bs-color-surface-inset);
  --_fill-hover: var(--bs-color-surface-inset);
  --_ink: var(--bs-color-text-disabled);
  --_edge: transparent;
  cursor: not-allowed;
  box-shadow: none;
}
`;
