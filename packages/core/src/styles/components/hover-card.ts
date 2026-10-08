import { popupContentCss, positionerCss } from "./shared";

export const hoverCardCss =
  popupContentCss("hover-card") +
  positionerCss("hover-card") +
  /* css */ `
/* The trigger is a quiet inline affordance — underlined ink, not a
   control; the underline deepens on hover, the text never changes. */
[data-scope="hover-card"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
  text-decoration: underline;
  text-decoration-color: var(--bs-color-border-strong);
  text-underline-offset: 2px;
  cursor: pointer;
  transition: text-decoration-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="hover-card"][data-part="trigger"]:hover {
  text-decoration-color: var(--bs-color-text-primary);
}

[data-scope="hover-card"][data-part="trigger"]:focus-visible {
  outline: none;
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="hover-card"][data-part="content"] {
  padding: var(--bs-padding-lg);
  line-height: var(--bs-line-height-relaxed);
}

/* The facade's prose carries no data parts of its own; the title rides
   the serif, the first paragraph is the secondary summary, and any body
   paragraph after it returns to the ink. */
[data-scope="hover-card"][data-part="content"] > h3 {
  margin: 0 0 var(--bs-margin-xs);
  font-family: var(--bs-font-serif);
}

[data-scope="hover-card"][data-part="content"] > p {
  margin: 0;
}

[data-scope="hover-card"][data-part="content"] > h3 + p {
  margin-block-end: var(--bs-margin-sm);
  color: var(--bs-color-text-secondary);
}

[data-scope="hover-card"][data-part="content"] > h3 + p + p {
  margin-block-end: var(--bs-margin-md);
  color: var(--bs-color-text-primary);
}

[data-scope="hover-card"][data-part="arrow"] {
  --arrow-size: var(--bs-space-2);
  --arrow-background: var(--bs-color-surface-2);
}

[data-scope="hover-card"][data-part="arrow-tip"] {
  border-block-start: var(--bs-hairline) solid var(--bs-color-border);
  border-inline-start: var(--bs-hairline) solid var(--bs-color-border);
}
`;
