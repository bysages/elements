import { labelCss } from "./shared";

export const sliderCss =
  labelCss("slider") +
  /* css */ `
[data-scope="slider"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  inline-size: 100%;
}

[data-scope="slider"][data-part="root"][data-orientation="vertical"] {
  align-items: center;
}

[data-scope="slider"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
}

[data-scope="slider"][data-part="control"] {
  position: relative;
  display: flex;
  align-items: center;
  block-size: var(--bs-control-height-sm);
  cursor: pointer;
  touch-action: none;
}

[data-scope="slider"][data-part="control"][data-orientation="vertical"] {
  flex-direction: column;
  inline-size: var(--bs-control-height-sm);
  block-size: 10rem;
}

[data-scope="slider"][data-part="control"][data-disabled] {
  cursor: not-allowed;
}

/* The track is the recess the ink range runs in: one quiet inset band,
   never a shadowed groove. */
[data-scope="slider"][data-part="track"] {
  flex: 1;
  block-size: var(--bs-space-2);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-inset);
  overflow: hidden;
}

[data-scope="slider"][data-part="track"][data-orientation="vertical"] {
  flex: 1;
  inline-size: var(--bs-space-2);
  block-size: auto;
}

/* The range is the selected ink: flat primary, no inner shadow, no lit
   edge — the same fill a checked control carries. */
[data-scope="slider"][data-part="range"] {
  block-size: 100%;
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary);
}

[data-scope="slider"][data-part="range"][data-orientation="vertical"] {
  inline-size: 100%;
}

/* The thumb is a paper seal riding the ink: surface fill, primary hairline,
   focus turns the ring primary — never a background change. Its size rides
   the control height at a fixed share (five eighths), not the density
   scale — scenes that grow the targets grow the thumb with them, never
   past the track it sits on. */
[data-scope="slider"][data-part="thumb"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: calc(var(--bs-control-height-md) * 0.625);
  block-size: calc(var(--bs-control-height-md) * 0.625);
  border: 1px solid var(--bs-color-primary);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
  outline: none;
  box-shadow: var(--bs-shadow-xs);
  transition:
    box-shadow var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="slider"][data-part="thumb"]:focus-visible,
[data-scope="slider"][data-part="thumb"][data-focus] {
  box-shadow: var(--bs-focus-ring);
}

[data-scope="slider"][data-part="thumb"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  box-shadow: none;
}

/* The dragging indicator is a floating value whisper: popup chrome in
   miniature, dissolving in only while the hand holds the thumb. */
[data-scope="slider"][data-part="dragging-indicator"] {
  position: absolute;
  top: calc(-1 * var(--bs-space-7));
  z-index: 1;
  padding: var(--bs-space-1) var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-xs);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--bs-shadow-xs);
  opacity: 0;
  transition: opacity var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="slider"][data-part="dragging-indicator"][data-state="open"] {
  opacity: 1;
}

[data-scope="slider"][data-part="marker-group"] {
  position: absolute;
  inset-inline: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

[data-scope="slider"][data-part="marker-group"][data-orientation="vertical"] {
  inset-block: 0;
  inset-inline: auto;
  flex-direction: column;
  margin-inline-start: var(--bs-space-3);
}

/* Markers are hairline ticks on the ruler; ticks the ink has passed take
   the primary pigment so the scale reads with the range. */
[data-scope="slider"][data-part="marker"] {
  position: relative;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-variant-numeric: tabular-nums;
}

[data-scope="slider"][data-part="marker"]::before {
  content: "";
  position: absolute;
  top: calc(-1 * var(--bs-space-3));
  left: 50%;
  inline-size: 1px;
  block-size: var(--bs-space-1);
  background: var(--bs-color-border-strong);
  translate: -50% 0;
}

[data-scope="slider"][data-part="marker"][data-state="at-value"],
[data-scope="slider"][data-part="marker"][data-state="under-value"] {
  color: var(--bs-color-primary);
}

[data-scope="slider"][data-part="marker"][data-state="at-value"]::before,
[data-scope="slider"][data-part="marker"][data-state="under-value"]::before {
  background: var(--bs-color-primary);
}

[data-scope="slider"][data-part="marker"][data-disabled] {
  color: var(--bs-color-text-disabled);
}
`;
