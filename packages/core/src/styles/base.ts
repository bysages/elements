/** Document-level guard rules. The machines drive visibility with the
 * `hidden` attribute (select/combobox item indicators), which any author
 * `display` declaration would defeat — so the attribute wins here. */
export const baseCss = /* css */ `
[hidden] {
  display: none !important;
}
`;

/** Press feedback that rides the motion attribute, not any one component —
 * anything with `data-motion~="ink-ripple"` bleeds from its press point. */
export const inkRippleCss = /* css */ `
[data-motion~="ink-ripple"] {
  position: relative;
  overflow: hidden;
}

[data-motion~="ink-ripple"]::after {
  content: "";
  position: absolute;
  left: var(--bs-ripple-x, 50%);
  top: var(--bs-ripple-y, 50%);
  /* Large enough that, pressed at any corner, the wash still sweeps the
     far diagonal before it starts dissolving (250% × 80% ≥ 141%). */
  inline-size: 250%;
  aspect-ratio: 1;
  translate: -50% -50%;
  border-radius: 100%;
  background: radial-gradient(
    circle closest-side,
    var(--_ripple-pigment, color-mix(in oklab, var(--bs-color-primary) 30%, transparent)),
    transparent 80%
  );
  scale: 0;
  opacity: 0;
  pointer-events: none;
}

[data-motion~="ink-ripple"][data-ripple="run"]::after {
  animation: bs-ink-ripple calc(650ms * var(--bs-motion-scale, 1)) var(--bs-ease-out);
}

/* Ink into water: the wash sweeps across the whole surface at full
   strength first, and only once it has covered the body does it start
   dissolving — never fading while it still has ground to cover. */
@keyframes bs-ink-ripple {
  0% {
    scale: 0.15;
    opacity: 0.9;
  }
  45% {
    scale: 1;
    opacity: 0.9;
  }
  100% {
    scale: 1;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-motion~="ink-ripple"][data-ripple="run"]::after {
    animation-duration: 1ms;
  }
}
`;
