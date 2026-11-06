<script lang="ts">
  import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkPopover.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkPopover.Positioner {...rest}>
    {@render children?.()}
  </ArkPopover.Positioner>
</FloatingPortal>
