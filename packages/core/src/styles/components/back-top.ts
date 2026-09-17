export const backTopCss = /* css */ `
/* A way-home control: a small floating tile at the page's corner. The
   paper, hairline and halo are the button's; this family owns the
   mooring and the entrance. It floats, so it casts — one rung of
   elevation, recomposed from the lighting parts. */
[data-scope="back-top"][data-part="root"] {
  position: fixed;
  inset-inline-end: var(--bs-space-6);
  inset-block-end: var(--bs-space-6);
  z-index: var(--bs-z-overlay);
  transition:
    opacity var(--bs-duration-base) var(--bs-ease-out),
    translate var(--bs-duration-base) var(--bs-ease-spring);
}

/* Hidden sinks below the page and steps out of the reading order —
   states remain, animation does not. */
[data-scope="back-top"][data-part="root"][data-state="hidden"] {
  opacity: 0;
  translate: 0 var(--bs-space-2);
  visibility: hidden;
  pointer-events: none;
}

/* The floating tile rises a rung; hovering lifts one more on the same
   slow shadow clock the lighting engine keeps. */
[data-scope="back-top"][data-part="root"][data-state="shown"] [data-scope="button"][data-part="root"],
[data-scope="back-top"][data-part="root"][data-state="shown"]:hover [data-scope="button"][data-part="root"] {
  --bs-shadow-color: color-mix(in oklab, var(--bs-shadow-ink) 30%, transparent);
  box-shadow: var(--bs-elevation-2);
  transition: box-shadow 220ms var(--bs-ease-out);
}

[data-scope="back-top"][data-part="root"][data-state="shown"]:hover [data-scope="button"][data-part="root"] {
  box-shadow: var(--bs-elevation-3);
}

[data-scope="back-top"][data-part="root"][data-state="shown"]:active [data-scope="button"][data-part="root"] {
  box-shadow: none;
}

/* The return trip rides the page's own scroll container, offered only
   while the reader allows motion. */
@media (prefers-reduced-motion: no-preference) {
  html:has([data-scope="back-top"][data-part="root"][data-state="shown"]) {
    scroll-behavior: smooth;
  }
}
`;
