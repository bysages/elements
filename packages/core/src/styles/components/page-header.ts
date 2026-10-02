export const pageHeaderCss = /* css */ `
/* The page's face: an eyebrow whisper, a serif title, one line of
   description, and the actions resting beside the title on the same
   baseline. Generous whitespace — the header opens the page, it does
   not crowd it. */
[data-scope="page-header"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch.
     The face breathes one rung looser than a card's interior. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-md);
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
  /* The face opens one register above section heads — a page title that
     whispers reads as a lost reader, not restraint. */
  font-size: var(--bs-font-size-4xl);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-tight);
}

/* Title and description keep their air wherever they compose — the heading
   column is the consumer's markup, so the rhythm rides the pair itself. */
[data-scope="page-header"][data-part="title"] + [data-part="description"] {
  margin-block-start: var(--bs-gap-md);
}

[data-scope="page-header"][data-part="description"] {
  margin: 0;
  /* The lede's measure in rem, not ch: ch follows the "0" advance of the
     first Latin face, which the CJK stack renders narrow and pinches the
     line in half on CJK-heavy pages. */
  max-inline-size: 46rem;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-lg);
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
