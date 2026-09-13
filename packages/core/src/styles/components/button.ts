export const buttonCss = /* css */ `
/* The full control recipe, parameterized twice: the variant chooses how
   the button rests (filled, outlined, bare, washed) and the tone chooses
   the pigment it carries. Each variant declares its fill/ink defaults,
   semantic tones re-point the pigment, and hover/focus ride the same
   variables. Ink is the solemn default. */
[data-scope="button"][data-part="root"] {
  --_pigment: var(--bs-color-primary);
  /* The deep register of the pigment for the subtle wash — the 600-step
     tone itself fails 4.5:1 on its own wash, so washed fills read from
     the dedicated -800/-300 text ramp. */
  --_ink-strong: var(--bs-color-primary-subtle-text);
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
  /* The fill answers at once; the shadow arrives late — light needs time. */
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
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
  --_ink-strong: var(--bs-color-danger-subtle-text);
}
[data-scope="button"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
  --_ink-strong: var(--bs-color-success-subtle-text);
}
[data-scope="button"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
  --_ink-strong: var(--bs-color-warning-subtle-text);
}
[data-scope="button"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
  --_ink-strong: var(--bs-color-info-subtle-text);
}

/* Solid: the flat pigment fill, no lit edge at rest. On hover the ink
   bleeds — the pigment casts a small shadow of its own color, on a slower
   transition than the fill (light needs time). */
[data-scope="button"][data-part="root"][data-variant="solid"] {
  /* The solid body follows --bs-color-primary-fill: full pigment on
     paper, kneaded toward black at night, and the theme keeps the ink
     on it legible in both registers. */
  --_fill: var(--bs-color-primary-fill);
  --_fill-hover: var(--bs-color-primary-fill-hover);
  --_ink: var(--bs-color-primary-text);
  --_ripple-pigment: color-mix(in oklab, var(--_pigment) 35%, transparent);
  box-shadow: none;
}

/* The fixed pigments knead by the theme's measure — a mid-tone body at
   night carries neither deep nor pale text past 4.5:1, so its ink turns
   bright paper. */
[data-scope="button"][data-part="root"][data-variant="solid"][data-tone="danger"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="button"][data-part="root"][data-variant="solid"][data-tone="success"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="button"][data-part="root"][data-variant="solid"][data-tone="warning"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="button"][data-part="root"][data-variant="solid"][data-tone="info"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}

[data-scope="button"][data-part="root"][data-variant="solid"]:hover:not(:disabled) {
  box-shadow: var(--bs-light-x) calc(1px * var(--bs-light-reach) + var(--bs-light-y))
    calc(3px * var(--bs-light-reach)) 0 color-mix(in oklab, var(--_pigment) 28%, transparent);
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

/* Subtle: a wash of the pigment with its deep register on top. */
[data-scope="button"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 12%, transparent);
  --_fill-hover: color-mix(in oklab, var(--_pigment) 20%, transparent);
  --_ink: var(--_ink-strong);
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
