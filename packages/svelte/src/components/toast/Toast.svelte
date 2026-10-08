<script lang="ts">
import { Toast as ArkToast } from "@ark-ui/svelte/toast";

import { iconHtml } from "../../internal/icon";

import ToastRoot from "./ToastRoot.svelte";

let { title, description, closable = true, children, ...rest }: {
  title?: string;
  description?: string;
  closable?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/toast").ToastRootProps = $props();
</script>

<ToastRoot {...rest}>
  <ArkToast.Title>{title}</ArkToast.Title>
  {#if description}<ArkToast.Description>{description}</ArkToast.Description>{/if}
  {#if closable}<ArkToast.CloseTrigger aria-label="Close">{@html iconHtml("x", { width: "14", height: "14" })}</ArkToast.CloseTrigger>{/if}
  {@render children?.()}
</ToastRoot>
