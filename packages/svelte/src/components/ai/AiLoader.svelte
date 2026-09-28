<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("ai");

import type { AiPartProps } from "./props";

let { children, ...rest }: AiPartProps = $props();
</script>

<span {...rest} role="status" aria-label="Loading" data-scope="ai" data-part="loader">
  {@render children?.()}
</span>
