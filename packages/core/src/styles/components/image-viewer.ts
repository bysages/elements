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
  /* One row capped at the viewport: an auto row would let the picture's
     intrinsic height stretch the content past the screen, carrying the
     toolbar out of reach below the fold. */
  grid-template-rows: minmax(0, 1fr);
  padding: 0;
}

[data-scope="dialog"][data-part="content"].bs-image-viewer-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-lg);
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

/* The picture takes the row the toolbar leaves and keeps its shape
   inside it — contain centers whatever the frame cannot hold. The
   minimum height must be let go of explicitly, or the picture's own
   height would pin the row and push the tools off the screen. The
   hand's zoom and quarter-turns compose on one transform, which never
   animates into place on open — zoom is the reader's hand, not the
   ink's. */
[data-scope="image-viewer"][data-part="viewport"] {
  display: block;
  flex: 1 1 auto;
  min-block-size: 0;
  min-inline-size: 0;
  inline-size: 100%;
  object-fit: contain;
  user-select: none;
  transition: transform var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="image-viewer"][data-part="toolbar"] {
  display: flex;
  flex: none;
  justify-content: center;
  gap: var(--bs-gap-sm);
  /* The tools ride a small lacquer tray: a translucent ink that keeps
     the room dark in either register, held clear of the picture above
     and of the page's edge below. The group inside carries the joinery;
     its corners stay at the control register. */
  inline-size: max-content;
  margin-inline: auto;
  margin-block-end: var(--bs-margin-xl);
  padding: var(--bs-padding-xs);
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: color-mix(in oklab, var(--bs-color-gray-900) 72%, transparent);
}

/* Ghost ink over the dark scrim must be the paper-bright ink that never
   flips with the theme, and the hover wash follows as a pale breath. */
[data-scope="image-viewer"][data-part="toolbar"] [data-scope="button"][data-part="root"] {
  --_ink: var(--bs-color-text-on-scrim);
  --_fill-hover: color-mix(in oklab, var(--bs-color-surface-2) 16%, transparent);
}
`;
