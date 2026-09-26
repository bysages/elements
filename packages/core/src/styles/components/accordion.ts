export const accordionCss = /* css */ `
[data-scope="accordion"][data-part="root"] {
  display: flex;
  flex-direction: column;
  /* Fill the parent at rest too: an auto width would refit to the
     content on every fold, breathing as rows open and close. */
  inline-size: 100%;
  color: var(--bs-color-text-primary);
}

/* The accordion reads as a ruled sheet: items are divided by hairlines,
   not cards — one document, quietly folded. */
[data-scope="accordion"][data-part="item"] {
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="accordion"][data-part="item"]:last-child {
  border-block-end: none;
}

/* Triggers are quiet rows on the paper — no chrome of their own; the
   hairline rule carries the structure instead. */
[data-scope="accordion"][data-part="item-trigger"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bs-gap-md);
  inline-size: 100%;
  min-block-size: var(--bs-control-height-lg);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  text-align: start;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="accordion"][data-part="item-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
}

[data-scope="accordion"][data-part="item-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="accordion"][data-part="item-trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

/* The chevron swings open on the spring — puppets have strings. */
[data-scope="accordion"][data-part="item-indicator"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-color-text-tertiary);
  transform-origin: center;
  transition: transform 200ms var(--bs-ease-spring);
}

[data-scope="accordion"][data-part="item-trigger"][data-state="open"]
  [data-part="item-indicator"],
[data-scope="accordion"][data-part="item-indicator"][data-state="open"] {
  transform: rotate(180deg);
}

[data-scope="accordion"][data-part="item-indicator"] svg {
  inline-size: 1rem;
  block-size: 1rem;
}

/* Expansion animates height from the machine's measured --height; the
   panel dissolves open rather than snapping. */
[data-scope="accordion"][data-part="item-content"] {
  overflow: hidden;
}

[data-scope="accordion"][data-part="item-content"][data-state="open"] {
  animation:
    bs-accordion-expand var(--bs-duration-base) var(--bs-ease-out),
    bs-accordion-fade-in var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="accordion"][data-part="item-content"][data-state="closed"] {
  animation:
    bs-accordion-collapse var(--bs-duration-base) var(--bs-ease-out),
    bs-accordion-fade-out var(--bs-duration-base) var(--bs-ease-out);
}

/* The unfolded text sits inside the trigger's rhythm — indented to its
   label, breathing at the bottom. */
[data-scope="accordion"][data-part="item-content"] > * {
  padding: 0 var(--bs-padding-md) var(--bs-padding-md);
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* Bare text has no element child for the rule above — pad it inline
   only, so the collapse still settles to a clean zero height. */
[data-scope="accordion"][data-part="item-content"]:not(:has(*)) {
  padding: 0 var(--bs-padding-md);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

@keyframes bs-accordion-expand {
  from {
    height: var(--collapsed-height, 0);
  }
  to {
    height: var(--height);
  }
}

@keyframes bs-accordion-collapse {
  from {
    height: var(--height);
  }
  to {
    height: var(--collapsed-height, 0);
  }
}

@keyframes bs-accordion-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes bs-accordion-fade-out {
  to {
    opacity: 0;
  }
}
`;
