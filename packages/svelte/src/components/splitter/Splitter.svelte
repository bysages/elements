<script lang="ts">
import { Splitter as ArkSplitter } from "@ark-ui/svelte/splitter";

import SplitterRoot from "./SplitterRoot.svelte";

export type SplitterItem = { id: string; label: string };

let {
  value = $bindable(),
  defaultValue,
  items,
  orientation = "horizontal",
  children,
  ...rest
}: {
  value?: number[];
  defaultValue?: number[];
  items: SplitterItem[];
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/splitter").SplitterRootProps = $props();

const panels = $derived(items.map((item) => ({ id: item.id })));
</script>

<SplitterRoot bind:value {defaultValue} {orientation} panels={panels} {...rest}>
  {#each items as item, index (item.id)}
    <ArkSplitter.Panel id={item.id}>{item.label}</ArkSplitter.Panel>
    {#if items[index + 1]}
      <ArkSplitter.ResizeTrigger id={`${item.id}:${items[index + 1].id}`} aria-label="Resize panels">
        <ArkSplitter.ResizeTriggerIndicator />
      </ArkSplitter.ResizeTrigger>
    {/if}
  {/each}
  {@render children?.()}
</SplitterRoot>
