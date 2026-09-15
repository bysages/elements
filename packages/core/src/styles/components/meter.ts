export const meterCss = /* css */ `
/* A measure in the world, not a task in flight: how much of the toner
   remains, how full the cistern stands. The level chooses the pigment —
   primary while all is well, the fixed semantic pigments at the
   thresholds. */
[data-scope="meter"][data-part="root"] {
  --_pigment: var(--bs-color-primary);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: var(--bs-space-1) var(--bs-gap-sm);
  inline-size: min(16rem, 100%);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

[data-scope="meter"][data-part="root"][data-level="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="meter"][data-part="root"][data-level="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="meter"][data-part="root"][data-level="danger"] {
  --_pigment: var(--bs-color-danger);
}

[data-scope="meter"][data-part="label"] {
  color: var(--bs-color-text-primary);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="meter"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-variant-numeric: tabular-nums;
  text-align: end;
}

[data-scope="meter"][data-part="track"] {
  grid-column: 1 / -1;
  overflow: hidden;
  block-size: var(--bs-space-1);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-0);
}

[data-scope="meter"][data-part="range"] {
  /* The fill reads the root's declared share of the scale. */
  display: block;
  inline-size: var(--_percent, 0%);
  block-size: 100%;
  border-radius: inherit;
  background: var(--_pigment);
  transition: inline-size var(--bs-duration-slow) var(--bs-ease-out);
}
`;
