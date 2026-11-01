<script lang="ts">
import { ScrollArea as ArkScrollArea } from "@ark-ui/svelte/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { ScrollAreaRootProps } from "@ark-ui/svelte/scroll-area";

type ScrollAreaRootPropsWithFade = Omit<ScrollAreaRootProps, "fade"> & {
  /** Dissolve the viewport edges with the shared seven-stop ramp. */
  fade?: "vertical" | "horizontal" | "both";
};

injectComponentStyle("scroll-area");

let { ref = $bindable(null), fade, children, ...rest }: ScrollAreaRootPropsWithFade = $props();
const generatedId = $props.id();
const id = $derived(useElementId("scroll-area", generatedId, rest.id));
</script>

<ArkScrollArea.Root bind:ref {...rest} {id} data-fade={fade}>
  {@render children?.()}
</ArkScrollArea.Root>
