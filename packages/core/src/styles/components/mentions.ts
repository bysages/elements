export const mentionsCss = /* css */ `
/* The field: a textarea in the standard field recipe — border + surface
   + focus halo, never a shadow lift. */
[data-scope="mentions"][data-part="root"] {
  display: flex;
}

[data-scope="mentions"][data-part="textarea"] {
  box-sizing: border-box;
  flex: 1;
  min-inline-size: 0;
  min-block-size: calc(var(--bs-control-height-md) + var(--bs-space-4));
  padding: var(--bs-space-2) var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  line-height: var(--bs-line-height-relaxed);
  resize: vertical;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="mentions"][data-part="textarea"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="mentions"][data-part="textarea"]:hover:not([disabled], [readonly]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="mentions"][data-part="textarea"]:focus,
[data-scope="mentions"][data-part="textarea"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="mentions"][data-part="textarea"][disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The candidate vessel: the popup recipe — paper, one hairline,
   elevation 3 — riding the popover positioner's shared ladder. */
[data-scope="mentions"][data-part="popup"] {
  box-sizing: border-box;
  min-inline-size: 10rem;
  max-block-size: 14rem;
  display: flex;
  flex-direction: column;
  padding: var(--bs-space-1);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-3);
  overflow-y: auto;
  outline: none;
}

[data-scope="mentions"][data-state="open"][data-part="popup"] {
  animation: bs-ink-in var(--bs-duration-base) var(--bs-ease-out);
}

/* Options are rows of light like every list: hover is the machine's
   highlight, the keyboard's row is the active one — and the two are the
   same stroke, so pointer and arrows never disagree. */
[data-scope="mentions"][data-part="option"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="mentions"][data-part="option"][data-active] {
  background: var(--bs-color-surface-0);
}
`;
