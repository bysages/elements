export const separatorCss = /* css */ `
/* A hairline given a name: the one rule the paper-ink system draws to
   separate content, horizontal by default and 1px tall in the reading
   direction it cuts. It grows to fill the line it shares with its
   neighbours — a fixed 100% would add their widths and spill out of
   the row — and stands alone it simply spans the block. */
[data-scope="separator"][data-part="root"] {
  flex: 1 1 auto;
  inline-size: auto;
  block-size: 1px;
  border: none;
  background: var(--bs-color-border);
}

[data-scope="separator"][data-part="root"][data-orientation="vertical"] {
  /* The vertical cut is rigid: a row of neighbours must never squeeze it. */
  flex: none;
  inline-size: 1px;
  block-size: auto;
  align-self: stretch;
}
`;
