export const cardCss = /* css */ `
/* A vessel: round at the large radius, paper-white, risen to the first
   elevation, one hairline for its edge. Sections carry their own
   whitespace so the card composes with or without a header. */
[data-scope="card"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  box-shadow: var(--bs-elevation-1);
  transition: box-shadow var(--bs-duration-base) var(--bs-ease-out);
}

/* A vessel under the hand rises a level — the ladder does the lifting,
   not a new shadow (light needs time, so the rise eases in slowly). */
[data-scope="card"][data-part="root"]:hover {
  box-shadow: var(--bs-elevation-2);
}

[data-scope="card"][data-part="header"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  padding: var(--bs-padding-lg);
}

/* The title rides the serif — a vessel carries a heading, not a control. */
[data-scope="card"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="card"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="card"][data-part="content"] {
  /* Growing to the footer keeps a run of equal-height cards honest —
     the credits across a grid row line up instead of trailing whitespace
     after whichever body ran longest. */
  flex: 1;
  padding: 0 var(--bs-padding-lg) var(--bs-padding-lg);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="card"][data-part="footer"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: 0 var(--bs-padding-lg) var(--bs-padding-lg);
}

/* A body that opens the card answers the header's top padding itself. */
[data-scope="card"][data-part="content"]:first-child,
[data-scope="card"][data-part="footer"]:first-child {
  padding-block: var(--bs-padding-lg);
}
`;
