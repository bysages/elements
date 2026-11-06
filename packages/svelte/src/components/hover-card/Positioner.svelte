<script lang="ts">
  import { HoverCard as ArkHoverCard } from "@ark-ui/svelte/hover-card";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkHoverCard.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkHoverCard.Positioner {...rest}>
    {@render children?.()}
  </ArkHoverCard.Positioner>
</FloatingPortal>
