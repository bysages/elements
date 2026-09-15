import { Swap as ArkSwap } from "@ark-ui/vue/swap";
import { injectComponentStyle } from "@bysages/core";

/** Swap, dressed in the paper-and-ink system: two impressions
 * occupying one seal, the arriving one growing into place on the spring
 * while the departing one shrinks away. The parts — Root,
 * Indicator (type="on" | "off"), RootProvider. */
export const Swap = ArkSwap;

injectComponentStyle("swap");
