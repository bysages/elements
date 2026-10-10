<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import type { AiPartProps } from "./props";

let { children, ...rest }: AiPartProps = $props();
</script>

<div {...rest} data-scope="ai" data-part="content">
  {@render children?.()}
</div>

