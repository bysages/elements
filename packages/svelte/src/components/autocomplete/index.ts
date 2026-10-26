import { defineFamily, type FamilyParts } from "../../internal/family";
import { Combobox } from "../combobox";
import AutoCompleteComponent from "./AutoComplete.svelte";

/** Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `value`. A preset of the combobox machinery. */
export const AutoComplete = defineFamily(AutoCompleteComponent, {
  ...Combobox,
}) as typeof AutoCompleteComponent & FamilyParts<typeof Combobox>;

export type { AutoCompleteProps } from "./props";

// The field and its vessel are the combobox family's own recipe.
