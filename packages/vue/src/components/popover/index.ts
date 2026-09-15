import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core";

/** Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow. The parts — Root, Trigger, Anchor, Indicator, Positioner, Content,
 * Title, Description, CloseTrigger, Arrow, ArrowTip. */
export const Popover = ArkPopover;

injectComponentStyle("popover");
