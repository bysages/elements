export const resultCss = /* css */ `
/* A verdict drawn after the deed: the operation returns, and the page
   answers with a mark, its title, and the way onward. The four fixed
   pigments speak for the outcome, as everywhere in the system. */
[data-scope="result"][data-part="root"] {
  --_pigment: var(--bs-color-info);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* The same measure Empty rests in: full width, one rhythm. */
  box-sizing: border-box;
  inline-size: 100%;
  gap: var(--bs-gap-lg);
  padding: var(--bs-padding-xl);
  text-align: center;
}

[data-scope="result"][data-part="root"][data-status="success"] {
  --_pigment: var(--bs-color-success);
}
[data-scope="result"][data-part="root"][data-status="warning"] {
  --_pigment: var(--bs-color-warning);
}
[data-scope="result"][data-part="root"][data-status="danger"] {
  --_pigment: var(--bs-color-danger);
}
[data-scope="result"][data-part="root"][data-status="info"] {
  --_pigment: var(--bs-color-info);
}

/* The mark sits in a wash of its own pigment — the same mix an alert
   carries, drawn round so the verdict reads at a glance. */
[data-scope="result"][data-part="icon"] {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: calc(var(--bs-part-size-lg) * 2);
  block-size: calc(var(--bs-part-size-lg) * 2);
  border-radius: var(--bs-radius-full);
  background: color-mix(in oklab, var(--_pigment) 12%, var(--bs-color-surface-1));
  color: var(--_pigment);
}

[data-scope="result"][data-part="icon"] svg {
  inline-size: var(--bs-part-size-md);
  block-size: var(--bs-part-size-md);
}

/* The mark carries all four verdicts and lets the root choose; the
   icon needs no prop of its own, so it can never drift from the
   status the root declares. */
[data-scope="result"][data-part="icon"] [data-for] {
  display: none;
}

[data-scope="result"][data-part="root"][data-status="success"] [data-for="success"],
[data-scope="result"][data-part="root"][data-status="warning"] [data-for="warning"],
[data-scope="result"][data-part="root"][data-status="danger"] [data-for="danger"],
[data-scope="result"][data-part="root"][data-status="info"] [data-for="info"] {
  display: inline;
}

[data-scope="result"][data-part="title"] {
  margin: 0;
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
  font-weight: var(--bs-font-weight-semibold);
  color: var(--bs-color-text-primary);
  line-height: var(--bs-line-height-snug);
}

[data-scope="result"][data-part="description"] {
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
  max-inline-size: 40ch;
}

[data-scope="result"][data-part="extra"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  margin-block-start: var(--bs-margin-sm);
}
`;
