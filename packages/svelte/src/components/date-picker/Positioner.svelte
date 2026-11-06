<script lang="ts">
  import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
  import type { ComponentProps, Snippet } from "svelte";

  import FloatingPortal from "../../internal/FloatingPortal.svelte";
  import type { FloatingPortalTarget } from "../../internal/floating";

  type PositionerProps = ComponentProps<typeof ArkDatePicker.Positioner>;

  let {
    portal,
    children,
    ...rest
  }: PositionerProps & { portal?: FloatingPortalTarget; children?: Snippet } = $props();
</script>

<FloatingPortal {portal}>
  <ArkDatePicker.Positioner {...rest}>
    {@render children?.()}
  </ArkDatePicker.Positioner>
</FloatingPortal>
