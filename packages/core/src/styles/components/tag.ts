export const tagCss = /* css */ `
/* A small named seal: one label that carries a pigment, presses in when
   it is checkable, and carries its own removal when closable. The tone
   carries the pigment; solid, outline and subtle re-point the same
   variables, and the pressed state returns them to the solid register. */
[data-scope="tag"][data-part="root"] {
  --_pigment: var(--bs-color-surface-inverse);
  /* The deep register of the pigment for washed and bare fills — the
     600-step tone itself fails 4.5:1 on paper, so subtle and outline
     read from the dedicated -800/-300 text ramp. */
  --_ink-strong: var(--bs-color-primary-subtle-text);
  /* The solid pairing, kept apart from the resting one: the pressed
     state returns here whatever the resting variant was. The solemn
     neutral is not a pigment, so night kneading never touches it. */
  --_fill-solid: var(--_pigment);
  --_ink-solid: var(--bs-color-text-inverse);
  --_fill: var(--_fill-solid);
  --_ink: var(--_ink-solid);
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  box-sizing: border-box;
  padding: 0 var(--bs-padding-sm);
  border: none;
  border-radius: var(--bs-radius-full);
  background: var(--_fill);
  color: var(--_ink);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  line-height: var(--bs-line-height-normal);
  white-space: nowrap;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tag"][data-part="root"][data-tone="primary"] {
  --_pigment: var(--bs-color-primary);
  --_fill-solid: var(--bs-color-primary-fill);
  --_ink-solid: var(--bs-color-primary-text);
  --_ink-strong: var(--bs-color-primary-subtle-text);
}

/* The fixed pigments knead by the theme's measure — a mid-tone body at
   night carries neither deep nor pale text past 4.5:1, so its ink turns
   bright paper. The later variant blocks re-point the fill and the ink
   for their own registers. */
[data-scope="tag"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
  --_ink-strong: var(--bs-color-success-subtle-text);
  --_fill-solid: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink-solid: var(--bs-color-ink-on-fill);
}
[data-scope="tag"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
  --_ink-strong: var(--bs-color-warning-subtle-text);
  --_fill-solid: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink-solid: var(--bs-color-ink-on-fill);
}
[data-scope="tag"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
  --_ink-strong: var(--bs-color-danger-subtle-text);
  --_fill-solid: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink-solid: var(--bs-color-ink-on-fill);
}
[data-scope="tag"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
  --_ink-strong: var(--bs-color-info-subtle-text);
  --_fill-solid: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink-solid: var(--bs-color-ink-on-fill);
}

/* The subtle register: a wash of the pigment with its deep register on
   top. */
[data-scope="tag"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 14%, transparent);
  --_ink: var(--_ink-strong);
}

/* The outline register: bare paper, the pigment drawn as a hairline. */
[data-scope="tag"][data-part="root"][data-variant="outline"] {
  --_fill: transparent;
  --_ink: var(--_ink-strong);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--_pigment) 45%, transparent);
}

[data-scope="tag"][data-part="root"][data-tone="ink"][data-variant="outline"] {
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
}

/* Pressed: the seal sinks into its solid pairing — the state must read
   at arm's length, whatever the resting variant was, so the drawn
   hairline retires with it. */
[data-scope="tag"][data-part="root"][data-checked] {
  --_fill: var(--_fill-solid);
  --_ink: var(--_ink-solid);
  box-shadow: none;
}

/* The checkable seal answers the pointer: the resting registers
   deepen one step, the way the button recipe lights its bodies. */
[data-scope="tag"][data-part="root"][data-checkable] {
  cursor: pointer;
  user-select: none;
}

[data-scope="tag"][data-part="root"][data-checkable][data-variant="solid"]:hover:not(:disabled, [data-disabled]) {
  --_fill: color-mix(in oklab, var(--_fill) 90%, black);
}

[data-scope="tag"][data-part="root"][data-checkable][data-variant="subtle"]:hover:not(:disabled, [data-disabled]) {
  --_fill: color-mix(in oklab, var(--_pigment) 22%, transparent);
}

[data-scope="tag"][data-part="root"][data-checkable][data-variant="outline"]:hover:not(:disabled, [data-disabled]) {
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--_pigment) 65%, transparent);
}

[data-scope="tag"][data-part="root"][data-tone="ink"][data-checkable][data-variant="outline"]:hover:not(:disabled, [data-disabled]) {
  box-shadow: inset 0 0 0 1px var(--bs-color-border-strong);
}

/* The halo is the keyboard's cursor, not an effect to ease in. */
[data-scope="tag"][data-part="root"][data-checkable]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
  transition: none;
}

[data-scope="tag"][data-part="root"]:is(:disabled, [data-disabled]) {
  --_fill: var(--bs-color-surface-inset);
  --_ink: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The removal rides the root's own ink; the square seal is the shared
   ghost recipe at tag scale. Inside the checkable root the seal is a
   bare span — a control cannot nest in a button — so the part rules
   carry its whole face. */
[data-scope="tag"][data-part="close"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  margin-inline-end: calc(-1 * var(--bs-padding-xs));
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-full);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tag"][data-part="close"] svg {
  inline-size: 0.75rem;
  block-size: 0.75rem;
}

[data-scope="tag"][data-part="close"]:hover {
  background: color-mix(in oklab, currentColor 14%, transparent);
}

[data-scope="tag"][data-part="close"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
  transition: none;
}

[data-scope="tag"][data-part="root"]:is(:disabled, [data-disabled]) [data-part="close"] {
  cursor: not-allowed;
}
`;
