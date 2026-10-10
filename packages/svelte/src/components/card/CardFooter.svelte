<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("card");

import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<footer {...rest} data-scope="card" data-part="footer">
  {@render children?.()}
</footer>

