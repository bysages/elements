export const bannerCss = /* css */ `
/* A page-level notice, spoken across the full measure: a wash of the
   status pigment, one heavier hairline on the leading edge, the serif
   for its title, and room for actions and a quiet close. Ink is the
   neutral register; the four semantic pigments are fixed. */
[data-scope="banner"][data-part="root"] {
  --_pigment: var(--bs-color-text-tertiary);
  display: flex;
  gap: var(--bs-gap-md);
  padding: var(--bs-padding-md) var(--bs-padding-lg);
  border: 1px solid color-mix(in oklab, var(--_pigment) 25%, var(--bs-color-border));
  border-inline-start: var(--bs-hairline-strong) solid var(--_pigment);
  border-radius: var(--bs-radius-md);
  background: color-mix(in oklab, var(--_pigment) 7%, var(--bs-color-surface-1));
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="banner"][data-part="root"][data-status="info"] {
  --_pigment: var(--bs-color-info);
}
[data-scope="banner"][data-part="root"][data-status="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="banner"][data-part="root"][data-status="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="banner"][data-part="root"][data-status="danger"] {
  --_pigment: var(--bs-color-danger);
}

[data-scope="banner"][data-part="icon"] {
  flex: none;
  display: flex;
  align-items: flex-start;
  padding-block-start: 1px;
  color: var(--_pigment);
}

[data-scope="banner"][data-part="icon"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

[data-scope="banner"][data-part="body"] {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  min-inline-size: 0;
}

/* The title rides the serif — a vessel carries a heading, not a control. */
[data-scope="banner"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-semibold);
  color: var(--bs-color-text-primary);
  line-height: var(--bs-line-height-snug);
}

[data-scope="banner"][data-part="description"] {
  margin: 0;
}

[data-scope="banner"][data-part="actions"] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-gap-sm);
  margin-block-start: var(--bs-margin-sm);
}

[data-scope="banner"][data-part="close"] {
  flex: none;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="banner"][data-part="close"]:hover {
  color: var(--bs-color-text-primary);
  background: color-mix(in oklab, var(--bs-color-text-primary) 8%, transparent);
}

[data-scope="banner"][data-part="close"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="banner"][data-part="close"] svg {
  inline-size: 0.875rem;
  block-size: 0.875rem;
}
`;
