export const marqueeCss = /* css */ `
[data-scope="marquee"][data-part="root"] {
  position: relative;
  overflow: hidden;
  inline-size: 100%;
}

[data-scope="marquee"][data-part="viewport"] {
  inline-size: 100%;
  block-size: 100%;
}

/* The ribbon itself: the machine owns tempo and distance through its
   --marquee-* variables; CSS only supplies the linear gait — a marquee
   that eases would stutter at every seam. */
[data-scope="marquee"][data-part="content"] {
  display: flex;
  align-items: center;
  inline-size: max-content;
  animation-name: bs-marquee-x;
  animation-timing-function: linear;
  animation-duration: var(--marquee-duration, 30s);
  animation-delay: var(--marquee-delay, 0s);
  animation-iteration-count: var(--marquee-loop-count, infinite);
}

[data-scope="marquee"][data-part="content"][data-orientation="vertical"] {
  flex-direction: column;
  animation-name: bs-marquee-y;
}

[data-scope="marquee"][data-part="content"][data-reverse] {
  animation-direction: reverse;
}

/* Paused is still: the whole ribbon holds its breath, clones included. */
[data-scope="marquee"][data-part="root"][data-paused] [data-part="content"] {
  animation-play-state: paused;
}

/* The edge is light, not a mask: the paper fades over the ribbon so the
   seam dissolves instead of cutting. */
[data-scope="marquee"][data-part="edge"] {
  position: absolute;
  z-index: 1;
  inline-size: 20%;
  pointer-events: none;
}

[data-scope="marquee"][data-part="edge"][data-orientation="horizontal"][data-side="start"] {
  inset-block: 0;
  inset-inline-start: 0;
  background: linear-gradient(to right, var(--bs-color-surface-1), transparent);
}

[data-scope="marquee"][data-part="edge"][data-orientation="horizontal"][data-side="end"] {
  inset-block: 0;
  inset-inline-end: 0;
  background: linear-gradient(to left, var(--bs-color-surface-1), transparent);
}

[data-scope="marquee"][data-part="edge"][data-orientation="vertical"][data-side="start"] {
  inset-inline: 0;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: 20%;
  background: linear-gradient(to bottom, var(--bs-color-surface-1), transparent);
}

[data-scope="marquee"][data-part="edge"][data-orientation="vertical"][data-side="end"] {
  inset-inline: 0;
  inset-block-end: 0;
  inline-size: 100%;
  block-size: 20%;
  background: linear-gradient(to top, var(--bs-color-surface-1), transparent);
}

/* Each entry is a small seal-cut chip: quiet paper, one hairline. */
[data-scope="marquee"][data-part="item"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-3);
  margin-inline: calc(var(--marquee-spacing, var(--bs-space-6)) / 2);
  padding: var(--bs-space-3) var(--bs-padding-lg);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  white-space: nowrap;
  user-select: none;
}

/* Reduced motion stops the ribbon; the items stay, the travel does not. */
@media (prefers-reduced-motion: reduce) {
  [data-scope="marquee"][data-part="content"] {
    animation: none;
  }
}

@keyframes bs-marquee-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(var(--marquee-translate, -50%));
  }
}

@keyframes bs-marquee-y {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(var(--marquee-translate, -50%));
  }
}
`;
