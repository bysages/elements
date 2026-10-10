import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/solid/navigation-menu";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The API is Ark's own — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
function NavigationMenuRoot(props: ComponentProps<typeof ArkNavigationMenu.Root>) {
  const id = useElementId("navigation-menu", () => props.id);

  return createComponent(
    ArkNavigationMenu.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const NavigationMenu: typeof NavigationMenuRoot &
  Omit<typeof ArkNavigationMenu, "Root"> & { Root: typeof NavigationMenuRoot } = defineFamily(
  NavigationMenuRoot,
  {
    ...ArkNavigationMenu,
    Root: NavigationMenuRoot,
  },
);
injectComponentStyle("navigation-menu");
