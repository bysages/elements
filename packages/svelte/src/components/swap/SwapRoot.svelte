<script lang="ts">
import { Swap as ArkSwap } from "@ark-ui/svelte/swap";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { SwapRootProps } from "@ark-ui/svelte/swap";

injectComponentStyle("swap");

let { ref = $bindable(null), swap = $bindable(false), children, ...rest }: SwapRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("swap", generatedId, rest.id));
</script>

<ArkSwap.Root bind:ref bind:swap {...rest} {id}>
  {@render children?.()}
</ArkSwap.Root>

