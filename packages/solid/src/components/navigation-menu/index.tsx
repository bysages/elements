import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/solid/navigation-menu";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createComponent, mergeProps, type ComponentProps } from "solid-js";

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

function NavigationMenuLink(props: ComponentProps<typeof ArkNavigationMenu.Link>) {
  injectComponentStyle("navigation-menu");

  return <ArkNavigationMenu.Link {...props} data-motion="ink-ripple" />;
}

/** One flat destination in the callable bar; grouped panels and mega
 * menus stay on the anatomy. */
export interface NavigationMenuLinkOption {
  label: string;
  href: string;
  current?: boolean;
  description?: string;
}

export interface NavigationMenuFacadeProps {
  items: NavigationMenuLinkOption[];
  orientation?: "horizontal" | "vertical";
}

/** The common path: a quiet rung of destinations, horizontal or vertical. */
function NavigationMenuFacade(props: NavigationMenuFacadeProps) {
  injectComponentStyle("navigation-menu");

  return (
    <NavigationMenuRoot orientation={props.orientation ?? "horizontal"}>
      <ArkNavigationMenu.List>
        <For each={props.items}>
          {(item) => (
            <ArkNavigationMenu.Item value={item.href}>
              <NavigationMenuLink href={item.href} current={item.current}>
                <span>{item.label}</span>
                <Show when={item.description}>
                  <span>{item.description}</span>
                </Show>
              </NavigationMenuLink>
            </ArkNavigationMenu.Item>
          )}
        </For>
      </ArkNavigationMenu.List>
    </NavigationMenuRoot>
  );
}

export const NavigationMenu: typeof NavigationMenuFacade &
  Omit<typeof ArkNavigationMenu, "Root"> & {
    Root: typeof NavigationMenuRoot;
    Link: typeof NavigationMenuLink;
  } = defineFamily(NavigationMenuFacade, {
  ...ArkNavigationMenu,
  Root: NavigationMenuRoot,
  Link: NavigationMenuLink,
});
injectComponentStyle("navigation-menu");
