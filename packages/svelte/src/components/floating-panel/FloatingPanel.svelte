<script lang="ts">
import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/svelte/floating-panel";
import { Portal } from "@ark-ui/svelte/portal";

import FloatingPanelRoot from "./FloatingPanelRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  open = $bindable(),
  trigger,
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
} & import("@ark-ui/svelte/floating-panel").FloatingPanelRootProps = $props();

const resizeAxes = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;
</script>

<FloatingPanelRoot bind:open {disabled} {...rest}>
  <ArkFloatingPanel.Trigger>{trigger ?? label}</ArkFloatingPanel.Trigger>
  <Portal>
    <ArkFloatingPanel.Positioner>
      <ArkFloatingPanel.Content>
        <ArkFloatingPanel.DragTrigger>
          <ArkFloatingPanel.Header>
            <ArkFloatingPanel.Title>{label}</ArkFloatingPanel.Title>
            <ArkFloatingPanel.Control>
              <ArkFloatingPanel.StageTrigger stage="minimized"><InternalIcon name="minus" /></ArkFloatingPanel.StageTrigger>
              <ArkFloatingPanel.StageTrigger stage="maximized"><InternalIcon name="maximize-2" /></ArkFloatingPanel.StageTrigger>
              <ArkFloatingPanel.CloseTrigger aria-label="Close"><InternalIcon name="x" /></ArkFloatingPanel.CloseTrigger>
            </ArkFloatingPanel.Control>
          </ArkFloatingPanel.Header>
        </ArkFloatingPanel.DragTrigger>
        <ArkFloatingPanel.Body>
          {#if description}<p>{description}</p>{/if}
          {@render children?.()}
        </ArkFloatingPanel.Body>
        {#each resizeAxes as axis (axis)}
          <ArkFloatingPanel.ResizeTrigger axis={axis} />
        {/each}
      </ArkFloatingPanel.Content>
    </ArkFloatingPanel.Positioner>
  </Portal>
</FloatingPanelRoot>
