<script lang="ts">
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { Portal } from "@ark-ui/svelte/portal";

import PopoverRoot from "./PopoverRoot.svelte";

let {
  open = $bindable(),
  trigger,
  label,
  description,
  disabled = false,
  placement,
  children,
  ...rest
}: {
  open?: boolean;
  trigger: string | import("svelte").Snippet<[import("svelte/elements").HTMLAttributes<HTMLElement>]>;
  label?: string;
  description?: string;
  disabled?: boolean;
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/popover").PopoverRootProps = $props();
</script>

<PopoverRoot bind:open {...(placement === undefined ? null : { positioning: { placement } })} {...rest}>
  {#if typeof trigger === "string"}
    <ArkPopover.Trigger {disabled}>{trigger}</ArkPopover.Trigger>
  {:else}
    <ArkPopover.Trigger {disabled}>
      {#snippet asChild(triggerProps)}
        {@render trigger(triggerProps())}
      {/snippet}
    </ArkPopover.Trigger>
  {/if}
  <Portal>
    <ArkPopover.Positioner>
      <ArkPopover.Content>
        <ArkPopover.Arrow><ArkPopover.ArrowTip /></ArkPopover.Arrow>
        {#if label}<ArkPopover.Title>{label}</ArkPopover.Title>{/if}
        {#if description}<ArkPopover.Description>{description}</ArkPopover.Description>{/if}
        {@render children?.()}
        <ArkPopover.CloseTrigger aria-label="Close">×</ArkPopover.CloseTrigger>
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</PopoverRoot>
