<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("card");

import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<header {...rest} data-scope="card" data-part="header">
  {@render children?.()}
</header>
