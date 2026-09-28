<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("card");

import type { CardProps } from "./props";

let { children, ...rest }: CardProps = $props();
</script>

<section {...rest} data-scope="card" data-part="root">
  {@render children?.()}
</section>
