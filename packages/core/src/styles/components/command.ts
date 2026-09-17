export const commandCss = /* css */ `
/* The palette's footing: full-viewport, the sheet docked a fifth of the
   way down (structural placement, not a spacing value). */
[data-scope="command"][data-part="positioner"] {
  position: fixed;
  inset: 0;
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20dvh var(--bs-padding-lg) var(--bs-padding-lg);
}

/* The sheet: a wide vessel at the top of the elevation ladder, entering
   as ink dissolving into paper. */
[data-scope="command"][data-part="content"] {
  position: relative;
  box-sizing: border-box;
  inline-size: min(36rem, 100%);
  display: flex;
  flex-direction: column;
  padding: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-elevation-4);
  transition:
    opacity var(--bs-duration-base) var(--bs-ease-out),
    translate var(--bs-duration-base) var(--bs-ease-spring);
}

[data-scope="command"][data-state="open"][data-part="content"] {
  box-shadow: var(--bs-elevation-5);
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}

/* The search field carries the same recipe as every input: border +
   surface + focus halo, never a shadow lift. */
[data-scope="command"][data-part="input"] {
  box-sizing: border-box;
  inline-size: 100%;
  block-size: var(--bs-control-height-lg);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-block-end: 1px solid var(--bs-color-border);
  border-radius: 0;
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
}

[data-scope="command"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="command"][data-part="input"]:focus,
[data-scope="command"][data-part="input"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

/* The ledger: the machine's content grafts onto this list, so the
   vessel stays inside the sheet instead of floating a second popup. */
[data-scope="command"][data-part="list"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  margin-block-start: var(--bs-space-2);
  max-block-size: min(50dvh, 24rem);
  padding: var(--bs-space-1);
  overflow-y: auto;
  overscroll-behavior: contain;
}

[data-scope="command"][data-part="list"][hidden] {
  display: none;
}

[data-scope="command"][data-part="group"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
}

[data-scope="command"][data-part="group"] + [data-scope="command"][data-part="group"] {
  margin-block-start: var(--bs-space-2);
}

/* Group headings whisper: small, tracked, never competing with rows. */
[data-scope="command"][data-part="group-label"] {
  padding: var(--bs-space-1) var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
  user-select: none;
}

/* Rows are quiet ink: the highlight is light on the row, not a fill. */
[data-scope="command"][data-part="item"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
  min-block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="command"][data-part="item"][data-highlighted] {
  background: var(--bs-color-surface-0);
}

[data-scope="command"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="command"][data-part="item-label"] {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* The hint is a keycap in miniature — the kbd recipe, riding the row. */
[data-scope="command"][data-part="item-hint"] {
  flex: none;
  display: inline-flex;
  align-items: center;
  min-inline-size: 1.75em;
  padding: 0.125em 0.375em;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  box-shadow: 0 1px 0 var(--bs-color-border);
  color: var(--bs-color-text-secondary);
  font-size: max(var(--bs-font-size-xs), 0.8125em);
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

[data-scope="command"][data-part="item"][data-highlighted] [data-scope="command"][data-part="item-hint"] {
  background: var(--bs-color-surface-1);
}

[data-scope="command"][data-part="empty"] {
  padding: var(--bs-space-4);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-align: center;
}
`;
