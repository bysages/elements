export const collapsibleCss = /* css */ `
[data-scope="collapsible"][data-part="root"] {
  display: flex;
  flex-direction: column;
  color: var(--bs-color-text-primary);
}

/* A collapsible stands alone, so its trigger is a full control: paper
   surface, one hairline, resting on xs. */
[data-scope="collapsible"][data-part="trigger"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-3);
  inline-size: 100%;
  min-block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: inherit;
  font: inherit;
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-align: start;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope="collapsible"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  background: var(--bs-color-surface-3);
  box-shadow: var(--bs-shadow-sm);
}

[data-scope="collapsible"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="collapsible"][data-part="trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="collapsible"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The chevron turns to face the opening — puppets have strings. */
[data-scope="collapsible"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-color-text-tertiary);
  transform-origin: center;
  transition: transform 200ms var(--bs-ease-spring);
}

[data-scope="collapsible"][data-part="indicator"][data-state="open"] {
  transform: rotate(90deg);
}

[data-scope="collapsible"][data-part="indicator"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

/* Expansion animates height from the machine's measured --height; the
   panel dissolves open rather than snapping. */
[data-scope="collapsible"][data-part="content"] {
  overflow: hidden;
}

[data-scope="collapsible"][data-part="content"][data-state="open"] {
  animation:
    bs-collapsible-expand var(--bs-duration-base) var(--bs-ease-out),
    bs-collapsible-fade-in var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="collapsible"][data-part="content"][data-state="closed"] {
  animation:
    bs-collapsible-collapse var(--bs-duration-base) var(--bs-ease-out),
    bs-collapsible-fade-out var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="collapsible"][data-part="content"] > * {
  padding: var(--bs-space-3) var(--bs-padding-sm);
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

@keyframes bs-collapsible-expand {
  from {
    height: var(--collapsed-height, 0);
  }
  to {
    height: var(--height);
  }
}

@keyframes bs-collapsible-collapse {
  from {
    height: var(--height);
  }
  to {
    height: var(--collapsed-height, 0);
  }
}

@keyframes bs-collapsible-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes bs-collapsible-fade-out {
  to {
    opacity: 0;
  }
}
`;
