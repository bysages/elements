/** Document-level guard rules. The machines drive visibility with the
 * `hidden` attribute (select/combobox item indicators), which any author
 * `display` declaration would defeat — so the attribute wins here. */
export const baseCss = /* css */ `
[hidden] {
  display: none !important;
}

/* Every scrollbar speaks the same ink: a thin rail and a quiet
   hairline thumb over transparent track — present enough to grab,
   quiet enough to ignore. The standard properties (Firefox, Chrome
   121+, Safari 18+) are the whole story: once scrollbar-color is set,
   the engine retires its own classic scrollbar, so no ::-webkit
   duplicates ride along. The universal selector matters because
   scrollbar-width does not inherit — inner scrollers (code blocks,
   table viewports, rails) need their own declaration. */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--bs-color-border-strong) transparent;
}

/* The field baseline: containers that hold text or choices fill their
   container — width is the layout's decision, never the component's.
   Zero specificity (:where), so a family's own declaration always wins
   without a fight; intrinsic controls (buttons, chips, markers) are
   simply not on the list. */
:where([data-scope="select"], [data-scope="combobox"], [data-scope="listbox"],
  [data-scope="cascade-select"], [data-scope="tree-select"],
  [data-scope="number-input"], [data-scope="password-input"],
  [data-scope="date-input"], [data-scope="date-picker"],
  [data-scope="color-picker"], [data-scope="tags-input"],
  [data-scope="fieldset"], [data-scope="file-upload"],
  [data-scope="signature-pad"])[data-part="root"] {
  inline-size: 100%;
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
    var(--bs-ripple-pigment) var(--bs-ripple-core, 0%),
    transparent var(--bs-ripple-fade, 80%)
  );
  scale: 0;
  opacity: 0;
  pointer-events: none;
}

[data-motion~="ink-ripple"][data-ripple="press"]::after {
  animation: bs-ripple-press var(--bs-ripple-duration, calc(650ms * var(--bs-motion-scale, 1)))
    var(--bs-ripple-ease, var(--bs-ease-out)) forwards;
}

/* On release the press phase keeps running to full cover — re-declaring
   the same-name animation carries it over instead of restarting — while
   the dissolve fades on top of it. */
[data-motion~="ink-ripple"][data-ripple="release"]::after {
  animation: bs-ripple-press var(--bs-ripple-duration, calc(650ms * var(--bs-motion-scale, 1)))
      var(--bs-ripple-ease, var(--bs-ease-out)) forwards,
    bs-ripple-fade var(--bs-ripple-release, calc(320ms * var(--bs-motion-scale, 1))) ease-out
      forwards;
}

/* Ink wells up from the fingertip: the wash starts small at the press
   point and grows while drifting toward the element's center (--bs-ripple-dx/dy,
   set by the press watcher), staying at full strength while the pointer
   holds — the paper is wet until the hand lifts. Peak opacity rides
   --bs-ripple-opacity so a scene can quiet the wash or silence it
   entirely; --bs-ripple-spread caps how far it reaches. */
@keyframes bs-ripple-press {
  from {
    translate: -50% -50%;
    scale: 0.2;
    opacity: var(--bs-ripple-opacity, 0.9);
  }
  to {
    translate: calc(-50% + var(--bs-ripple-dx, 0px)) calc(-50% + var(--bs-ripple-dy, 0px));
    scale: var(--bs-ripple-spread, 1);
    opacity: var(--bs-ripple-opacity, 0.9);
  }
}

@keyframes bs-ripple-fade {
  from {
    opacity: var(--bs-ripple-opacity, 0.9);
  }
  to {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-motion~="ink-ripple"][data-ripple="press"]::after,
  [data-motion~="ink-ripple"][data-ripple="release"]::after {
    animation-duration: 1ms;
  }
}
`;
