export const tabsCss = /* css */ `
[data-scope="tabs"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-4);
}

/* The tab strip is a ruled line; the ink bar under the selected tab is
   drawn by the machine-positioned indicator. */
[data-scope="tabs"][data-part="list"] {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="tabs"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
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

[data-scope="tabs"][data-part="trigger"][data-selected] {
  color: var(--bs-color-text-primary);
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
`;
