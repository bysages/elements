import { inputStateCss } from "./shared";
import { labelCss, popupContentCss, positionerCss } from "./shared";

export const comboboxCss =
  labelCss("combobox") +
  positionerCss("combobox") +
  popupContentCss("combobox", "17rem") +
  /* css */ `
[data-scope="combobox"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="combobox"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

/* The field itself carries the control recipe: border + surface + focus
   halo, never a shadow lift. */` +
  /* css */ `
[data-scope="combobox"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  box-shadow: var(--bs-shadow-xs);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}
` +
  inputStateCss("combobox") +
  /* css */ `/* The open and clear triggers are icon-sized siblings of the input — the
   same control recipe as the date-picker trigger, so the row reads as one
   instrument. */
[data-scope="combobox"][data-part="trigger"],
[data-scope="combobox"][data-part="clear-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="combobox"][data-part="trigger"]:hover:not([data-disabled]),
[data-scope="combobox"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="combobox"][data-part="trigger"]:focus-visible,
[data-scope="combobox"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="combobox"][data-part="trigger"]:active:not([data-disabled]),
[data-scope="combobox"][data-part="clear-trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="combobox"][data-part="trigger"][data-disabled],
[data-scope="combobox"][data-part="clear-trigger"][data-disabled] {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="combobox"][data-part="trigger"] svg,
[data-scope="combobox"][data-part="clear-trigger"] svg {
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
}

/* Inside the vessel the list keeps a hair of breathing room and scrolls
   against the machine's measured height. */
[data-scope="combobox"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  max-block-size: min(var(--available-height, 18rem), 18rem);
  padding: var(--bs-padding-xs);
  overflow-y: auto;
}

[data-scope="combobox"][data-part="list"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
}

[data-scope="combobox"][data-part="item-group"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
}

[data-scope="combobox"][data-part="item-group"] + [data-part="item-group"] {
  margin-block-start: var(--bs-margin-sm);
}

/* Group headings stay out of the list's way: small, tracked, uppercase. */
[data-scope="combobox"][data-part="item-group-label"] {
  padding: var(--bs-padding-xs) var(--bs-padding-sm);
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
[data-scope="combobox"][data-part="item"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-sm);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="combobox"][data-part="item"] mark {
  background: transparent;
  color: var(--bs-color-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="combobox"][data-part="item"]:hover:not([data-state="checked"], [data-disabled]),
[data-scope="combobox"][data-part="item"][data-highlighted]:not([data-state="checked"]) {
  background: var(--bs-color-surface-0);
}

[data-scope="combobox"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="combobox"][data-part="item"][data-state="checked"] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="combobox"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="combobox"][data-part="item-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="combobox"][data-part="item-indicator"] {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

[data-scope="combobox"][data-part="item-indicator"] svg {
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
}
`;
