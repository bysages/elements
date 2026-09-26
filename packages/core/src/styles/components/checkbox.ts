import { labelCss } from "./shared";

export const checkboxCss =
  labelCss("checkbox") +
  /* css */ `
[data-scope="checkbox"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

/* A group of checkboxes is one field: the rows stack, and the invalid
 * pigment bleeds onto every row inside. */
[data-scope="checkbox"][data-part="group"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="checkbox"][data-part="group"][data-invalid],
[data-scope="checkbox"][data-part="group"][data-invalid] [data-part="root"] {
  color: var(--bs-color-danger);
}

/* The box is the seal: square-cut, hairline, resting in ambient shade. */
[data-scope="checkbox"][data-part="control"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-surface-2);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope="checkbox"][data-part="control"]:hover:not([data-disabled], [data-state="checked"], [data-state="indeterminate"], [data-focus-visible]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="checkbox"][data-part="control"][data-focus-visible] {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
  transition: none;
}

/* Checked is a flat primary fill — ink, not chrome: no inner shadow, no
   lit edge, the glyph simply turns paper. */
[data-scope="checkbox"][data-part="control"][data-state="checked"],
[data-scope="checkbox"][data-part="control"][data-state="indeterminate"] {
  border-color: var(--bs-color-primary);
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
}

[data-scope="checkbox"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="checkbox"][data-part="control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
}

[data-scope="checkbox"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity var(--bs-duration-fast) var(--bs-ease-out),
    transform var(--bs-duration-fast) var(--bs-ease-spring);
}

/* The mark overshoots into place — puppets have strings. */
[data-scope="checkbox"][data-part="control"][data-state="checked"] [data-part="indicator"],
[data-scope="checkbox"][data-part="control"][data-state="indeterminate"] [data-part="indicator"] {
  opacity: 1;
  transform: scale(1);
}

[data-scope="checkbox"][data-part="indicator"] svg {
  inline-size: calc(var(--bs-part-size-sm) * 0.7);
  block-size: calc(var(--bs-part-size-sm) * 0.7);
}

[data-scope="checkbox"][data-part="root"]:has([data-disabled]) {
  color: var(--bs-color-text-disabled);
}

[data-scope="checkbox"][data-part="root"]:has([data-disabled]) [data-part="control"] {
  cursor: not-allowed;
}
`;
