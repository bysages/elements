<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("dialog");

import type { DialogPartProps } from "./props";

let { children, ...rest }: DialogPartProps = $props();
</script>

<header {...rest} data-scope="dialog" data-part="header">
  {@render children?.()}
</header>
