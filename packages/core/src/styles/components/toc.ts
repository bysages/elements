export const tocCss = /* css */ `
[data-scope="toc"][data-part="root"] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bs-space-2);
}

/* The heading of the rail whispers: small, tracked, never competing with
   the links it names. */
[data-scope="toc"][data-part="title"] {
  padding-inline: var(--bs-padding-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
}

[data-scope="toc"][data-part="list"] {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Depth comes from the machine as --depth per item; every step of the
   outline nests one indent further. */
[data-scope="toc"][data-part="item"] {
  padding-inline-start: calc((var(--depth, 2) - 2) * var(--bs-space-4));
}

[data-scope="toc"][data-part="link"] {
  display: block;
  padding: var(--bs-space-1) var(--bs-padding-sm);
  border-radius: var(--bs-radius-sm);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
  transition:
    background-color var(--bs-duration-fast) var(--bs-ease-out),
    color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="toc"][data-part="link"]:hover:not([data-active]) {
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
}

/* The section currently under the reader's eye is the active ink — and the
   two states never stack. */
[data-scope="toc"][data-part="link"][data-active] {
  color: var(--bs-color-primary-subtle-text);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="toc"][data-part="link"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

/* The reading position is one stroke of primary ink sliding along the rail;
   its geometry is measured by the machine into --top / --height. */
[data-scope="toc"][data-part="indicator"] {
  position: absolute;
  inset-inline-start: 0;
  inline-size: 2px;
  top: var(--top, 0);
  block-size: var(--height, 0);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-primary);
  transition:
    top 200ms var(--bs-ease-out),
    height 200ms var(--bs-ease-out);
}
`;
