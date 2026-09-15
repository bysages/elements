export const dialogCss = /* css */ `
[data-scope="dialog"][data-part="trigger"] {
  /* A colored surface casts in its own color. Composite elevation tokens
     resolve their vars at :root, so the tint enters here where the shadow
     is declared, mixed from the lighting parts. */
  --bs-shadow-color: color-mix(in oklab, var(--bs-color-primary) 20%, transparent);
  display: inline-grid;
  place-items: center;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  box-shadow: var(--bs-light-x) calc(1px * var(--bs-light-reach)) calc(2px * var(--bs-light-reach)) 0
    var(--bs-shadow-color);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

/* Hover lets the ink bleed — the shadow spreads while the fill deepens;
   the shadow trails the color by design (light needs time). */
[data-scope="dialog"][data-part="trigger"]:hover {
  background: var(--bs-color-primary-hover);
  box-shadow: var(--bs-light-x) calc(2px * var(--bs-light-reach)) calc(6px * var(--bs-light-reach))
    calc(-1px * var(--bs-light-reach)) var(--bs-shadow-color);
}

/* Pressing settles the button into the page: the shadow lets go. */
[data-scope="dialog"][data-part="trigger"]:active {
  background: var(--bs-color-primary-active);
  box-shadow: none;
}

[data-scope="dialog"][data-part="trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

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
  inline-size: min(32rem, 100%);
  max-block-size: 80dvh;
  overflow: auto;
  padding: var(--bs-padding-lg);
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
  margin: 0 0 var(--bs-space-2);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="dialog"][data-part="description"] {
  margin: 0 0 var(--bs-space-4);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="dialog"][data-part="close-trigger"] {
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

[data-scope="dialog"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="dialog"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
