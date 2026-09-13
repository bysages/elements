export const chipCss = /* css */ `
/* A counting coin: one small number, round as a seal impression. It sits
   on whatever it counts — icons, tabs, avatars — never wider than it
   must be. */
[data-scope="chip"][data-part="root"] {
  --_pigment: var(--bs-color-surface-inverse);
  --_fill: var(--_pigment);
  --_ink: var(--bs-color-text-inverse);
  display: inline-grid;
  place-items: center;
  min-inline-size: var(--bs-space-5);
  block-size: var(--bs-space-5);
  padding: 0 var(--bs-space-1);
  border-radius: var(--bs-radius-full);
  background: var(--_fill);
  color: var(--_ink);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

[data-scope="chip"][data-part="root"][data-tone="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="chip"][data-part="root"][data-tone="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="chip"][data-part="root"][data-tone="danger"] {
  --_pigment: var(--bs-color-danger);
}
[data-scope="chip"][data-part="root"][data-tone="info"] {
  --_pigment: var(--bs-color-info);
}

[data-scope="chip"][data-part="root"][data-variant="subtle"] {
  --_fill: color-mix(in oklab, var(--_pigment) 12%, transparent);
  --_ink: var(--bs-color-text-secondary);
}
`;
