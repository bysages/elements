<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("empty");

import type { EmptyPartProps } from "./props";

let { children, ...rest }: EmptyPartProps = $props();
</script>

<div {...rest} data-scope="empty" data-part="visual">
  {@render children?.()}
</div>

