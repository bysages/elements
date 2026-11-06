<script lang="ts">
  import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkDialog.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkDialog.Positioner {...rest}>
    {@render children?.()}
  </ArkDialog.Positioner>
</FloatingPortal>
