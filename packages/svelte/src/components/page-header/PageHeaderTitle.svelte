<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("page-header");

import type {PageHeaderPartProps} from "./props";

let { children, ...rest }: PageHeaderPartProps = $props();
</script>

<h1 {...rest} data-scope="page-header" data-part="title">
  {@render children?.()}
</h1>

