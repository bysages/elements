export const spotlightCss = /* css */ `
[data-scope="spotlight"][data-part="root"] {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
}

/* The pointer is the lamp: the track lights the vessel rim, the wash
   lights its face. Both die when the hand leaves — the state is the
   data attribute, the geometry the CSS variables the wrapper writes. */
[data-scope="spotlight"][data-part="root"]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    var(--bs-spot-radius, 16rem) circle at var(--bs-spot-x, 50%) var(--bs-spot-y, 50%),
    var(--bs-color-primary),
    transparent 70%
  );
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: 0;
  transition: opacity var(--bs-duration-base) var(--bs-ease-out);
  pointer-events: none;
}

[data-scope="spotlight"][data-part="root"]::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    var(--bs-spot-radius, 16rem) circle at var(--bs-spot-x, 50%) var(--bs-spot-y, 50%),
    color-mix(in oklab, var(--bs-color-primary) 10%, transparent),
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--bs-duration-base) var(--bs-ease-out);
  pointer-events: none;
}

[data-scope="spotlight"][data-part="root"][data-hovered]::before,
[data-scope="spotlight"][data-part="root"][data-hovered]::after {
  opacity: 1;
}
`;
