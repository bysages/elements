export const dockCss = /* css */ `
[data-scope="dock"][data-part="root"] {
  display: flex;
  align-items: flex-end;
  gap: var(--bs-gap-sm);
  inline-size: fit-content;
  /* The rail reserves headroom for the magnified reach, so the swelling
     item tops out inside the frame instead of breaking through it. */
  padding-block-start: calc(var(--bs-padding-sm) + (var(--bs-dock-max-scale, 1) - 1) * var(--bs-dock-item-size, 2.75rem));
  padding-block-end: var(--bs-padding-sm);
  padding-inline: var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-elevation-2);
}

/* Magnification without a spring engine: the wrapper measures the hand
   and writes --bs-dock-scale per item, CSS only eases the chase. The
   origin pins growth to the floor, the way a moored boat rises. */
[data-scope="dock"][data-part="item"] {
  scale: var(--bs-dock-scale, 1);
  transform-origin: bottom center;
  transition: scale var(--bs-duration-fast) var(--bs-ease-out);
}
`;
