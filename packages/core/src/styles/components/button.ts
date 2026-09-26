export const buttonCss = /* css */ `
/* The full control recipe, parameterized twice: the variant chooses how
   the button rests (filled, outlined, bare, washed) and the tone chooses
   the pigment it carries. Each variant declares its fill/ink defaults,
   semantic tones re-point the pigment, and hover/focus ride the same
   variables. Ink is the solemn default. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant]) {
  --_pigment: var(--bs-color-primary);
  /* The deep register of the pigment for the subtle wash — the 600-step
     tone itself fails 4.5:1 on its own wash, so washed fills read from
     the dedicated -800/-300 text ramp. */
  --_ink-strong: var(--bs-color-primary-subtle-text);
  --_fill: transparent;
  --_fill-hover: transparent;
  --_ink: var(--bs-color-text-secondary);
  --_edge: transparent;
}

/* The recipe's own body: the layout and states of the button proper. */
[data-scope="button"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-sm);
  flex: none;
  block-size: var(--bs-control-height-md);
  /* One step wider than the shell register: buttons read by their
     silhouette, and 12px on a 32px body pinches the label (mainstream
     systems use 15-16px at this height, 24px at large). */
  padding: 0 var(--bs-padding-lg);
  border: 1px solid var(--_edge);
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: var(--_fill);
  color: var(--_ink);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  /* as-child hands the part an <a>; the underline is the prose's, not ours. */
  text-decoration: none;
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

/* Icon-only: the silhouette is the seal — width equals height. */
[data-scope="button"][data-part="root"][data-square="true"],
[data-scope="button"][data-part="root"][data-size="sm"][data-square="true"] {
  inline-size: var(--bs-control-height-sm);
  padding-inline: 0;
}

[data-scope="button"][data-part="root"][data-size="md"][data-square="true"] {
  inline-size: var(--bs-control-height-md);
}

[data-scope="button"][data-part="root"][data-size="lg"][data-square="true"] {
  inline-size: var(--bs-control-height-lg);
}

[data-scope="button"][data-part="root"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
  --_ink-strong: var(--bs-color-danger-subtle-text);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-tone="success"] {
  --_pigment: var(--bs-color-success);
  --_ink-strong: var(--bs-color-success-subtle-text);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
  --_ink-strong: var(--bs-color-warning-subtle-text);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-tone="info"] {
  --_pigment: var(--bs-color-info);
  --_ink-strong: var(--bs-color-info-subtle-text);
}

/* Solid: the flat pigment fill, no lit edge at rest. On hover the ink
   bleeds — the pigment casts a small shadow of its own color, on a slower
   transition than the fill (light needs time). */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"] {
  /* The solid body follows --bs-color-primary-fill: full pigment on
     paper, kneaded toward black at night, and the theme keeps the ink
     on it legible in both registers. */
  --_fill: var(--bs-color-primary-fill);
  --_fill-hover: var(--bs-color-primary-fill-hover);
  --_ink: var(--bs-color-primary-text);
  /* On a filled body the wash must read against the fill, not sink into
     it — the ink that blooms on a fill is the fill's own ink (opaque; the
     wash's concentration lives in --bs-ripple-opacity alone). */
  --bs-ripple-pigment: var(--_ink);
  box-shadow: none;
}

/* The fixed pigments knead by the theme's measure — a mid-tone body at
   night carries neither deep nor pale text past 4.5:1, so its ink turns
   bright paper. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"][data-tone="danger"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"][data-tone="success"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"][data-tone="warning"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"][data-tone="info"] {
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_fill-hover: color-mix(in oklab, var(--_pigment) calc(85% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}

:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="solid"]:hover:not(:disabled) {
  box-shadow: var(--bs-light-x) calc(1px * var(--bs-light-reach) + var(--bs-light-y))
    calc(3px * var(--bs-light-reach)) 0 color-mix(in oklab, var(--_pigment) 28%, transparent);
}

/* Outline: paper on a hairline, the hairline deepening on hover. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="outline"] {
  --_fill: var(--bs-color-surface-2);
  --_ink: var(--bs-color-text-primary);
  --_edge: var(--bs-color-border);
}

/* Ghost: bare ink that borrows the subtle surface under the cursor. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="ghost"] {
  --_fill-hover: var(--bs-color-surface-0);
  box-shadow: none;
}

/* Subtle: a wash of the pigment with its deep register on top. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 12%, transparent);
  --_fill-hover: color-mix(in oklab, var(--_pigment) 20%, transparent);
  --_ink: var(--_ink-strong);
  box-shadow: none;
}

:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="outline"]:hover:not(:disabled),
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant="outline"]:focus-visible {
  --_edge: var(--bs-color-border-strong);
}

[data-scope="button"][data-part="root"]:hover:not(:disabled) {
  background: var(--_fill-hover);
}

/* The state branches ride the same :is() skeleton as the variants — a
   variant's rest shadow (0,4,0) would otherwise out-specify a bare
   :focus-visible (0,3,0) and silence the ring on filled buttons. The
   halo arrives at once: it is the keyboard's cursor, not an effect to
   ease in. */
:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
  transition: none;
}

:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant]:active:not(:disabled) {
  box-shadow: none;
}

:is([data-scope="button"][data-part="root"], [data-scope][data-part="trigger"][data-variant])[data-variant]:disabled {
  --_fill: var(--bs-color-surface-inset);
  --_fill-hover: var(--bs-color-surface-inset);
  --_ink: var(--bs-color-text-disabled);
  --_edge: transparent;
  cursor: not-allowed;
  box-shadow: none;
}

/* As-child hosting: an overlay trigger that hosts a Button overwrites
   the button's anatomy (data-scope reads the overlay family, not
   "button"), so the body rules never match. The variant, tone and size
   seals survive, though — and the variable rules above match them
   through the bare [data-scope], so this layout block only has to ride
   the same variables. The bare [data-scope] keeps specificity above any
   family's base, and the state branches above its open/focus/disabled
   rules. */
[data-scope][data-part="trigger"][data-variant] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-sm);
  flex: none;
  block-size: var(--bs-control-height-md);
  /* One step wider than the shell register, like the body above. */
  padding: 0 var(--bs-padding-lg);
  border: 1px solid var(--_edge);
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: var(--_fill);
  color: var(--_ink);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope][data-part="trigger"][data-variant][data-size="sm"] {
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  font-size: var(--bs-font-size-sm);
}

[data-scope][data-part="trigger"][data-variant][data-size="lg"] {
  block-size: var(--bs-control-height-lg);
  padding: 0 var(--bs-padding-xl);
}

/* Icon-only: the silhouette is the seal — width equals height. */
[data-scope][data-part="trigger"][data-variant][data-square="true"] {
  inline-size: var(--bs-control-height-sm);
  padding-inline: 0;
}

[data-scope][data-part="trigger"][data-variant][data-size="md"][data-square="true"] {
  inline-size: var(--bs-control-height-md);
}

[data-scope][data-part="trigger"][data-variant][data-size="lg"][data-square="true"] {
  inline-size: var(--bs-control-height-lg);
}

[data-scope][data-part="trigger"][data-variant]:hover:not(:disabled) {
  background: var(--_fill-hover);
}

/* Open keeps the focus look: Zag hands focus to the overlay itself, so
   :focus-visible alone would drop the halo the moment it opens. */
[data-scope][data-part="trigger"][data-variant]:focus-visible,
[data-scope][data-part="trigger"][data-variant][data-state="open"] {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope][data-part="trigger"][data-variant]:active:not(:disabled) {
  box-shadow: none;
}

[data-scope][data-part="trigger"][data-variant]:disabled,
[data-scope][data-part="trigger"][data-variant][data-disabled] {
  --_fill: var(--bs-color-surface-inset);
  --_fill-hover: var(--bs-color-surface-inset);
  --_ink: var(--bs-color-text-disabled);
  --_edge: transparent;
  cursor: not-allowed;
  box-shadow: none;
}
`;
