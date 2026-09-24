import { labelCss } from "./shared";

export const radioGroupCss =
  labelCss("radio-group") +
  /* css */ `
[data-scope="radio-group"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  color: var(--bs-color-text-primary);
}

[data-scope="radio-group"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  cursor: pointer;
}

/* The dial is a full-circle seal: same rest recipe as the checkbox box,
   rounded because the choice is a dot, not a tick. */
[data-scope="radio-group"][data-part="item-control"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope="radio-group"][data-part="item-control"]:hover:not([data-disabled], [data-state="checked"]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="radio-group"][data-part="item-control"][data-focus-visible] {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

/* Selected is a flat primary fill; the dot is paper punched through ink. */
[data-scope="radio-group"][data-part="item-control"][data-state="checked"] {
  border-color: var(--bs-color-primary);
  background: var(--bs-color-primary);
}

[data-scope="radio-group"][data-part="item-control"][data-state="checked"]::before {
  content: "";
  inline-size: calc(var(--bs-part-size-sm) * 0.5);
  block-size: calc(var(--bs-part-size-sm) * 0.5);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary-text);
}

[data-scope="radio-group"][data-part="item-control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="radio-group"][data-part="item-control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  cursor: not-allowed;
}

[data-scope="radio-group"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="radio-group"][data-part="item-text"] {
  font-size: var(--bs-font-size-sm);
  user-select: none;
}

/* The traveling indicator (moving-dial variant) glides between items on
   the spring — position comes from the machine. */
[data-scope="radio-group"][data-part="indicator"] {
  position: absolute;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary);
  transition:
    translate var(--bs-duration-base) var(--bs-ease-spring),
    opacity var(--bs-duration-fast) var(--bs-ease-out);
}
`;
