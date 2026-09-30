export const blockUiCss = /* css */ `
/* The curtain needs the content beneath it to stay put: the root holds
   the region's box, the mask draws over it as frosted paper and one
   quiet wheel. */
[data-scope="block-ui"][data-part="root"] {
  position: relative;
}

[data-scope="block-ui"][data-part="mask"] {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  background: color-mix(in oklab, var(--bs-color-surface-1) 72%, transparent);
  backdrop-filter: blur(2px);
}
`;
