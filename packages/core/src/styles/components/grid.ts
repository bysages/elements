export const gridCss = /* css */ `
/* The alignment lattice. minmax(0, 1fr) — not a bare 1fr: a long word
   or a wide child would otherwise stretch its track past the lattice
   and shove every sibling aside. The column count and the gap ride CSS
   variables the wrapper points at their tokens. */
[data-scope="grid"][data-part="root"] {
  display: grid;
  grid-template-columns: repeat(var(--bs-grid-columns, 12), minmax(0, 1fr));
  gap: var(--bs-grid-gap, var(--bs-gap-md));
}

/* The auto-fill lattice: as many tracks as the container fits, each at
   least --bs-grid-min-child-width. The wrapper sets the variable and
   this attribute together — one never arrives without the other. */
[data-scope="grid"][data-part="root"][data-autofill] {
  grid-template-columns: repeat(auto-fill, minmax(var(--bs-grid-min-child-width), 1fr));
}
`;
