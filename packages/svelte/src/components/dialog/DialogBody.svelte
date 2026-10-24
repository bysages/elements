<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("dialog");

import type { DialogPartProps } from "./props";

let { children, ...rest }: DialogPartProps = $props();
</script>

<div {...rest} data-scope="dialog" data-part="body">
  {@render children?.()}
</div>
