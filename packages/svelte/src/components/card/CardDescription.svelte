<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("card");

import type { CardDescriptionProps } from "./props";

let { children, ...rest }: CardDescriptionProps = $props();
</script>

<p {...rest} data-scope="card" data-part="description">
  {@render children?.()}
</p>

