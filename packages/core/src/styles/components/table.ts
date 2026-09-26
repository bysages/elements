export const tableCss = /* css */ `
/* The data grid: a scroll vessel whose rows are CSS grids — that keeps
   sticky headers, pinned columns, and a virtualized window honest while
   ARIA roles keep the semantics of a table. Column widths arrive as the
   --bs-table-cols track list; row height rides the density scale. */
[data-scope="table"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  --bs-table-row-height: calc(2.5rem * var(--bs-density-scale, 1));
  --bs-table-indent: calc(1.25rem * var(--bs-density-scale, 1));
  display: flex;
  flex-direction: column;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  overflow: clip;
}

/* The scroll viewport: headers, body, and a fixed footer all stick to
   its edges. */
[data-scope="table"][data-part="viewport"] {
  overflow: auto;
  overscroll-behavior: contain;
}

/* The filter toolbar rests above the scroll, one hairline down. */
[data-scope="table"][data-part="toolbar"] {
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="table"][data-part="global-filter"] {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 20rem;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-1);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
}

[data-scope="table"][data-part="global-filter"]:focus {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="table"][data-part="table"] {
  min-inline-size: var(--bs-table-width, 100%);
}

[data-scope="table"][data-part="row"] {
  display: grid;
  grid-template-columns: var(--bs-table-cols, repeat(auto-fill, minmax(0, 1fr)));
  align-items: stretch;
  /* The register's height is a floor: content grows the row. Virtual
     windows pin their rows to exact px inline, overriding this. */
  min-block-size: var(--bs-table-row-height);
  position: relative;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="table"][data-part="header"] {
  position: sticky;
  inset-block-start: 0;
  z-index: 2;
  background: var(--bs-color-surface-1);
  box-shadow: inset 0 -1px 0 var(--bs-color-border);
}

[data-scope="table"][data-part="footer"] {
  position: sticky;
  inset-block-end: 0;
  z-index: 2;
  background: var(--bs-color-surface-1);
  box-shadow: inset 0 1px 0 var(--bs-color-border);
}

/* Header cells read as labels: small, tracked, quiet — sortable columns
   wake on hover and answer with a hairline-weight arrow. */
[data-scope="table"][data-part="header-cell"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  padding: 0 var(--bs-padding-md);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
}

[data-scope="table"][data-part="header-cell"][data-sortable] {
  cursor: pointer;
}

[data-scope="table"][data-part="header-cell"][data-sortable]:hover {
  color: var(--bs-color-text-primary);
}

[data-scope="table"][data-part="header-cell"][data-sort="asc"]::after,
[data-scope="table"][data-part="header-cell"][data-sort="desc"]::after {
  font-size: 0.625rem;
  color: var(--bs-color-primary);
}

[data-scope="table"][data-part="header-cell"][data-sort="asc"]::after {
  content: "▲";
}

[data-scope="table"][data-part="header-cell"][data-sort="desc"]::after {
  content: "▼";
}

/* The per-column filter rides inside its header: a quiet slot that wakes
   only under the caret. Zero basis keeps it out of the column's
   max-content floor — filter boxes never widen the tracks. */
[data-scope="table"][data-part="header-filter"] {
  flex: 1;
  min-inline-size: 0;
  inline-size: 0;
  block-size: 1.5rem;
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-1);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-xs, 0.75rem);
}

[data-scope="table"][data-part="header-filter"]:focus {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring-inset);
}

/* Row selection rides the native checkbox, tinted by the theme pigment. */
[data-scope="table"] input[type="checkbox"] {
  inline-size: 0.875rem;
  block-size: 0.875rem;
  accent-color: var(--bs-color-primary);
  cursor: pointer;
}

/* Body cells sit on hairlines; the last row lets the vessel close. The
   footer reuses the cell recipe, minus the closing rule. */
[data-scope="table"][data-part="cell"],
[data-scope="table"][data-part="footer-cell"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  font-size: var(--bs-font-size-md);
  color: var(--bs-color-text-primary);
  box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--bs-color-border) 60%, transparent);
  overflow: hidden;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="table"][data-part="row"]:last-child [data-part="cell"] {
  box-shadow: none;
}

[data-scope="table"][data-part="cell"][data-numeric] {
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
}

/* Rows answer the cursor one step of shade at a time; a selected row
   holds the primary wash and hover never repaints it. */
[data-scope="table"][data-part="row"]:hover:not([data-selected]) {
  background: var(--bs-color-surface-0);
}

[data-scope="table"][data-part="row"][data-selected] {
  background: color-mix(in oklab, var(--bs-color-primary) 8%, transparent);
}

/* Merged-cell mode: the body is one grid and rows are contents, so a
   cell may span rows (grid-row: span n). With no row box left, the
   hover and selection washes land on the cells themselves. */
[data-scope="table"][data-part="body"][data-merge] {
  display: grid;
  grid-template-columns: var(--bs-table-cols, repeat(auto-fill, minmax(0, 1fr)));
  grid-auto-rows: var(--bs-table-row-height);
}

[data-scope="table"][data-part="body"][data-merge] [data-part="row"] {
  display: contents;
}

[data-scope="table"][data-part="body"][data-merge]
  [data-part="row"]:has(> [data-part="cell"]:not([data-spanned]):hover):not([data-selected])
  > [data-part="cell"]:not([data-spanned]) {
  background: var(--bs-color-surface-0);
}

/* A cell that spans rows reads as its own column of ink: it takes the
   wash only when the cursor is on it, never from its logical row. */
[data-scope="table"][data-part="body"][data-merge]
  [data-part="cell"][data-spanned]:hover:not([data-pinned]) {
  background: var(--bs-color-surface-0);
}

[data-scope="table"][data-part="body"][data-merge] [data-part="row"][data-selected]
  > [data-part="cell"] {
  background: color-mix(in oklab, var(--bs-color-primary) 8%, transparent);
}

/* Contents rows leave no box to inherit from, so pinned cells carry an
   opaque copy of the vessel surface themselves. */
[data-scope="table"][data-part="body"][data-merge] [data-part="cell"][data-pinned] {
  background: var(--bs-color-surface-2);
}

/* Pinned cells ride their inline offset and carry an opaque copy of the
   row's own background, so scrolled content never ghosts beneath. */
[data-scope="table"][data-part="header-cell"][data-pinned],
[data-scope="table"][data-part="cell"][data-pinned] {
  position: sticky;
  z-index: 1;
  background: inherit;
}

[data-scope="table"][data-part="header-cell"][data-pinned] {
  background: var(--bs-color-surface-1);
}

[data-scope="table"][data-part="cell"][data-pinned="start"],
[data-scope="table"][data-part="header-cell"][data-pinned="start"] {
  inset-inline-start: var(--pin-offset, 0);
}

[data-scope="table"][data-part="cell"][data-pinned="end"],
[data-scope="table"][data-part="header-cell"][data-pinned="end"] {
  inset-inline-end: var(--pin-offset, 0);
}

/* The seam where pinned columns meet the scrolling body: a hairline that
   only reads when content actually slides beneath. */
[data-scope="table"][data-part="cell"][data-last-pinned],
[data-scope="table"][data-part="header-cell"][data-last-pinned] {
  box-shadow:
    inset -1px 0 0 var(--bs-color-border),
    inset 0 -1px 0 color-mix(in oklab, var(--bs-color-border) 60%, transparent);
}

[data-scope="table"][data-part="cell"][data-first-pinned],
[data-scope="table"][data-part="header-cell"][data-first-pinned] {
  box-shadow:
    inset 1px 0 0 var(--bs-color-border),
    inset 0 -1px 0 color-mix(in oklab, var(--bs-color-border) 60%, transparent);
}

/* The tree's expander is a quiet stamp: a chevron that leans right when
   its branch is folded and settles down when it opens. */
[data-scope="table"][data-part="expander"] {
  display: inline-grid;
  place-items: center;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  flex: none;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    rotate var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="table"][data-part="expander"]:hover {
  color: var(--bs-color-text-primary);
  background: var(--bs-color-surface-0);
}

[data-scope="table"][data-part="expander"][data-expanded] {
  rotate: 90deg;
}

[data-scope="table"][data-part="expander"][data-leaf] {
  visibility: hidden;
}

[data-scope="table"][data-part="cell-main"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  min-inline-size: 0;
  padding-inline-start: calc(var(--bs-table-depth, 0) * var(--bs-table-indent));
}

/* The empty state: the vessel keeps its shape, the ink steps aside. */
[data-scope="table"][data-part="empty"] {
  display: grid;
  place-items: center;
  padding: var(--bs-padding-xl) var(--bs-padding-md);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
}

/* The pagination bar rests outside the scroll, one hairline up: how
   much there is on the left, the navigator on the right — the page-size
   select and the row of page seals. */
[data-scope="table"][data-part="pagination"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-md);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border-block-start: 1px solid var(--bs-color-border);
  background: var(--bs-color-surface-1);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
}

[data-scope="table"][data-part="page-status"] {
  font-variant-numeric: tabular-nums;
}

[data-scope="table"][data-part="page-nav"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-md);
  margin-inline-start: auto;
}

/* The page-size select rides the seals' compact register: a 28px field
   beside 28px pages, never filling the bar. flex:none keeps the field at
   its content width — the value line reads whole, never squeezed. */
[data-scope="table"][data-part="pagination"] [data-scope="select"][data-part="root"] {
  inline-size: auto;
  flex: none;
}

[data-scope="table"][data-part="pagination"] [data-scope="select"][data-part="trigger"] {
  block-size: var(--bs-control-height-sm);
  font-size: var(--bs-font-size-sm);
}

[data-scope="table"][data-part="pagination"] [data-scope="select"][data-part="indicator"] {
  inline-size: auto;
  padding-inline-end: var(--bs-padding-sm);
}

[data-scope="table"][data-part="pagination"] [data-scope="pagination"][data-part="root"] {
  font-size: var(--bs-font-size-sm);
}

/* Drag reordering: the lifted source dims; the candidate slot answers
   with a primary hairline; the adopt slot (tree "make child") takes a
   dashed outline and a light pigment wash. */
[data-scope="table"][data-part="row"][data-dragging],
[data-scope="table"][data-part="header-cell"][data-dragging] {
  opacity: 0.45;
}

[data-scope="table"][data-part="header-cell"][data-drop-before-col] {
  box-shadow: inset 2px 0 0 var(--bs-color-primary);
}

[data-scope="table"][data-part="header-cell"][data-drop-after-col] {
  box-shadow: inset -2px 0 0 var(--bs-color-primary);
}

/* The row insertion line indents to the sibling depth the drop will
   produce — the tree reads its own hierarchy off the line's origin. */
[data-scope="table"][data-part="row"][data-drop-before]::before,
[data-scope="table"][data-part="row"][data-drop-after]::before {
  content: "";
  position: absolute;
  inset-inline-start: calc(var(--bs-drop-indent, 0) * var(--bs-table-indent));
  inset-inline-end: 0;
  block-size: 2px;
  background: var(--bs-color-primary);
  pointer-events: none;
}

[data-scope="table"][data-part="row"][data-drop-before]::before {
  inset-block-start: -1px;
}

[data-scope="table"][data-part="row"][data-drop-after]::before {
  inset-block-end: -1px;
}

/* Same specificity as the row hover wash, later in the file, so the
   adopt signal wins while the pointer rests on the target. */
[data-scope="table"][data-part="row"][data-drop-inside]:hover {
  background: color-mix(in oklab, var(--bs-color-primary) 6%, transparent);
  outline: 1px dashed var(--bs-color-primary);
  outline-offset: -1px;
}

[data-scope="table"][data-part="root"][data-reorderable] [data-part="row"][draggable],
[data-scope="table"][data-part="root"][data-reorderable]
  [data-part="header-cell"][data-draggable] {
  cursor: grab;
}
`;
