<script lang="ts">
import { ScrollArea as ArkScrollArea } from "@ark-ui/svelte/scroll-area";

import ScrollAreaRoot from "./ScrollAreaRoot.svelte";

type ScrollAreaProps = {
  orientation?: "vertical" | "horizontal" | "both";
  /** Dissolve the viewport edges — see Root's `fade`. */
  fade?: "vertical" | "horizontal" | "both";
  children?: import("svelte").Snippet;
} & Omit<import("@ark-ui/svelte/scroll-area").ScrollAreaRootProps, "fade">;

let { orientation = "vertical", fade, children, ...rest }: ScrollAreaProps = $props();

const orientations = $derived(
  orientation === "both" ? (["vertical", "horizontal"] as const) : ([orientation] as const),
);
</script>

<ScrollAreaRoot {...rest} {fade}>
  <ArkScrollArea.Viewport>
    <ArkScrollArea.Content>{@render children?.()}</ArkScrollArea.Content>
  </ArkScrollArea.Viewport>
  {#each orientations as item (item)}
    <ArkScrollArea.Scrollbar orientation={item}><ArkScrollArea.Thumb /></ArkScrollArea.Scrollbar>
  {/each}
  <ArkScrollArea.Corner />
</ScrollAreaRoot>
