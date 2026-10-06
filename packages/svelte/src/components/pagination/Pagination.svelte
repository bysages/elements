<script lang="ts">
import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";

import PaginationRoot from "./PaginationRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  page = $bindable(),
  defaultValue,
  count = 0,
  pageSize,
  defaultPageSize,
  siblingCount = 1,
  label,
  children,
  ...rest
}: {
  page?: number;
  defaultValue?: number;
  count?: number;
  pageSize?: number;
  defaultPageSize?: number;
  siblingCount?: number;
  label?: string;
  children?: import("svelte").Snippet;
} & import("./props").PaginationRootProps = $props();
</script>

<PaginationRoot bind:page {count} defaultPage={defaultValue} {pageSize} {defaultPageSize} {siblingCount} aria-label={label} {...rest}>
  <ArkPagination.PrevTrigger aria-label="Previous page"><InternalIcon name="chevron-left" /></ArkPagination.PrevTrigger>
  <ArkPagination.Context>
    {#snippet render(pagination)}
      {#each pagination().pages as item, index (item.type === "page" ? item.value : `ellipsis-${index}`)}
        {#if item.type === "page"}
          <ArkPagination.Item type="page" value={item.value}>{item.value}</ArkPagination.Item>
        {:else}
          <ArkPagination.Ellipsis index={index}>…</ArkPagination.Ellipsis>
        {/if}
      {/each}
    {/snippet}
  </ArkPagination.Context>
  <ArkPagination.NextTrigger aria-label="Next page"><InternalIcon name="chevron-right" /></ArkPagination.NextTrigger>
  {@render children?.()}
</PaginationRoot>

