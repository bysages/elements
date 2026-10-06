<script lang="ts">
import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";
import { injectComponentStyle } from "@bysages/core";

import type { NavigationMenuLinkProps } from "@ark-ui/svelte/navigation-menu";

injectComponentStyle("navigation-menu");

let { children, ...rest }: NavigationMenuLinkProps = $props();
</script>

<ArkNavigationMenu.Link {...rest} data-motion="ink-ripple">
  {@render children?.()}
</ArkNavigationMenu.Link>
