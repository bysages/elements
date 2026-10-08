export const menubarCss = /* css */ `
/* The bar: one hairline of rest under a row of quiet triggers. */
[data-scope="menubar"][data-part="root"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  padding: var(--bs-padding-xs) 0;
  border-block-end: var(--bs-hairline) solid var(--bs-color-border);
}

/* The triggers are ghost buttons — terrain, not controls: no fill, no
   hairline of their own, the bar's hairline doing the framing. */
[data-scope="menubar"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: none;
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="menubar"][data-part="trigger"]:hover {
  background: color-mix(in oklab, var(--bs-color-text-primary) 5%, transparent);
  color: var(--bs-color-text-primary);
}

/* The halo is the keyboard's cursor; open and focus share the ghost
   wash — the open menu itself is the pointer's focus. After Escape
   returns focus as a keyboard focus, :focus-visible shows. */
[data-scope="menubar"][data-part="trigger"]:focus-visible {
  outline: none;
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="menubar"][data-part="trigger"][data-state="open"] {
  outline: none;
  background: color-mix(in oklab, var(--bs-color-text-primary) 5%, transparent);
  color: var(--bs-color-text-primary);
}

/* The popup keeps the menu parts and the menu stylesheet; only the
   danger rows ride this scope's knowledge of the bar's callers. */
[data-scope="menu"][data-part="item"][data-danger] {
  color: var(--bs-color-danger);
}

[data-scope="menu"][data-part="item"][data-danger][data-state="checked"] {
  background: var(--bs-color-danger);
  color: var(--bs-color-ink-on-fill);
}
`;
