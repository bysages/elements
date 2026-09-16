import { injectComponentStyle } from "@bysages/core";

import ChipComponent from "./Chip.svelte";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export const Chip = ChipComponent;

export type { ChipProps } from "./props";

injectComponentStyle("chip");
