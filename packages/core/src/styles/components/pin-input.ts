import { inputStateCss } from "./shared";
import { labelCss } from "./shared";

export const pinInputCss =
  labelCss("pin-input") +
  /* css */ `
[data-scope="pin-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The cells: a row of equal seals, one character each. */
[data-scope="pin-input"][data-part="control"] {
  display: inline-flex;
  gap: var(--bs-gap-sm);
}
` +
  /* css */ `
[data-scope="pin-input"][data-part="input"] {
  box-sizing: border-box;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
  text-align: center;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}
` +
  inputStateCss("pin-input") +
  /* css */ `/* A finished cell rests its ink: full weight, no further decoration. */
[data-scope="pin-input"][data-part="input"][data-filled] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="pin-input"][data-part="input"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="pin-input"][data-part="input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
`;
