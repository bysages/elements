import { labelCss } from "./shared";

export const editableCss =
  labelCss("editable") +
  /* css */ `
[data-scope="editable"][data-part="root"] {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "label label"
    "area control";
  gap: var(--bs-space-2);
  align-items: center;
  inline-size: 100%;
}

[data-scope="editable"][data-part="label"] {
  grid-area: label;
}

[data-scope="editable"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

/* The text and its triggers share one row: the field stretches, the
   seals sit at its right shoulder. */
[data-scope="editable"][data-part="area"] {
  grid-area: area;
  position: relative;
  display: flex;
  align-items: center;
  min-inline-size: 0;
}

[data-scope="editable"][data-part="control"] {
  grid-area: control;
}

/* Preview and input share one geometry so the swap never shifts the page;
   only the skin changes — ghost while reading, field while editing. */
[data-scope="editable"][data-part="preview"],
[data-scope="editable"][data-part="input"] {
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid transparent;
  border-radius: var(--bs-radius-sm);
  font: inherit;
  font-size: var(--bs-font-size-md);
  /* The row-height centers the preview's text exactly where the browser
     centers an input's — switching modes never nudges the letters. It
     must come after the font shorthand, which resets line-height. */
  line-height: calc(var(--bs-control-height-md) - 2px);
  text-overflow: ellipsis;
}

/* Reading: bare ink on the paper — hover hints that this text is a door. */
[data-scope="editable"][data-part="preview"] {
  background: transparent;
  color: var(--bs-color-text-primary);
  cursor: text;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="editable"][data-part="preview"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-0);
}

[data-scope="editable"][data-part="preview"][data-placeholder] {
  color: var(--bs-color-text-tertiary);
}

/* Editing: the full field recipe — border + surface + focus halo. */
[data-scope="editable"][data-part="input"] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  outline: none;
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="editable"][data-part="input"]:focus {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="editable"][data-part="input"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="editable"][data-part="input"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
}

[data-scope="editable"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
}

/* Triggers are ghost stamps: quiet chrome until hovered, the submit seal
   alone carries ink. */
[data-scope="editable"][data-part="edit-trigger"],
[data-scope="editable"][data-part="submit-trigger"],
[data-scope="editable"][data-part="cancel-trigger"] {
  display: inline-grid;
  place-items: center;
  block-size: var(--bs-control-height-sm);
  min-inline-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="editable"][data-part="edit-trigger"]:hover:not([data-disabled]),
[data-scope="editable"][data-part="submit-trigger"]:hover:not([data-disabled]),
[data-scope="editable"][data-part="cancel-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="editable"][data-part="edit-trigger"]:focus-visible,
[data-scope="editable"][data-part="submit-trigger"]:focus-visible,
[data-scope="editable"][data-part="cancel-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="editable"][data-part="edit-trigger"]:active:not([data-disabled]),
[data-scope="editable"][data-part="submit-trigger"]:active:not([data-disabled]),
[data-scope="editable"][data-part="cancel-trigger"]:active:not([data-disabled]) {
  background: var(--bs-color-surface-inset);
}

[data-scope="editable"][data-part="edit-trigger"][data-disabled],
[data-scope="editable"][data-part="submit-trigger"][data-disabled],
[data-scope="editable"][data-part="cancel-trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="editable"][data-part="edit-trigger"] svg,
[data-scope="editable"][data-part="submit-trigger"] svg,
[data-scope="editable"][data-part="cancel-trigger"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}
`;
