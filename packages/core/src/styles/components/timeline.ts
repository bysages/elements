export const timelineCss = /* css */ `
/* A line of moments: every marker hangs on one vertical hairline, the
   thread running from the first moment to the last. The dot rides the
   part-size ladder at half step — a quiet point, not a button. */
[data-scope="timeline"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--bs-font-size-sm);
}

[data-scope="timeline"][data-part="item"] {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--bs-gap-md);
  padding-block-end: var(--bs-padding-lg);
}

[data-scope="timeline"][data-part="item"]:last-child {
  padding-block-end: 0;
}

/* The thread: one hairline from this marker down to the next. It stops
   short of the last item, whose moment needs no further thread. */
[data-scope="timeline"][data-part="item"]:not(:last-child)::before {
  content: "";
  position: absolute;
  inset-inline-start: calc(var(--bs-part-size-sm) / 4 - 0.5px);
  inset-block-start: calc(var(--bs-part-size-sm) / 2 + var(--bs-space-2));
  inset-block-end: 0;
  inline-size: 1px;
  background: var(--bs-color-border);
}

[data-scope="timeline"][data-part="marker"] {
  box-sizing: border-box;
  grid-row: 1;
  inline-size: calc(var(--bs-part-size-sm) / 2);
  block-size: calc(var(--bs-part-size-sm) / 2);
  margin-block-start: var(--bs-margin-sm);
  border: 1px solid var(--bs-color-border-strong);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
}

[data-scope="timeline"][data-part="content"] {
  padding-block-start: var(--bs-padding-sm);
  color: var(--bs-color-text-secondary);
  line-height: var(--bs-line-height-relaxed);
}
`;
