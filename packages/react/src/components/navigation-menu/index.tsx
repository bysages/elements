import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/react/navigation-menu";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's NavigationMenu, dressed in the paper-and-ink system: a menubar of
 * ghost triggers with one sliding stroke of primary ink, opening the shared
 * popup vessel. The API is Ark's own — Root, List, Item, Trigger, Link,
 * Content, ViewportPositioner, Viewport, Indicator, ItemIndicator, Arrow. */
function NavigationMenuRoot(props: ComponentProps<typeof ArkNavigationMenu.Root>) {
  const id = useElementId("navigation-menu", props);

  return <ArkNavigationMenu.Root {...props} id={id} />;
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
  className?: string;
}

function NavigationMenuFacade({
  items,
  orientation = "horizontal",
  className,
}: NavigationMenuFacadeProps) {
  return (
    <NavigationMenuRoot className={className} orientation={orientation}>
      <ArkNavigationMenu.List>
        {items.map((item) => (
          <ArkNavigationMenu.Item key={item.href} value={item.href}>
            <NavigationMenuLink href={item.href} current={item.current}>
              <span>{item.label}</span>
              {item.description ? <span>{item.description}</span> : null}
            </NavigationMenuLink>
          </ArkNavigationMenu.Item>
        ))}
      </ArkNavigationMenu.List>
    </NavigationMenuRoot>
  );
}

NavigationMenuFacade.displayName = "SNavigationMenu";

type NavigationMenuParts = Omit<typeof ArkNavigationMenu, "Root" | "Link"> & {
  Root: typeof NavigationMenuRoot;
  Link: typeof NavigationMenuLink;
};

/* Ark's namespace is frozen — spread copies the members so Root and Link
 * can be the styled wrappers while the rest stay Ark's own parts. */
export const NavigationMenu = Object.assign(NavigationMenuFacade, {
  ...ArkNavigationMenu,
  Root: NavigationMenuRoot,
  Link: NavigationMenuLink,
}) as typeof NavigationMenuFacade & NavigationMenuParts;

injectComponentStyle("navigation-menu");
