export const tabsCss = /* css */ `
[data-scope="tabs"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-lg);
}

/* The tab strip is a ruled line; the ink bar under the selected tab is
   drawn by the machine-positioned indicator. */
[data-scope="tabs"][data-part="list"] {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="tabs"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  block-size: var(--bs-control-height-md);
  margin-block-end: -1px;
  padding: 0 var(--bs-padding-md);
  border: none;
  background: transparent;
  color: var(--bs-color-text-tertiary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition: color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tabs"][data-part="trigger"]:hover:not([data-selected], [data-disabled]) {
  color: var(--bs-color-text-primary);
}

[data-scope="tabs"][data-part="trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
  border-radius: var(--bs-radius-sm);
}

/* The weight keeps the selected tab legible when the color cue collapses:
 * the high-contrast tier (civic pairs with it) promotes tertiary text to
 * primary strength, so ink alone can't carry the state — the breadcrumb's
 * current page makes the same move. */
[data-scope="tabs"][data-part="trigger"][data-selected] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-semibold);
}

[data-scope="tabs"][data-part="trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The indicator is a measurement, not a decoration: the same 2px register
   as the toc rail. The machine inlines left and hands over --width — the
   CSS must consume it or the bar renders zero-wide. */
[data-scope="tabs"][data-part="indicator"] {
  position: absolute;
  inset-block-end: -1px;
  inline-size: var(--width, 0);
  block-size: 2px;
  background: var(--bs-color-primary);
  transition:
    inset-inline-start var(--bs-duration-base) var(--bs-ease-spring),
    inline-size var(--bs-duration-base) var(--bs-ease-spring);
}

[data-scope="tabs"][data-part="content"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
  border-radius: var(--bs-radius-sm);
}

/* Size rungs: the root's data-size re-points the ladder for the tab
   rows — the rule and its ink bar ride whatever height they are given. */
[data-scope="tabs"][data-part="root"][data-size="sm"] [data-part="trigger"] {
  block-size: var(--bs-control-height-sm);
}

[data-scope="tabs"][data-part="root"][data-size="lg"] [data-part="trigger"] {
  block-size: var(--bs-control-height-lg);
}


/* Vertical hangs the same grammar on the other rail: the rule moves to
 * the start edge and the ink bar measures height instead of width. The
 * rows keep their own height — a tall row (icon over caption) must not
 * be squeezed into the control ladder — so block-size opens and the
 * ladder survives only as the minimum. */
[data-scope="tabs"][data-orientation="vertical"][data-part="root"] {
  flex-direction: row;
}

[data-scope="tabs"][data-orientation="vertical"] [data-part="list"] {
  flex-direction: column;
  align-items: stretch;
  border-block-end: none;
  border-inline-start: 1px solid var(--bs-color-border);
}

[data-scope="tabs"][data-orientation="vertical"] [data-part="trigger"] {
  justify-content: flex-start;
  text-align: start;
  margin-block-end: 0;
  margin-inline-start: -1px;
  padding-inline: var(--bs-padding-md);
}

[data-scope="tabs"][data-part="root"][data-orientation="vertical"] [data-part="trigger"] {
  block-size: auto;
  min-block-size: var(--bs-control-height-md);
}

[data-scope="tabs"][data-part="root"][data-size="sm"][data-orientation="vertical"] [data-part="trigger"] {
  min-block-size: var(--bs-control-height-sm);
}

[data-scope="tabs"][data-part="root"][data-size="lg"][data-orientation="vertical"] [data-part="trigger"] {
  min-block-size: var(--bs-control-height-lg);
}

/* The machine inlines top and hands over --height; start pins the bar
 * onto the rail the way end pins it under the strip. */
[data-scope="tabs"][data-orientation="vertical"] [data-part="indicator"] {
  inset-block-end: auto;
  inset-inline-start: -1px;
  inline-size: 2px;
  block-size: var(--height, 0);
  transition:
    inset-block-start var(--bs-duration-base) var(--bs-ease-spring),
    block-size var(--bs-duration-base) var(--bs-ease-spring);
}


/* The browser register: the ruled strip stays, the selected tab breaks
   the rule and merges into the pane below — one vessel, tab and panel. */
[data-scope="tabs"][data-variant="card"] {
  gap: 0;
}

[data-scope="tabs"][data-variant="card"] [data-part="trigger"] {
  position: relative;
  margin-block-end: -1px;
  border: 1px solid transparent;
  border-block-end: none;
  border-radius: var(--bs-radius-sm) var(--bs-radius-sm) 0 0;
  background: transparent;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tabs"][data-variant="card"] [data-part="trigger"]:hover:not([data-selected], [data-disabled]) {
  background: var(--bs-color-surface-2);
}

/* The selected tab opens the rule: its bottom edge is painted the
   pane's paper, so the hairline seems to part for it. */
[data-scope="tabs"][data-variant="card"] [data-part="trigger"][data-selected] {
  border-color: var(--bs-color-border);
  border-block-end: 1px solid var(--bs-color-surface-1);
  background: var(--bs-color-surface-1);
}

[data-scope="tabs"][data-variant="card"] [data-part="content"] {
  padding: var(--bs-padding-lg);
  border: 1px solid var(--bs-color-border);
  border-block-start: none;
  border-radius: 0 var(--bs-radius-md) var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}
`;
