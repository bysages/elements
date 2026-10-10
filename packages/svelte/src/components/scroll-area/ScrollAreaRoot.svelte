<script lang="ts">
import { ScrollArea as ArkScrollArea } from "@ark-ui/svelte/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { ScrollAreaRootProps } from "@ark-ui/svelte/scroll-area";

injectComponentStyle("scroll-area");

let { ref = $bindable(null), children, ...rest }: ScrollAreaRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("scroll-area", generatedId, rest.id));
</script>

<ArkScrollArea.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkScrollArea.Root>

