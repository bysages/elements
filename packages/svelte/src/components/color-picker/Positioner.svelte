<script lang="ts">
  import { ColorPicker as ArkColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkColorPicker.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkColorPicker.Positioner {...rest}>
    {@render children?.()}
  </ArkColorPicker.Positioner>
</FloatingPortal>
