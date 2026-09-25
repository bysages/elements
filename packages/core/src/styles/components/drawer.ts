import { positionerCss } from "./shared";

export const drawerCss =
  positionerCss("drawer") +
  /* css */ `
/* The positioner seats the sheet against the edge its swipe direction
   names; the machine's inline transform carries the gesture. */
[data-scope="drawer"][data-part="positioner"] {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

[data-scope="drawer"][data-part="positioner"][data-swipe-direction="up"] {
  align-items: flex-start;
}

[data-scope="drawer"][data-part="positioner"][data-swipe-direction="left"] {
  align-items: stretch;
  justify-content: flex-start;
}

[data-scope="drawer"][data-part="positioner"][data-swipe-direction="right"] {
  align-items: stretch;
  justify-content: flex-end;
}

[data-scope="drawer"][data-part="backdrop"] {
  position: fixed;
  inset: 0;
  /* One below its positioner, from the same shared base — chrome like the
     sticky header (overlay - 20) must fall under the scrim. */
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0) - 1);
  background: var(--bs-color-scrim);
  transition: opacity var(--bs-duration-slow) var(--bs-ease-out);
}

/* The drawer is dialog-family at full height: the same white sheet, one
   hairline, entering on elevation-4 and settling on 5 — but cut flush to
   the edge it rises from, so only the working corners stay round. */
[data-scope="drawer"][data-part="content"] {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Section rhythm — 16px, shared with the dialog; the sheet's own
     margins are generous enough at the padding below. */
  gap: var(--bs-space-4);
  inline-size: 100%;
  max-block-size: 92dvh;
  overflow: auto;
  /* Vessel padding — 24px, room for the sheet's full measure. */
  padding: var(--bs-padding-xl);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg) var(--bs-radius-lg) 0 0;
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-4);
  outline: none;
  transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0);
  transition:
    box-shadow var(--bs-duration-base) var(--bs-ease-out),
    border-radius var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="drawer"][data-part="content"][data-swipe-direction="up"] {
  border-radius: 0 0 var(--bs-radius-lg) var(--bs-radius-lg);
}

/* A side sheet keeps a drawer's measure, not the canvas': at full width
   the rounded lip lands on the screen edge and wears a see-through
   notch. Capped, the lip hangs over the page where a rounded corner
   belongs. */
[data-scope="drawer"][data-part="content"][data-swipe-direction="left"] {
  inline-size: min(24rem, 85%);
  max-block-size: none;
  border-radius: 0 var(--bs-radius-lg) var(--bs-radius-lg) 0;
}

[data-scope="drawer"][data-part="content"][data-swipe-direction="right"] {
  inline-size: min(24rem, 85%);
  max-block-size: none;
  border-radius: var(--bs-radius-lg) 0 0 var(--bs-radius-lg);
}

[data-scope="drawer"][data-part="content"]:focus,
[data-scope="drawer"][data-part="content"]:focus-visible {
  outline: none;
}

/* The sheet slides in from its own edge and dissolves out — ink settling,
   then lifting, never a pop. */
[data-scope="drawer"][data-state="open"][data-part="content"] {
  box-shadow: var(--bs-elevation-5);
  animation: bs-drawer-slide-in var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="drawer"][data-state="closed"][data-part="content"] {
  animation: bs-drawer-slide-out var(--bs-duration-base) var(--bs-ease-in);
}

/* The grabber is the handle — the one place a control invites the hand. */
[data-scope="drawer"][data-part="grabber"] {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: 100%;
  padding-block: var(--bs-space-2);
  cursor: grab;
  touch-action: none;
  user-select: none;
}

[data-scope="drawer"][data-part="grabber"][data-swiping] {
  cursor: grabbing;
}

[data-scope="drawer"][data-part="grabber-indicator"] {
  inline-size: var(--bs-space-8);
  block-size: var(--bs-space-1);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-border-strong);
}

[data-scope="drawer"][data-part="grabber"]:hover [data-scope="drawer"][data-part="grabber-indicator"] {
  background: var(--bs-color-text-tertiary);
}

/* A side sheet's handle turns on its side and rides the leading edge:
   the hand drags along the same axis it dismisses, so the bar reads as
   a rail, not a lid. */
[data-scope="drawer"][data-part="content"][data-swipe-direction="left"] [data-scope="drawer"][data-part="grabber"],
[data-scope="drawer"][data-part="content"][data-swipe-direction="right"] [data-scope="drawer"][data-part="grabber"] {
  position: absolute;
  inset-block: 0;
  inline-size: auto;
  padding-inline: var(--bs-space-2);
}

[data-scope="drawer"][data-part="content"][data-swipe-direction="left"] [data-scope="drawer"][data-part="grabber"] {
  inset-inline-start: 0;
}

[data-scope="drawer"][data-part="content"][data-swipe-direction="right"] [data-scope="drawer"][data-part="grabber"] {
  inset-inline-end: 0;
}

[data-scope="drawer"][data-part="content"][data-swipe-direction="left"] [data-scope="drawer"][data-part="grabber-indicator"],
[data-scope="drawer"][data-part="content"][data-swipe-direction="right"] [data-scope="drawer"][data-part="grabber-indicator"] {
  inline-size: var(--bs-space-1);
  block-size: var(--bs-space-8);
}

/* The trigger is a seal-cut control: paper on a hairline, deepening on
   hover, the shadow letting go under the press. */
[data-scope="drawer"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

[data-scope="drawer"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="drawer"][data-part="trigger"]:active {
  box-shadow: none;
}

[data-scope="drawer"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="drawer"][data-part="trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="drawer"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="drawer"][data-part="description"] {
  /* The description belongs to the title, not to the body — pull it out
     of the section rhythm so the pair reads as one header (8px). */
  margin: calc(var(--bs-space-2) - var(--bs-space-4)) 0 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="drawer"][data-part="close-trigger"] {
  position: absolute;
  inset-block-start: var(--bs-space-3);
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

[data-scope="drawer"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="drawer"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

/* The swipe area is the touch margin outside the sheet that still drags
   it open; it never draws. */
[data-scope="drawer"][data-part="swipe-area"] {
  position: fixed;
  z-index: calc(var(--bs-z-overlay) - 1);
  background: transparent;
}

@keyframes bs-drawer-slide-in {
  from {
    transform: translate3d(var(--bs-drawer-from-x, 0), var(--bs-drawer-from-y, 100%), 0);
  }

  to {
    transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0);
  }
}

@keyframes bs-drawer-slide-out {
  from {
    transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0);
  }

  to {
    transform: translate3d(var(--bs-drawer-from-x, 0), var(--bs-drawer-from-y, 100%), 0);
  }
}

/* Each edge slides from its own side. */
[data-scope="drawer"][data-swipe-direction="bottom"] {
  --bs-drawer-from-y: 100%;
  --bs-drawer-from-x: 0;
}

[data-scope="drawer"][data-swipe-direction="up"] {
  --bs-drawer-from-y: -100%;
  --bs-drawer-from-x: 0;
}

[data-scope="drawer"][data-swipe-direction="left"] {
  --bs-drawer-from-y: 0;
  --bs-drawer-from-x: -100%;
}

[data-scope="drawer"][data-swipe-direction="right"] {
  --bs-drawer-from-y: 0;
  --bs-drawer-from-x: 100%;
}
`;
