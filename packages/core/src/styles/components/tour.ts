import { primaryTriggerCss } from "./shared";
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
  /* Same ladder as the backdrop, one rung up — the machine's inline
     --z-index: auto defeats a var() fallback. */
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  /* Zag's tooltip steps compose their inline z from this consumer-side
     base; without it the calc is invalid and the backdrop out-stacks the
     card. */
  --tour-z-index: var(--bs-z-overlay);
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
  gap: var(--bs-gap-xs);
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
  margin: 0 0 var(--bs-margin-sm);
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
  gap: var(--bs-gap-sm);
  margin-block-start: var(--bs-margin-sm);
}

/* Advancing the tour is a primary action — ink, solemn. */` +
  primaryTriggerCss(
    "tour",
    "action-trigger",
    "var(--bs-control-height-sm)",
    "var(--bs-font-size-sm)",
  ) +
  /* css */ `[data-scope="tour"][data-part="close-trigger"] {
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

[data-scope="tour"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="tour"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
