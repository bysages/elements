<script lang="ts">
  import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/svelte/floating-panel";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkFloatingPanel.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkFloatingPanel.Positioner {...rest}>
    {@render children?.()}
  </ArkFloatingPanel.Positioner>
</FloatingPortal>
