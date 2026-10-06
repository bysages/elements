<script lang="ts">
import { HoverCard as ArkHoverCard } from "@ark-ui/svelte/hover-card";
import { Portal } from "@ark-ui/svelte/portal";

import HoverCardRoot from "./HoverCardRoot.svelte";

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
  trigger: string;
  label: string;
  description?: string;
  disabled?: boolean;
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/hover-card").HoverCardRootProps = $props();
</script>

<HoverCardRoot bind:open {...(placement === undefined ? null : { positioning: { placement } })} {...rest}>
  <ArkHoverCard.Trigger {disabled}>{trigger}</ArkHoverCard.Trigger>
  <Portal>
    <ArkHoverCard.Positioner>
      <ArkHoverCard.Content>
        <ArkHoverCard.Arrow><ArkHoverCard.ArrowTip /></ArkHoverCard.Arrow>
        <h3>{label}</h3>
        {#if description}<p>{description}</p>{/if}
        {@render children?.()}
      </ArkHoverCard.Content>
    </ArkHoverCard.Positioner>
  </Portal>
</HoverCardRoot>
