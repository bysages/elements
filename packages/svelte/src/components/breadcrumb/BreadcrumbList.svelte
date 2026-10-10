<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("breadcrumb");

import type { BreadcrumbListProps } from "./props";

let { children, ...rest }: BreadcrumbListProps = $props();
</script>

<ol {...rest} data-scope="breadcrumb" data-part="list">
  {@render children?.()}
</ol>

