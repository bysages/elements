export const containerCss = /* css */ `
/* The reading frame. The measures are set in ch — the rendered width of
   the zero glyph — so the clamp tracks the typeset text itself instead
   of a fixed visual value: the same measure holds fewer Latin
   characters than CJK ones, and both keep the line short enough to
   cross without losing its head. Padding keeps the ink off the page
   edges when the viewport runs narrower than the measure. */
[data-scope="container"][data-part="root"] {
  inline-size: 100%;
  margin-inline: auto;
}

[data-scope="container"][data-part="root"][data-size="narrow"] {
  max-inline-size: 48ch;
}
[data-scope="container"][data-part="root"][data-size="readable"] {
  max-inline-size: 72ch;
}
[data-scope="container"][data-part="root"][data-size="wide"] {
  max-inline-size: 96ch;
}

/* Full leaves the measure to the page — the clamp simply lifts. */
[data-scope="container"][data-part="root"][data-size="full"] {
  max-inline-size: none;
}

[data-scope="container"][data-part="root"][data-padding] {
  padding-inline: var(--bs-padding-lg);
}
`;
