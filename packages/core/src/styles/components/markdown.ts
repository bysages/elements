export const markdownCss = /* css */ `
/* Mermaid diagrams ride the document's own light: Pele SVG only reads
   CSS variables, so theme and accent changes take effect without
   re-rendering a streamed response. */
.bs-mermaid {
  --pele-bg: var(--bs-color-surface-1);
  --pele-fg: var(--bs-color-text-primary);
  --pele-muted: var(--bs-color-text-tertiary);
  --pele-line: var(--bs-color-border-strong);
  --pele-surface: var(--bs-color-surface-2);
  --pele-surface-alt: var(--bs-color-surface-3);
  --pele-border: var(--bs-color-border);
  --pele-accent: var(--bs-color-primary);
  --pele-critical: var(--bs-color-danger);
  --pele-error: var(--bs-color-danger);
  --pele-font: var(--bs-font-sans);
  --pele-font-mono: var(--bs-font-mono);
  --pele-radius: var(--bs-radius-sm);
  display: flex;
  justify-content: center;
  margin-block: var(--bs-margin-lg);
  overflow-inline: auto;
}

.bs-mermaid svg {
  max-inline-size: 100%;
  block-size: auto;
}
`;
