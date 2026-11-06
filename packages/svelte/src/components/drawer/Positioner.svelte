<script lang="ts">
  import { Drawer as ArkDrawer } from "@ark-ui/svelte/drawer";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkDrawer.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkDrawer.Positioner {...rest}>
    {@render children?.()}
  </ArkDrawer.Positioner>
</FloatingPortal>
