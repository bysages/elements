export const calendarCss = /* css */ `
/* The date-picker's month grid, standing on the page without its popup:
   the same table parts carry the ink, the vessel simply holds them. The
   grid itself is styled by the date-picker stylesheet — nothing here
   duplicates it. */
[data-scope="calendar"][data-part="root"] {
  display: inline-flex;
  flex-direction: column;
  gap: var(--bs-space-2);
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
`;
