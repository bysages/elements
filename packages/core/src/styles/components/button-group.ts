export const buttonGroupCss = /* css */ `
/* Buttons fused into one control: the group owns only the joinery. Corners
   trim where the members meet, a shared hairline merges through a 1px
   overlap, and the hovered or focused member steps above the pile so its
   deepened edge and halo are not painted over by the neighbor. Selection
   is not this family's business — each button keeps the variant it was
   given, solid beside outline beside ghost. */
[data-scope="button-group"][data-part="root"] {
  display: inline-flex;
}

[data-scope="button-group"][data-part="root"][data-orientation="vertical"] {
  flex-direction: column;
  /* The column reads as one slab: members fill to the widest. */
  align-items: stretch;
}

/* One register for the whole group: the group's size retunes every
   member's height the way a control register should — one knob, not one
   per button. */
[data-scope="button-group"][data-part="root"][data-size="sm"] > [data-scope="button"][data-part="root"] {
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  font-size: var(--bs-font-size-sm);
}

[data-scope="button-group"][data-part="root"][data-size="lg"] > [data-scope="button"][data-part="root"] {
  block-size: var(--bs-control-height-lg);
  padding: 0 var(--bs-padding-xl);
}

/* The seam: each member after the first slides one pixel over its
   predecessor's trailing hairline, so two borders read as one. */
[data-scope="button-group"][data-part="root"] > [data-scope="button"][data-part="root"] + [data-scope="button"][data-part="root"] {
  margin-inline-start: -1px;
}

[data-scope="button-group"][data-part="root"][data-orientation="vertical"] > [data-scope="button"][data-part="root"] + [data-scope="button"][data-part="root"] {
  margin-inline-start: 0;
  margin-block-start: -1px;
}

/* 方寸为章, trimmed where the seals meet: interior corners square off,
   the first keeps its start side and the last its end side. */
[data-scope="button-group"][data-part="root"][data-orientation="horizontal"] > [data-scope="button"][data-part="root"]:not(:first-child) {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}

[data-scope="button-group"][data-part="root"][data-orientation="horizontal"] > [data-scope="button"][data-part="root"]:not(:last-child) {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

[data-scope="button-group"][data-part="root"][data-orientation="vertical"] > [data-scope="button"][data-part="root"]:not(:first-child) {
  border-start-start-radius: 0;
  border-start-end-radius: 0;
}

[data-scope="button-group"][data-part="root"][data-orientation="vertical"] > [data-scope="button"][data-part="root"]:not(:last-child) {
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

/* Raised while hovered or focused: the deepened hairline and the focus
   halo paint above the neighbors instead of vanishing under them. */
[data-scope="button-group"][data-part="root"] > [data-scope="button"][data-part="root"]:hover,
[data-scope="button-group"][data-part="root"] > [data-scope="button"][data-part="root"]:focus-visible {
  z-index: 1;
}
`;
