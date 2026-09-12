import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const Tooltip = ArkTooltip;

injectComponentStyle("tooltip");
