<script lang="ts">
import { Tooltip as ArkTooltip } from "@ark-ui/svelte/tooltip";
import FloatingPortal from "../../internal/FloatingPortal.svelte";

import TooltipRoot from "./TooltipRoot.svelte";

let {
  open = $bindable(),
  content,
  disabled = false,
  placement,
  trigger,
  children,
  portal = false,
  ...rest
}: {
  open?: boolean;
  content: string;
  disabled?: boolean;
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
  /** The affordance the tooltip describes: text, a snippet, or the default slot. */
  trigger?: string | import("svelte").Snippet<[import("svelte/elements").HTMLAttributes<HTMLElement>]>;
  children?: import("svelte").Snippet;
  /** After hydration, portal the floating vessel to body (`true`) or a CSS selector. */
  portal?: import("../../internal/floating").FloatingPortalTarget;
} & import("./props").TooltipRootProps = $props();
</script>

<TooltipRoot bind:open {...(placement === undefined ? null : { positioning: { placement } })} {...rest}>
  {#if typeof trigger === "string"}
    <ArkTooltip.Trigger {disabled}>{trigger}</ArkTooltip.Trigger>
  {:else if trigger}
    <ArkTooltip.Trigger {disabled}>
      {#snippet asChild(triggerProps)}
        {@render trigger(triggerProps())}
      {/snippet}
    </ArkTooltip.Trigger>
  {:else if children}
    <ArkTooltip.Trigger {disabled}>{@render children()}</ArkTooltip.Trigger>
  {/if}
  <FloatingPortal {portal}>
    <ArkTooltip.Positioner>
      <ArkTooltip.Content>
        <ArkTooltip.Arrow><ArkTooltip.ArrowTip /></ArkTooltip.Arrow>
        {content}
      </ArkTooltip.Content>
    </ArkTooltip.Positioner>
  </FloatingPortal>
</TooltipRoot>
