import { labelCss } from "./shared";

export const clipboardCss =
  labelCss("clipboard") +
  /* css */ `
[data-scope="clipboard"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  inline-size: 100%;
  max-inline-size: 20rem;
}

[data-scope="clipboard"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
}

/* The value field leans on border + surface + focus halo — no shadow. */
[data-scope="clipboard"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="clipboard"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="clipboard"][data-part="input"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="clipboard"][data-part="input"]:focus,
[data-scope="clipboard"][data-part="input"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="clipboard"][data-part="input"][data-readonly] {
  color: var(--bs-color-text-secondary);
}

[data-scope="clipboard"][data-part="input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The copy trigger rides the control recipe: an icon-sized sibling of the
   input it serves, hairline at rest, shadow released on press. */
[data-scope="clipboard"][data-part="trigger"] {
  flex: none;
  display: inline-grid;
  place-items: center;
  min-inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="clipboard"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  color: var(--bs-color-text-primary);
}

[data-scope="clipboard"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="clipboard"][data-part="trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

/* Copied state reads as success without stealing the row — the ink stays
   bamboo, the fill stays paper. The :hover twin outranks the hover rule's
   own specificity (0,4,0): a pointer resting on the trigger must not hide
   the success flash. */
[data-scope="clipboard"][data-part="trigger"][data-copied],
[data-scope="clipboard"][data-part="trigger"][data-copied]:hover {
  border-color: var(--bs-color-success);
  color: var(--bs-color-success);
}

[data-scope="clipboard"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="clipboard"][data-part="indicator"] {
  display: inline-grid;
  place-items: center;
}

[data-scope="clipboard"][data-part="indicator"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}
`;
