export const toastCss = /* css */ `
/* The group is one placement region (top-right, bottom-end, …) the machine
   pins itself; it only stacks its toasts. */
[data-scope="toast"][data-part="group"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

/* Each toast rides the popup vessel — paper, one hairline, radius-lg —
   while the machine drives its enter and exit through --x/--y/--opacity. */
[data-scope="toast"][data-part="root"] {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bs-space-1);
  /* The root is absolutely positioned against the group, whose in-flow box
     is empty, so a percentage inline-size collapses to zero — size the card
     outright and let the viewport be the only cap. */
  inline-size: min(22rem, calc(100vw - 2 * var(--bs-space-4)));
  padding: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-3);
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  translate: var(--x, 0) var(--y, 0);
  scale: var(--scale, 1);
  opacity: var(--opacity, 1);
  block-size: var(--height, auto);
  overflow: hidden;
  will-change: translate, opacity, scale;
  transition:
    translate var(--bs-duration-base) var(--bs-ease-spring),
    scale var(--bs-duration-base) var(--bs-ease-spring),
    opacity var(--bs-duration-base) var(--bs-ease-out),
    height var(--bs-duration-base) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

/* Leaving is quicker than arriving — ink lifts off the page without
   lingering. */
[data-scope="toast"][data-part="root"][data-state="closed"] {
  transition:
    translate var(--bs-duration-base) var(--bs-ease-in),
    scale var(--bs-duration-base) var(--bs-ease-in),
    opacity var(--bs-duration-fast) var(--bs-ease-in),
    height var(--bs-duration-base) var(--bs-ease-in);
}

/* A pigment edge names the message's temper without repainting the paper:
   the title carries the pigment, the vessel stays ink. */
[data-scope="toast"][data-part="root"][data-type="success"] {
  --toast-accent: var(--bs-color-success);
}

[data-scope="toast"][data-part="root"][data-type="warning"] {
  --toast-accent: var(--bs-color-warning);
}

[data-scope="toast"][data-part="root"][data-type="error"] {
  --toast-accent: var(--bs-color-danger);
}

[data-scope="toast"][data-part="root"][data-type="info"] {
  --toast-accent: var(--bs-color-info);
}

[data-scope="toast"][data-part="title"] {
  margin: 0;
  color: var(--toast-accent, var(--bs-color-text-primary));
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="toast"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* The action is a quiet seal-cut chip: hairline on paper, deepening on
   hover, the focus halo doing the rest. */
[data-scope="toast"][data-part="action-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-block-start: var(--bs-space-2);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="toast"][data-part="action-trigger"]:hover {
  border-color: var(--bs-color-border-strong);
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="toast"][data-part="action-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="toast"][data-part="action-trigger"]:active {
  background: var(--bs-color-surface-inset);
}

[data-scope="toast"][data-part="close-trigger"] {
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

[data-scope="toast"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="toast"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
