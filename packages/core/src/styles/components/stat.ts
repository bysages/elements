export const statCss = /* css */ `
/* One figure on the page: the label whispers what it is, the value
   states it plainly in tabular figures, the delta reads the direction
   in the fixed semantic pigments. */
[data-scope="stat"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
}

[data-scope="stat"][data-part="label"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
}

/* The value carries the ink: large, semibold, tabular so figures
   align across a row of stats. */
[data-scope="stat"][data-part="value"] {
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-3xl);
  font-weight: var(--bs-font-weight-semibold);
  font-variant-numeric: tabular-nums;
  line-height: var(--bs-line-height-tight);
}

[data-scope="stat"][data-part="delta"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
}

[data-scope="stat"][data-part="delta"][data-direction="up"] {
  color: var(--bs-color-success);
}

[data-scope="stat"][data-part="delta"][data-direction="down"] {
  color: var(--bs-color-danger);
}

[data-scope="stat"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}
`;
