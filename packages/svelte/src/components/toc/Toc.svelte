<script lang="ts">
import { Toc as ArkToc, type TocItemData } from "@ark-ui/svelte/toc";

import TocIndicator from "./TocIndicator.svelte";
import TocRoot from "./TocRoot.svelte";

export type TocFacadeItem = TocItemData & { label: string };

let { items, scrollEl, title = "On this page", children, ...rest }: {
  items: TocFacadeItem[];
  scrollEl?: () => HTMLElement | null;
  title?: string;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/toc").TocRootProps = $props();
</script>

<TocRoot {items} {scrollEl} {...rest}>
  <ArkToc.Nav>
    {#if title}<ArkToc.Title>{title}</ArkToc.Title>{/if}
    <ArkToc.List>
      <TocIndicator />
      {#each items as item (item.value)}
        <ArkToc.Item item={item}>
          <ArkToc.Link href={`#${item.value}`}>{item.label}</ArkToc.Link>
        </ArkToc.Item>
      {/each}
    </ArkToc.List>
  </ArkToc.Nav>
  {@render children?.()}
</TocRoot>
