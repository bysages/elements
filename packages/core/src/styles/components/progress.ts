import { labelCss } from "./shared";

export const progressCss =
  labelCss("progress") +
  /* css */ `
[data-scope="progress"][data-part="root"] {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: var(--bs-gap-xs) var(--bs-gap-sm);
  /* The bar spans whatever measure the consumer gives it — a width cap
     here breaks card layouts, and a bare pixel value is not ours to set. */
  inline-size: 100%;
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

[data-scope="progress"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-variant-numeric: tabular-nums;
  text-align: end;
}

/* The track is a groove pressed into the paper — ink will run through it,
   so it stays quiet until the fill arrives. It sits one mix-step below the
   ground it is drawn on (the ground itself), or the groove reads as
   nothing; the pressed depth keeps it visible. */
[data-scope="progress"][data-part="track"] {
  grid-column: 1 / -1;
  overflow: hidden;
  block-size: var(--bs-space-1);
  border-radius: var(--bs-radius-sm);
  background: color-mix(in oklab, var(--bs-color-surface-0) 96%, black);
}

[data-scope="progress"][data-part="track"][data-orientation="vertical"] {
  grid-column: auto;
  inline-size: var(--bs-space-1);
  block-size: 10rem;
}

/* The range is the ink: it flows along the track at the machine's pace,
   and the width trails by design — light needs time. */
[data-scope="progress"][data-part="range"] {
  block-size: 100%;
  border-radius: inherit;
  background: var(--bs-color-primary);
  transition:
    inline-size var(--bs-duration-slow) var(--bs-ease-out),
    block-size var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="progress"][data-part="range"][data-orientation="vertical"] {
  inline-size: 100%;
}

/* Indeterminate work drifts across the track — motion states presence
   without claiming a measure. */
[data-scope="progress"][data-part="range"][data-state="indeterminate"] {
  inline-size: 50%;
  animation: bs-progress-drift 1.4s var(--bs-ease-in-out) infinite;
}

[data-scope="progress"][data-part="range"][data-orientation="vertical"][data-state="indeterminate"] {
  inline-size: 100%;
  block-size: 50%;
  animation: bs-progress-drift-y 1.4s var(--bs-ease-in-out) infinite;
}

/* Reduced motion parks the drift: the half-range stays put, so presence
   still reads, only without the endless sweep. */
@media (prefers-reduced-motion: reduce) {
  [data-scope="progress"][data-part="range"][data-state="indeterminate"] {
    animation: none;
  }
}

/* The circular view rides the same grammar: a quiet groove, an ink arc,
   both drawn by the machine's --percent. */
[data-scope="progress"][data-part="view"] {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-color-text-secondary);
}

[data-scope="progress"][data-part="circle"] {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 5rem;
  block-size: 5rem;
}

[data-scope="progress"][data-part="circle"] > svg {
  inline-size: 100%;
  block-size: 100%;
}

[data-scope="progress"][data-part="circle-track"],
[data-scope="progress"][data-part="circle-range"] {
  fill: none;
  stroke-width: 6px;
}

[data-scope="progress"][data-part="circle-track"] {
  stroke: color-mix(in oklab, var(--bs-color-surface-0) 92%, black);
}

[data-scope="progress"][data-part="circle-range"] {
  stroke: var(--bs-color-primary);
  transition: stroke-dashoffset var(--bs-duration-slow) var(--bs-ease-out);
}

@keyframes bs-progress-drift {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
  }
}

@keyframes bs-progress-drift-y {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(200%);
  }
}

/* Size rungs: the root's data-size re-points the groove ladder —
   the circle view keeps its own geometry. */
[data-scope="progress"][data-part="root"][data-size="sm"] [data-part="track"] {
  block-size: calc(var(--bs-space-1) * 0.75);
}

[data-scope="progress"][data-part="root"][data-size="lg"] [data-part="track"] {
  block-size: var(--bs-space-2);
}
`;
