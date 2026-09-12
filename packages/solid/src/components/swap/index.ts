import { Swap as ArkSwap } from "@ark-ui/solid/swap";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Swap, dressed in the paper-and-ink system: two impressions
 * occupying one seal, the arriving one growing into place on the spring
 * while the departing one shrinks away. The API is Ark's own — Root,
 * Indicator (type="on" | "off"), RootProvider. */
export const Swap = ArkSwap;

injectComponentStyle("swap");
