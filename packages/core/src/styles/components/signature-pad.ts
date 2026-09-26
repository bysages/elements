import { labelCss } from "./shared";

export const signaturePadCss =
  labelCss("signature-pad") +
  /* css */ `
[data-scope="signature-pad"][data-part="root"] {
  --bs-signature-block: 10rem;
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="signature-pad"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

/* The signing surface is a field: paper fill, one hairline, no shadow —
   it reads as somewhere to put ink, not something that leaves the page. */
[data-scope="signature-pad"][data-part="control"] {
  position: relative;
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  min-block-size: var(--bs-signature-block);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="signature-pad"][data-part="control"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="signature-pad"][data-part="control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  cursor: not-allowed;
}

[data-scope="signature-pad"][data-part="segment"] {
  inline-size: 100%;
  block-size: 100%;
  min-block-size: var(--bs-signature-block);
  border-radius: inherit;
  touch-action: none;
}

[data-scope="signature-pad"][data-part="segment"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

/* Strokes are ink on paper — the writing, not an accent. */
[data-scope="signature-pad"][data-part="segment-path"] {
  fill: var(--bs-color-text-primary);
}

/* The guide line is a whisper of where to sign — a dashed hairline that
   never intercepts the pen. */
[data-scope="signature-pad"][data-part="guide"] {
  position: absolute;
  inset-inline: var(--bs-padding-lg);
  inset-block-end: var(--bs-space-6);
  border-block-end: 1px dashed var(--bs-color-border-strong);
  pointer-events: none;
}

[data-scope="signature-pad"][data-part="clear-trigger"] {
  position: absolute;
  inset-block-start: var(--bs-space-2);
  inset-inline-end: var(--bs-space-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="signature-pad"][data-part="clear-trigger"] svg {
  inline-size: var(--bs-font-size-md);
  block-size: var(--bs-font-size-md);
}

[data-scope="signature-pad"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

[data-scope="signature-pad"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="signature-pad"][data-part="clear-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}
`;
