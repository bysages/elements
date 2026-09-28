<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("list");

import type { ListLeadingProps } from "./props";

let { children, ...rest }: ListLeadingProps = $props();
</script>

<div {...rest} data-scope="list" data-part="leading">
  {@render children?.()}
</div>
