export const separatorCss = /* css */ `
/* A hairline given a name: the one rule the paper-ink system draws to
   separate content, horizontal by default and 1px tall in the reading
   direction it cuts. */
[data-scope="separator"][data-part="root"] {
  flex: none;
  inline-size: 100%;
  block-size: 1px;
  border: none;
  background: var(--bs-color-border);
}

[data-scope="separator"][data-part="root"][data-orientation="vertical"] {
  inline-size: 1px;
  block-size: auto;
  align-self: stretch;
}
`;
