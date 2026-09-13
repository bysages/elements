export const emptyCss = /* css */ `
/* An empty state: the page holds its breath — a quiet mark, one line of
   ink, and room for the next action. Centered, generous with whitespace. */
[data-scope="empty"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--bs-space-4);
  padding: var(--bs-padding-xl);
  text-align: center;
}

[data-scope="empty"][data-part="visual"] {
  color: var(--bs-color-text-tertiary);
}

/* The mark is a feature visual, not an inline decorative part — it rides
   twice the part ladder, so density still scales it. */
[data-scope="empty"][data-part="visual"] svg {
  inline-size: calc(var(--bs-part-size-lg) * 2);
  block-size: calc(var(--bs-part-size-lg) * 2);
}

/* The title is a heading: it rides the song-serif voice, like the card's. */
[data-scope="empty"][data-part="title"] {
  margin: 0;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="empty"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="empty"][data-part="actions"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  margin-block-start: var(--bs-space-2);
}
`;
