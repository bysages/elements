<script lang="ts">
import type { BreadcrumbItemProps } from "./props";

let { children, ...rest }: BreadcrumbItemProps = $props();
</script>

<li {...rest} data-scope="breadcrumb" data-part="item">
  {@render children?.()}
</li>
