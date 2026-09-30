export const toolbarCss = /* css */ `
/* The workbench rail: start tools lead, end tools trail, and the rail
   itself is one quiet vessel — a hairline shell, not a raised card,
   since the tools inside already carry their own weight. */
[data-scope="toolbar"][data-part="root"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-md);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}

[data-scope="toolbar"][data-part="group"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  min-inline-size: 0;
}
`;
