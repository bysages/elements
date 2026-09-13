export const badgeCss = /* css */ `
/* A small seal of state: flat pigment fill, tracked caps-height ink. The
   tone carries the semantic pigment (--_pigment); ink is the neutral
   default. Subtle and outline re-point the same variables. */
[data-scope="badge"][data-part="root"] {
  --_pigment: var(--bs-color-surface-inverse);
  --_fill: var(--_pigment);
  --_ink: var(--bs-color-text-inverse);
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-1);
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

[data-scope="badge"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="badge"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="badge"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
}
[data-scope="badge"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
}

/* The subtle register: a wash of the pigment with the full ink on top. */
[data-scope="badge"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 14%, transparent);
  --_ink: var(--_pigment);
}

[data-scope="badge"][data-part="root"][data-variant="outline"] {
  --_fill: transparent;
  --_ink: var(--_pigment);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--_pigment) 45%, transparent);
}

[data-scope="badge"][data-part="root"][data-tone="ink"][data-variant="subtle"] {
  --_ink: var(--bs-color-text-secondary);
}

[data-scope="badge"][data-part="root"][data-tone="ink"][data-variant="outline"] {
  --_ink: var(--bs-color-text-secondary);
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
}
`;
