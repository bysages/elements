<script lang="ts">
import { Toast as ArkToast } from "@ark-ui/svelte/toast";

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
  {#if closable}<ArkToast.CloseTrigger aria-label="Close">×</ArkToast.CloseTrigger>{/if}
  {@render children?.()}
</ToastRoot>
