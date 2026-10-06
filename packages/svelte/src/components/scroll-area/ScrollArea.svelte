<script lang="ts">
import { ScrollArea as ArkScrollArea } from "@ark-ui/svelte/scroll-area";

import ScrollAreaRoot from "./ScrollAreaRoot.svelte";

let { orientation = "vertical", children, ...rest }: {
  orientation?: "vertical" | "horizontal" | "both";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/scroll-area").ScrollAreaRootProps = $props();

const orientations = $derived(
  orientation === "both" ? (["vertical", "horizontal"] as const) : ([orientation] as const),
);
</script>

<ScrollAreaRoot {...rest}>
  <ArkScrollArea.Viewport>
    <ArkScrollArea.Content>{@render children?.()}</ArkScrollArea.Content>
  </ArkScrollArea.Viewport>
  {#each orientations as item (item)}
    <ArkScrollArea.Scrollbar orientation={item}><ArkScrollArea.Thumb /></ArkScrollArea.Scrollbar>
  {/each}
  <ArkScrollArea.Corner />
</ScrollAreaRoot>
