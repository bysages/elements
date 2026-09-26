export const badgeCss = /* css */ `
/* A small seal of state: flat pigment fill, tracked caps-height ink. The
   tone carries the semantic pigment (--_pigment); ink is the neutral
   default. Subtle and outline re-point the same variables. */
[data-scope="badge"][data-part="root"] {
  --_pigment: var(--bs-color-surface-inverse);
  /* The deep register of the pigment for washed and bare fills — the
     600-step tone itself fails 4.5:1 on paper, so subtle and outline
     read from the dedicated -800/-300 text ramp. */
  --_ink-strong: var(--bs-color-primary-subtle-text);
  /* The solid body is the inverse pairing at rest — the solemn neutral
     is not a pigment, so night kneading never touches it. */
  --_fill: var(--_pigment);
  --_ink: var(--bs-color-text-inverse);
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  padding: 0 var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  background: var(--_fill);
  color: var(--_ink);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  line-height: 1.6;
  white-space: nowrap;
}

[data-scope="badge"][data-part="root"][data-tone="primary"] {
  --_pigment: var(--bs-color-primary);
  --_fill: var(--bs-color-primary-fill);
  --_ink: var(--bs-color-primary-text);
  --_ink-strong: var(--bs-color-primary-subtle-text);
}

/* The fixed pigments knead by the theme's measure — a mid-tone body at
   night carries neither deep nor pale text past 4.5:1, so its ink turns
   bright paper. The later variant blocks re-point the fill and the ink
   for their own registers. */
[data-scope="badge"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
  --_ink-strong: var(--bs-color-success-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="badge"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
  --_ink-strong: var(--bs-color-warning-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="badge"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
  --_ink-strong: var(--bs-color-danger-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}
[data-scope="badge"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
  --_ink-strong: var(--bs-color-info-subtle-text);
  --_fill: color-mix(in oklab, var(--_pigment) calc(100% - var(--bs-ink-knead, 0%)), black);
  --_ink: var(--bs-color-ink-on-fill);
}

/* The subtle register: a wash of the pigment with its deep register on
   top. */
[data-scope="badge"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 14%, transparent);
  --_ink: var(--_ink-strong);
}

[data-scope="badge"][data-part="root"][data-variant="outline"] {
  --_fill: transparent;
  --_ink: var(--_ink-strong);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--_pigment) 45%, transparent);
}

[data-scope="badge"][data-part="root"][data-tone="ink"][data-variant="outline"] {
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
}
`;
