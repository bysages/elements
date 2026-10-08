export const inputGroupCss = /* css */ `
/* The merged control: one hairline and one halo for the whole family.
   The input inside surrenders its own frame so attachments read as parts
   of the same seal, not buttons bolted onto a field. */
[data-scope="input-group"][data-part="root"] {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  border: var(--bs-hairline) solid var(--bs-color-border);
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

[data-scope="input-group"][data-part="root"]:hover:not(:focus-within) {
  border-color: var(--bs-color-border-strong);
}

/* Focus is light arriving at the group: one halo, however many controls
   sit inside. Scenes that speak focus as an inset line draw it through
   the ::after overlay instead — a ring on the root itself sits beneath
   the opaque cells, surfacing only across the clear entry and reading
   as a second, partial frame. */
[data-scope="input-group"][data-part="root"]:focus-within {
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scene="cupertino"] [data-scope="input-group"][data-part="root"]:focus-within,
[data-scene="fluent"] [data-scope="input-group"][data-part="root"]:focus-within,
[data-scene="missive"] [data-scope="input-group"][data-part="root"]:focus-within,
[data-scene="dispatch"] [data-scope="input-group"][data-part="root"]:focus-within {
  box-shadow: none;
}

[data-scene="cupertino"] [data-scope="input-group"][data-part="root"]:focus-within::after,
[data-scene="fluent"] [data-scope="input-group"][data-part="root"]:focus-within::after,
[data-scene="missive"] [data-scope="input-group"][data-part="root"]:focus-within::after,
[data-scene="dispatch"] [data-scope="input-group"][data-part="root"]:focus-within::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--bs-focus-ring);
  pointer-events: none;
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
  border-inline-start: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="input-group"][data-part="addon"]:not(:last-child) {
  border-inline-end: var(--bs-hairline) solid var(--bs-color-border);
}

/* Hover deepens the group's hairline as a whole — a divider that kept
   the resting pigment would read as a second, shallower frame. */
[data-scope="input-group"][data-part="root"]:hover [data-scope="input-group"][data-part="addon"]:not(:first-child) {
  border-inline-start-color: var(--bs-color-border-strong);
}

[data-scope="input-group"][data-part="root"]:hover [data-scope="input-group"][data-part="addon"]:not(:last-child) {
  border-inline-end-color: var(--bs-color-border-strong);
}
`;
