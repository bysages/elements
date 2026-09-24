import { labelCss } from "./shared";

export const angleSliderCss =
  labelCss("angle-slider") +
  /* css */ `
[data-scope="angle-slider"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--bs-space-4);
}

[data-scope="angle-slider"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

[data-scope="angle-slider"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
}

/* The dial is a vessel laid flat: a paper disc with one hairline, resting
   on the page — a compass rose, not a control plate. */
[data-scope="angle-slider"][data-part="control"] {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: calc(var(--bs-space-24) * 2);
  block-size: calc(var(--bs-space-24) * 2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
  cursor: grab;
  touch-action: none;
  user-select: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="angle-slider"][data-part="control"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="angle-slider"][data-part="control"][data-focus] {
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="angle-slider"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="angle-slider"][data-part="control"][data-disabled] {
  background: var(--bs-color-surface-inset);
  box-shadow: none;
  cursor: not-allowed;
}

/* The pivot: a hairline dot at the heart of the dial, so the rotation has
   an axis to read against. */
[data-scope="angle-slider"][data-part="control"]::after {
  content: "";
  position: absolute;
  inline-size: var(--bs-space-1);
  block-size: var(--bs-space-1);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-border-strong);
}

/* The thumb is the pointer itself — a radial needle the machine rotates
   through the --angle variable; the CSS only supplies the needle and its knob. */
[data-scope="angle-slider"][data-part="thumb"] {
  position: absolute;
  inset-block: 0;
  inline-size: var(--bs-space-1);
  left: calc(50% - var(--bs-space-1) / 2);
  outline: none;
  z-index: 1;
}

[data-scope="angle-slider"][data-part="thumb"]::before {
  content: "";
  position: absolute;
  top: var(--bs-space-2);
  left: 50%;
  translate: -50% 0;
  box-sizing: border-box;
  inline-size: var(--bs-space-3);
  block-size: var(--bs-space-3);
  border: 1px solid var(--bs-color-surface-2);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary);
  box-shadow: var(--bs-shadow-xs);
  transition: box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="angle-slider"][data-part="thumb"]:focus-visible::before,
[data-scope="angle-slider"][data-part="thumb"][data-focus]::before {
  box-shadow: var(--bs-focus-ring);
}

[data-scope="angle-slider"][data-part="thumb"][data-invalid]::before {
  background: var(--bs-color-danger);
}

[data-scope="angle-slider"][data-part="thumb"][data-disabled]::before {
  background: var(--bs-color-text-disabled);
  box-shadow: none;
}

[data-scope="angle-slider"][data-part="marker-group"] {
  position: absolute;
  inset: 0;
  border-radius: var(--bs-radius-full);
  pointer-events: none;
  z-index: 0;
}

/* Ticks sit on the dial rim like degree marks; the tick the needle points
   at takes the pigment, the rest stay hairline-quiet. */
[data-scope="angle-slider"][data-part="marker"] {
  position: absolute;
  inset-block: 0;
  inline-size: var(--bs-space-1);
  left: calc(50% - var(--bs-space-1) / 2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-variant-numeric: tabular-nums;
}

[data-scope="angle-slider"][data-part="marker"][data-state="at-value"] {
  color: var(--bs-color-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="angle-slider"][data-part="marker"]::before {
  content: "";
  position: absolute;
  top: var(--bs-space-1);
  left: 50%;
  translate: -50% 0;
  inline-size: 1px;
  block-size: var(--bs-space-2);
  background: var(--bs-color-border-strong);
}

[data-scope="angle-slider"][data-part="marker"][data-state="at-value"]::before {
  background: var(--bs-color-primary);
}

[data-scope="angle-slider"][data-part="marker"][data-disabled]::before {
  background: var(--bs-color-border);
}
`;
