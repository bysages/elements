<script lang="ts">
  import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkCombobox.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkCombobox.Positioner {...rest}>
    {@render children?.()}
  </ArkCombobox.Positioner>
</FloatingPortal>
