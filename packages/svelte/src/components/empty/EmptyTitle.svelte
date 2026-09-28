<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("empty");

import type { EmptyTitleProps } from "./props";

let { children, ...rest }: EmptyTitleProps = $props();
</script>

<h3 {...rest} data-scope="empty" data-part="title">
  {@render children?.()}
</h3>
