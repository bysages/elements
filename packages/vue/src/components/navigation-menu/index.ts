import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/vue/navigation-menu";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h } from "vue";

/** The link bleeds ink from its press point — the same wash a button
 * carries — so a sidebar row answers the hand the way the console's
 * buttons do. Scenes retune or silence the wash through the ripple
 * tokens, exactly as they do for buttons. */
const NavigationMenuLink = defineComponent({
  name: "SNavigationMenuLink",
  setup(_props, { attrs, slots }) {
    return () => h(ArkNavigationMenu.Link, { ...attrs, "data-motion": "ink-ripple" }, slots);
  },
});

/** NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The parts — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
export const NavigationMenu: Omit<typeof ArkNavigationMenu, "Link"> & {
  Link: typeof NavigationMenuLink;
} = { ...ArkNavigationMenu, Link: NavigationMenuLink };

injectComponentStyle("navigation-menu");
