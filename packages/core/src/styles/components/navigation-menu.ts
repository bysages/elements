import { popupContentCss } from "./shared";

export const navigationMenuCss =
  popupContentCss("navigation-menu", "18rem") +
  /* css */ `
[data-scope="navigation-menu"][data-part="root"] {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

[data-scope="navigation-menu"][data-part="list"] {
  position: relative;
  display: flex;
  gap: var(--bs-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

[data-scope="navigation-menu"][data-part="list"][data-orientation="vertical"] {
  flex-direction: column;
}

[data-scope="navigation-menu"][data-part="item"] {
  position: relative;
}

/* A menubar trigger is a ghost of a control: it has no border of its own and
   borrows the surface only while it leans open. */
[data-scope="navigation-menu"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="navigation-menu"][data-part="trigger"]:hover:not([data-disabled]),
[data-scope="navigation-menu"][data-part="trigger"][data-state="open"] {
  background: var(--bs-color-surface-0);
}

[data-scope="navigation-menu"][data-part="trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="navigation-menu"][data-part="trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="navigation-menu"][data-part="link"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="navigation-menu"][data-part="link"]:hover:not([data-disabled], [data-current]) {
  background: var(--bs-color-surface-0);
}

/* The page the reader stands on is inked in primary — and hover never
   repaints it. */
[data-scope="navigation-menu"][data-part="link"][data-current] {
  color: var(--bs-color-primary);
}

[data-scope="navigation-menu"][data-part="link"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="navigation-menu"][data-part="link"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The underline of the hovered tab: one stroke of primary that slides to
   where the machine measured it, in --trigger-x / --trigger-width. */
[data-scope="navigation-menu"][data-part="indicator"] {
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  block-size: 2px;
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary);
  translate: var(--trigger-x, 0) 0;
  inline-size: var(--trigger-width, 0);
  transition:
    translate 200ms var(--bs-ease-out),
    inline-size 200ms var(--bs-ease-out);
}

/* The panel is the shared popup vessel (surface, hairline, elevation,
   ink-in). The positioner hangs full-width under the bar and centers the
   stage on it — anchoring left would pin the panel to the root's edge,
   nowhere near the centered triggers. The empty stage must not catch
   pointers, so only the viewport takes them back. */
[data-scope="navigation-menu"][data-part="viewport-positioner"] {
  position: absolute;
  inset-block-start: 100%;
  inset-inline: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: var(--bs-z-overlay);
}

/* A vertical bar hangs its panel off the list's trailing edge — centering
   on the bar itself would throw the panel halfway out of the viewport,
   since the bar is only as wide as its widest trigger. */
[data-scope="navigation-menu"][data-part="root"][data-orientation="vertical"]
  [data-part="viewport-positioner"] {
  inset-block-start: 0;
  inset-inline-start: 100%;
  inset-inline-end: auto;
  justify-content: flex-start;
}

[data-scope="navigation-menu"][data-part="viewport"] {
  position: relative;
  inline-size: max-content;
  pointer-events: auto;
}

[data-scope="navigation-menu"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  padding: var(--bs-padding-md);
}

/* Inside the panel a link is a card, not a bar row: it leaves the bar's
   inline register (which would sit two cards side by side on one line),
   grows with its two lines of ink — title over description — and the
   cards stack with a whisper of daylight between. Border-box keeps the
   full-width fill inside the panel's padding — without it the hover wash
   spills to the panel's very edge. */
[data-scope="navigation-menu"][data-part="content"] [data-part="link"] {
  box-sizing: border-box;
  display: flex;
  block-size: auto;
  align-items: flex-start;
  inline-size: 100%;
  padding: var(--bs-space-2) var(--bs-padding-md);
}

[data-scope="navigation-menu"][data-part="content"] [data-part="link"] + [data-part="link"] {
  margin-block-start: var(--bs-space-1);
}

[data-scope="navigation-menu"][data-part="item-indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1rem;
  block-size: 1rem;
  flex-shrink: 0;
  color: var(--bs-color-text-tertiary);
}

/* A menu arrow is a whisker of the same paper, tucked behind the vessel so
   only its tip and hairline show. */
[data-scope="navigation-menu"][data-part="arrow"] {
  --arrow-background: var(--bs-color-surface-2);
  --arrow-size: var(--bs-space-2);
  z-index: -1;
}

[data-scope="navigation-menu"][data-part="arrow-tip"] {
  border-top: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}
`;
