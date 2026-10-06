import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";

import { defineFamily } from "../../internal/family";
import CollapsibleFacade from "./Collapsible.svelte";
import CollapsibleRoot from "./CollapsibleRoot.svelte";

/** Ark's Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The API is Ark's own — Root, Trigger, Content, Indicator. */
export const Collapsible: typeof CollapsibleFacade &
  Omit<typeof ArkCollapsible, "Root"> & {
    Root: typeof CollapsibleRoot;
  } = defineFamily(CollapsibleFacade, {
  ...ArkCollapsible,
  Root: CollapsibleRoot,
});
