<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("breadcrumb");

import type { BreadcrumbItemProps } from "./props";

let { children, ...rest }: BreadcrumbItemProps = $props();
</script>

<li {...rest} data-scope="breadcrumb" data-part="item">
  {@render children?.()}
</li>
