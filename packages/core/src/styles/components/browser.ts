export const browserCss = /* css */ `
[data-scope="browser"][data-part="root"] {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-elevation-2);
}

[data-scope="browser"][data-part="titlebar"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-md);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  background: var(--bs-color-surface-2);
  border-block-end: 1px solid var(--bs-color-border);
}

/* The three lamps are the fixed pigments — cinnabar, ochre, bamboo —
   the same semantics the system reserves for danger, warning, success. */
[data-scope="browser"][data-part="dots"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

/* The lamp is ornament, not a target — three quarters of the small
   register keeps it a whisper beside the address well. */
[data-scope="browser"][data-part="dot"] {
  display: block;
  inline-size: calc(var(--bs-part-size-sm) * 0.75);
  block-size: calc(var(--bs-part-size-sm) * 0.75);
  border-radius: var(--bs-radius-full, 999px);
}

[data-scope="browser"][data-part="dot"][data-tone="danger"] {
  background: var(--bs-color-danger);
}

[data-scope="browser"][data-part="dot"][data-tone="warning"] {
  background: var(--bs-color-warning);
}

[data-scope="browser"][data-part="dot"][data-tone="success"] {
  background: var(--bs-color-success);
}

/* The address well rides at the control height, the way a real
   browser's field does — not a flattened strip. */
[data-scope="browser"][data-part="urlbar"] {
  flex: 1;
  min-inline-size: 0;
  display: grid;
  place-items: center;
  min-block-size: var(--bs-control-height-sm);
  padding-inline: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-1);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[data-scope="browser"][data-part="body"] {
  flex: 1;
  min-block-size: 0;
}
`;
