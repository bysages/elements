<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("virtual-list");

import { createVirtualizer } from "@tanstack/svelte-virtual";
import type { VirtualListProps } from "./props";

let {
  items,
  itemHeight = 40,
  height = 320,
  renderItem,
  ...rest
}: VirtualListProps = $props();

let viewport: HTMLDivElement | undefined = $state();

const virtualizer = createVirtualizer({
  count: items.length,
  getScrollElement: () => viewport ?? null,
  estimateSize: () => itemHeight,
  overscan: 6,
});

const rows = $derived(virtualizer.getVirtualItems());
const total = $derived(virtualizer.getTotalSize());
const blockHeight = $derived(typeof height === "number" ? `${height}px` : height);
</script>

<!-- A ledger that only mounts the rows on stage: the viewport keeps
its scroll length by a spacer sized from the row height — a
ten-thousand-row list costs the DOM a window, not the ledger. -->
<div
  bind:this={viewport}
  {...rest}
  tabindex={0}
  data-scope="virtual-list"
  data-part="root"
  style="block-size: {blockHeight}"
>
  <div
    data-scope="virtual-list"
    data-part="inner"
    style="block-size: {total}px; position: relative"
  >
    {#each rows as row (row.key)}
      <div
        data-scope="virtual-list"
        data-part="row"
        style="position: absolute; top: 0; inset-inline-start: 0; inline-size: 100%; transform: translateY({row.start}px); block-size: {row.size}px"
      >
        {@render renderItem?.(items[row.index], row.index)}
      </div>
    {/each}
  </div>
</div>