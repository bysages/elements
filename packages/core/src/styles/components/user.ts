export const userCss = /* css */ `
/* A person on one line: the seal leads, the words follow in a column
   that clips long names instead of pushing the row wide. */
[data-scope="user"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  min-inline-size: 0;
}

[data-scope="user"][data-part="meta"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  min-inline-size: 0;
}

[data-scope="user"][data-part="name"] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
  line-height: var(--bs-line-height-snug);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="user"][data-part="description"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-snug);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;
