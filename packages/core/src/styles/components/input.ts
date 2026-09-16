export const inputCss = /* css */ `
/* The bare text input: border + surface + focus halo, the field recipe
   the system builds its inputs on. Sizes ride the control-height ladder;
   invalid and disabled are the standard register shifts. */
[data-scope="input"][data-part="root"] {
  box-sizing: border-box;
  inline-size: 100%;
  block-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="input"][data-part="root"][data-size="sm"] {
  block-size: var(--bs-control-height-sm);
  padding-inline: var(--bs-padding-sm);
  font-size: var(--bs-font-size-sm);
}

[data-scope="input"][data-part="root"][data-size="lg"] {
  block-size: var(--bs-control-height-lg);
  padding-inline: var(--bs-padding-lg);
}

[data-scope="input"][data-part="root"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="input"][data-part="root"]:hover:not(:focus):not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="input"][data-part="root"]:focus,
[data-scope="input"][data-part="root"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="input"][data-part="root"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="input"][data-part="root"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
`;
