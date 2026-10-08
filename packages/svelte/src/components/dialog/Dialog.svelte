<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { Portal } from "@ark-ui/svelte/portal";

import { iconHtml } from "../../internal/icon";

import DialogRoot from "./DialogRoot.svelte";

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
} & import("@ark-ui/svelte/dialog").DialogRootProps = $props();
</script>

<DialogRoot bind:open {...rest}>
  <ArkDialog.Trigger {disabled}>{trigger}</ArkDialog.Trigger>
  <Portal>
    <ArkDialog.Backdrop />
    <ArkDialog.Positioner>
      <ArkDialog.Content>
        <ArkDialog.Title>{label ?? trigger}</ArkDialog.Title>
        {#if description}<ArkDialog.Description>{description}</ArkDialog.Description>{/if}
        {@render children?.()}
        <ArkDialog.CloseTrigger aria-label="Close">{@html iconHtml("x", { width: "14", height: "14" })}</ArkDialog.CloseTrigger>
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
</DialogRoot>
