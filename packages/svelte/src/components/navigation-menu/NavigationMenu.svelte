<script lang="ts">
import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";

import NavigationMenuLink from "./NavigationMenuLink.svelte";
import NavigationMenuRoot from "./NavigationMenuRoot.svelte";

export type NavigationMenuLinkOption = {
  label: string;
  href: string;
  current?: boolean;
  description?: string;
};

let { items, orientation = "horizontal", children, ...rest }: {
  items: NavigationMenuLinkOption[];
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/navigation-menu").NavigationMenuRootProps = $props();
</script>

<NavigationMenuRoot {orientation} {...rest}>
  <ArkNavigationMenu.List>
    {#each items as item (item.href)}
      <ArkNavigationMenu.Item>
        <NavigationMenuLink href={item.href} current={item.current}>
          <span>{item.label}</span>
          {#if item.description}<span>{item.description}</span>{/if}
        </NavigationMenuLink>
      </ArkNavigationMenu.Item>
    {/each}
  </ArkNavigationMenu.List>
  {@render children?.()}
</NavigationMenuRoot>
