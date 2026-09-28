<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("layout");

import type { LayoutRegionProps } from "./props";

let { children, ...rest }: LayoutRegionProps = $props();
</script>

<main {...rest} data-scope="layout" data-part="content">
  {@render children?.()}
</main>
