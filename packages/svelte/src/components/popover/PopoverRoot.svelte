<script lang="ts">
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { PopoverRootProps } from "@ark-ui/svelte/popover";

injectComponentStyle("popover");

let { open = $bindable(), children, ...rest }: PopoverRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("popover", generatedId, rest.id));
</script>

<ArkPopover.Root bind:open {...rest} {id}>
  {@render children?.()}
</ArkPopover.Root>

