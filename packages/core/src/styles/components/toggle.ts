export const toggleCss = /* css */ `
/* A standalone pressed-state seal: it rides the full control recipe, since
   unlike its group sibling it rests on the page by itself. */
[data-scope="toggle"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  user-select: none;
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="toggle"][data-part="root"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

[data-scope="toggle"][data-part="root"]:hover:not([data-state="on"], [data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
  color: var(--bs-color-text-primary);
}

[data-scope="toggle"][data-part="root"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="toggle"][data-part="root"]:active:not([data-disabled]) {
  box-shadow: none;
}

/* Pressed on: the flat ink fill — no inner shadow, no lit edge. */
[data-scope="toggle"][data-part="root"][data-state="on"] {
  border-color: transparent;
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  box-shadow: none;
}

[data-scope="toggle"][data-part="root"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="toggle"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`;
