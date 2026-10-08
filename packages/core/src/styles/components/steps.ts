export const stepsCss = /* css */ `
[data-scope="steps"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-lg);
  /* The number's seal: one register the size ladder re-points and the
     vertical separator aligns against. */
  --bs-steps-marker: var(--bs-control-height-sm);
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
  inline-size: var(--bs-steps-marker);
  block-size: var(--bs-steps-marker);
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
  border: var(--bs-hairline) solid var(--bs-color-border);
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
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
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
  background: color-mix(in oklab, var(--bs-color-text-primary) 5%, transparent);
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

/* Size rungs: the root's data-size re-points the ladder every
   indicator stands on; the connecting hairline follows the row. */
[data-scope="steps"][data-part="root"][data-size="sm"] {
  --bs-steps-marker: calc(var(--bs-control-height-sm) * 0.875);
}

[data-scope="steps"][data-part="root"][data-size="lg"] {
  --bs-steps-marker: var(--bs-control-height-md);
}


/* The vertical climb: the list turns, each step standing on its own
   row for narrow measures. */
[data-scope="steps"][data-orientation="vertical"] [data-part="list"] {
  flex-direction: column;
  align-items: stretch;
  gap: var(--bs-gap-sm);
}

[data-scope="steps"][data-orientation="vertical"] [data-part="item"] {
  flex: initial;
  flex-direction: column;
  align-items: flex-start;
}

/* The thread turns with the list: a plumb line dropped from under the
   seal, finding the next step's. */
[data-scope="steps"][data-orientation="vertical"] [data-part="separator"] {
  flex: initial;
  align-self: auto;
  inline-size: 1px;
  min-block-size: var(--bs-space-6);
  margin: var(--bs-margin-xs) 0 var(--bs-margin-xs)
    calc(var(--bs-steps-marker) / 2 - 0.5px);
  background: linear-gradient(var(--bs-color-border), var(--bs-color-border))
    center / 1px 100% no-repeat;
}

[data-scope="steps"][data-orientation="vertical"] [data-part="separator"][data-complete] {
  background: linear-gradient(var(--bs-color-primary), var(--bs-color-primary))
    center / 1px 100% no-repeat;
}
`;
