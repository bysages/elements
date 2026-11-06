<script lang="ts">
  import { Tooltip as ArkTooltip } from "@ark-ui/svelte/tooltip";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkTooltip.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkTooltip.Positioner {...rest}>
    {@render children?.()}
  </ArkTooltip.Positioner>
</FloatingPortal>
