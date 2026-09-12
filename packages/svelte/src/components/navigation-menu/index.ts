import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";
import { injectComponentStyle } from "@bysages/core";

/** Ark's NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The API is Ark's own — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
export const NavigationMenu = ArkNavigationMenu;

injectComponentStyle("navigation-menu");
