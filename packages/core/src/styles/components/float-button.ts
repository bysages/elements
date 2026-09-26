export const floatButtonCss = /* css */ `
/* A float: the trigger moors at the page corner and the actions fan out
   from it. It floats, so it casts — and vessels are round: the trigger
   and every action take the vessel radius, one rung of elevation at
   rest, lifting another under the pointer on the slow shadow clock. */
[data-scope="float-button"][data-part="root"] {
  position: fixed;
  display: flex;
  /* The fan grows away from the mooring: first in the DOM sits nearest
     the corner, the actions rise (or hang) beyond it. */
  flex-direction: column-reverse;
  gap: var(--bs-gap-sm);
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
}

/* Top moorings hang the actions below the trigger instead. */
[data-scope="float-button"][data-part="root"][data-placement^="top"] {
  flex-direction: column;
}

/* The stack hugs its corner: start moorings align inward from the
   start edge, end moorings from the end edge. */
[data-scope="float-button"][data-part="root"][data-placement$="-start"] {
  align-items: flex-start;
}

[data-scope="float-button"][data-part="root"][data-placement$="-end"] {
  align-items: flex-end;
}

[data-scope="float-button"][data-part="root"][data-placement="bottom-end"] {
  inset-block-end: var(--bs-space-6);
  inset-inline-end: var(--bs-space-6);
}

[data-scope="float-button"][data-part="root"][data-placement="bottom-start"] {
  inset-block-end: var(--bs-space-6);
  inset-inline-start: var(--bs-space-6);
}

[data-scope="float-button"][data-part="root"][data-placement="top-end"] {
  inset-block-start: var(--bs-space-6);
  inset-inline-end: var(--bs-space-6);
}

[data-scope="float-button"][data-part="root"][data-placement="top-start"] {
  inset-block-start: var(--bs-space-6);
  inset-inline-start: var(--bs-space-6);
}

/* The vessel register for both the trigger and the actions — above the
   recipe's own variant and active rules, so a solid trigger still casts
   at rest and everything settles back into the page when pressed. */
[data-scope="float-button"][data-part="root"] [data-scope="button"][data-part="root"] {
  border-radius: var(--bs-radius-lg);
  --bs-shadow-color: color-mix(in oklab, var(--bs-shadow-ink) 30%, transparent);
  box-shadow: var(--bs-elevation-2);
}

[data-scope="float-button"][data-part="root"] [data-scope="button"][data-part="root"]:hover:not(:disabled) {
  box-shadow: var(--bs-elevation-3);
}

[data-scope="float-button"][data-part="root"] [data-scope="button"][data-part="root"]:active:not(:disabled) {
  box-shadow: none;
}

/* Each action rides a row: the round button, and a small annotation
   surfaced beside it toward the page center while the group is open.
   The label is prose, not a control — the pointer passes through to
   the button. */
[data-scope="float-button"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  flex-direction: row-reverse;
}

[data-scope="float-button"][data-part="root"][data-placement$="-start"] [data-scope="float-button"][data-part="item"] {
  flex-direction: row;
}

[data-scope="float-button"][data-part="item-label"] {
  padding: var(--bs-padding-xs) var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-xs);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  pointer-events: none;
}

/* The fan folds, it never pops: actions fade and drift toward the
   trigger, and only once the fold has finished do they leave the
   reading order — visibility rounds the transition off, so a closed
   group is unfocusable without a bounce. States remain; animation does
   not. */
[data-scope="float-button"][data-part="item"] {
  transition:
    opacity var(--bs-duration-base) var(--bs-ease-out),
    translate var(--bs-duration-base) var(--bs-ease-spring),
    visibility var(--bs-duration-base);
}

[data-scope="float-button"][data-part="item-label"] {
  transition: opacity var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="float-button"][data-part="root"][data-state="closed"] [data-scope="float-button"][data-part="item"] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

[data-scope="float-button"][data-part="root"][data-placement^="bottom"][data-state="closed"] [data-scope="float-button"][data-part="item"] {
  translate: 0 var(--bs-space-2);
}

[data-scope="float-button"][data-part="root"][data-placement^="top"][data-state="closed"] [data-scope="float-button"][data-part="item"] {
  translate: 0 calc(var(--bs-space-2) * -1);
}

[data-scope="float-button"][data-part="root"][data-state="closed"] [data-scope="float-button"][data-part="item-label"] {
  opacity: 0;
}
`;
