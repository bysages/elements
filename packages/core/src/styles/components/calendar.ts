export const calendarCss = /* css */ `
/* The date-picker's month grid, standing on the page without its popup:
   the same table parts carry the ink, the vessel simply holds them. The
   grid itself is styled by the date-picker stylesheet — nothing here
   duplicates it. */
[data-scope="calendar"][data-part="root"] {
  display: inline-flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  /* The same panel width the date-picker's popup rents at 17rem — the
     standing calendar keeps the family measure, so the day grid fills it
     and the month/year grids divide it into roomy cells. */
  inline-size: 17rem;
  padding: var(--bs-padding-lg);
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-elevation-1);
}

[data-scope="calendar"][data-part="header"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-sm);
}

/* Ark's control keeps its date-picker scope; the re-scoped calendar
   stylesheet only changes the stylesheet's wording, never the DOM. */
[data-scope="calendar"][data-part="header"]
  > [data-scope="date-picker"][data-part="view-control"] {
  flex: 1;
  min-inline-size: 0;
}

/* Month and year names sit in roomy columns cut from the panel: the
   date-picker cell pads them by 8px each side, which the long names in
   this narrower grid cannot afford. */
[data-scope="calendar"]
  [data-part="table-cell-trigger"][data-view="month"],
[data-scope="calendar"]
  [data-part="table-cell-trigger"][data-view="year"] {
  padding: 0;
}

/* Full is the calendar's page-shaped register: a ruled table rather
   than a floating popup, with enough room in each cell for an event. */
[data-scope="calendar"][data-part="root"][data-variant="full"] {
  /* One row measure drives every view, so paging between day, month
     and year never reshapes the page. The weekday head is pinned to
     the normal leading so its height stays a token arithmetic, not a
     browser line-box accident. */
  --bs-calendar-row: calc(var(--bs-control-height-lg) * 1.5);
  --bs-calendar-head: calc(
    var(--bs-font-size-xs) * var(--bs-line-height-normal) + var(--bs-padding-xs) * 2 +
      var(--bs-hairline)
  );
  inline-size: 100%;
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table"] {
  overflow: hidden;
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-header"] {
  border-block-end: var(--bs-hairline) solid var(--bs-color-border);
  background: var(--bs-color-surface-2);
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-cell"] {
  border-block-end: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-cell"]:not(:last-child) {
  border-inline-end: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-row"]:last-child
  [data-part="table-cell"] {
  border-block-end: none;
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-cell-trigger"][data-view="day"] {
  block-size: var(--bs-calendar-row);
  border-radius: 0;
}

/* Shorter grids keep the page's register: month and year rows grow so
   their tables stand exactly as tall as the six-week day grid — four
   rows take one and a half day rows each plus a quarter head, three
   take two plus a third, with the dropped separators evened in. */
[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table"][data-view="month"][data-columns="3"]
  [data-part="table-cell-trigger"],
[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table"][data-view="year"]
  [data-part="table-cell-trigger"] {
  block-size: calc(
    var(--bs-calendar-row) * 1.5 + var(--bs-hairline) / 2 + var(--bs-calendar-head) / 4
  );
  border-radius: 0;
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table"][data-view="month"][data-columns="4"]
  [data-part="table-cell-trigger"] {
  block-size: calc(
    var(--bs-calendar-row) * 2 + var(--bs-hairline) + var(--bs-calendar-head) / 3
  );
  border-radius: 0;
}

[data-scope="calendar"][data-part="root"][data-variant="full"]
  [data-part="table-header"] {
  line-height: var(--bs-line-height-normal);
}

[data-scope="calendar"][data-part="today-trigger"] {
  flex: none;
  display: inline-flex;
  align-items: center;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: none;
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: var(--bs-color-primary-subtle);
  color: var(--bs-color-primary-subtle-text);
  font: inherit;
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="calendar"][data-part="today-trigger"]:hover {
  background: color-mix(in oklab, var(--bs-color-primary-subtle) 80%, var(--bs-color-primary));
}

[data-scope="calendar"][data-part="today-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

/* Year mode is TDesign's month-of-year register: four broad columns,
   one choice per month — not a grid of miniature calendars. */
[data-scope="calendar"][data-mode="year"]
  [data-part="table-row"]
  [data-part="table-cell"] {
  border-inline-end: none;
}

[data-scope="calendar"][data-mode="year"]
  [data-part="table-cell-trigger"][data-view="month"] {
  block-size: calc(var(--bs-control-height-lg) * 1.5);
  border-radius: var(--bs-radius-md);
}

/* Weekend ink steps back without competing with selected or disabled
   states; the base date-picker rules still own their stronger choices. */
[data-scope="calendar"][data-part="table-cell-trigger"][data-weekend]:not(
    [data-selected],
    [data-in-range],
    [data-range-start],
    [data-range-end],
    [data-disabled],
    [data-unavailable]
  ) {
  color: var(--bs-color-text-tertiary);
}
`;
