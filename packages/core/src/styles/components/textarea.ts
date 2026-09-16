export const textareaCss = /* css */ `
/* The bare multi-line input: the same field recipe as the single-line
   one, growing with its content instead of riding the control-height
   ladder. Resize stays vertical — the writer owns the height. */
[data-scope="textarea"][data-part="root"] {
  box-sizing: border-box;
  display: block;
  inline-size: 100%;
  min-block-size: calc(var(--bs-control-height-md) + var(--bs-space-3));
  padding-block: var(--bs-space-2);
  padding-inline: var(--bs-padding-md);
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

[data-scope="textarea"][data-part="root"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="textarea"][data-part="root"]:hover:not(:focus):not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="textarea"][data-part="root"]:focus,
[data-scope="textarea"][data-part="root"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="textarea"][data-part="root"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="textarea"][data-part="root"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
  resize: none;
}
`;
