<script lang="ts">
import type { BreadcrumbLinkProps } from "./props";

let { children, ...rest }: BreadcrumbLinkProps = $props();
</script>

<a {...rest} data-scope="breadcrumb" data-part="link">
  {@render children?.()}
</a>
