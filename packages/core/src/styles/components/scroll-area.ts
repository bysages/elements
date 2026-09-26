export const scrollAreaCss = /* css */ `
[data-scope="scroll-area"][data-part="root"] {
  box-sizing: border-box;
  inline-size: min(24rem, 100%);
  block-size: 12rem;
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

/* The viewport draws its own hairline from the inside so the border
   never clips the scrollbar lane; native bars are hidden — ours take
   over. */
[data-scope="scroll-area"][data-part="viewport"] {
  block-size: 100%;
  border-radius: var(--bs-radius-lg);
  outline: 1px solid var(--bs-color-border);
  outline-offset: -1px;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

[data-scope="scroll-area"][data-part="viewport"]::-webkit-scrollbar {
  display: none;
}

[data-scope="scroll-area"][data-part="viewport"]:focus-visible {
  outline: 1px solid var(--bs-color-primary);
  outline-offset: -1px;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="scroll-area"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  padding-block: var(--bs-padding-md);
  padding-inline-start: var(--bs-padding-lg);
  padding-inline-end: var(--bs-padding-xl);
}

/* The scrollbar lane is invisible until touched — hover or scroll brings
   it up as a quiet groove; the ::before widens the hit area without
   widening the ink. */
[data-scope="scroll-area"][data-part="scrollbar"] {
  position: relative;
  display: flex;
  margin: var(--bs-margin-xs);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-0);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="scroll-area"][data-part="scrollbar"]::before {
  content: "";
  position: absolute;
}

[data-scope="scroll-area"][data-part="scrollbar"]:hover,
[data-scope="scroll-area"][data-part="scrollbar"][data-scrolling] {
  opacity: 1;
  pointer-events: auto;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-scrolling] {
  transition-duration: 0ms;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="vertical"] {
  inline-size: 0.25rem;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="vertical"]::before {
  inline-size: 1.25rem;
  block-size: 100%;
  inset-block: 0;
  inset-inline-start: 50%;
  translate: -50% 0;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="vertical"]:not([data-overflow-y]) {
  display: none;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="horizontal"] {
  block-size: 0.25rem;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="horizontal"]::before {
  inline-size: 100%;
  block-size: 1.25rem;
  inset-block-end: calc(var(--bs-space-1) * -1);
  inset-inline: 0;
}

[data-scope="scroll-area"][data-part="scrollbar"][data-orientation="horizontal"]:not([data-overflow-x]) {
  display: none;
}

/* The thumb is the only ink in the lane: it moves where the paper moves. */
[data-scope="scroll-area"][data-part="thumb"] {
  inline-size: 100%;
  border-radius: inherit;
  background: var(--bs-color-border-strong);
}

[data-orientation="horizontal"] [data-scope="scroll-area"][data-part="thumb"] {
  inline-size: unset;
  block-size: 100%;
}

[data-scope="scroll-area"][data-part="corner"] {
  background: transparent;
}
`;
