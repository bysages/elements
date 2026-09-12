import { Menu as ArkMenu } from "@ark-ui/vue/menu";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The API is Ark's own — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. */
export const Menu = ArkMenu;

injectComponentStyle("menu");
