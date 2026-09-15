<script lang="ts">
import type { BreadcrumbProps } from "./props";

let { children, ...rest }: BreadcrumbProps = $props();
</script>

<nav {...rest} aria-label="Breadcrumb" data-scope="breadcrumb" data-part="root">
  {@render children?.()}
</nav>
