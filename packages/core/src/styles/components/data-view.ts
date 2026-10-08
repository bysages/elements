export const dataViewCss = /* css */ `
/* One vessel, two layouts: the ledger rows separate by hairline, the
   lattice tiles into equal columns that shrink with the container —
   the layout switch never touches the records themselves. */
[data-scope="data-view"][data-part="content"] {
  display: flex;
  flex-direction: column;
}

[data-scope="data-view"][data-part="content"][data-layout="grid"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: var(--bs-gap-md);
}

[data-scope="data-view"][data-part="content"][data-layout="list"] > [data-scope="data-view"][data-part="cell"] {
  padding-block: var(--bs-padding-sm);
}

[data-scope="data-view"][data-part="content"][data-layout="list"] > [data-scope="data-view"][data-part="cell"] + [data-scope="data-view"][data-part="cell"] {
  border-block-start: var(--bs-hairline) solid var(--bs-color-border);
}

[data-scope="data-view"][data-part="pager"] {
  display: flex;
  justify-content: center;
  padding-block-start: var(--bs-padding-lg);
}
`;
