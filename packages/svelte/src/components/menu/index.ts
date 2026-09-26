import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import { injectComponentStyle } from "@bysages/core";

import MenuContent from "./MenuContent.svelte";
import MenuRoot from "./MenuRoot.svelte";

/** Ark's Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The API is Ark's own — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. Ark's namespace is frozen —
 * spread copies the members so Root and Content can be the sized
 * wrappers while the rest stay Ark's own parts. */
export const Menu: Omit<typeof ArkMenu, "Root" | "Content"> & {
  Root: typeof MenuRoot;
  Content: typeof MenuContent;
} = {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
};

injectComponentStyle("menu");
