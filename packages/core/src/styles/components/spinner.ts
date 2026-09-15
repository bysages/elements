export const spinnerCss = /* css */ `
/* A wheel of waiting: one arc of ink turning about its center. Quiet by
   default — it reports progress without claiming attention. */
[data-scope="spinner"][data-part="root"] {
  display: inline-flex;
  flex: none;
  color: var(--bs-color-text-tertiary);
  animation: bs-spinner-turn 0.9s linear infinite;
}

[data-scope="spinner"][data-part="root"][data-size="sm"] {
  inline-size: var(--bs-part-size-sm);
  block-size: var(--bs-part-size-sm);
}
[data-scope="spinner"][data-part="root"][data-size="md"] {
  inline-size: var(--bs-part-size-md);
  block-size: var(--bs-part-size-md);
}
[data-scope="spinner"][data-part="root"][data-size="lg"] {
  inline-size: var(--bs-part-size-lg);
  block-size: var(--bs-part-size-lg);
}

[data-scope="spinner"][data-part="root"] svg {
  inline-size: 100%;
  block-size: 100%;
}

@keyframes bs-spinner-turn {
  to {
    transform: rotate(1turn);
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="spinner"][data-part="root"] {
    animation-duration: 1ms;
    animation-iteration-count: 1;
  }
}
`;
