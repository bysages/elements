/** Fragments shared by component stylesheets. Every floating part in the
 * system (date-picker, popover, menu, select, …) sits on the same popup
 * chrome, and every field part carries the same label — built here, scoped
 * per component, so the recipes stay identical instead of drifting. */

/** The dismissible-layer ladder: one shared z-index base, ordered by the
 * machine's `--layer-index`, so any nesting combination stacks correctly.
 * The machine writes `--z-index: auto` when no nested layer is in play,
 * which would defeat a var() fallback — so the overlay baseline rides the
 * layer index directly, exactly like the content's. */
export function positionerCss(scope: string): string {
  return /* css */ `
[data-scope="${scope}"][data-part="positioner"] {
  position: absolute;
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
}
`;
}

/** A popup vessel: paper surface, one hairline, elevation 3, entering as
 * ink dissolving into paper. Never a hard pop. */
export function popupContentCss(scope: string, minInlineSize = "17rem"): string {
  return /* css */ `
[data-scope="${scope}"][data-part="content"] {
  box-sizing: border-box;
  min-inline-size: ${minInlineSize};
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-3);
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  outline: none;
}

[data-scope="${scope}"][data-part="content"]:focus,
[data-scope="${scope}"][data-part="content"]:focus-visible {
  outline: none;
}

[data-scope="${scope}"][data-state="open"][data-part="content"] {
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}
`;
}

/** A field label: small, tracked, quiet — and never fights the control for
 * attention. */
export function labelCss(scope: string): string {
  return /* css */ `
[data-scope="${scope}"][data-part="label"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
}

[data-scope="${scope}"][data-part="label"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

[data-scope="${scope}"][data-part="label"][data-invalid] {
  color: var(--bs-color-danger);
}
`;
}

/** The corner close button every dismissible vessel carries — square-cut,
 * quiet until hovered. The two insets belong to the vessel's own padding,
 * so they arrive as arguments. */
export function closeTriggerCss(
  scope: string,
  blockStart = "var(--bs-space-3)",
  inlineEnd = "var(--bs-space-3)",
): string {
  return /* css */ `
[data-scope="${scope}"][data-part="close-trigger"] {
  position: absolute;
  inset-block-start: ${blockStart};
  inset-inline-end: ${inlineEnd};
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
[data-scope="${scope}"][data-part="close-trigger"]:hover {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}
[data-scope="${scope}"][data-part="close-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
}

/** A primary-filled trigger — the solemn ink button — with the ink-bleed
 * press rhythm: the shadow spreads slower than the fill deepens, and
 * lets go entirely on press. */
export function primaryTriggerCss(
  scope: string,
  part: string,
  controlHeight = "var(--bs-control-height-md)",
  fontSize = "var(--bs-font-size-md)",
): string {
  return /* css */ `
[data-scope="${scope}"][data-part="${part}"] {
  /* A colored surface casts in its own color. Composite elevation tokens
     resolve their vars at :root, so the tint enters here where the shadow
     is declared, mixed from the lighting parts. */
  --bs-shadow-color: color-mix(in oklab, var(--bs-color-primary) 20%, transparent);
  display: inline-grid;
  place-items: center;
  block-size: ${controlHeight};
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font: inherit;
  font-size: ${fontSize};
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
[data-scope="${scope}"][data-part="${part}"]:hover {
  background: var(--bs-color-primary-hover);
  box-shadow: var(--bs-light-x) calc(2px * var(--bs-light-reach)) calc(6px * var(--bs-light-reach))
    calc(-1px * var(--bs-light-reach)) var(--bs-shadow-color);
}

/* Pressing settles the button into the page: the shadow lets go. */
[data-scope="${scope}"][data-part="${part}"]:active {
  background: var(--bs-color-primary-active);
  box-shadow: none;
}

[data-scope="${scope}"][data-part="${part}"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}
`;
}

/** The five states of a field-family text control — placeholder, hover,
 * focus, invalid, disabled. Hover skips disabled controls so a dead field
 * never deepens under the pointer; every other state is an attribute on
 * the part itself. */
export function inputStateCss(scope: string, part = "input"): string {
  return /* css */ `
[data-scope="${scope}"][data-part="${part}"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="${scope}"][data-part="${part}"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="${scope}"][data-part="${part}"]:focus,
[data-scope="${scope}"][data-part="${part}"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="${scope}"][data-part="${part}"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="${scope}"][data-part="${part}"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
`;
}

/** The disclose motion every expand/collapse family rides: the panel
 * grows from its collapsed height while the ink fades. The name is
 * shared — every family that injects this also injects the same four
 * definitions, and identical repeats in the cascade are harmless. */
export function discloseKeyframes(): string {
  return /* css */ `
@keyframes bs-disclose-expand {
  from {
    height: var(--collapsed-height, 0);
  }
  to {
    height: var(--height);
  }
}

@keyframes bs-disclose-collapse {
  from {
    height: var(--height);
  }
  to {
    height: var(--collapsed-height, 0);
  }
}

@keyframes bs-disclose-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes bs-disclose-fade-out {
  to {
    opacity: 0;
  }
}
`;
}
