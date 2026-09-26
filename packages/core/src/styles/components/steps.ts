export const stepsCss = /* css */ `
[data-scope="steps"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-lg);
}

[data-scope="steps"][data-part="list"] {
  display: flex;
  align-items: center;
}

[data-scope="steps"][data-part="item"] {
  display: flex;
  align-items: center;
  flex: 1;
  min-inline-size: 0;
}

[data-scope="steps"][data-part="item"]:last-of-type {
  flex: initial;
}

/* A step is the number on its seal, plus its label; the hairline between
   items is the road already walked. */
[data-scope="steps"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-xs) var(--bs-padding-sm);
  margin-inline-start: calc(var(--bs-margin-sm) * -1);
  border: none;
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition: color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="steps"][data-part="trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
  border-radius: var(--bs-radius-sm);
}

[data-scope="steps"][data-part="trigger"]:hover:not([data-current], [data-disabled]) {
  color: var(--bs-color-text-primary);
}

[data-scope="steps"][data-part="trigger"][data-current] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="steps"][data-part="trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* States ride the part itself: the machine stamps data-complete /
   data-current / data-incomplete on indicator and separator alike. */
[data-scope="steps"][data-part="indicator"] {
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-variant-numeric: tabular-nums;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-base) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="steps"][data-part="indicator"][data-current] {
  background: var(--bs-color-surface-0);
  box-shadow: inset 0 0 0 1px var(--bs-color-text-primary);
  color: var(--bs-color-text-primary);
}

[data-scope="steps"][data-part="indicator"][data-complete] {
  background: var(--bs-color-primary);
  box-shadow: none;
  color: var(--bs-color-primary-text);
}

/* The separator is a hairline that stretches; ink fills the stretch behind
   completed steps. */
[data-scope="steps"][data-part="separator"] {
  flex: 1;
  align-self: stretch;
  block-size: auto;
  min-block-size: 1px;
  margin: 0 var(--bs-margin-md);
  background:
    linear-gradient(var(--bs-color-border), var(--bs-color-border)) center / 100% 1px no-repeat;
}

[data-scope="steps"][data-part="separator"][data-complete] {
  background:
    linear-gradient(var(--bs-color-primary), var(--bs-color-primary)) center / 100% 1px no-repeat;
}

[data-scope="steps"][data-part="progress"] {
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-tertiary);
  font-variant-numeric: tabular-nums;
}

[data-scope="steps"][data-part="content"] {
  padding: var(--bs-padding-lg);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
}

[data-scope="steps"][data-part="content"][data-state="open"] {
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="steps"][data-part="prev-trigger"],
[data-scope="steps"][data-part="next-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="steps"][data-part="prev-trigger"]:hover:not([data-disabled]),
[data-scope="steps"][data-part="next-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="steps"][data-part="prev-trigger"]:focus-visible,
[data-scope="steps"][data-part="next-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="steps"][data-part="prev-trigger"][data-disabled],
[data-scope="steps"][data-part="next-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}
`;
