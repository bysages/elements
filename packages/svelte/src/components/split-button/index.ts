import { injectComponentStyle } from "@bysages/core";

import SplitButtonComponent from "./SplitButton.svelte";

/** A primary action with its alternatives one seam away: the main
 * button fires, the fitted arrow opens a paper vessel whose entries
 * hand back their value. */
export const SplitButton = SplitButtonComponent;

export type { SplitButtonEntry, SplitButtonProps } from "./props";

injectComponentStyle("split-button");
// The popup keeps the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
