import { labelCss } from "./shared";

export const switchCss =
  labelCss("switch") +
  /* css */ `
[data-scope="switch"][data-part="root"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

/* The track geometry: thumb travel is derived here so the knob lands
   flush against the far edge instead of drifting off-token. */
[data-scope="switch"][data-part="control"] {
  --bs-switch-track: 3rem;
  --bs-switch-thumb: 1.25rem;
  --bs-switch-inset: var(--bs-space-1);
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  inline-size: var(--bs-switch-track);
  block-size: calc(var(--bs-switch-thumb) + 2 * var(--bs-switch-inset));
  padding: var(--bs-switch-inset);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-inset);
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow calc(var(--bs-duration-fast) * 1.5) var(--bs-ease-out);
}

[data-scope="switch"][data-part="control"]:hover:not([data-disabled], [data-state="checked"]) {
  box-shadow: var(--bs-shadow-sm);
}

[data-scope="switch"][data-part="control"][data-focus-visible] {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

/* On is flat primary ink; off rests in the inset shade of the paper. */
[data-scope="switch"][data-part="control"][data-state="checked"] {
  background: var(--bs-color-primary);
}

[data-scope="switch"][data-part="control"][data-invalid] {
  box-shadow: 0 0 0 1px var(--bs-color-danger);
}

[data-scope="switch"][data-part="control"][data-disabled] {
  background: var(--bs-color-surface-inset);
  box-shadow: none;
}

/* The thumb is the only lit object here — it leaves the page slightly,
   and slides on the spring. */
[data-scope="switch"][data-part="thumb"] {
  display: inline-flex;
  inline-size: var(--bs-switch-thumb);
  block-size: var(--bs-switch-thumb);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-shadow-xs);
  transition: translate var(--bs-duration-base) var(--bs-ease-spring);
}

[data-scope="switch"][data-part="control"][data-state="checked"] [data-part="thumb"] {
  translate: calc(
    var(--bs-switch-track) - 2 * var(--bs-switch-inset) - var(--bs-switch-thumb)
  ) 0;
}

[data-scope="switch"][data-part="control"][data-disabled] [data-part="thumb"] {
  background: var(--bs-color-surface-0);
  box-shadow: none;
}
`;
