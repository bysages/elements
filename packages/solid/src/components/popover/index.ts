import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow. The
 * API is Ark's own — Root, Trigger, Anchor, Indicator, Positioner, Content,
 * Title, Description, CloseTrigger, Arrow, ArrowTip. */
export const Popover = ArkPopover;

injectComponentStyle("popover");
