<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("empty");

import type { EmptyProps } from "./props";

let { children, ...rest }: EmptyProps = $props();
</script>

<div {...rest} data-scope="empty" data-part="root">
  {@render children?.()}
</div>

