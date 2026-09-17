export const watermarkCss = /* css */ `
/* The paper bears its seal beneath the content: the wrapper holds the
   flow, the marks repeat their tile across the whole sheet and never
   take a pointer — the page beneath stays live. */
[data-scope="watermark"][data-part="root"] {
  position: relative;
}

[data-scope="watermark"][data-part="content"] {
  position: relative;
}

[data-scope="watermark"][data-part="marks"] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-repeat: repeat;
}
`;
