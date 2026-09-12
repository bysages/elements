import { labelCss } from "./shared";

export const imageCropperCss =
  labelCss("image-cropper") +
  /* css */ `
[data-scope="image-cropper"][data-part="root"] {
  --bs-cropper-line: color-mix(in oklab, var(--bs-color-surface-2) 60%, transparent);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-3);
}

/* The viewport is a vessel: rounded, resting in ambient shade while the
   photograph waits to be framed. */
[data-scope="image-cropper"][data-part="viewport"] {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-inset);
  overflow: hidden;
}

[data-scope="image-cropper"][data-part="image"] {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  backface-visibility: hidden;
}

/* The selection is the lit window: everything outside dims under one spread
   scrim, the frame itself stays a light hairline. */
[data-scope="image-cropper"][data-part="selection"] {
  box-sizing: content-box;
  border: 1px solid var(--bs-cropper-line);
  box-shadow: 0 0 0 9999px var(--bs-color-scrim);
  cursor: move;
  outline: none;
  backface-visibility: hidden;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="image-cropper"][data-part="selection"][data-shape="circle"] {
  border-radius: 9999px;
}

[data-scope="image-cropper"][data-part="selection"]:focus-visible {
  border-color: var(--bs-color-primary);
}

[data-scope="image-cropper"][data-part="selection"][data-dragging] {
  cursor: grabbing;
  border-color: var(--bs-color-surface-2);
}

[data-scope="image-cropper"][data-part="selection"][data-disabled] {
  cursor: default;
}

/* Handles are L-shaped corner seals (corners cut, like the control radius);
   edge handles stay hidden dots that only appear when wanted. */
[data-scope="image-cropper"][data-part="handle"] {
  --bs-cropper-arm: 3px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}

[data-scope="image-cropper"][data-part="handle"] > * {
  inline-size: var(--bs-space-1);
  block-size: var(--bs-space-1);
  transition: transform var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="image-cropper"][data-part="handle"][data-disabled] {
  display: none;
}

[data-scope="image-cropper"][data-part="handle"][data-position="top-left"] {
  cursor: nwse-resize;
}

[data-scope="image-cropper"][data-part="handle"][data-position="top-left"] > * {
  border-block-start: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
  border-inline-start: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
}

[data-scope="image-cropper"][data-part="handle"][data-position="top-right"] {
  cursor: nesw-resize;
}

[data-scope="image-cropper"][data-part="handle"][data-position="top-right"] > * {
  border-block-start: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
  border-inline-end: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
}

[data-scope="image-cropper"][data-part="handle"][data-position="bottom-right"] {
  cursor: nwse-resize;
}

[data-scope="image-cropper"][data-part="handle"][data-position="bottom-right"] > * {
  border-block-end: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
  border-inline-end: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
}

[data-scope="image-cropper"][data-part="handle"][data-position="bottom-left"] {
  cursor: nesw-resize;
}

[data-scope="image-cropper"][data-part="handle"][data-position="bottom-left"] > * {
  border-block-end: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
  border-inline-start: var(--bs-cropper-arm) solid var(--bs-color-surface-2);
}

[data-scope="image-cropper"][data-part="handle"]:hover > * {
  transform: scale(1.25);
}

[data-scope="image-cropper"][data-part="handle"][data-position="top"],
[data-scope="image-cropper"][data-part="handle"][data-position="bottom"] {
  cursor: ns-resize;
}

[data-scope="image-cropper"][data-part="handle"][data-position="left"],
[data-scope="image-cropper"][data-part="handle"][data-position="right"] {
  cursor: ew-resize;
}

/* The rule of thirds: quiet until the frame moves, then the grid surfaces
   so composition is visible while it is being decided. */
[data-scope="image-cropper"][data-part="grid"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms var(--bs-ease-out);
}

[data-scope="image-cropper"][data-part="grid"][data-axis="horizontal"] {
  inset-block: 33.33% 33.33%;
  inset-inline: 0;
  border-block-start: 1px solid var(--bs-cropper-line);
  border-block-end: 1px solid var(--bs-cropper-line);
}

[data-scope="image-cropper"][data-part="grid"][data-axis="vertical"] {
  inset-inline: 33.33% 33.33%;
  inset-block: 0;
  border-inline-start: 1px solid var(--bs-cropper-line);
  border-inline-end: 1px solid var(--bs-cropper-line);
}

[data-scope="image-cropper"][data-part="grid"][data-dragging],
[data-scope="image-cropper"][data-part="grid"][data-panning] {
  opacity: 1;
}
`;
