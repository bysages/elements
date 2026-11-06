<script lang="ts">
  import { Select as ArkSelect } from "@ark-ui/svelte/select";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkSelect.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkSelect.Positioner {...rest}>
    {@render children?.()}
  </ArkSelect.Positioner>
</FloatingPortal>
