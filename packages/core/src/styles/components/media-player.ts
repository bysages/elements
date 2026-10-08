export const mediaPlayerCss = /* css */ `
[data-scope="media-player"][data-part="root"] {
  container: media-player / inline-size;
  display: flex;
  flex-direction: column;
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow: clip;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="media-player"][data-part="root"][data-error] {
  border-color: var(--bs-color-danger);
}

[data-scope="media-player"][data-part="stage"] {
  display: grid;
  min-inline-size: 0;
  background: var(--bs-color-surface-0);
}

[data-scope="media-player"][data-kind="audio"] [data-part="stage"] {
  display: none;
}

[data-scope="media-player"][data-part="media"] {
  display: block;
  inline-size: 100%;
  min-inline-size: 0;
}

[data-scope="media-player"][data-kind="video"] [data-part="media"] {
  aspect-ratio: 16 / 9;
  block-size: auto;
  max-inline-size: 100%;
  object-fit: contain;
  background: var(--bs-color-surface-0);
}

[data-scope="media-player"][data-part="controls"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  min-inline-size: 0;
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border-block-start: 1px solid var(--bs-color-border);
  background: var(--bs-color-surface-1);
}

[data-scope="media-player"][data-part="play-button"],
[data-scope="media-player"][data-part="mute-button"],
[data-scope="media-player"][data-part="pip-button"],
[data-scope="media-player"][data-part="fullscreen-button"] {
  display: inline-flex;
  flex: 0 0 auto;
}

/* The rail's triggers ride the shared ghost square: the native button,
   cursor, halo and disabled state are the recipe's; the family keeps
   only this hover ink and its quiet disabled register. */
[data-scope="media-player"][data-part="play-button"] [data-scope="button"][data-part="root"]:hover:not(:disabled),
[data-scope="media-player"][data-part="mute-button"] [data-scope="button"][data-part="root"]:hover:not(:disabled),
[data-scope="media-player"][data-part="pip-button"] [data-scope="button"][data-part="root"]:hover:not(:disabled),
[data-scope="media-player"][data-part="fullscreen-button"] [data-scope="button"][data-part="root"]:hover:not(:disabled) {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
}

[data-scope="media-player"][data-part="play-button"] [data-scope="button"][data-part="root"]:focus-visible,
[data-scope="media-player"][data-part="mute-button"] [data-scope="button"][data-part="root"]:focus-visible,
[data-scope="media-player"][data-part="pip-button"] [data-scope="button"][data-part="root"]:focus-visible,
[data-scope="media-player"][data-part="fullscreen-button"] [data-scope="button"][data-part="root"]:focus-visible {
  border-color: var(--bs-color-primary);
}

[data-scope="media-player"][data-part="play-button"] [data-scope="button"][data-part="root"]:disabled,
[data-scope="media-player"][data-part="mute-button"] [data-scope="button"][data-part="root"]:disabled,
[data-scope="media-player"][data-part="pip-button"] [data-scope="button"][data-part="root"]:disabled,
[data-scope="media-player"][data-part="fullscreen-button"] [data-scope="button"][data-part="root"]:disabled {
  background: transparent;
  color: var(--bs-color-text-tertiary);
}

[data-scope="media-player"][data-part="timeline"],
[data-scope="media-player"][data-part="volume"] {
  appearance: none;
  block-size: var(--bs-part-size-xs, 0.25rem);
  margin-block: 0;
  border: 0;
  border-radius: var(--bs-radius-full, 999px);
  background: linear-gradient(
    to right,
    var(--bs-color-primary) var(--bs-media-progress, 0%),
    var(--bs-color-border) var(--bs-media-progress, 0%)
  );
  cursor: pointer;
}

[data-scope="media-player"][data-part="timeline"] {
  flex: 1 1 auto;
  inline-size: auto;
  min-inline-size: 2rem;
}

[data-scope="media-player"][data-part="volume"] {
  inline-size: 5rem;
}

[data-scope="media-player"][data-kind="video"] [data-part="volume"] {
  inline-size: 4rem;
}

[data-scope="media-player"][data-part="timeline"]:focus-visible,
[data-scope="media-player"][data-part="volume"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="media-player"][data-part="timeline"]::-webkit-slider-thumb,
[data-scope="media-player"][data-part="volume"]::-webkit-slider-thumb {
  appearance: none;
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border: 1px solid var(--bs-color-border-strong);
  border-radius: var(--bs-radius-full, 999px);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="media-player"][data-part="timeline"]::-moz-range-thumb,
[data-scope="media-player"][data-part="volume"]::-moz-range-thumb {
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
  border: 1px solid var(--bs-color-border-strong);
  border-radius: var(--bs-radius-full, 999px);
  background: var(--bs-color-surface-1);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="media-player"][data-part="time"] {
  flex: 0 0 auto;
  color: var(--bs-color-text-tertiary);
  font-variant-numeric: tabular-nums;
  font-size: var(--bs-font-size-sm);
  white-space: nowrap;
}

[data-scope="media-player"][data-part="rate"],
[data-scope="media-player"][data-part="captions"] {
  flex: 0 0 auto;
  inline-size: 4.25rem;
}

[data-scope="media-player"][data-part="captions"] {
  inline-size: 5.25rem;
}

/* The player reuses Select's field chrome; only density changes to fit
   the rail, so speed and captions do not invent a second control style. */
[data-scope="media-player"][data-part="rate"] [data-scope="select"][data-part="root"],
[data-scope="media-player"][data-part="captions"] [data-scope="select"][data-part="root"] {
  gap: 0;
}

[data-scope="media-player"][data-part="rate"] [data-scope="select"][data-part="control"],
[data-scope="media-player"][data-part="captions"] [data-scope="select"][data-part="control"] {
  block-size: var(--bs-control-height-sm);
  padding-inline-start: var(--bs-padding-sm);
  background: var(--bs-color-surface-1);
  font-size: var(--bs-font-size-sm);
}

[data-scope="media-player"][data-part="rate"] [data-scope="select"][data-part="value-text"],
[data-scope="media-player"][data-part="captions"] [data-scope="select"][data-part="value-text"] {
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-normal);
}

[data-scope="media-player"][data-part="rate"] [data-scope="select"][data-part="indicator"],
[data-scope="media-player"][data-part="captions"] [data-scope="select"][data-part="indicator"] {
  inline-size: var(--bs-control-height-xs, 1.5rem);
  block-size: var(--bs-control-height-xs, 1.5rem);
}

[data-scope="media-player"][data-part="rate"] [data-scope="select"][data-part="indicator"] svg,
[data-scope="media-player"][data-part="captions"] [data-scope="select"][data-part="indicator"] svg {
  inline-size: 0.875rem;
  block-size: 0.875rem;
}

@container media-player (max-width: 34rem) {
  [data-scope="media-player"][data-part="volume"],
  [data-scope="media-player"][data-part="rate"] {
    display: none;
  }

  [data-scope="media-player"][data-part="time"] {
    display: none;
  }

  [data-scope="media-player"][data-part="controls"] {
    gap: var(--bs-gap-xs);
    padding: var(--bs-padding-xs) var(--bs-padding-sm);
  }
}

@container media-player (max-width: 22rem) {
  [data-scope="media-player"][data-part="captions"] {
    display: none;
  }
}
`;
