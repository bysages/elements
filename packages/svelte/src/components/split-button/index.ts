import { injectComponentStyle } from "@bysages/core/styling";

import { defineFamily, type FamilyParts } from "../../internal/family";
import { Menu } from "../menu";
import SplitButtonComponent from "./SplitButton.svelte";

/** A primary action with its alternatives one seam away: the main
 * button fires, the fitted arrow opens a paper vessel whose entries
 * hand back their value. */
export const SplitButton = defineFamily(SplitButtonComponent, {
  ...Menu,
}) as typeof SplitButtonComponent & FamilyParts<typeof Menu>;

export type { SplitButtonEntry, SplitButtonProps } from "./props";
// The popup keeps the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
