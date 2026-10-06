import { withSelfRoot } from "../../internal/family";
import ChipComponent from "./Chip.svelte";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export const Chip = withSelfRoot(ChipComponent);

export type { ChipProps } from "./props";
