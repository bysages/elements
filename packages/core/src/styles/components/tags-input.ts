import { labelCss } from "./shared";

export const tagsInputCss =
  labelCss("tags-input") +
  /* css */ `
[data-scope="tags-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

/* The control is the field: it carries the hairline, the surface and the
   focus halo for every chip and the input inside it — the whole vessel
   reads as one input at rest. */
[data-scope="tags-input"][data-part="control"] {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-space-1);
  min-block-size: var(--bs-control-height-md);
  padding: var(--bs-space-1) var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="control"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="tags-input"][data-part="control"]:focus-within {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tags-input"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="tags-input"][data-part="control"][data-invalid]:focus-within {
  border-color: var(--bs-color-danger);
}

[data-scope="tags-input"][data-part="control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="tags-input"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-inline-size: 4rem;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-1);
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--bs-font-size-sm);
  outline: none;
}

[data-scope="tags-input"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="tags-input"][data-part="control"][data-disabled] [data-part="input"] {
  cursor: not-allowed;
}

/* A tag rests as quiet ink on the paper — no hairline of its own, just a
   tone step; editing it (highlight) deepens the tone inside a hairline. */
[data-scope="tags-input"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  outline: none;
}

[data-scope="tags-input"][data-part="item-preview"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-1);
  padding: var(--bs-space-1) var(--bs-space-2);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="item-preview"][data-highlighted] {
  background: var(--bs-color-surface-inset);
}

[data-scope="tags-input"][data-part="item-text"] {
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="tags-input"][data-part="item-input"] {
  box-sizing: border-box;
  inline-size: 4rem;
  padding: var(--bs-space-1) var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  outline: none;
}

[data-scope="tags-input"][data-part="item-input"]:focus,
[data-scope="tags-input"][data-part="item-input"]:focus-visible {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="tags-input"][data-part="item-delete-trigger"],
[data-scope="tags-input"][data-part="clear-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  padding: var(--bs-space-1);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="item-delete-trigger"]:hover:not([data-disabled]),
[data-scope="tags-input"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-primary);
}

[data-scope="tags-input"][data-part="item-delete-trigger"]:focus-visible,
[data-scope="tags-input"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tags-input"][data-part="item-delete-trigger"] svg,
[data-scope="tags-input"][data-part="clear-trigger"] svg {
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
}
`;
