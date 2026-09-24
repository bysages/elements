import { labelCss } from "./shared";

export const fileUploadCss =
  labelCss("file-upload") +
  /* css */ `
[data-scope="file-upload"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bs-space-3);
  inline-size: 100%;
}

/* The choose-files button rides the control recipe: paper fill, one
   hairline, the small rest shadow — the ordinary door into the dropzone. */
[data-scope="file-upload"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="file-upload"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
}

[data-scope="file-upload"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="file-upload"][data-part="trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="file-upload"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The clear-all action is the quiet twin of the choose-files door: the same
   frame drawn only on hover — it never competes with the primary door. */
[data-scope="file-upload"][data-part="clear-trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid transparent;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="file-upload"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
}

[data-scope="file-upload"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="file-upload"][data-part="clear-trigger"]:active:not([data-disabled]) {
  background: var(--bs-color-surface-inset);
}

[data-scope="file-upload"][data-part="clear-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The dropzone is a vessel, not a control: one dashed hairline drawn on the
   paper — an invitation, not a border. Drag-over floods it with subtle
   primary light; invalid floods it with cinnabar. */
[data-scope="file-upload"][data-part="dropzone"] {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--bs-space-3);
  padding: var(--bs-padding-lg);
  border: 1px dashed var(--bs-color-border-strong);
  border-radius: var(--bs-radius-lg);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  text-align: center;
  cursor: pointer;
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="file-upload"][data-part="dropzone"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
}

[data-scope="file-upload"][data-part="dropzone"][data-dragging] {
  border-style: solid;
  border-color: var(--bs-color-primary);
  background: var(--bs-color-primary-subtle);
  color: var(--bs-color-primary-subtle-text);
}

[data-scope="file-upload"][data-part="dropzone"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="file-upload"][data-part="dropzone"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="file-upload"][data-part="dropzone"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

/* Files list as loose paper slips, one hairline each — quiet siblings
   under the dropzone. */
[data-scope="file-upload"][data-part="item-group"] {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

[data-scope="file-upload"][data-part="item"] {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    "preview name delete"
    "preview size delete";
  align-items: center;
  column-gap: var(--bs-space-3);
  padding: var(--bs-space-2) var(--bs-space-3);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
}

[data-scope="file-upload"][data-part="item-preview"] {
  grid-area: preview;
  display: grid;
  place-items: center;
  color: var(--bs-color-text-tertiary);
}

[data-scope="file-upload"][data-part="item-preview"] svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

[data-scope="file-upload"][data-part="item-preview-image"] {
  inline-size: 2.5rem;
  block-size: 2.5rem;
  border-radius: var(--bs-radius-sm);
  object-fit: cover;
}

[data-scope="file-upload"][data-part="item-name"] {
  grid-area: name;
  overflow: hidden;
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="file-upload"][data-part="item-size-text"] {
  grid-area: size;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-variant-numeric: tabular-nums;
}

/* The delete affordance is a quiet glyph until hovered — the row's only
   raised voice. */
[data-scope="file-upload"][data-part="item-delete-trigger"] {
  grid-area: delete;
  display: grid;
  place-items: center;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="file-upload"][data-part="item-delete-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-danger);
}

[data-scope="file-upload"][data-part="item-delete-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="file-upload"][data-part="item-delete-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}
`;
