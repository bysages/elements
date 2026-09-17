<script lang="ts">
import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<header {...rest} data-scope="layout" data-part="header">
  {@render children?.()}
</header>
