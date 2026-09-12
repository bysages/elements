import { labelCss, popupContentCss, positionerCss } from "./shared";

export const datePickerCss =
  labelCss("date-picker") +
  positionerCss("date-picker") +
  popupContentCss("date-picker", "17rem") +
  /* css */ `
[data-scope="date-picker"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

[data-scope="date-picker"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
}

[data-scope="date-picker"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="date-picker"][data-part="input"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="date-picker"][data-part="input"]:focus,
[data-scope="date-picker"][data-part="input"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="input"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="date-picker"][data-part="input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The calendar trigger rides the control recipe: paper fill, one hairline,
   the small rest shadow — an icon-sized sibling of the input it opens. */
[data-scope="date-picker"][data-part="trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="date-picker"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="date-picker"][data-part="trigger"][data-disabled] {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="date-picker"][data-part="clear-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="date-picker"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="preset-trigger"] {
  display: inline-flex;
  align-items: center;
  padding: var(--bs-space-1) var(--bs-space-3);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary-subtle);
  color: var(--bs-color-primary-subtle-text);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="preset-trigger"]:hover {
  background: color-mix(in oklab, var(--bs-color-primary-subtle) 80%, var(--bs-color-primary));
}

[data-scope="date-picker"][data-part="preset-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="view"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-3);
}

[data-scope="date-picker"][data-part="view"][hidden] {
  display: none;
}

[data-scope="date-picker"][data-part="view-control"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
}

[data-scope="date-picker"][data-part="prev-trigger"],
[data-scope="date-picker"][data-part="next-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="prev-trigger"]:hover:not([data-disabled]),
[data-scope="date-picker"][data-part="next-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="date-picker"][data-part="prev-trigger"]:focus-visible,
[data-scope="date-picker"][data-part="next-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="prev-trigger"][data-disabled],
[data-scope="date-picker"][data-part="next-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The month/year title doubles as the "zoom out" affordance — quiet until
   hovered, then it reads as a button. */
[data-scope="date-picker"][data-part="view-trigger"] {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-space-1);
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-semibold);
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="view-trigger"]:hover {
  background: var(--bs-color-surface-0);
}

[data-scope="date-picker"][data-part="view-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="range-text"] {
  font-weight: var(--bs-font-weight-semibold);
}

[data-scope="date-picker"][data-part="month-select"],
[data-scope="date-picker"][data-part="year-select"] {
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="month-select"]:focus-visible,
[data-scope="date-picker"][data-part="year-select"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="date-picker"][data-part="table"] {
  inline-size: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
}

[data-scope="date-picker"][data-part="table-header"] {
  padding: var(--bs-space-1) 0;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-align: center;
}

[data-scope="date-picker"][data-part="table-cell"] {
  padding: 0;
  text-align: center;
}

/* Day cells are seals: square-cut at the control radius. Selected days take
   the flat primary fill; range middles stay subtle with the corners cut so
   the fill reads as one continuous band. */
[data-scope="date-picker"][data-part="table-cell-trigger"] {
  display: inline-grid;
  place-items: center;
  inline-size: 100%;
  min-inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-view="month"],
[data-scope="date-picker"][data-part="table-cell-trigger"][data-view="year"] {
  padding: 0 var(--bs-space-2);
  block-size: var(--bs-control-height-sm);
}

[data-scope="date-picker"][data-part="table-cell-trigger"]:hover:not(
    [data-selected],
    [data-in-range],
    [data-range-start],
    [data-range-end],
    [data-disabled]
  ) {
  background: var(--bs-color-surface-0);
}

[data-scope="date-picker"][data-part="table-cell-trigger"]:focus-visible,
[data-scope="date-picker"][data-part="table-cell-trigger"][data-focused] {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-today] {
  color: var(--bs-color-primary);
  font-weight: var(--bs-font-weight-semibold);
}

/* The band first, the endpoints on top: start/end cells carry both
   attributes, so the ink fill must out-rank the subtle band. */
[data-scope="date-picker"][data-part="table-cell-trigger"][data-in-range] {
  background: var(--bs-color-primary-subtle);
  color: var(--bs-color-primary-subtle-text);
  border-radius: 0;
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-selected],
[data-scope="date-picker"][data-part="table-cell-trigger"][data-range-start],
[data-scope="date-picker"][data-part="table-cell-trigger"][data-range-end] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-range-start] {
  border-start-start-radius: var(--bs-radius-sm);
  border-end-start-radius: var(--bs-radius-sm);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-range-end] {
  border-start-end-radius: var(--bs-radius-sm);
  border-end-end-radius: var(--bs-radius-sm);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-outside-range] {
  color: var(--bs-color-text-tertiary);
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="date-picker"][data-part="table-cell-trigger"][data-unavailable] {
  color: var(--bs-color-text-disabled);
  text-decoration: line-through;
  cursor: not-allowed;
}
`;
