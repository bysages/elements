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

[data-scope="hover-card"][data-part="arrow"] {
  --arrow-size: 10px;
  --arrow-background: var(--bs-color-surface-2);
}

[data-scope="hover-card"][data-part="arrow-tip"] {
  border-block-start: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}
`;
