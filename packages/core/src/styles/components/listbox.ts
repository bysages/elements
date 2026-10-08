import { inputStateCss } from "./shared";
import { labelCss, optionListCss, popupContentCss, shrinkingTextCss } from "./shared";

export const listboxCss =
  labelCss("listbox") +
  popupContentCss("listbox", "16rem") +
  shrinkingTextCss("listbox", "item-text") +
  /* css */ `
[data-scope="listbox"][data-part="root"] {
  /* Full width is the component's own property, not the stage's stretch. */
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

/* The filter input rides the control recipe: a field, not a button —
   border + surface + focus halo, never a shadow lift. */` +
  /* css */ `
[data-scope="listbox"][data-part="input"] {
  box-sizing: border-box;
  block-size: var(--bs-control-height-md);
  padding: 0 var(--bs-padding-md);
  border: var(--bs-hairline) solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  box-shadow: var(--bs-shadow-xs);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}
` +
  inputStateCss("listbox") +
  /* css */ `[data-scope="listbox"][data-part="content"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  max-block-size: 18rem;
  padding: var(--bs-padding-xs);
  overflow-y: auto;
}

` +
  optionListCss("listbox", { list: false }) +
  /* css */ `
[data-scope="listbox"][data-part="value-text"] {
  font-weight: var(--bs-font-weight-medium);
}

/* Size rungs: the root's data-size re-points the row register and the
   filter field together. */
[data-scope="listbox"][data-part="root"][data-size="sm"] [data-part="item"] {
  min-block-size: calc(var(--bs-control-height-sm) * 0.875);
}

[data-scope="listbox"][data-part="root"][data-size="sm"] [data-part="input"] {
  block-size: var(--bs-control-height-sm);
}

[data-scope="listbox"][data-part="root"][data-size="lg"] [data-part="item"] {
  min-block-size: var(--bs-control-height-md);
}

[data-scope="listbox"][data-part="root"][data-size="lg"] [data-part="input"] {
  block-size: var(--bs-control-height-lg);
}
`;
