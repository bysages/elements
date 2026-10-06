<script lang="ts">
import { Drawer as ArkDrawer } from "@ark-ui/svelte/drawer";
import { Portal } from "@ark-ui/svelte/portal";

import DrawerRoot from "./DrawerRoot.svelte";

let {
  open = $bindable(),
  trigger = "Open",
  label,
  description,
  disabled = false,
  children,
  ...rest
}: {
  open?: boolean;
  trigger?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/drawer").DrawerRootProps = $props();
</script>

<DrawerRoot bind:open {...rest}>
  <ArkDrawer.Trigger {disabled}>{trigger}</ArkDrawer.Trigger>
  <Portal>
    <ArkDrawer.Backdrop />
    <ArkDrawer.Positioner>
      <ArkDrawer.Content>
        <ArkDrawer.Title>{label ?? trigger}</ArkDrawer.Title>
        {#if description}<ArkDrawer.Description>{description}</ArkDrawer.Description>{/if}
        {@render children?.()}
        <ArkDrawer.CloseTrigger aria-label="Close">×</ArkDrawer.CloseTrigger>
      </ArkDrawer.Content>
    </ArkDrawer.Positioner>
  </Portal>
</DrawerRoot>
