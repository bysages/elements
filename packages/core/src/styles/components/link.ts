export const linkCss = /* css */ `
/* A link is ink in the accent's voice: quiet at rest, deepening under
   the hand, the halo at focus. The underline follows the prose, not the
   chrome — always, on hover, or never, as the setting asks. */
[data-scope="link"][data-part="root"] {
  color: var(--bs-color-primary);
  text-decoration-line: none;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    text-decoration-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="link"][data-part="root"][data-underline="always"] {
  text-decoration-line: underline;
  text-decoration-color: color-mix(in oklab, var(--bs-color-primary) 40%, transparent);
}

[data-scope="link"][data-part="root"][data-underline="hover"]:hover {
  text-decoration-line: underline;
  text-decoration-color: color-mix(in oklab, var(--bs-color-primary) 40%, transparent);
}

[data-scope="link"][data-part="root"]:hover {
  color: color-mix(in oklab, var(--bs-color-primary) 82%, var(--bs-color-text-primary));
}

[data-scope="link"][data-part="root"]:focus-visible {
  outline: none;
  border-radius: var(--bs-radius-xs);
  box-shadow: var(--bs-focus-ring);
}
`;
