import { labelCss } from "./shared";

export const fieldCss =
  labelCss("field") +
  /* css */ `
[data-scope="field"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--bs-space-2);
  inline-size: 100%;
}

/* The control itself: inputs rely on border + surface + focus halo, never
   a shadow — a field sits on the paper, it does not float above it. */
[data-scope="field"][data-part="input"],
[data-scope="field"][data-part="textarea"],
[data-scope="field"][data-part="select"] {
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="field"][data-part="input"],
[data-scope="field"][data-part="select"] {
  block-size: var(--bs-control-height-md);
}

[data-scope="field"][data-part="textarea"] {
  min-block-size: calc(var(--bs-control-height-md) * 2 + var(--bs-space-2));
  padding-block: var(--bs-space-2);
  line-height: var(--bs-line-height-relaxed);
  resize: vertical;
}

[data-scope="field"][data-part="input"]::placeholder,
[data-scope="field"][data-part="textarea"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="field"][data-part="input"]:hover:not(:disabled),
[data-scope="field"][data-part="textarea"]:hover:not(:disabled),
[data-scope="field"][data-part="select"]:hover:not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="field"][data-part="input"]:focus,
[data-scope="field"][data-part="textarea"]:focus,
[data-scope="field"][data-part="select"]:focus {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="field"][data-part="input"][data-invalid],
[data-scope="field"][data-part="textarea"][data-invalid],
[data-scope="field"][data-part="select"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="field"][data-part="input"]:disabled,
[data-scope="field"][data-part="textarea"]:disabled,
[data-scope="field"][data-part="select"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The required mark whispers, never shouts: a quiet pigment point after
   the label. */
[data-scope="field"][data-part="required-indicator"] {
  color: var(--bs-color-danger);
}

[data-scope="field"][data-part="helper-text"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="field"][data-part="error-text"] {
  color: var(--bs-color-danger);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* A disabled field mutes the whole column — label, control, help. */
[data-scope="field"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}
`;
