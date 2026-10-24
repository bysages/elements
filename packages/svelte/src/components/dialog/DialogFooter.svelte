<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("dialog");

import type { DialogPartProps } from "./props";

let { children, ...rest }: DialogPartProps = $props();
</script>

<footer {...rest} data-scope="dialog" data-part="footer">
  {@render children?.()}
</footer>
