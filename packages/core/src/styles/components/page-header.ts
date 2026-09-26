export const pageHeaderCss = /* css */ `
/* The page's face: an eyebrow whisper, a serif title, one line of
   description, and the actions resting beside the title on the same
   baseline. Generous whitespace — the header opens the page, it does
   not crowd it. */
[data-scope="page-header"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="page-header"][data-part="heading"] {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--bs-gap-md) var(--bs-gap-xl);
}

/* The eyebrow whispers above the title: small, tracked, secondary. */
[data-scope="page-header"][data-part="eyebrow"] {
  inline-size: 100%;
  margin: 0;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

[data-scope="page-header"][data-part="title"] {
  margin: 0;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-3xl);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-tight);
}

[data-scope="page-header"][data-part="description"] {
  margin: 0;
  max-inline-size: 72ch;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-base);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="page-header"][data-part="actions"] {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--bs-gap-sm);
  margin-block-start: var(--bs-margin-xs);
}
`;
