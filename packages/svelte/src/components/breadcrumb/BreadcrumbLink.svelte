<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("breadcrumb");

import type { BreadcrumbLinkProps } from "./props";

let { children, ...rest }: BreadcrumbLinkProps = $props();
</script>

<a {...rest} data-scope="breadcrumb" data-part="link">
  {@render children?.()}
</a>

