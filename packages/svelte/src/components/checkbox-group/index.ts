import { injectComponentStyle } from "@bysages/core";

import CheckboxGroupComponent from "./CheckboxGroup.svelte";

/** One question, many answers: a labelled stack (or row) of the
 * seal-cut checkboxes bound to a single array. */
export const CheckboxGroup = CheckboxGroupComponent;

export type { CheckboxGroupProps, CheckboxOption } from "./props";

// The options are the checkbox family's own seals — the group
// stylesheet only lays the row and column out around them.
injectComponentStyle("checkbox-group");
injectComponentStyle("checkbox");
