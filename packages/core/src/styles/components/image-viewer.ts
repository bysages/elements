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

/* The Preview part is a visual doorway, not a second control: the
   wrapped image remains the accessible trigger while hover and focus
   reveal a curated glyph over the picture. */
[data-scope="image-viewer"][data-part~="preview"] {
  position: relative;
  display: block;
  max-inline-size: fit-content;
  cursor: pointer;
}

/* Without custom content the doorway is the icon itself: a compact,
   quiet control so the reader sees both the affordance and the target. */
[data-scope="image-viewer"][data-part~="preview"][data-empty="true"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  /* The shared Preview caps custom doors at their own content; the fixed icon must opt out. */
  max-inline-size: none;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  color: var(--bs-color-text);
  background: var(--bs-color-surface-2);
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-shadow-xs);
  transition: box-shadow var(--bs-duration-base) var(--bs-ease-out),
    border-color var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="image-viewer"][data-part~="preview"][data-empty="true"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="image-viewer"][data-part~="preview"][data-empty="true"]:focus-visible {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
  outline: none;
}

[data-scope="image-viewer"][data-part~="preview"][data-empty="true"] svg {
  inline-size: var(--bs-space-5);
  block-size: var(--bs-space-5);
}

[data-scope="image-viewer"][data-part~="preview"] [data-scope="image"][data-part="root"] {
  transition: box-shadow var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="image-viewer"][data-part~="preview"]:hover [data-scope="image"][data-part="root"],
[data-scope="image-viewer"][data-part~="preview"]:focus-visible [data-scope="image"][data-part="root"] {
  box-shadow: var(--bs-focus-ring);
}

[data-scope="image-viewer"][data-part="preview-overlay"] {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-xs);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-on-scrim);
  background: color-mix(in oklab, var(--bs-color-scrim) 38%, transparent);
  opacity: 0;
  transition: opacity var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="image-viewer"][data-part~="preview"]:hover [data-part="preview-overlay"],
[data-scope="image-viewer"][data-part~="preview"]:focus-visible [data-part="preview-overlay"] {
  opacity: 1;
}

[data-scope="image-viewer"][data-part="preview-overlay"] svg {
  inline-size: var(--bs-space-6);
  block-size: var(--bs-space-6);
}

[data-scope="image-viewer"][data-part="preview-label"] {
  color: var(--bs-color-text-on-scrim);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
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
  transform: var(--bs-image-viewer-transform, none);
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
  margin-block-end: max(var(--bs-margin-xl), var(--bs-safe-area-inset-bottom));
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
