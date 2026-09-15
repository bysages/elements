<script lang="ts">
import type { BreadcrumbSeparatorProps } from "./props";

let { children, ...rest }: BreadcrumbSeparatorProps = $props();
</script>

<span {...rest} aria-hidden="true" data-scope="breadcrumb" data-part="separator">
  {#if children}{@render children()}{:else}/{/if}
</span>
