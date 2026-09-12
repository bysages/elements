export const fieldsetCss = /* css */ `
[data-scope="fieldset"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-4);
  margin: 0;
  padding: 0;
  border: none;
  min-inline-size: 0;
}

/* The legend is a heading, not a label: it rides the song-serif stack and
   keeps the quiet weight of a chapter title. */
[data-scope="fieldset"][data-part="legend"] {
  padding: 0;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="fieldset"][data-part="helper-text"] {
  margin-block-start: calc(-1 * var(--bs-space-2));
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="fieldset"][data-part="error-text"] {
  color: var(--bs-color-danger);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* Disabling the fieldset mutes its voice — legend and help fade with the
   controls inside. */
[data-scope="fieldset"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

[data-scope="fieldset"][data-part="root"][data-disabled] [data-part="legend"],
[data-scope="fieldset"][data-part="root"][data-disabled] [data-part="helper-text"] {
  color: var(--bs-color-text-disabled);
}

[data-scope="fieldset"][data-part="root"][data-invalid] [data-part="legend"] {
  color: var(--bs-color-danger);
}
`;
