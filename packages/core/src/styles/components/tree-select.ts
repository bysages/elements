import { popupContentCss, positionerCss } from "./shared";

export const treeSelectCss =
  positionerCss("tree-select") +
  popupContentCss("tree-select", "0rem") +
  /* css */ `
/* The control reads as a field — the input recipe, with the chosen
   label as its ink and a quiet chevron at the inline end. */
[data-scope="tree-select"][data-part="control"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-sm);
  inline-size: 100%;
  block-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  text-align: start;
  cursor: pointer;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tree-select"][data-part="control"][data-placeholder] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="tree-select"][data-part="control"]:hover:not(:focus):not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="tree-select"][data-part="control"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tree-select"][data-part="control"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="tree-select"][data-part="chevron"] {
  display: grid;
  place-items: center;
  color: var(--bs-color-text-tertiary);
}

[data-scope="tree-select"][data-part="chevron"] svg {
  inline-size: var(--bs-space-4);
  block-size: var(--bs-space-4);
  transition: transform var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tree-select"][data-part="control"][data-open] [data-part="chevron"] svg {
  transform: rotate(90deg);
}

/* Inside the shared popup vessel the sheet is a column: an optional
   filter line holds the top, the grove scrolls under it. */
[data-scope="tree-select"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  max-block-size: 16rem;
  padding: var(--bs-padding-sm);
}

[data-scope="tree-select"][data-part="body"] {
  min-block-size: 0;
  overflow-block: auto;
}

[data-scope="tree-select"][data-part="empty"] {
  margin: 0;
  padding: var(--bs-padding-lg) var(--bs-padding-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-align: center;
}
`;
