import { HoverCard as ArkHoverCard } from "@ark-ui/solid/hover-card";
import { injectComponentStyle } from "@bysages/core";

/** Ark's HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const HoverCard = ArkHoverCard;

injectComponentStyle("hover-card");
