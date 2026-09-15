export const typographyCss = /* css */ `
/* The typographic voices, named so prose can ask for one: display and
   heading ride the song-serif, the rest ride the hei. Nothing here is
   decorative — hierarchy is size, weight, and space. */
[data-scope="typography"][data-part="display"] {
  margin: 0;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-4xl);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-tight);
}

[data-scope="typography"][data-part="heading"] {
  margin: 0;
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-2xl);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="typography"][data-part="lead"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-lg);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="typography"][data-part="body"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-base);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="typography"][data-part="muted"] {
  margin: 0;
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="typography"][data-part="label"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
}
`;
