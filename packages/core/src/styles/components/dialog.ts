import { closeTriggerCss, primaryTriggerCss } from "./shared";

export const dialogCss =
  primaryTriggerCss("dialog", "trigger") +
  /* css */ `
[data-scope="dialog"][data-part="backdrop"] {
  position: fixed;
  inset: 0;
  /* One below its positioner, from the same shared base — chrome like the
     sticky header (overlay - 20) must fall under the scrim. */
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0) - 1);
  background: var(--bs-color-scrim);
  transition: opacity var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="dialog"][data-part="positioner"] {
  position: fixed;
  inset: 0;
  /* One above its backdrop on the shared base: the machine's inline
     --z-index: auto defeats a var() fallback, so the ladder rides the
     layer index directly. */
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  display: grid;
  place-items: center;
  padding: var(--bs-padding-lg);
}

/* The dialog owns the top of the restraint ladder: a white sheet with a
   hairline, entering on elevation-4 and settling on 5. */
[data-scope="dialog"][data-part="content"]:focus,
[data-scope="dialog"][data-part="content"]:focus-visible {
  outline: none;
}

[data-scope="dialog"][data-part="content"] {
  position: relative;
  box-sizing: border-box;
  display: grid;
  /* Section rhythm — 16px between header, body, and actions; the sheet's
     own margins are generous enough at the padding below. */
  gap: var(--bs-gap-lg);
  inline-size: min(32rem, 100%);
  max-block-size: 80dvh;
  overflow: auto;
  /* Vessel padding — 24px; a 512px sheet reads cramped on 16. */
  padding: var(--bs-padding-xl);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-4);
  transition:
    opacity var(--bs-duration-base) var(--bs-ease-out),
    translate var(--bs-duration-base) var(--bs-ease-spring),
    box-shadow var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="dialog"][data-state="open"][data-part="content"] {
  box-shadow: var(--bs-elevation-5);
  /* The sheet dissolves in — ink settling into paper, not a pop. */
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="dialog"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="dialog"][data-part="description"] {
  /* The description belongs to the title, not to the body — pull it out
     of the section rhythm so the pair reads as one header (8px). */
  margin: calc(var(--bs-margin-sm) - var(--bs-margin-lg)) 0 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}
` +
  closeTriggerCss("dialog");
