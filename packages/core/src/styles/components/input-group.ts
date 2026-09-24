export const inputGroupCss = /* css */ `
/* The merged control: one hairline and one halo for the whole family.
   The input inside surrenders its own frame so attachments read as parts
   of the same seal, not buttons bolted onto a field. */
[data-scope="input-group"][data-part="root"] {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  /* The attachments are square-cut cells; the seal's rounding clips
     them, so the corners read as one shape instead of a field with
     blocks bolted on. */
  overflow: hidden;
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="input-group"][data-part="root"]:hover {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
}

/* Focus is light arriving at the group: one halo, however many controls
   sit inside. */
[data-scope="input-group"][data-part="root"]:focus-within {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

/* The entry wears no frame of its own — it stretches to fill what is
   left of the seal, its own halo silenced in favor of the group's. The
   compound selectors outrank the field recipe's focus and disabled
   branches without touching the shared stylesheet. */
[data-scope="input-group"][data-part="root"] [data-scope="input"][data-part="root"],
[data-scope="input-group"][data-part="root"] [data-scope="textarea"][data-part="root"] {
  flex: 1;
  inline-size: auto;
  min-inline-size: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

[data-scope="input-group"][data-part="root"] [data-scope="input"][data-part="root"]:focus,
[data-scope="input-group"][data-part="root"] [data-scope="input"][data-part="root"]:focus-visible,
[data-scope="input-group"][data-part="root"] [data-scope="textarea"][data-part="root"]:focus,
[data-scope="input-group"][data-part="root"] [data-scope="textarea"][data-part="root"]:focus-visible {
  border: none;
  box-shadow: none;
}

/* Disabled keeps the group's paper too — only the ink steps back. */
[data-scope="input-group"][data-part="root"] [data-scope="input"][data-part="root"]:disabled,
[data-scope="input-group"][data-part="root"] [data-scope="textarea"][data-part="root"]:disabled {
  background: transparent;
}

/* A button living in an attachment focuses inside the clipped seal, so
   its halo wears the inset variant — the outward glow would be cut to
   ugly half-corners by the group's rounding. */
[data-scope="input-group"][data-part="root"] [data-scope="button"][data-part="root"]:focus-visible {
  box-shadow: var(--bs-focus-ring-inset);
}

/* An attachment cell: a recessed face between the reader's fixed words
   and the ink they type. Hairlines do the separating — leading cells
   part from the entry on the inline end, trailing on the inline start,
   so any root/addon order divides correctly. */
[data-scope="input-group"][data-part="addon"] {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--bs-gap-xs);
  padding: 0 var(--bs-padding-md);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  white-space: nowrap;
}

[data-scope="input-group"][data-part="addon"]:not(:first-child) {
  border-inline-start: 1px solid var(--bs-color-border);
}

[data-scope="input-group"][data-part="addon"]:not(:last-child) {
  border-inline-end: 1px solid var(--bs-color-border);
}
`;
