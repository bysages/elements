import { popupContentCss, positionerCss } from "./shared";

export const popoverCss =
  positionerCss("popover") +
  popupContentCss("popover", "20rem") +
  /* css */ `
[data-scope="popover"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-lg);
  transform-origin: var(--transform-origin);
}

/* The arrow is a whisker of the same paper, tucked behind the vessel so
   only its tip and hairline show. */
[data-scope="popover"][data-part="arrow"] {
  --arrow-background: var(--bs-color-surface-2);
  --arrow-size: var(--bs-space-2);
  z-index: -1;
}

[data-scope="popover"][data-part="arrow-tip"] {
  border-top: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}

/* The anchor wraps whatever the popover pins to; it never draws. */
[data-scope="popover"][data-part="anchor"] {
  display: inline-flex;
}

/* The trigger is a seal-cut control: paper on a hairline, deepening on
   hover, the shadow letting go under the press. */
[data-scope="popover"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-sm);
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
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="popover"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="popover"][data-part="trigger"]:active {
  box-shadow: none;
}

/* Open keeps the focus look: Zag hands focus to the popover itself, so
   :focus-visible alone would drop the halo the moment it opens. */
[data-scope="popover"][data-part="trigger"]:focus-visible,
[data-scope="popover"][data-part="trigger"][data-state="open"] {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="popover"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The chevron leans into the opening on the spring — puppets have strings. */
[data-scope="popover"][data-part="indicator"] {
  display: inline-flex;
  align-items: center;
  color: var(--bs-color-text-tertiary);
  transform-origin: center;
  transition: transform 200ms var(--bs-ease-spring);
}

[data-scope="popover"][data-part="trigger"][data-state="open"] [data-scope="popover"][data-part="indicator"] {
  transform: rotate(180deg);
}

/* Title rides the serif — a vessel carries a heading, not a control. */
[data-scope="popover"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="popover"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="popover"][data-part="close-trigger"] {
  position: absolute;
  inset-block-start: var(--bs-space-2);
  inset-inline-end: var(--bs-space-2);
  display: grid;
  place-items: center;
  inline-size: var(--bs-part-size-lg);
  block-size: var(--bs-part-size-lg);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="popover"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="popover"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
