export const transferCss = /* css */ `
/* Two ledgers and a crossing: the panels carry the popup chrome's
   paper-and-hairline at rest weight, the buttons column rides between. */
[data-scope="transfer"][data-part="root"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-3);
}

[data-scope="transfer"][data-part="panel"] {
  display: flex;
  flex-direction: column;
  inline-size: 14rem;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}

[data-scope="transfer"][data-part="head"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-space-2);
  padding: var(--bs-space-2) var(--bs-space-3);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="transfer"][data-part="title"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-semibold);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="transfer"][data-part="count"] {
  min-inline-size: var(--bs-control-height-sm);
  padding-inline: var(--bs-space-1);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs, 0.75rem);
  line-height: var(--bs-control-height-sm);
  text-align: center;
  font-variant-numeric: tabular-nums;
}

[data-scope="transfer"][data-part="search"] {
  padding: var(--bs-space-2);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="transfer"][data-part="list"] {
  display: flex;
  flex-direction: column;
  padding: var(--bs-space-1);
  max-block-size: 16rem;
  overflow-block: auto;
}

/* Rows are the checkbox's own seal and label — the panel only gives
   them a clickable span and a hover wash. */
[data-scope="transfer"] [data-scope="checkbox"][data-part="root"] {
  flex: 1;
  gap: var(--bs-space-2);
  padding: var(--bs-space-1) var(--bs-space-2);
  border-radius: var(--bs-radius-sm);
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="transfer"] [data-scope="checkbox"][data-part="root"]:hover {
  background: var(--bs-color-surface-inset);
}

[data-scope="transfer"] [data-part="label"] {
  flex: 1;
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-primary);
  cursor: inherit;
}

[data-scope="transfer"][data-part="empty"] {
  padding: var(--bs-space-4);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-align: center;
}

[data-scope="transfer"][data-part="operations"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}
`;
