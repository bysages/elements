export const deferredContentCss = /* css */ `
/* The late arrival dissolves in with the ink entrance — content that
 * mounts on scroll should not pop over the placeholder it replaces. */
[data-scope="deferred-content"][data-part="root"] {
  animation: bs-ink-in var(--bs-duration-slow) var(--bs-ease-out);
}
`;
