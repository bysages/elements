export const aspectRatioCss = /* css */ `
/* The frame that keeps its shape: the box holds the ratio the wrapper
   hands over, whatever width it is dealt. */
[data-scope="aspect-ratio"][data-part="root"] {
  position: relative;
  inline-size: 100%;
  aspect-ratio: var(--bs-aspect-ratio, 1 / 1);
}

/* The child owns the frame's face: it fills the box the ratio draws. */
[data-scope="aspect-ratio"][data-part="root"] > * {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
}
`;
