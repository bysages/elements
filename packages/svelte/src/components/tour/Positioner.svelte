<script lang="ts">
  import { Tour as ArkTour } from "@ark-ui/svelte/tour";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkTour.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkTour.Positioner {...rest}>
    {@render children?.()}
  </ArkTour.Positioner>
</FloatingPortal>
