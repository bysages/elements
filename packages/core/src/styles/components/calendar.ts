export const calendarCss = /* css */ `
/* The date-picker's month grid, standing on the page without its popup:
   the same table parts carry the ink, the vessel simply holds them. The
   grid itself is styled by the date-picker stylesheet — nothing here
   duplicates it. */
[data-scope="calendar"][data-part="root"] {
  display: inline-flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  /* The same panel width the date-picker's popup rents at 17rem — the
     standing calendar keeps the family measure, so the day grid fills it
     and the month/year grids divide it into roomy cells. */
  inline-size: 17rem;
  padding: var(--bs-padding-lg);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-shadow-e1);
}

[data-scope="calendar"][data-part="header"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
}

/* The header's only child is the date-picker's view-control, a
   fit-content strip. Stretched full-width it pins the arrows to the
   vessel's edges and holds the month/year title dead center, whatever
   the label's length. */
[data-scope="calendar"][data-part="header"]
  > [data-scope="date-picker"][data-part="view-control"] {
  flex: 1;
}

/* Month and year names sit in three roomy columns cut from the panel:
   the date-picker cell pads them by 8px each side, which the long
   names in this narrower grid cannot afford. */
[data-scope="calendar"]
  [data-part="table-cell-trigger"][data-view="month"],
[data-scope="calendar"]
  [data-part="table-cell-trigger"][data-view="year"] {
  padding: 0;
}
`;
