<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import FloatingPortal from "../../internal/FloatingPortal.svelte";

import { iconHtml } from "../../internal/icon";

import DialogBody from "./DialogBody.svelte";
import DialogContent from "./DialogContent.svelte";
import DialogHeader from "./DialogHeader.svelte";
import DialogRoot from "./DialogRoot.svelte";

let {
  open = $bindable(),
  trigger = "Open",
  content,
  label,
  description,
  disabled = false,
  size = "md",
  children,
  portal = true,
  ...rest
}: {
  open?: boolean;
  trigger?: string;
  content?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  children?: import("svelte").Snippet;
  /** After hydration, portal the floating vessel to body (`true`) or a CSS selector. */
  portal?: import("../../internal/floating").FloatingPortalTarget;
} & import("@ark-ui/svelte/dialog").DialogRootProps = $props();
</script>

<DialogRoot bind:open {...rest}>
  <ArkDialog.Trigger {disabled}>{trigger}</ArkDialog.Trigger>
  <FloatingPortal {portal}>
    <ArkDialog.Backdrop />
    <ArkDialog.Positioner>
      <DialogContent size={size}>
        <DialogHeader>
          <ArkDialog.Title>{label ?? trigger}</ArkDialog.Title>
          {#if description}<ArkDialog.Description>{description}</ArkDialog.Description>{/if}
        </DialogHeader>
        <DialogBody>
          {#if content}<p>{content}</p>{/if}
          {@render children?.()}
        </DialogBody>
        <ArkDialog.CloseTrigger aria-label="Close">{@html iconHtml("x", { width: "14", height: "14" })}</ArkDialog.CloseTrigger>
      </DialogContent>
    </ArkDialog.Positioner>
  </FloatingPortal>
</DialogRoot>
