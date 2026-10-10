<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("layout");

import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<footer {...rest} data-scope="layout" data-part="footer">
  {@render children?.()}
</footer>

