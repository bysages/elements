import { labelCss } from "./shared";

export const tagsInputCss =
  labelCss("tags-input") +
  /* css */ `
[data-scope="tags-input"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The control is the field: it carries the hairline, the surface and the
   focus halo for every chip and the input inside it — the whole vessel
   reads as one input at rest. */
[data-scope="tags-input"][data-part="control"] {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-gap-xs);
  min-block-size: var(--bs-control-height-md);
  /* The block padding holds only the chip's clearance: the hairline pair
     already spends a step of the budget, and the field's own height must
     survive it. */
  padding: calc(var(--bs-space-1) / 2) var(--bs-padding-sm);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  box-shadow: var(--bs-shadow-xs);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow 220ms var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="control"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="tags-input"][data-part="control"]:focus-within {
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tags-input"][data-part="control"][data-invalid] {
  border-color: var(--bs-color-danger);
}

[data-scope="tags-input"][data-part="control"][data-invalid]:focus-within {
  border-color: var(--bs-color-danger);
}

[data-scope="tags-input"][data-part="control"][data-disabled] {
  border-color: var(--bs-color-border);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

[data-scope="tags-input"][data-part="input"] {
  box-sizing: border-box;
  flex: 1;
  min-inline-size: 4rem;
  line-height: var(--bs-line-height-normal);
  padding: 0 var(--bs-padding-xs);
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--bs-font-size-sm);
  outline: none;
}

[data-scope="tags-input"][data-part="input"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

[data-scope="tags-input"][data-part="control"][data-disabled] [data-part="input"] {
  cursor: not-allowed;
}

/* A tag rests as quiet ink on the paper — no hairline of its own, just a
   tone step; editing it (highlight) deepens the tone inside a hairline. */
[data-scope="tags-input"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  outline: none;
}

/* A chip stands one rung below the field, so a filled row and the empty
   row share the field's own height; the host's prose line-height must
   not swell it. */
[data-scope="tags-input"][data-part="item-preview"] {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-xs);
  min-block-size: calc(var(--bs-control-height-sm) - var(--bs-space-1));
  padding: 0 var(--bs-padding-sm);
  line-height: var(--bs-line-height-normal);
  /* A chip is a pill in every scene, matching the chip family. */
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-0);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  user-select: none;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="item-preview"][data-highlighted] {
  background: var(--bs-color-surface-inset);
}

[data-scope="tags-input"][data-part="item-text"] {
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="tags-input"][data-part="item-input"] {
  box-sizing: border-box;
  inline-size: 4rem;
  min-block-size: calc(var(--bs-control-height-sm) - var(--bs-space-1));
  padding: 0 var(--bs-padding-sm);
  line-height: var(--bs-line-height-normal);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  outline: none;
}

[data-scope="tags-input"][data-part="item-input"]:focus,
[data-scope="tags-input"][data-part="item-input"]:focus-visible {
  border-color: var(--bs-focus-edge);
  box-shadow: var(--bs-focus-ring-inset);
}

/* The trigger holds its own icon-sized box whether the icon rides in as
   a glyph or an svg — a stray line strut must not swell the row. */
[data-scope="tags-input"][data-part="item-delete-trigger"],
[data-scope="tags-input"][data-part="clear-trigger"] {
  flex: none;
  display: grid;
  place-items: center;
  block-size: calc(var(--bs-font-size-sm) + var(--bs-space-2));
  padding: var(--bs-padding-xs);
  border: none;
  border-radius: var(--bs-radius-control, var(--bs-radius-sm));
  background: transparent;
  color: var(--bs-color-text-tertiary);
  cursor: pointer;
  transition:
    color var(--bs-duration-fast) var(--bs-ease-out),
    background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tags-input"][data-part="item-delete-trigger"]:hover:not([data-disabled]),
[data-scope="tags-input"][data-part="clear-trigger"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-primary);
}

[data-scope="tags-input"][data-part="item-delete-trigger"]:focus-visible,
[data-scope="tags-input"][data-part="clear-trigger"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tags-input"][data-part="item-delete-trigger"] svg,
[data-scope="tags-input"][data-part="clear-trigger"] svg {
  display: block;
  inline-size: var(--bs-font-size-sm);
  block-size: var(--bs-font-size-sm);
}

/* Size rungs: the root's data-size re-points the vessel's resting
   measure; the chips keep their own register. */
[data-scope="tags-input"][data-part="root"][data-size="sm"] [data-part="control"] {
  min-block-size: var(--bs-control-height-sm);
  padding-block: 0;
}

[data-scope="tags-input"][data-part="root"][data-size="lg"] [data-part="control"] {
  min-block-size: var(--bs-control-height-lg);
}
`;
