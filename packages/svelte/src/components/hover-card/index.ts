import { HoverCard as ArkHoverCard } from "@ark-ui/svelte/hover-card";

import { defineFamily } from "../../internal/family";
import HoverCardFacade from "./HoverCard.svelte";
import HoverCardRoot from "./HoverCardRoot.svelte";

/** Ark's HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const HoverCard: typeof HoverCardFacade &
  Omit<typeof ArkHoverCard, "Root"> & {
    Root: typeof HoverCardRoot;
  } = defineFamily(HoverCardFacade, {
  ...ArkHoverCard,
  Root: HoverCardRoot,
});
