import { injectComponentStyle } from "@bysages/core/styling";

import { defineFamily, type FamilyParts } from "../../internal/family";
import { Checkbox } from "../checkbox";
import CheckboxGroupComponent from "./CheckboxGroup.svelte";

/** One question, many answers: a labelled stack (or row) of the
 * seal-cut checkboxes bound to a single array. */
export const CheckboxGroup = defineFamily(CheckboxGroupComponent, {
  ...Checkbox,
}) as typeof CheckboxGroupComponent & FamilyParts<typeof Checkbox>;

export type { CheckboxGroupProps, CheckboxOption } from "./props";

// The options are the checkbox family's own seals — the group
// stylesheet only lays the row and column out around them.
injectComponentStyle("checkbox");
