<script lang="ts">
  import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  interface $$ComponentProps {
    /** `true` targets body; a string targets a CSS selector. Omit for the raw Ark part. */
    portal?: FloatingPortalTarget;
    children?: import("svelte").Snippet;
  }

  let { portal, children, ...rest }: $$ComponentProps &
    import("@ark-ui/svelte/navigation-menu").NavigationMenuViewportPositionerProps = $props();
</script>

<FloatingPortal {portal}>
  <ArkNavigationMenu.ViewportPositioner {...rest}>
    {@render children?.()}
  </ArkNavigationMenu.ViewportPositioner>
</FloatingPortal>
