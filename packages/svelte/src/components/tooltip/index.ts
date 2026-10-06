import { Tooltip as ArkTooltip } from "@ark-ui/svelte/tooltip";

import { defineFamily } from "../../internal/family";
import TooltipFacade from "./Tooltip.svelte";
import TooltipRoot from "./TooltipRoot.svelte";

/** Ark's Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const Tooltip: typeof TooltipFacade &
  Omit<typeof ArkTooltip, "Root"> & {
    Root: typeof TooltipRoot;
  } = defineFamily(TooltipFacade, {
  ...ArkTooltip,
  Root: TooltipRoot,
});
