<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("empty");

import type { EmptyPartProps } from "./props";

let { children, ...rest }: EmptyPartProps = $props();
</script>

<div {...rest} data-scope="empty" data-part="actions">
  {@render children?.()}
</div>
