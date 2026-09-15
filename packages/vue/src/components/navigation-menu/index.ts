import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/vue/navigation-menu";
import { injectComponentStyle } from "@bysages/core";

/** NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The parts — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
export const NavigationMenu = ArkNavigationMenu;

injectComponentStyle("navigation-menu");
