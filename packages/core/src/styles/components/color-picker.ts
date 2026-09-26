import { labelCss, popupContentCss, positionerCss } from "./shared";

export const colorPickerCss =
  labelCss("color-picker") +
  positionerCss("color-picker") +
  popupContentCss("color-picker", "16rem") +
  /* css */ `
[data-scope="color-picker"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="color-picker"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

[data-scope="color-picker"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

/* The value text carries the picked color in words — quiet, tabular, never
   fighting the swatch for attention. */
[data-scope="color-picker"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
}

/* The trigger is a seal holding the current color; the checkerboard sits
   underneath the swatch as a sibling, so translucent ink reads honestly. */
[data-scope="color-picker"][data-part="trigger"] {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="color-picker"][data-part="trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="color-picker"][data-part="trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="color-picker"][data-part="trigger"][data-disabled] {
  background: var(--bs-color-surface-inset);
  box-shadow: none;
  cursor: not-allowed;
}

/* The swatch sits as a seal inset into the trigger's paper face — never a
   full-bleed fill, which would read as a foreign block rather than ink on
   paper. A hairline under the pigment keeps pale picks visible. */
[data-scope="color-picker"][data-part="swatch"] {
  position: absolute;
  inset: var(--bs-space-1);
  border-radius: var(--bs-radius-xs);
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
}

/* The checkerboard is painted before the track/swatch in DOM order and
   stacks in the same inset — never the parent background, or the whole
   control would read as transparent. */
[data-scope="color-picker"][data-part="transparency-grid"] {
  position: absolute;
  inset: var(--bs-space-1);
  border-radius: var(--bs-radius-xs);
}

/* The geometry vars live on the content: the popup teleports to body, out
   of the root's inheritance chain, so root-scoped vars never reach it. */
[data-scope="color-picker"][data-part="content"] {
  --bs-color-picker-thumb: 0.875rem;
  --bs-color-picker-track: 0.625rem;
  --bs-color-picker-area: 10rem;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-md);
  padding: var(--bs-padding-lg);
}

/* The area is the draggable square panel: light comes from the corner, so
   saturation spreads right and brightness falls downward. */
[data-scope="color-picker"][data-part="area"] {
  position: relative;
  block-size: var(--bs-color-picker-area);
  border-radius: var(--bs-radius-sm);
  overflow: hidden;
  touch-action: none;
}

[data-scope="color-picker"][data-part="area-background"] {
  inline-size: 100%;
  block-size: 100%;
  border-radius: inherit;
}

[data-scope="color-picker"][data-part="area-thumb"] {
  position: absolute;
  inline-size: var(--bs-color-picker-thumb);
  block-size: var(--bs-color-picker-thumb);
  border-radius: var(--bs-radius-full);
  outline: none;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 2px var(--bs-color-surface-2),
    0 0 0 3px var(--bs-color-border);
  transition: box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="area-thumb"]:focus-visible {
  box-shadow:
    0 0 0 2px var(--bs-color-surface-2),
    0 0 0 3px var(--bs-color-primary);
}

[data-scope="color-picker"][data-part="channel-slider"] {
  position: relative;
  block-size: var(--bs-color-picker-track);
  border-radius: var(--bs-radius-sm);
  touch-action: none;
}

[data-scope="color-picker"][data-part="channel-slider-track"] {
  inline-size: 100%;
  block-size: 100%;
  border-radius: var(--bs-radius-sm);
}

[data-scope="color-picker"][data-part="channel-slider-thumb"] {
  position: absolute;
  inline-size: var(--bs-color-picker-thumb);
  block-size: var(--bs-color-picker-thumb);
  border-radius: var(--bs-radius-full);
  outline: none;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 2px var(--bs-color-surface-2),
    0 0 0 3px var(--bs-color-border);
  transition: box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="channel-slider-thumb"]:focus-visible {
  box-shadow:
    0 0 0 2px var(--bs-color-surface-2),
    0 0 0 3px var(--bs-color-primary);
}

[data-scope="color-picker"][data-part="channel-slider-label"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
}

[data-scope="color-picker"][data-part="channel-slider-value-text"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  font-variant-numeric: tabular-nums;
}

[data-scope="color-picker"][data-part="channel-input"] {
  box-sizing: border-box;
  flex: 1;
  min-inline-size: 0;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-variant-numeric: tabular-nums;
  appearance: textfield;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="channel-input"]::-webkit-outer-spin-button,
[data-scope="color-picker"][data-part="channel-input"]::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

[data-scope="color-picker"][data-part="channel-input"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="color-picker"][data-part="channel-input"]:focus,
[data-scope="color-picker"][data-part="channel-input"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="color-picker"][data-part="channel-input"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The alpha figure is a short count, not a word — it cedes the row to hex,
   which needs the room to spell six digits plus a hash. */
[data-scope="color-picker"][data-part="channel-input"][data-channel="alpha"] {
  flex: 0 0 3.5rem;
}

[data-scope="color-picker"][data-part="swatch-group"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-gap-sm);
}

/* A saved-color view stacks the channel inputs of one format; the picker
   swaps views as the format turns. */
[data-scope="color-picker"][data-part="view"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* Saved swatches are quiet squares; picking one draws the primary ring, and
   the checked rule must out-rank the hover ring. */
[data-scope="color-picker"][data-part="swatch-trigger"] {
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  cursor: pointer;
  outline: none;
}

[data-scope="color-picker"][data-part="swatch-trigger"]:hover:not([data-disabled], :focus-visible) {
  box-shadow: 0 0 0 1px var(--bs-color-border-strong);
}

[data-scope="color-picker"][data-part="swatch-trigger"]:focus-visible {
  box-shadow: var(--bs-focus-ring);
}

[data-scope="color-picker"][data-part="swatch-trigger"][data-state="checked"]:not(:focus-visible),
[data-scope="color-picker"][data-part="swatch-trigger"]:hover:not([data-disabled], :focus-visible)[data-state="checked"] {
  box-shadow: 0 0 0 1px var(--bs-color-primary);
}

[data-scope="color-picker"][data-part="swatch"] {
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  border-radius: var(--bs-radius-sm);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--bs-color-border);
}

[data-scope="color-picker"][data-part="swatch-indicator"] {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--bs-color-surface-2);
}

[data-scope="color-picker"][data-part="swatch-indicator"] svg {
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
}

/* The eyedropper rides the same control recipe as the trigger it sits
   beside — an icon-sized seal. */
[data-scope="color-picker"][data-part="eye-dropper-trigger"] {
  display: grid;
  place-items: center;
  flex: none;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-secondary);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="eye-dropper-trigger"] svg {
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
}

[data-scope="color-picker"][data-part="eye-dropper-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  color: var(--bs-color-text-primary);
}

[data-scope="color-picker"][data-part="eye-dropper-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="color-picker"][data-part="eye-dropper-trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="color-picker"][data-part="eye-dropper-trigger"][data-disabled] {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="color-picker"][data-part="format-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-gap-xs);
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="format-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="color-picker"][data-part="format-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="color-picker"][data-part="format-trigger"]:active:not([data-disabled]) {
  box-shadow: none;
}

[data-scope="color-picker"][data-part="format-select"] {
  box-sizing: border-box;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="color-picker"][data-part="format-select"]:focus-visible {
  outline: none;
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}
`;
