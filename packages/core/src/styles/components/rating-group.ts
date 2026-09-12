import { labelCss } from "./shared";

export const ratingGroupCss =
  labelCss("rating-group") +
  /* css */ `
[data-scope="rating-group"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

[data-scope="rating-group"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

/* The control is a row of seals, not a field: no frame around the group,
   the items carry the whole recipe. */
[data-scope="rating-group"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
}

[data-scope="rating-group"][data-part="control"][data-disabled] {
  cursor: not-allowed;
}

/* Each item is a quiet seal: transparent at rest, the hairline hover of an
   icon button, focus as the inset ring. The pigment lives in the glyph —
   unlit tertiary ink, lit primary — never a filled chip. */
[data-scope="rating-group"][data-part="item"] {
  display: grid;
  place-items: center;
  inline-size: var(--bs-control-height-sm);
  block-size: var(--bs-control-height-sm);
  padding: 0;
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="rating-group"][data-part="item"]:hover:not(
    [data-disabled],
    [data-readonly]
  ) {
  background: var(--bs-color-surface-0);
}

[data-scope="rating-group"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="rating-group"][data-part="item"][data-highlighted],
[data-scope="rating-group"][data-part="item"][data-checked] {
  color: var(--bs-color-primary);
}

/* Half steps bleed the ink only halfway across the glyph. */
[data-scope="rating-group"][data-part="item"][data-half] {
  color: color-mix(in oklab, var(--bs-color-primary) 50%, var(--bs-color-text-tertiary));
}

[data-scope="rating-group"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  background: transparent;
  cursor: not-allowed;
}
`;
