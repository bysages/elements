export const swapCss = /* css */ `
/* The swap is two impressions occupying one seal: the machine stacks both
   indicators in the same grid cell and plays each in and out on its
   data-state. Keyframes, not transitions — the presence waits on
   animationend, so the exit always finishes before the part is hidden. */
[data-scope="swap"][data-part="root"] {
  display: inline-grid;
  place-items: center;
}

[data-scope="swap"][data-part="indicator"] {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Ink bleeds in on the spring — arriving with the blur dissolve. */
[data-scope="swap"][data-part="indicator"][data-state="open"] {
  animation: bs-swap-in 220ms var(--bs-ease-spring);
}

/* Light lets go — the departing impression dissolves away. */
[data-scope="swap"][data-part="indicator"][data-state="closed"] {
  animation: bs-swap-out 120ms var(--bs-ease-out);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="swap"][data-part="indicator"][data-state="open"],
  [data-scope="swap"][data-part="indicator"][data-state="closed"] {
    animation-duration: 1ms;
  }
}

/* The choreography travels as variables: a consumer retunes the move
   (fade, flip, rotate, scale) by setting --bs-swap-in / --bs-swap-out on
   any ancestor — the defaults live only in these fallbacks so nothing
   beats the override down the tree. */
@keyframes bs-swap-in {
  from {
    opacity: 0;
    transform: var(--bs-swap-out, scale(0.55));
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: var(--bs-swap-in, scale(1));
    filter: blur(0);
  }
}

@keyframes bs-swap-out {
  from {
    opacity: 1;
    transform: var(--bs-swap-in, scale(1));
  }
  to {
    opacity: 0;
    transform: var(--bs-swap-out, scale(0.55));
  }
}
`;
