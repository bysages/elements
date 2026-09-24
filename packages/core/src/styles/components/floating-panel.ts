import { popupContentCss, positionerCss } from "./shared";

export const floatingPanelCss =
  positionerCss("floating-panel") +
  popupContentCss("floating-panel", "20rem") +
  /* css */ `
[data-scope="floating-panel"][data-part="positioner"] {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

/* A draggable sheet is the popup vessel let loose: same paper, same
   hairline, same entrance — it just carries its own coordinates and
   answers the pointer again. */
[data-scope="floating-panel"][data-part="content"] {
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  transition: box-shadow 220ms var(--bs-ease-out);
}

/* The sheet that sits behind every other keeps its place in the stack, and
   the one behind the stack dims — depth reads even while panels pile up. */
[data-scope="floating-panel"][data-part="content"][data-topmost] {
  box-shadow: var(--bs-elevation-4);
}

[data-scope="floating-panel"][data-part="content"][data-behind] {
  opacity: 0.6;
}

[data-scope="floating-panel"][data-part="trigger"] {
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
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="floating-panel"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
}

[data-scope="floating-panel"][data-part="trigger"]:active {
  box-shadow: none;
}

[data-scope="floating-panel"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="floating-panel"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The header is the handle: the grip lives in the cursor, and the paper
   darkens a shade while the sheet is under tow. */
[data-scope="floating-panel"][data-part="header"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
  padding: var(--bs-space-2) var(--bs-padding-md);
  border-block-end: 1px solid var(--bs-color-border);
  background: var(--bs-color-surface-0);
  cursor: grab;
  user-select: none;
  touch-action: none;
}

[data-scope="floating-panel"][data-part="header"]:active {
  cursor: grabbing;
}

[data-scope="floating-panel"][data-part="title"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  margin: 0;
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="floating-panel"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
}

/* Stage, close and drag triggers are one family of small seals; the drag
   trigger hides behind the header it animates. */
[data-scope="floating-panel"][data-part="stage-trigger"],
[data-scope="floating-panel"][data-part="close-trigger"] {
  display: inline-grid;
  place-items: center;
  inline-size: var(--bs-part-size-lg);
  block-size: var(--bs-part-size-lg);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="floating-panel"][data-part="stage-trigger"]:hover:not([data-disabled]),
[data-scope="floating-panel"][data-part="close-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="floating-panel"][data-part="stage-trigger"]:focus-visible,
[data-scope="floating-panel"][data-part="close-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="floating-panel"][data-part="stage-trigger"][data-disabled],
[data-scope="floating-panel"][data-part="close-trigger"][data-disabled] {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="floating-panel"][data-part="drag-trigger"] {
  display: contents;
}

[data-scope="floating-panel"][data-part="body"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-3);
  flex: 1 1 auto;
  overflow: auto;
  padding: var(--bs-padding-md);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* The resize edges are invisible hits along the sheet's rim; the machine
   names the axis, the geometry follows it. */
[data-scope="floating-panel"][data-part="resize-trigger"] {
  position: absolute;
  z-index: 1;
  touch-action: none;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="n"],
[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="s"] {
  inline-size: 90%;
  block-size: var(--bs-space-2);
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="n"] {
  inset-block-start: 0;
  inset-inline: 0;
  margin-inline: auto;
  cursor: ns-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="s"] {
  inset-block-end: 0;
  inset-inline: 0;
  margin-inline: auto;
  cursor: ns-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="e"],
[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="w"] {
  inline-size: var(--bs-space-2);
  block-size: 90%;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="e"] {
  inset-inline-end: 0;
  inset-block: 0;
  margin-block: auto;
  cursor: ew-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="w"] {
  inset-inline-start: 0;
  inset-block: 0;
  margin-block: auto;
  cursor: ew-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="ne"],
[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="nw"],
[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="se"],
[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="sw"] {
  inline-size: var(--bs-space-3);
  block-size: var(--bs-space-3);
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="ne"] {
  inset-block-start: 0;
  inset-inline-end: 0;
  cursor: nesw-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="nw"] {
  inset-block-start: 0;
  inset-inline-start: 0;
  cursor: nwse-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="se"] {
  inset-block-end: 0;
  inset-inline-end: 0;
  cursor: nwse-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-axis="sw"] {
  inset-block-end: 0;
  inset-inline-start: 0;
  cursor: nesw-resize;
}

[data-scope="floating-panel"][data-part="resize-trigger"][data-disabled] {
  cursor: default;
}
`;
