<script lang="ts">
import { Toast as ArkToast } from "@ark-ui/svelte/toast";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { ToastRootProps } from "@ark-ui/svelte/toast";

injectComponentStyle("toast");

let { ref = $bindable(null), children, ...rest }: ToastRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("toast", generatedId, rest.id));
</script>

<ArkToast.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkToast.Root>
