<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("page-header");

import type {PageHeaderPartProps} from "./props";

let { children, ...rest }: PageHeaderPartProps = $props();
</script>

<p {...rest} data-scope="page-header" data-part="eyebrow">
  {@render children?.()}
</p>
