export const timerCss = /* css */ `
[data-scope="timer"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bs-gap-lg);
}

[data-scope="timer"][data-part="area"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

[data-scope="timer"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

/* Digits are a data readout: monospaced so they never jitter as the count
   turns. The readout is the component's face — give it display scale. */
[data-scope="timer"][data-part="item"] {
  min-width: 2ch;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-mono);
  font-size: var(--bs-font-size-2xl);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
  text-align: center;
}

[data-scope="timer"][data-part="separator"] {
  color: var(--bs-color-text-tertiary);
  font-family: var(--bs-font-mono);
  font-size: var(--bs-font-size-2xl);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="timer"][data-part="action-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-sm);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="timer"][data-part="action-trigger"]:hover:not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="timer"][data-part="action-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="timer"][data-part="action-trigger"]:active:not(:disabled) {
  box-shadow: none;
}

[data-scope="timer"][data-part="action-trigger"]:disabled {
  background: var(--bs-color-surface-inset);
  border-color: var(--bs-color-border);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
`;
