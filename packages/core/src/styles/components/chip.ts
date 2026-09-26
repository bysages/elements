export const chipCss = /* css */ `
/* A counting coin: one small number, round as a seal impression. It sits
   on whatever it counts — icons, tabs, avatars — never wider than it
   must be. */
[data-scope="chip"][data-part="root"] {
  --_pigment: var(--bs-color-surface-inverse);
  /* The deep register of the pigment for the subtle wash — the 600-step
     tone itself fails 4.5:1 on its own wash, so washed fills read from
     the dedicated -800/-300 text ramp. */
  --_ink-strong: var(--bs-color-primary-subtle-text);
  /* The solid body is the inverse pairing at rest — the solemn neutral
     is not a pigment, so night kneading never touches it. */
  --_fill: var(--_pigment);
  --_ink: var(--bs-color-text-inverse);
  display: inline-grid;
  place-items: center;
  min-inline-size: var(--bs-space-5);
  block-size: var(--bs-space-5);
  padding: 0 var(--bs-padding-xs);
  border-radius: var(--bs-radius-full);
  background: var(--_fill);
  color: var(--_ink);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

[data-scope="chip"][data-part="root"][data-tone="primary"] {
  --_pigment: var(--bs-color-primary);
  --_fill: var(--bs-color-primary-fill);
  --_ink: var(--bs-color-primary-text);
  --_ink-strong: var(--bs-color-primary-subtle-text);
}

/* The fixed pigments knead by the theme's measure — a mid-tone body at
   night carries neither deep nor pale text past 4.5:1, so its ink turns
   bright paper. The later variant block re-points the fill and the ink
   for the subtle register. */
[data-scope="chip"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
  --_ink-strong: var(--bs-color-success-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="chip"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
  --_ink-strong: var(--bs-color-warning-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="chip"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
  --_ink-strong: var(--bs-color-danger-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="chip"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
  --_ink-strong: var(--bs-color-info-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}

[data-scope="chip"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 12%, transparent);
  --_ink: var(--_ink-strong);
}
`;
