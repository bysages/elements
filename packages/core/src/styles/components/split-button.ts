export const splitButtonCss = /* css */ `
/* The split: a primary action and its dropdown arrow seam-fused into one
   control — the button group's joinery closed to two members. The main
   button gives up its end corners; the arrow gives up its start corners
   and slides one pixel over the trailing hairline, redrawing the seam as
   a single line of border color (a cut of paper through a solid fill). */
[data-scope="split-button"][data-part="root"] {
  display: inline-flex;
}

[data-scope="split-button"][data-part="root"] > [data-scope="button"][data-part="root"] {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

/* The arrow rides the menu machine's trigger anatomy (as-child hosting
   reads data-scope="menu"), dressed as a button by the button
   stylesheet's trigger register — hence the variant seal here, keeping
   these joins above that register regardless of stylesheet order. */
[data-scope="split-button"][data-part="root"] > [data-scope="menu"][data-part="trigger"][data-variant] {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
  margin-inline-start: -1px;
  border-inline-start: 1px solid var(--bs-color-border);
}

/* Focus fuses like the border: a raised member keeps its halo and its
   deepened edge clear of the neighbor, and an open menu reads as one
   control at rest. */
[data-scope="split-button"][data-part="root"] > [data-scope="button"][data-part="root"]:hover,
[data-scope="split-button"][data-part="root"] > [data-scope="button"][data-part="root"]:focus-visible,
[data-scope="split-button"][data-part="root"] > [data-scope="menu"][data-part="trigger"][data-variant]:hover,
[data-scope="split-button"][data-part="root"] > [data-scope="menu"][data-part="trigger"][data-variant]:focus-visible,
[data-scope="split-button"][data-part="root"] > [data-scope="menu"][data-part="trigger"][data-variant][data-state="open"] {
  z-index: 1;
}

/* The popup keeps the menu parts and the menu stylesheet; only the
   danger rows ride this scope's knowledge of the callers — the
   menubar's register, restated so this family stands alone. */
[data-scope="menu"][data-part="item"][data-danger] {
  color: var(--bs-color-danger);
}
`;
