import { inputStateCss } from "./shared";
import {
  labelCss,
  optionListCss,
  popupContentCss,
  positionerCss,
  shrinkingTextCss,
} from "./shared";

export const comboboxCss =
  labelCss("combobox") +
  positionerCss("combobox") +
  popupContentCss("combobox", "17rem") +
  shrinkingTextCss("combobox", "item-text") +
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
  border: var(--bs-hairline) solid var(--bs-color-border);
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
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-shadow) var(--bs-ease-out);
}

[data-scope="combobox"][data-part="trigger"]:hover:not([data-disabled]):not(:focus-visible),
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

` +
  optionListCss("combobox", { mark: true }) +
  /* css */ `
/* Size rungs: the root's data-size re-points the ladder for everything
   inside — the input and its icon-sized triggers move together. */
[data-scope="combobox"][data-part="root"][data-size="sm"] [data-part="input"] {
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  font-size: var(--bs-font-size-sm);
}

[data-scope="combobox"][data-part="root"][data-size="sm"] [data-part="trigger"],
[data-scope="combobox"][data-part="root"][data-size="sm"] [data-part="clear-trigger"] {
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
}

[data-scope="combobox"][data-part="root"][data-size="lg"] [data-part="input"] {
  block-size: var(--bs-control-height-lg);
  padding: 0 var(--bs-padding-lg);
}

[data-scope="combobox"][data-part="root"][data-size="lg"] [data-part="trigger"],
[data-scope="combobox"][data-part="root"][data-size="lg"] [data-part="clear-trigger"] {
  inline-size: var(--bs-control-height-lg);
  block-size: var(--bs-control-height-lg);
}
`;
