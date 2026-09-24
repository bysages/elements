import { labelCss } from "./shared";

export const dateInputCss =
  labelCss("date-input") +
  /* css */ `
[data-scope="date-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

[data-scope="date-input"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
}

/* The segment group IS the field — the same border + surface + focus halo
   recipe as every input, no shadow. */
[data-scope="date-input"][data-part="segment-group"] {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  cursor: text;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-input"][data-part="segment-group"]:hover:not([data-disabled], [data-readonly]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
}

[data-scope="date-input"][data-part="segment-group"][data-focus] {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-input"][data-part="segment-group"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="date-input"][data-part="segment-group"][data-invalid][data-focus] {
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-input"][data-part="segment-group"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="date-input"][data-part="segment-group"][data-readonly] {
  background: var(--bs-color-surface-inset);
}

[data-scope="date-input"][data-part="segment"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2ch;
  padding: 0 2px;
  border-radius: var(--bs-radius-xs);
  font-variant-numeric: tabular-nums;
  caret-color: transparent;
  outline: none;
}

/* The focused segment takes the flat primary fill — ink where the eye is. */
[data-scope="date-input"][data-part="segment"]:focus {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
}

[data-scope="date-input"][data-part="segment"][data-placeholder-shown] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="date-input"][data-part="segment"]:focus[data-placeholder-shown] {
  color: var(--bs-color-primary-text);
}

/* Separators are type, not controls — never take the ink. */
[data-scope="date-input"][data-part="segment"][data-type="literal"] {
  min-width: 0;
  padding: 0;
  color: var(--bs-color-text-tertiary);
  user-select: none;
}

/* The hidden input still hosts form autofill — visually gone, structurally
   present. */
[data-scope="date-input"][data-part="hidden-input"] {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
  pointer-events: none;
}
`;
