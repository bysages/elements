import { Tooltip as ArkTooltip } from "@ark-ui/vue/tooltip";
import { injectComponentStyle } from "@bysages/core";

/** Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The parts — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const Tooltip = ArkTooltip;

injectComponentStyle("tooltip");
