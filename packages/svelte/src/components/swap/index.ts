import { Swap as ArkSwap } from "@ark-ui/svelte/swap";
import { injectComponentStyle } from "@bysages/core/styling";

import { defineFamily } from "../../internal/family";
import SwapFacade from "./Swap.svelte";
import SwapRoot from "./SwapRoot.svelte";

/** Swap, dressed in the paper-and-ink system: two impressions occupying one
 * seal, the arriving one growing into place on the spring while the departing
 * one shrinks away. The API is Ark's own — Root, Indicator
 * (type="on" | "off"), RootProvider. */
export const Swap: typeof SwapFacade &
  Omit<typeof ArkSwap, "Root"> & {
    Root: typeof SwapRoot;
  } = defineFamily(SwapFacade, {
  ...ArkSwap,
  Root: SwapRoot,
});

injectComponentStyle("swap");
