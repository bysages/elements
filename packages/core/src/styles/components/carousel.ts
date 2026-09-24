export const carouselCss = /* css */ `
[data-scope="carousel"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-3);
  inline-size: 100%;
}

[data-scope="carousel"][data-part="root"][data-orientation="vertical"] {
  flex-direction: row;
  /* The lane's track math resolves --slide-item-size against the group's
     block size, so a vertical carousel needs a bounded window or every
     percentage collapses into a content loop. */
  block-size: 20rem;
}

[data-scope="carousel"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
}

[data-scope="carousel"][data-part="control"][data-orientation="vertical"] {
  flex-direction: column;
}

/* Prev/next and autoplay are outline controls: paper, one hairline, the
   faintest lift — nothing more at rest. */
[data-scope="carousel"][data-part="prev-trigger"],
[data-scope="carousel"][data-part="next-trigger"],
[data-scope="carousel"][data-part="autoplay-trigger"] {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
  padding: 0;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope="carousel"][data-part="prev-trigger"] svg,
[data-scope="carousel"][data-part="next-trigger"] svg,
[data-scope="carousel"][data-part="autoplay-trigger"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

[data-scope="carousel"][data-part="prev-trigger"]:hover:not([data-disabled]),
[data-scope="carousel"][data-part="next-trigger"]:hover:not([data-disabled]),
[data-scope="carousel"][data-part="autoplay-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
  box-shadow: var(--bs-shadow-hover);
  background: var(--bs-color-surface-3);
}

[data-scope="carousel"][data-part="prev-trigger"]:focus-visible,
[data-scope="carousel"][data-part="next-trigger"]:focus-visible,
[data-scope="carousel"][data-part="autoplay-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

/* Pressing settles the control into the page: the shadow lets go. */
[data-scope="carousel"][data-part="prev-trigger"]:active,
[data-scope="carousel"][data-part="next-trigger"]:active,
[data-scope="carousel"][data-part="autoplay-trigger"]:active {
  box-shadow: none;
}

[data-scope="carousel"][data-part="prev-trigger"][data-disabled],
[data-scope="carousel"][data-part="next-trigger"][data-disabled],
[data-scope="carousel"][data-part="autoplay-trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The film strip: slides ride in one clipped lane, measured by the
   machine's --offset/--slide-size so the drag math stays its own. */
[data-scope="carousel"][data-part="item-group"] {
  display: flex;
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  border-radius: var(--bs-radius-sm);
  scrollbar-width: none;
}

[data-scope="carousel"][data-part="item-group"]::-webkit-scrollbar {
  display: none;
}

[data-scope="carousel"][data-part="item"] {
  flex: 0 0 100%;
  min-inline-size: 0;
  overflow: hidden;
  border-radius: var(--bs-radius-sm);
}

[data-scope="carousel"][data-part="item"] img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border-radius: inherit;
  object-fit: cover;
  background: var(--bs-color-surface-inset);
}

[data-scope="carousel"][data-part="indicator-group"] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-space-2);
}

[data-scope="carousel"][data-part="indicator-group"][data-orientation="vertical"] {
  flex-direction: column;
}

/* Indicators are quiet dots; the current page alone carries the ink. */
[data-scope="carousel"][data-part="indicator"] {
  inline-size: calc(var(--bs-space-2) + 2px);
  block-size: calc(var(--bs-space-2) + 2px);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-border-strong);
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="carousel"][data-part="indicator"]:hover:not([data-current]) {
  background: var(--bs-color-text-tertiary);
}

[data-scope="carousel"][data-part="indicator"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="carousel"][data-part="indicator"][data-current] {
  background: var(--bs-color-primary);
}

[data-scope="carousel"][data-part="progress-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--bs-tracking-label);
}
`;
