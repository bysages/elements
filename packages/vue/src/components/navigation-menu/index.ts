import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/vue/navigation-menu";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** The link bleeds ink from its press point — the same wash a button
 * carries — so a sidebar row answers the hand the way the console's
 * buttons do. Scenes retune or silence the wash through the ripple
 * tokens, exactly as they do for buttons. */
const NavigationMenuRoot = defineComponent({
  name: "SNavigationMenuRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("navigation-menu", attrs);

    return () => h(ArkNavigationMenu.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkNavigationMenu.Root;

const NavigationMenuLink = defineComponent({
  name: "SNavigationMenuLink",
  setup(_props, { attrs, slots }) {
    injectComponentStyle("navigation-menu");

    return () => h(ArkNavigationMenu.Link, { ...attrs, "data-motion": "ink-ripple" }, slots);
  },
});

/** One flat destination in the callable bar; grouped panels and mega
 * menus stay on the anatomy. */
export interface NavigationMenuLinkOption {
  label: string;
  href: string;
  current?: boolean;
  description?: string;
}

/** The common path: a quiet rung of destinations, horizontal or vertical. */
const NavigationMenuFacade = defineComponent({
  name: "SNavigationMenu",
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<NavigationMenuLinkOption[]>, required: true },
    orientation: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" },
  },
  setup(props, { attrs }) {
    injectComponentStyle("navigation-menu");

    return () =>
      h(NavigationMenuRoot, { ...attrs, orientation: props.orientation }, () =>
        h(ArkNavigationMenu.List, () =>
          props.items.map((item) =>
            h(ArkNavigationMenu.Item as never, { key: item.href }, () =>
              h(NavigationMenuLink, { href: item.href, current: item.current }, () => [
                h("span", () => item.label),
                item.description ? h("span", () => item.description) : null,
              ]),
            ),
          ),
        ),
      );
  },
});

/** NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The parts — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
export const NavigationMenu = defineFamily(NavigationMenuFacade, {
  ...ArkNavigationMenu,
  Root: NavigationMenuRoot,
  Link: NavigationMenuLink,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof NavigationMenuFacade &
  Omit<typeof ArkNavigationMenu, "Root"> & {
    Root: typeof NavigationMenuRoot;
    Link: typeof NavigationMenuLink;
  };
