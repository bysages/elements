import {
  labelCss,
  optionListCss,
  popupContentCss,
  positionerCss,
  shrinkingTextCss,
} from "./shared";

export const selectCss =
  labelCss("select") +
  positionerCss("select") +
  popupContentCss("select", "17rem") +
  shrinkingTextCss("select", "value-text") +
  shrinkingTextCss("select", "item-text") +
  /* css */ `
[data-scope="select"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The control is the field: the recipe's border, surface and focus halo
   ride on it, with the trigger and its passengers sitting inside. */
[data-scope="select"][data-part="control"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  inline-size: 100%;
  block-size: var(--bs-control-height-md);
  padding-inline-start: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-shadow) var(--bs-ease-out);
}

[data-scope="select"][data-part="control"]:hover:not([data-disabled]):not(:focus-within):not([data-invalid]):not(:has([data-part="trigger"][data-state="open"])) {
  border-color: var(--bs-color-border-strong);
}

/* The halo rides the whole focused life of the field, pointer or
   keyboard alike. Opening the list moves the focus into it, so the
   open state takes the relay — the same ring, continuing without a
   flicker — instead of dropping it the moment the pointer works the
   list. */
[data-scope="select"][data-part="control"]:focus-within {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="select"][data-part="control"]:has([data-part="trigger"][data-state="open"]) {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="select"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="select"][data-part="control"][data-invalid]:focus-within,
[data-scope="select"][data-part="control"][data-invalid]:has([data-part="trigger"][data-state="open"]) {
  border-color: var(--bs-color-danger);
  box-shadow: inset 0 0 0 1px var(--bs-color-danger);
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
  gap: var(--bs-gap-sm);
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
  gap: var(--bs-gap-xs);
  max-block-size: min(var(--available-height, 18rem), 18rem);
  padding: var(--bs-padding-xs);
  overflow-y: auto;
}

` +
  optionListCss("select") +
  /* css */ `
/* Size rungs: the root's data-size re-points the ladder for everything
   inside — the control's height and ink register move together. */
[data-scope="select"][data-part="root"][data-size="sm"] [data-part="control"] {
  block-size: var(--bs-control-height-sm);
  padding-inline-start: var(--bs-padding-sm);
}

[data-scope="select"][data-part="root"][data-size="sm"] [data-part="trigger"] {
  font-size: var(--bs-font-size-sm);
}

[data-scope="select"][data-part="root"][data-size="lg"] [data-part="control"] {
  block-size: var(--bs-control-height-lg);
  padding-inline-start: var(--bs-padding-lg);
}

/* The bare native select wears the field recipe — the same hairline
   shell, the same halo — with the platform's own list behind it. The
   shell is a wrapper so the indicator rides beside the value as a real
   stroke, the same chevron the framed select shows. */
[data-scope="select"][data-part="native-root"] {
  position: relative;
  display: inline-flex;
  align-items: center;
  inline-size: 100%;
  min-inline-size: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="select"][data-part="native-root"] {
  block-size: var(--bs-control-height-md);
}

[data-scope="select"][data-part="native-root"][data-size="sm"] {
  block-size: var(--bs-control-height-sm);
}

[data-scope="select"][data-part="native-root"][data-size="lg"] {
  block-size: var(--bs-control-height-lg);
}

[data-scope="select"][data-part="native-root"]:hover:not([data-disabled]):not(:focus-within):not([data-invalid]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="select"][data-part="native-root"]:focus-within {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="select"][data-part="native-root"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="select"][data-part="native-root"][data-invalid]:focus-within {
  box-shadow: inset 0 0 0 1px var(--bs-color-danger);
}

[data-scope="select"][data-part="native-root"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
}

[data-scope="select"][data-part="native"] {
  appearance: none;
  outline: none;
  flex: 1;
  min-inline-size: 0;
  block-size: 100%;
  border: none;
  background: transparent;
  padding-inline: var(--bs-padding-md);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  text-overflow: ellipsis;
  cursor: pointer;
}

[data-scope="select"][data-part="native-root"][data-size="sm"] [data-part="native"] {
  padding-inline: var(--bs-padding-sm);
  font-size: var(--bs-font-size-sm);
}

[data-scope="select"][data-part="native-root"][data-size="lg"] [data-part="native"] {
  padding-inline: var(--bs-padding-lg);
}

/* An unchosen select reads as potential, not content: the placeholder
   ink stays quiet, exactly as the framed trigger's does. */
[data-scope="select"][data-part="native-root"][data-placeholder-shown] [data-part="native"] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="select"][data-part="native-root"][data-disabled] [data-part="native"] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="select"][data-part="native-icon"] {
  flex: none;
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
  margin-inline-end: var(--bs-padding-md);
  color: var(--bs-color-text-tertiary);
  pointer-events: none;
}

[data-scope="select"][data-part="native-root"][data-size="sm"] [data-part="native-icon"] {
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
  margin-inline-end: var(--bs-padding-sm);
}

[data-scope="select"][data-part="native-root"][data-size="lg"] [data-part="native-icon"] {
  margin-inline-end: var(--bs-padding-lg);
}
`;
