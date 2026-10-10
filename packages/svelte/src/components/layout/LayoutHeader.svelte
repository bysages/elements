<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("layout");

import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<header {...rest} data-scope="layout" data-part="header">
  {@render children?.()}
</header>

