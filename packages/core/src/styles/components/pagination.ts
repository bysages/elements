export const paginationCss = /* css */ `
[data-scope="pagination"][data-part="root"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
}

/* Every page cell is the same small seal — pages, arrows, all one size,
   so the row reads as a single instrument. */
[data-scope="pagination"][data-part="item"],
[data-scope="pagination"][data-part="first-trigger"],
[data-scope="pagination"][data-part="prev-trigger"],
[data-scope="pagination"][data-part="next-trigger"],
[data-scope="pagination"][data-part="last-trigger"] {
  display: grid;
  place-items: center;
  min-inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-secondary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="pagination"][data-part="item"]:hover:not([data-selected], [data-disabled]),
[data-scope="pagination"][data-part="first-trigger"]:hover:not([data-disabled]),
[data-scope="pagination"][data-part="prev-trigger"]:hover:not([data-disabled]),
[data-scope="pagination"][data-part="next-trigger"]:hover:not([data-disabled]),
[data-scope="pagination"][data-part="last-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="pagination"][data-part="item"]:focus-visible,
[data-scope="pagination"][data-part="first-trigger"]:focus-visible,
[data-scope="pagination"][data-part="prev-trigger"]:focus-visible,
[data-scope="pagination"][data-part="next-trigger"]:focus-visible,
[data-scope="pagination"][data-part="last-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

/* The current page is the one inked seal in the row. */
[data-scope="pagination"][data-part="item"][data-selected] {
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="pagination"][data-part="item"][data-disabled],
[data-scope="pagination"][data-part="first-trigger"][data-disabled],
[data-scope="pagination"][data-part="prev-trigger"][data-disabled],
[data-scope="pagination"][data-part="next-trigger"][data-disabled],
[data-scope="pagination"][data-part="last-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="pagination"][data-part="ellipsis"] {
  display: grid;
  place-items: center;
  min-inline-size: var(--bs-control-height-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
}
`;
