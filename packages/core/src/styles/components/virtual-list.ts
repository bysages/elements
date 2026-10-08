export const virtualListCss = /* css */ `
/* The window the ledger scrolls within: a hairline vessel with the
   inset scrollbar on the paper axis. Geometry arrives as component
   variables so wrappers hand over values instead of layout rules. */
[data-scope="virtual-list"][data-part="root"] {
  overflow-y: auto;
  overscroll-behavior: contain;
  block-size: var(--bs-virtual-list-height, 320px);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}

/* The spacer owns the scroll length; mounted rows are staged on it. */
[data-scope="virtual-list"][data-part="inner"] {
  position: relative;
  block-size: var(--bs-virtual-list-total, 0px);
}

[data-scope="virtual-list"][data-part="row"] {
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  transform: translateY(var(--bs-virtual-list-row-start, 0px));
  block-size: var(--bs-virtual-list-row-size, 40px);
}
`;
