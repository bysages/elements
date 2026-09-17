<script lang="ts">
import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<main {...rest} data-scope="layout" data-part="content">
  {@render children?.()}
</main>
