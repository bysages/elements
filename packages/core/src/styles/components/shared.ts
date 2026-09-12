/** Fragments shared by component stylesheets. Every floating part in the
 * system (date-picker, popover, menu, select, …) sits on the same popup
 * chrome, and every field part carries the same label — built here, scoped
 * per component, so the recipes stay identical instead of drifting. */

/** The dismissible-layer ladder: one shared z-index base, ordered by the
 * machine's `--layer-index`, so any nesting combination stacks correctly. */
export function positionerCss(scope: string): string {
  return /* css */ `
[data-scope="${scope}"][data-part="positioner"] {
  position: absolute;
  z-index: var(--z-index, var(--bs-z-overlay));
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
