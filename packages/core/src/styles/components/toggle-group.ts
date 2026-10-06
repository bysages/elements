export const toggleGroupCss = /* css */ `
[data-scope="toggle-group"][data-part="root"] {
  display: inline-flex;
  gap: var(--bs-gap-xs);
  padding: var(--bs-padding-xs);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="toggle-group"][data-part="root"][data-orientation="vertical"] {
  flex-direction: column;
}

/* Each item is a quiet seal resting inside the tray; the raised look belongs
   to the tray alone, so the items stay transparent until pressed on. */
[data-scope="toggle-group"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-sm);
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  user-select: none;
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-shadow) var(--bs-ease-out);
}

[data-scope="toggle-group"][data-part="item"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

/* Text toggles widen around their label while keeping the same register;
   icon toggles stay square seals. */
[data-scope="toggle-group"][data-part="item"][data-variant="text"] {
  inline-size: auto;
  min-inline-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-sm);
  white-space: nowrap;
}

[data-scope="toggle-group"][data-part="item"]:hover:not([data-state="on"], [data-disabled]) {
  border-color: var(--bs-color-border-strong);
  color: var(--bs-color-text-primary);
}

[data-scope="toggle-group"][data-part="item"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
  z-index: 1;
}

[data-scope="toggle-group"][data-part="item"]:active:not([data-disabled]) {
  box-shadow: none;
}

/* Pressed on: the flat ink fill, nothing lit beneath it. */
[data-scope="toggle-group"][data-part="item"][data-state="on"] {
  border-color: transparent;
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  box-shadow: none;
}

[data-scope="toggle-group"][data-part="item"][data-disabled] {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
/* Size rungs: the items sit on the control-height ladder. */
[data-scope="toggle-group"][data-part="root"][data-size="sm"] [data-part="item"] {
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
}

[data-scope="toggle-group"][data-part="root"][data-size="lg"] [data-part="item"] {
  inline-size: var(--bs-control-height-lg);
  block-size: var(--bs-control-height-lg);
}
`;
