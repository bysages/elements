<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("card");

import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<div {...rest} data-scope="card" data-part="content">
  {@render children?.()}
</div>
