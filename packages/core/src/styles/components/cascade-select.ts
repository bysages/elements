import { popupContentCss, positionerCss } from "./shared";

export const cascadeSelectCss =
  positionerCss("cascade-select") +
  popupContentCss("cascade-select", "0rem") +
  /* css */ `
/* The trigger reads as a field — the input recipe — with the joined
   labels as its ink and a quiet chevron at the inline end. */
[data-scope="cascade-select"][data-part="control"] {
  display: flex;
  inline-size: 100%;
}

[data-scope="cascade-select"][data-part="trigger"] {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-sm);
  inline-size: 100%;
  block-size: var(--bs-control-height-md);
  padding-inline: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  text-align: start;
  cursor: pointer;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="cascade-select"][data-part="trigger"][data-placeholder-shown]
  [data-part="value-text"] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="cascade-select"][data-part="trigger"]:hover:not(:focus):not(:disabled) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="cascade-select"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="cascade-select"][data-part="trigger"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="cascade-select"][data-part="trigger"]:disabled {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="cascade-select"][data-part="indicator"] {
  display: grid;
  place-items: center;
  color: var(--bs-color-text-tertiary);
}

[data-scope="cascade-select"][data-part="indicator"] svg {
  inline-size: var(--bs-space-4);
  block-size: var(--bs-space-4);
  transition: transform var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="cascade-select"][data-part="trigger"][data-state="open"]
  [data-part="indicator"]
  svg {
  transform: rotate(180deg);
}

/* The vessel is a corridor: one column per walked level, a hairline
   between neighbours, each column scrolling past its own grove. While a
   query runs the corridor folds into one flat column of matching paths. */
[data-scope="cascade-select"][data-part="content"] {
  display: flex;
  flex-wrap: wrap;
}

[data-scope="cascade-select"][data-part="search"] {
  flex: none;
  inline-size: 100%;
  padding: var(--bs-padding-sm);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="cascade-select"][data-part="match"] {
  display: flex;
  align-items: center;
  inline-size: 100%;
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  text-align: start;
  cursor: pointer;
}

[data-scope="cascade-select"][data-part="match"]:hover {
  background: var(--bs-color-surface-0);
}

[data-scope="cascade-select"][data-part="match"][data-selected] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
}

[data-scope="cascade-select"][data-part="empty"] {
  margin: 0;
  padding: var(--bs-padding-lg) var(--bs-padding-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-align: center;
}

[data-scope="cascade-select"][data-part="list"] {
  box-sizing: border-box;
  flex-shrink: 0;
  min-inline-size: 11rem;
  max-block-size: 16rem;
  margin: 0;
  padding: var(--bs-padding-xs);
  list-style: none;
  overflow-block: auto;
}

[data-scope="cascade-select"][data-part="list"] + [data-part="list"] {
  border-inline-start: 1px solid var(--bs-color-border);
}

[data-scope="cascade-select"][data-part="item"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
}

[data-scope="cascade-select"][data-part="item"]:hover:not([data-state="checked"], [data-disabled]),
[data-scope="cascade-select"][data-part="item"][data-highlighted]:not([data-state="checked"]) {
  background: var(--bs-color-surface-0);
}

[data-scope="cascade-select"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="cascade-select"][data-part="item"][data-state="checked"] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="cascade-select"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="cascade-select"][data-part="item-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="cascade-select"][data-part="branch-indicator"],
[data-scope="cascade-select"][data-part="item-indicator"] {
  display: grid;
  place-items: center;
  color: var(--bs-color-text-tertiary);
}

[data-scope="cascade-select"][data-part="branch-indicator"] svg,
[data-scope="cascade-select"][data-part="item-indicator"] svg {
  inline-size: var(--bs-space-4);
  block-size: var(--bs-space-4);
}

[data-scope="cascade-select"][data-part="item"][data-state="checked"] [data-part="item-indicator"],
[data-scope="cascade-select"][data-part="item"][data-highlighted] [data-part="branch-indicator"] {
  color: currentColor;
}
`;
