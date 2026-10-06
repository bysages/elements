import { withSelfRoot } from "../../internal/family";
import BlockUIComponent from "./BlockUI.svelte";

/** A curtain over content that must wait: frosted paper and one
 * quiet wheel. */
export const BlockUI = withSelfRoot(BlockUIComponent);

export type { BlockUIProps } from "./props";
