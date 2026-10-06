import { Popover as ArkPopover } from "@ark-ui/svelte/popover";

import { defineFamily } from "../../internal/family";
import PopoverFacade from "./Popover.svelte";
import PopoverRoot from "./PopoverRoot.svelte";

/** Ark's Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow. The
 * API is Ark's own — Root, Trigger, Anchor, Indicator, Positioner, Content,
 * Title, Description, CloseTrigger, Arrow, ArrowTip. */
export const Popover: typeof PopoverFacade &
  Omit<typeof ArkPopover, "Root"> & {
    Root: typeof PopoverRoot;
  } = defineFamily(PopoverFacade, {
  ...ArkPopover,
  Root: PopoverRoot,
});
