export const kbdCss = /* css */ `
/* A keycap in miniature: paper on a hairline with one drawn lower edge.
   The em scale keeps it riding whatever type it annotates. */
[data-scope="kbd"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 1.75em;
  padding: 0.125em 0.375em;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  box-shadow: 0 1px 0 var(--bs-color-border);
  color: var(--bs-color-text-secondary);
  font-family: var(--bs-font-sans);
  /* A keycap reads as annotation: visibly smaller than the type it rides
     (mainstream systems run 0.75-0.85 of the body), but never below the
     xs floor. */
  font-size: max(var(--bs-font-size-xs), 0.8125em);
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
`;
