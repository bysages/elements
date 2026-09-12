import { popupContentCss } from "./shared";

export const tourCss =
  /* Widths differ per step type; the shared floor is dropped to 0. */
  popupContentCss("tour", "0") +
  /* css */ `
[data-scope="tour"][data-part="backdrop"] {
  position: fixed;
  inset: 0;
  background: var(--bs-color-scrim);
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0) - 1);
  transition: opacity var(--bs-duration-slow) var(--bs-ease-out);
}

/* The spotlight is the one lit rectangle on a dimmed page — it receives
   the focus halo, as if the page itself were focused on it. */
[data-scope="tour"][data-part="spotlight"] {
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-focus-ring);
  transition:
    opacity var(--bs-duration-base) var(--bs-ease-out),
    translate var(--bs-duration-base) var(--bs-ease-spring);
}

[data-scope="tour"][data-part="positioner"] {
  position: fixed;
  z-index: var(--z-index, var(--bs-z-overlay));
}

[data-scope="tour"][data-part="positioner"][data-type="dialog"] {
  inset: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--bs-padding-lg);
}

[data-scope="tour"][data-part="content"] {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  padding: var(--bs-padding-lg);
}

[data-scope="tour"][data-part="content"][data-type="tooltip"] {
  inline-size: min(20rem, 100%);
}

[data-scope="tour"][data-part="content"][data-type="dialog"] {
  inline-size: min(24rem, 100%);
}

[data-scope="tour"][data-part="arrow"] {
  --arrow-size: 10px;
  --arrow-background: var(--bs-color-surface-2);
}

[data-scope="tour"][data-part="arrow-tip"] {
  border-block-start: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}

[data-scope="tour"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="tour"][data-part="description"] {
  margin: 0 0 var(--bs-space-2);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="tour"][data-part="progress-text"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="tour"][data-part="control"] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--bs-space-2);
  margin-block-start: var(--bs-space-2);
}

/* Advancing the tour is a primary action — ink, solemn. */
[data-scope="tour"][data-part="action-trigger"] {
  --bs-shadow-color: color-mix(in oklab, var(--bs-color-primary) 20%, transparent);
  display: inline-grid;
  place-items: center;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  box-shadow: var(--bs-light-x) calc(1px * var(--bs-light-reach)) calc(2px * var(--bs-light-reach)) 0
    var(--bs-shadow-color);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="tour"][data-part="action-trigger"]:hover {
  background: var(--bs-color-primary-hover);
  box-shadow: var(--bs-light-x) calc(2px * var(--bs-light-reach)) calc(6px * var(--bs-light-reach))
    calc(-1px * var(--bs-light-reach)) var(--bs-shadow-color);
}

[data-scope="tour"][data-part="action-trigger"]:active {
  background: var(--bs-color-primary-active);
  box-shadow: none;
}

[data-scope="tour"][data-part="action-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tour"][data-part="close-trigger"] {
  position: absolute;
  inset-block-start: var(--bs-space-2);
  inset-inline-end: var(--bs-space-2);
  display: grid;
  place-items: center;
  inline-size: 1.75rem;
  block-size: 1.75rem;
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

[data-scope="tour"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="tour"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
