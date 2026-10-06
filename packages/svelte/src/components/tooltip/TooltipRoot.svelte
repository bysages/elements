<script lang="ts">
import { Tooltip as ArkTooltip } from "@ark-ui/svelte/tooltip";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";

injectComponentStyle("tooltip");

let { open = $bindable(), children, ...rest }: TooltipRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("tooltip", generatedId, rest.id));
</script>

<ArkTooltip.Root bind:open {...rest} {id}>
  {@render children?.()}
</ArkTooltip.Root>
