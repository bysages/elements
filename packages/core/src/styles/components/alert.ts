export const alertCss = /* css */ `
/* A notice drawn on the page: a wash of the status pigment, one heavier
   hairline on the leading edge, the serif for its title. Ink is the
   neutral register; the four semantic pigments are fixed. */
[data-scope="alert"][data-part="root"] {
  --_pigment: var(--bs-color-text-tertiary);
  display: flex;
  gap: var(--bs-space-3);
  padding: var(--bs-padding-md) var(--bs-padding-lg);
  border: 1px solid color-mix(in oklab, var(--_pigment) 25%, var(--bs-color-border));
  border-inline-start: 3px solid var(--_pigment);
  border-radius: var(--bs-radius-md);
  background: color-mix(in oklab, var(--_pigment) 7%, var(--bs-color-surface-1));
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="alert"][data-part="root"][data-status="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="alert"][data-part="root"][data-status="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="alert"][data-part="root"][data-status="danger"] {
  --_pigment: var(--bs-color-danger);
}
[data-scope="alert"][data-part="root"][data-status="info"] {
  --_pigment: var(--bs-color-info);
}

[data-scope="alert"][data-part="icon"] {
  flex: none;
  display: flex;
  align-items: flex-start;
  padding-block-start: 1px;
  color: var(--_pigment);
}

[data-scope="alert"][data-part="icon"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

[data-scope="alert"][data-part="body"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  min-inline-size: 0;
}

/* The title rides the serif — a vessel carries a heading, not a control. */
[data-scope="alert"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-semibold);
  color: var(--bs-color-text-primary);
  line-height: var(--bs-line-height-snug);
}

[data-scope="alert"][data-part="description"] {
  margin: 0;
}
`;
