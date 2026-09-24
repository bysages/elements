import { labelCss } from "./shared";

export const passwordInputCss =
  labelCss("password-input") +
  /* css */ `
[data-scope="password-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

/* The field and the reveal affordance share one vessel: the input reserves
   the inline end so the eye never sits on top of the ink. */
[data-scope="password-input"][data-part="control"] {
  position: relative;
  display: flex;
  align-items: center;
}

[data-scope="password-input"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-md)
    calc(var(--bs-space-6) + var(--bs-space-1));
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="password-input"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="password-input"][data-part="input"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="password-input"][data-part="input"]:focus,
[data-scope="password-input"][data-part="input"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="password-input"][data-part="input"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="password-input"][data-part="input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="password-input"][data-part="visibility-trigger"] {
  position: absolute;
  inset-inline-end: var(--bs-space-1);
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
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

[data-scope="password-input"][data-part="visibility-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="password-input"][data-part="visibility-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="password-input"][data-part="visibility-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="password-input"][data-part="visibility-trigger"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

/* The indicator swaps eye for eye-off: same seat, same size, no shift. */
[data-scope="password-input"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`;
