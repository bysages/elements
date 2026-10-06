import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";

import { defineFamily } from "../../internal/family";
import NavigationMenuFacade from "./NavigationMenu.svelte";
import NavigationMenuLink from "./NavigationMenuLink.svelte";
import NavigationMenuRoot from "./NavigationMenuRoot.svelte";

/** The link bleeds ink from its press point, while NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The API is Ark's own — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
export const NavigationMenu: typeof NavigationMenuFacade &
  Omit<typeof ArkNavigationMenu, "Root" | "Link"> & {
    Root: typeof NavigationMenuRoot;
    Link: typeof NavigationMenuLink;
  } = defineFamily(NavigationMenuFacade, {
  ...ArkNavigationMenu,
  Root: NavigationMenuRoot,
  Link: NavigationMenuLink,
});
