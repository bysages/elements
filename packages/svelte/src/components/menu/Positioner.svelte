<script lang="ts">
  import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkMenu.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkMenu.Positioner {...rest}>
    {@render children?.()}
  </ArkMenu.Positioner>
</FloatingPortal>
