<script lang="ts">
import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<footer {...rest} data-scope="layout" data-part="footer">
  {@render children?.()}
</footer>
