import { inputStateCss } from "./shared";
import { labelCss, popupContentCss } from "./shared";

export const listboxCss =
  labelCss("listbox") +
  popupContentCss("listbox", "16rem") +
  /* css */ `
[data-scope="listbox"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The filter input rides the control recipe: a field, not a button —
   border + surface + focus halo, never a shadow lift. */` +
  /* css */ `
[data-scope="listbox"][data-part="input"] {
  box-sizing: border-box;
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
  inputStateCss("listbox") +
  /* css */ `[data-scope="listbox"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  max-block-size: 18rem;
  padding: var(--bs-padding-xs);
  overflow-y: auto;
}

[data-scope="listbox"][data-part="item-group"] {
  display: flex;
  flex-direction: column;
}

[data-scope="listbox"][data-part="item-group"] + [data-part="item-group"] {
  margin-block-start: var(--bs-margin-sm);
}

/* Group headings stay out of the list's way: small, tracked, uppercase. */
[data-scope="listbox"][data-part="item-group-label"] {
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
[data-scope="listbox"][data-part="item"] {
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

[data-scope="listbox"][data-part="item"]:hover:not([data-state="checked"], [data-disabled]),
[data-scope="listbox"][data-part="item"][data-highlighted]:not([data-state="checked"]) {
  background: var(--bs-color-surface-0);
}

[data-scope="listbox"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="listbox"][data-part="item"][data-state="checked"] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="listbox"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="listbox"][data-part="item-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="listbox"][data-part="item-indicator"] {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

[data-scope="listbox"][data-part="item-indicator"] svg {
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
}

[data-scope="listbox"][data-part="value-text"] {
  font-weight: var(--bs-font-weight-medium);
}
`;
