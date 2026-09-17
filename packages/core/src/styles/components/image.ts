export const imageCss = /* css */ `
/* A framed picture that announces its own arrival: while the source
   loads, the frame keeps the skeleton's breath; the picture dissolves
   in when it lands; a broken source leaves the fallback. The frame's
   size belongs to the consumer, like the skeleton's. */
[data-scope="image"][data-part="root"] {
  --_fit: cover;
  position: relative;
  display: block;
  margin: 0;
  overflow: hidden;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-inset);
}

[data-scope="image"][data-part="root"][data-fit="contain"] {
  --_fit: contain;
}

[data-scope="image"][data-part="root"][data-fit="fill"] {
  --_fit: fill;
}

[data-scope="image"][data-part="root"][data-fit="none"] {
  --_fit: none;
}

/* Waiting is the skeleton's breath — same wash, same pace. */
[data-scope="image"][data-part="root"][data-state="loading"] {
  animation: bs-image-breathe 1600ms var(--bs-ease-in-out) infinite;
}

[data-scope="image"][data-part="img"] {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: var(--_fit);
  /* The picture arrives unseen and dissolves in — ink settling, never
     a flash of half-drawn pixels. */
  opacity: 0;
  transition: opacity var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="image"][data-part="root"][data-state="loaded"] [data-scope="image"][data-part="img"] {
  opacity: 1;
}

/* A broken source leaves nothing but the fallback: the browser's own
   broken-image mark would argue with the page. */
[data-scope="image"][data-part="root"][data-state="error"] [data-scope="image"][data-part="img"] {
  display: none;
}

[data-scope="image"][data-part="fallback"] {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-tertiary);
}

[data-scope="image"][data-part="fallback"] svg {
  inline-size: var(--bs-space-8);
  block-size: var(--bs-space-8);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="image"][data-part="root"][data-state="loading"] {
    animation: none;
    opacity: 0.7;
  }
}

@keyframes bs-image-breathe {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.55;
  }
}
`;
