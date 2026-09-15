<script lang="ts">
import type { BreadcrumbCurrentProps } from "./props";

let { children, ...rest }: BreadcrumbCurrentProps = $props();
</script>

<span {...rest} aria-current="page" data-scope="breadcrumb" data-part="current">
  {@render children?.()}
</span>
