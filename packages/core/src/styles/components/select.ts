import { labelCss, popupContentCss, positionerCss } from "./shared";

export const selectCss =
  labelCss("select") +
  positionerCss("select") +
  popupContentCss("select", "17rem") +
  /* css */ `
[data-scope="select"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

/* The control is the field: the recipe's border, surface and focus halo
   ride on it, with the trigger and its passengers sitting inside. */
[data-scope="select"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
  inline-size: 100%;
  block-size: var(--bs-control-height-md);
  padding-inline-start: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="select"][data-part="control"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="select"][data-part="control"]:focus-within {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="select"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="select"][data-part="control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  box-shadow: none;
}

/* The trigger is the bare face of the field: no chrome of its own, the
   value ink as the visible choice. */
[data-scope="select"][data-part="trigger"] {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  align-self: stretch;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  text-align: start;
  cursor: pointer;
}

[data-scope="select"][data-part="trigger"]:focus-visible {
  outline: none;
}

/* An unchosen select reads as potential, not content: the value ink is
   quiet while the placeholder holds the field. */
[data-scope="select"][data-part="trigger"][data-placeholder-shown] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="select"][data-part="trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="select"][data-part="value-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: var(--bs-font-weight-medium);
}

/* The indicator and clear affordances are icon-sized passengers on the
   trigger's own chrome — no boxes of their own. */
[data-scope="select"][data-part="indicator"],
[data-scope="select"][data-part="clear-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition: color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="select"][data-part="indicator"] svg,
[data-scope="select"][data-part="clear-trigger"] svg {
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
}

[data-scope="select"][data-part="indicator"]:hover,
[data-scope="select"][data-part="clear-trigger"]:hover {
  color: var(--bs-color-text-primary);
}

[data-scope="select"][data-part="clear-trigger"]:focus-visible,
[data-scope="select"][data-part="indicator"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="select"][data-part="clear-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* Inside the vessel the list keeps a hair of breathing room and scrolls
   against the machine's measured height. */
[data-scope="select"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  max-block-size: min(var(--available-height, 18rem), 18rem);
  padding: var(--bs-space-1);
  overflow-y: auto;
}

[data-scope="select"][data-part="list"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
}

[data-scope="select"][data-part="item-group"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
}

[data-scope="select"][data-part="item-group"] + [data-part="item-group"] {
  margin-block-start: var(--bs-space-2);
}

/* Group headings stay out of the list's way: small, tracked, uppercase. */
[data-scope="select"][data-part="item-group-label"] {
  padding: var(--bs-space-1) var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
  user-select: none;
}

/* Items are quiet rows of ink: no fill at rest, the subtle surface only
   when asked. The checked row takes the flat primary fill and keeps it
   under the cursor. */
[data-scope="select"][data-part="item"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="select"][data-part="item"]:hover:not([data-state="checked"], [data-disabled]),
[data-scope="select"][data-part="item"][data-highlighted]:not([data-state="checked"]) {
  background: var(--bs-color-surface-0);
}

[data-scope="select"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="select"][data-part="item"][data-state="checked"] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="select"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="select"][data-part="item-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="select"][data-part="item-indicator"] {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

[data-scope="select"][data-part="item-indicator"] svg {
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
}
`;
