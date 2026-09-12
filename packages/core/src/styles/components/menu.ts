import { popupContentCss, positionerCss } from "./shared";

export const menuCss =
  positionerCss("menu") +
  popupContentCss("menu", "12rem") +
  /* css */ `
[data-scope="menu"][data-part="content"] {
  display: flex;
  flex-direction: column;
  padding: var(--bs-space-1);
  transform-origin: var(--transform-origin);
  overscroll-behavior: contain;
}

/* A menu arrow is a whisker of the same paper, tucked behind the vessel so
   only its tip and hairline show. */
[data-scope="menu"][data-part="arrow"] {
  --arrow-background: var(--bs-color-surface-2);
  --arrow-size: var(--bs-space-2);
  z-index: -1;
}

[data-scope="menu"][data-part="arrow-tip"] {
  border-top: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}

/* The trigger is a seal-cut control that leans open: the hairline deepens
   while the menu is up, echoing the pressed state without filling. */
[data-scope="menu"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="menu"][data-part="trigger"]:hover:not([data-disabled]),
[data-scope="menu"][data-part="trigger"][data-state="open"] {
  border-color: var(--bs-color-border-strong);
}

[data-scope="menu"][data-part="trigger"]:active {
  box-shadow: none;
}

[data-scope="menu"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="menu"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The right-click surface is terrain, not a control: it stays quiet so the
   menu it summons carries all the ink. */
[data-scope="menu"][data-part="context-trigger"] {
  display: block;
  user-select: none;
}

/* The chevron leans into the opening on the spring — puppets have strings. */
[data-scope="menu"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  color: var(--bs-color-text-tertiary);
  transform-origin: center;
  transition: transform 200ms var(--bs-ease-spring);
}

[data-scope="menu"][data-part="trigger"][data-state="open"] [data-scope="menu"][data-part="indicator"] {
  transform: rotate(180deg);
}

[data-scope="menu"][data-part="item-group"] {
  display: flex;
  flex-direction: column;
}

[data-scope="menu"][data-part="item-group"] + [data-scope="menu"][data-part="item-group"],
[data-scope="menu"][data-part="separator"] + [data-scope="menu"][data-part="item-group"] {
  margin-block-start: var(--bs-space-1);
}

/* Group labels whisper: small, tracked, never competing with the items. */
[data-scope="menu"][data-part="item-group-label"] {
  padding: var(--bs-space-2) var(--bs-padding-sm) var(--bs-space-1);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
}

/* Items are rows of light: hover is the machine's highlight, selection is
   the flat ink fill — and the two never stack. */
[data-scope="menu"][data-part="item"],
[data-scope="menu"][data-part="trigger-item"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="menu"][data-part="item"][data-highlighted]:not([data-state="checked"]),
[data-scope="menu"][data-part="trigger-item"][data-highlighted] {
  background: var(--bs-color-surface-0);
}

[data-scope="menu"][data-part="item"][data-state="checked"] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
}

[data-scope="menu"][data-part="item"][data-state="checked"][data-highlighted] {
  background: var(--bs-color-primary-hover);
}

[data-scope="menu"][data-part="item"]:focus-visible,
[data-scope="menu"][data-part="trigger-item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="menu"][data-part="item"][data-disabled],
[data-scope="menu"][data-part="trigger-item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  background: transparent;
  cursor: not-allowed;
}

/* A trigger item opens a submenu, so it points the way out. */
[data-scope="menu"][data-part="trigger-item"]::after {
  content: "›";
  margin-inline-start: auto;
  color: var(--bs-color-text-tertiary);
}

[data-scope="menu"][data-part="item-text"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="menu"][data-part="item-indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1rem;
  block-size: 1rem;
  flex-shrink: 0;
  color: var(--bs-color-primary);
}

[data-scope="menu"][data-part="item"][data-state="checked"] [data-scope="menu"][data-part="item-indicator"] {
  color: var(--bs-color-primary-text);
}

/* The divider is one hairline of rest between courses. */
[data-scope="menu"][data-part="separator"] {
  block-size: 1px;
  margin-block: var(--bs-space-1);
  border: none;
  background: var(--bs-color-border);
}
`;
