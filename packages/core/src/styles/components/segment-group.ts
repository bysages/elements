import { labelCss } from "./shared";

export const segmentGroupCss =
  labelCss("segment-group") +
  /* css */ `
/* A tray of seals: the group carries the one hairline, the items stay
   transparent, and the ink fill travels between them as the indicator. */
[data-scope="segment-group"][data-part="root"] {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  gap: var(--bs-space-1);
  padding: var(--bs-space-1);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
}

[data-scope="segment-group"][data-part="root"][data-orientation="vertical"] {
  flex-direction: column;
}

[data-scope="segment-group"][data-part="root"][data-disabled] {
  background: var(--bs-color-surface-inset);
}

/* The moving ink: a flat primary plate the machine slides under the
   checked item. Its geometry arrives as --left/--top/--width/--height. */
[data-scope="segment-group"][data-part="indicator"] {
  position: absolute;
  inset-block-start: var(--top);
  inset-inline-start: var(--left);
  inline-size: var(--width);
  block-size: var(--height);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary);
  z-index: 0;
  transition:
    inset-block-start var(--bs-duration-fast) var(--bs-ease-out),
    inset-inline-start var(--bs-duration-fast) var(--bs-ease-out),
    inline-size var(--bs-duration-fast) var(--bs-ease-out),
    block-size var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="segment-group"][data-part="item"] {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  box-sizing: border-box;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  user-select: none;
  cursor: pointer;
}

/* Vertical items fill the tray through the flex cross-axis default
   (align-items: stretch); an inline-size percentage here resolves
   circularly against the hug-sized root and pushes the item past it. */
[data-scope="segment-group"][data-part="item"][data-orientation="vertical"] {
  justify-content: flex-start;
}

[data-scope="segment-group"][data-part="item"]:hover:not([data-state="checked"], [data-disabled]) {
  color: var(--bs-color-text-primary);
}

[data-scope="segment-group"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
  z-index: 1;
}

/* Checked text rides on the travelling ink: on-primary, quiet. */
[data-scope="segment-group"][data-part="item"][data-state="checked"] {
  color: var(--bs-color-primary-text);
}

[data-scope="segment-group"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The text sits above the plate; the control is the machine's hidden
   plumbing and never renders. */
[data-scope="segment-group"][data-part="item-text"] {
  position: relative;
  z-index: 1;
}

[data-scope="segment-group"][data-part="item-control"] {
  display: none;
}

[data-scope="segment-group"][data-part="item-hidden-input"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
`;
