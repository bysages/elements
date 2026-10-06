<script lang="ts">
import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import { Portal } from "@ark-ui/svelte/portal";

import MenuContent from "./MenuContent.svelte";
import MenuRoot from "./MenuRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type MenuItemOption = { label: string; value: string; disabled?: boolean };

let {
  open = $bindable(),
  trigger,
  items,
  disabled = false,
  placement = "bottom-start",
  onSelect,
  children,
  ...rest
}: {
  open?: boolean;
  trigger: string;
  items: MenuItemOption[];
  disabled?: boolean;
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
  onSelect?: (value: string) => void;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/menu").MenuRootProps = $props();
</script>

<MenuRoot bind:open positioning={{ placement }} onSelect={(details) => onSelect?.(details.value)} {...rest}>
  <ArkMenu.Trigger {disabled}>
    {trigger}
    <ArkMenu.Indicator><InternalIcon name="chevron-down" /></ArkMenu.Indicator>
  </ArkMenu.Trigger>
  <Portal>
    <ArkMenu.Positioner>
      <MenuContent>
        {#each items as item (item.value)}
          <ArkMenu.Item value={item.value} disabled={item.disabled}>{item.label}</ArkMenu.Item>
        {/each}
        {@render children?.()}
      </MenuContent>
    </ArkMenu.Positioner>
  </Portal>
</MenuRoot>
