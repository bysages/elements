<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("pagination");

import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";
import { useElementId } from "../../internal/id";
import type { PaginationRootProps } from "./props";

let { size = "md", children, ...rest }: PaginationRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("pagination", generatedId, rest.id));
</script>

<ArkPagination.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkPagination.Root>

