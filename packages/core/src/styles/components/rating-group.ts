import { labelCss } from "./shared";

export const ratingGroupCss =
  labelCss("rating-group") +
  /* css */ `
[data-scope="rating-group"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

[data-scope="rating-group"][data-part="root"][data-disabled] {
  color: var(--bs-color-text-disabled);
}

/* The control is a row of seals, not a field: no frame around the group,
   the items carry the whole recipe. */
[data-scope="rating-group"][data-part="control"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-xs);
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

/* Facade and anatomy share one glyph contract: the icon fills the seal and
   the ink fills the mark itself, regardless of whether it is a bare svg or
   brought through the Icon well. */
[data-scope="rating-group"][data-part="item"] [data-scope="icon"] {
  inline-size: 100%;
  block-size: 100%;
}

[data-scope="rating-group"][data-part="item"] svg {
  inline-size: 100%;
  block-size: 100%;
}

[data-scope="rating-group"][data-part="item"] svg path {
  fill: currentColor;
  stroke: none;
  stroke-width: 0;
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

/* Size rungs: the root's data-size re-points the ladder every seal
   stands on. */
[data-scope="rating-group"][data-part="root"][data-size="sm"] [data-part="item"] {
  inline-size: calc(var(--bs-control-height-sm) * 0.875);
  block-size: calc(var(--bs-control-height-sm) * 0.875);
}

[data-scope="rating-group"][data-part="root"][data-size="lg"] [data-part="item"] {
  inline-size: var(--bs-control-height-md);
  block-size: var(--bs-control-height-md);
}
`;
