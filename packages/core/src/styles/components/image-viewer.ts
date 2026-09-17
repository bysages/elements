export const imageViewerCss = /* css */ `
/* The lightbox rides the dialog machine for scrim, stacking, focus and
   Escape, but it owns the whole screen: the extra class out-specifies
   the sheet chrome — no paper vessel, just the picture floating over
   the dimmed page. The layer math repeats the dialog's on purpose: the
   viewer must stand correct even where the dialog's own sheet is
   never styled. */
[data-scope="dialog"][data-part="backdrop"].bs-image-viewer-backdrop {
  position: fixed;
  inset: 0;
  /* One below its positioner, from the same shared base. */
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0) - 1);
  background: var(--bs-color-scrim);
  transition: opacity var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="dialog"][data-part="positioner"].bs-image-viewer-positioner {
  position: fixed;
  inset: 0;
  z-index: calc(var(--bs-z-overlay) + var(--layer-index, 0));
  display: grid;
  padding: 0;
}

[data-scope="dialog"][data-part="content"].bs-image-viewer-content {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
  max-block-size: none;
  overflow: visible;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

[data-scope="dialog"][data-part="content"].bs-image-viewer-content:focus,
[data-scope="dialog"][data-part="content"].bs-image-viewer-content:focus-visible {
  outline: none;
}

/* The panel grammar still holds: the lightbox dissolves in — the room
   darkening, never a flash. */
[data-scope="dialog"][data-part="content"].bs-image-viewer-content[data-state="open"] {
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}

/* The picture, centered in what the toolbar leaves: the hand's zoom
   and quarter-turns compose on one transform. The transform itself
   never animates into place on open — zoom is the reader's hand, not
   the ink's. */
[data-scope="image-viewer"][data-part="viewport"] {
  display: block;
  margin: auto;
  max-inline-size: calc(100% - var(--bs-space-10));
  max-block-size: calc(100% - var(--bs-space-16));
  user-select: none;
  transition: transform var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="image-viewer"][data-part="toolbar"] {
  display: flex;
  flex: none;
  justify-content: center;
  gap: var(--bs-space-2);
  padding-block-end: var(--bs-space-6);
}

/* Ghost ink is the page's own ink — over the dark scrim it must turn
   to paper, and the hover wash follows as a pale breath. */
[data-scope="image-viewer"][data-part="toolbar"] [data-scope="button"][data-part="root"] {
  --_ink: var(--bs-color-text-inverse);
  --_fill-hover: color-mix(in oklab, var(--bs-color-surface-2) 16%, transparent);
}
`;
