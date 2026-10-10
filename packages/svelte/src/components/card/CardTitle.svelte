<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("card");

import type { CardTitleProps } from "./props";

let { children, ...rest }: CardTitleProps = $props();
</script>

<h3 {...rest} data-scope="card" data-part="title">
  {@render children?.()}
</h3>

