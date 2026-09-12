import { popupContentCss, positionerCss } from "./shared";

export const tooltipCss =
  /* A tooltip is the smallest vessel in the system: no minimum floor,
     just a tight chip of ink. */
  popupContentCss("tooltip", "0") +
  positionerCss("tooltip") +
  /* css */ `
[data-scope="tooltip"][data-part="trigger"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
}

[data-scope="tooltip"][data-part="trigger"]:focus-visible {
  outline: none;
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tooltip"][data-part="trigger"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="tooltip"][data-part="content"] {
  max-inline-size: 18rem;
  padding: var(--bs-space-1) var(--bs-padding-md);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  line-height: var(--bs-line-height-snug);
  text-align: center;
  /* The chip rides the pointer: it leads, never trails. */
  transition: none;
}

[data-scope="tooltip"][data-part="arrow"] {
  --arrow-size: 10px;
  --arrow-background: var(--bs-color-surface-2);
}

[data-scope="tooltip"][data-part="arrow-tip"] {
  border-block-start: 1px solid var(--bs-color-border);
  border-inline-start: 1px solid var(--bs-color-border);
}
`;
