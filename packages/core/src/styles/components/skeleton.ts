export const skeletonCss = /* css */ `
/* A waiting sheet of unset paper: the breath suggests the content's
   return without promising when. Size belongs to the consumer. */
[data-scope="skeleton"][data-part="root"] {
  display: block;
  inline-size: 100%;
  block-size: 1rem;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-inset);
  animation: bs-skeleton-breathe 1600ms var(--bs-ease-in-out) infinite;
}

@keyframes bs-skeleton-breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="skeleton"][data-part="root"] {
    animation: none;
    opacity: 0.7;
  }
}
`;
