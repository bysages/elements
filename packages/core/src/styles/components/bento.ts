export const bentoCss = /* css */ `
[data-scope="bento"][data-part="root"] {
  display: grid;
  container-type: inline-size;
  grid-template-columns: repeat(var(--bs-bento-columns, 3), minmax(0, 1fr));
  gap: var(--bs-gap-md);
}

/* A narrow room re-lays itself out instead of shrinking every tile: two
   tracks under 32rem, one under 20rem, whatever the configured count. */
@container (max-width: 32rem) {
  [data-scope="bento"][data-part="root"] {
    grid-template-columns: repeat(min(2, var(--bs-bento-columns, 3)), minmax(0, 1fr));
  }
}

@container (max-width: 20rem) {
  [data-scope="bento"][data-part="root"] {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* A cell claims its own span through the variables the wrapper writes;
   min-inline-size keeps a wide span from forcing the track wide. */
[data-scope="bento"][data-part="cell"] {
  grid-column: span var(--bs-bento-span-x, 1);
  grid-row: span var(--bs-bento-span-y, 1);
  min-inline-size: 0;
  min-block-size: 0;
}
`;
