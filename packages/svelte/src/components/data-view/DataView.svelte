<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("data-view");

import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";
import { useComponentMessages } from "../config-provider/messages";
import type { DataViewProps } from "./props";

let { items, layout = "list", pageSize, renderItem, header, ...rest }: DataViewProps =
  $props();

const messages = useComponentMessages();

let page = $state(1);
const pageCount = $derived(pageSize ? Math.max(1, Math.ceil(items.length / pageSize)) : 1);
const visible = $derived(
  pageSize ? items.slice((page - 1) * pageSize, page * pageSize) : items,
);
</script>

<!-- One vessel, two layouts: the caller renders each record through
the renderItem snippet, the view lays the records out as a ledger or a
lattice and pages them with the pagination family's own parts. -->
<div {...rest} data-scope="data-view" data-part="root">
  {@render header?.()}
  <div data-scope="data-view" data-part="content" data-layout={layout}>
    {#each visible as item, index (index)}
      <div data-scope="data-view" data-part="cell">
        {@render renderItem?.(item, index)}
      </div>
    {/each}
  </div>
  {#if pageSize && pageCount > 1}
    <div data-scope="data-view" data-part="pager">
      <ArkPagination.Root
        count={items.length}
        pageSize={pageSize}
        page={page}
        siblingCount={1}
        onPageChange={(details) => (page = details.page)}
      >
        <ArkPagination.PrevTrigger aria-label={messages().pagination.previous}>‹</ArkPagination.PrevTrigger>
        <ArkPagination.Context>
          {#snippet children(pagination)}
            {#each pagination.pages as entry, index (index)}
              {#if entry.type === "ellipsis"}
                <ArkPagination.Ellipsis {index}>…</ArkPagination.Ellipsis>
              {:else}
                <ArkPagination.Item value={entry.value}>{entry.value}</ArkPagination.Item>
              {/if}
            {/each}
          {/snippet}
        </ArkPagination.Context>
        <ArkPagination.NextTrigger aria-label={messages().pagination.next}>›</ArkPagination.NextTrigger>
      </ArkPagination.Root>
    </div>
  {/if}
</div>