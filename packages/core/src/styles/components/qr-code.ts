export const qrCodeCss = /* css */ `
[data-scope="qr-code"][data-part="root"] {
  /* The canvas is ink, not a control: the modules take the text color so the
     code sits on the page like any other printed mark. */
  --bs-qr-size: calc(var(--bs-space-8) * 5);
  --bs-qr-overlay: calc(var(--bs-qr-size) / 3);
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: var(--bs-space-3);
  inline-size: fit-content;
  color: var(--bs-color-text-primary);
}

[data-scope="qr-code"][data-part="frame"] {
  inline-size: var(--bs-qr-size);
  block-size: var(--bs-qr-size);
  fill: currentColor;
}

[data-scope="qr-code"][data-part="pattern"] {
  fill: inherit;
}

/* A badge set over the pattern: a small vessel of paper that interrupts the
   ink without breaking its hairline register. zag centers the badge on the
   whole root (frame + gap + download trigger), which reads as sunk toward
   the button; pin it to the frame's own center instead — the !important
   overrides the machine's inline top/left. */
[data-scope="qr-code"][data-part="overlay"] {
  display: grid;
  place-items: center;
  inline-size: var(--bs-qr-overlay);
  block-size: var(--bs-qr-overlay);
  top: calc(var(--bs-qr-size) / 2) !important;
  left: calc(var(--bs-qr-size) / 2) !important;
  padding: var(--bs-space-1);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-shadow-xs);
}

[data-scope="qr-code"][data-part="overlay"] img,
[data-scope="qr-code"][data-part="overlay"] svg {
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
}

[data-scope="qr-code"][data-part="download-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bs-space-2);
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-padding-md);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  white-space: nowrap;
  cursor: pointer;
  box-shadow: var(--bs-shadow-xs);
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="qr-code"][data-part="download-trigger"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="qr-code"][data-part="download-trigger"]:active {
  box-shadow: none;
}

[data-scope="qr-code"][data-part="download-trigger"]:focus-visible {
  outline: none;
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="qr-code"][data-part="download-trigger"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}
`;
