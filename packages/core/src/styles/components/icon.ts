export const iconCss = /* css */ `
/* The inkwell: one box at the glyph's optical measure, riding the
   text's own color — the fill comes from currentColor, so the icon
   carries no pigment of its own. The size steps follow the surrounding
   font size, so an icon sits in a line of any size with no breakpoint
   of its own; inherit is that same one-em default, named. */
[data-scope="icon"][data-part="root"] {
  --_size: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  inline-size: var(--_size);
  block-size: var(--_size);
  font-size: var(--_size);
  fill: currentColor;
}

[data-scope="icon"][data-part="root"][data-size="sm"] {
  --_size: 0.75em;
}
[data-scope="icon"][data-part="root"][data-size="md"] {
  --_size: 1em;
}
[data-scope="icon"][data-part="root"][data-size="lg"] {
  --_size: 1.25em;
}

/* The glyph fills the box it is given — a standard measure is the
   whole point of the well. */
[data-scope="icon"][data-part="root"] > svg {
  display: block;
  inline-size: 100%;
  block-size: 100%;
}
`;
