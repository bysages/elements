<script lang="ts">
import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";
import type { PaginationRootProps } from "./props";

let { size = "md", children, ...rest }: PaginationRootProps = $props();
</script>

<ArkPagination.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkPagination.Root>
