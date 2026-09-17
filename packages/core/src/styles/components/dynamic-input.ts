export const dynamicInputCss = /* css */ `
/* A column of entry rows: the rows keep their rhythm on the density gap,
   the group itself stays frameless — the inputs carry the recipe. */
[data-scope="dynamic-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  inline-size: 100%;
}

[data-scope="dynamic-input"][data-part="row"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-xs);
}

/* The entry stretches to the row; the remove seal keeps its own width. */
[data-scope="dynamic-input"][data-part="row"] [data-scope="input"][data-part="root"] {
  flex: 1;
  min-inline-size: 0;
}

[data-scope="dynamic-input"][data-part="add"] {
  display: flex;
}
`;
