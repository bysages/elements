import { injectComponentStyle } from "@bysages/core";

import AutoCompleteComponent from "./AutoComplete.svelte";

/** Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `value`. A preset of the combobox machinery. */
export const AutoComplete = AutoCompleteComponent;

export type { AutoCompleteProps } from "./props";

// The field and its vessel are the combobox family's own recipe.
injectComponentStyle("combobox");
