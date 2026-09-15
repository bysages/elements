import { HoverCard as ArkHoverCard } from "@ark-ui/vue/hover-card";
import { injectComponentStyle } from "@bysages/core";

/** HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The parts — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
export const HoverCard = ArkHoverCard;

injectComponentStyle("hover-card");
