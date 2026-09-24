import { labelCss } from "./shared";

/** The control recipe alone: border + surface + the focus halo, the
 * register every text entry rides. The bare Input and Textarea
 * families re-scope this to their own anatomy instead of copying it. */
export const fieldControlCss = /* css */ `
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

/* Size tiers ride the control-height ladder, as anywhere. */
[data-scope="field"][data-part="input"][data-size="sm"],
[data-scope="field"][data-part="select"][data-size="sm"] {
  block-size: var(--bs-control-height-sm);
  padding-inline: var(--bs-padding-sm);
  font-size: var(--bs-font-size-sm);
}

[data-scope="field"][data-part="input"][data-size="lg"],
[data-scope="field"][data-part="select"][data-size="lg"] {
  block-size: var(--bs-control-height-lg);
  padding-inline: var(--bs-padding-lg);
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
  box-shadow: var(--bs-shadow-hover);
}

/* Focus carries the halo like any control. Invalid keeps its edge in
   danger while focused and foregoes the halo, so the error reads in
   one pigment. */
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

[data-scope="field"][data-part="input"][data-invalid]:focus,
[data-scope="field"][data-part="textarea"][data-invalid]:focus,
[data-scope="field"][data-part="select"][data-invalid]:focus {
  box-shadow: inset 0 0 0 1px var(--bs-color-danger);
}

[data-scope="field"][data-part="input"]:disabled,
[data-scope="field"][data-part="textarea"]:disabled,
[data-scope="field"][data-part="select"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}
`;

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
` +
  fieldControlCss +
  /* css */ `
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

/* The floating-label variant, opted in per field with [data-float]. The
   label starts riding the control at placeholder height and floats to
   the control's top edge once the reader focuses or types. :has() reads
   the real input element so the pairing survives whatever part marks the
   machine writes; the empty-looking space placeholder keeps
   :placeholder-shown honest for an untouched field. */
[data-scope="field"][data-float][data-part="root"] {
  position: relative;
  /* Room above the control edge for the label once it is afloat. */
  margin-block-start: var(--bs-space-4);
}

[data-scope="field"][data-float][data-part="root"] [data-part="label"] {
  position: absolute;
  inset-inline-start: var(--bs-padding-md);
  inset-block-start: calc(var(--bs-control-height-md) / 2);
  translate: 0 -50%;
  color: var(--bs-color-text-tertiary);
  pointer-events: none;
  /* The control's own paper under the label cuts the hairline it rides,
     the way a legend cuts a fieldset border. */
  padding: 0 var(--bs-space-1);
  background: var(--bs-color-surface-2);
  transition:
    inset-block-start var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out),
    font-size var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="field"][data-float][data-part="root"]:has(input:focus) [data-part="label"],
[data-scope="field"][data-float][data-part="root"]:has(input:not(:placeholder-shown)) [data-part="label"],
[data-scope="field"][data-float][data-part="root"]:has(textarea:not(:placeholder-shown)) [data-part="label"] {
  inset-block-start: 0;
  font-size: var(--bs-font-size-xs);
  color: var(--bs-color-text-secondary);
}

/* While the reader is in the field, the afloat label carries the same
   pigment as the haloed hairline. */
[data-scope="field"][data-float][data-part="root"]:has(input:focus) [data-part="label"] {
  color: var(--bs-color-primary);
}
`;
