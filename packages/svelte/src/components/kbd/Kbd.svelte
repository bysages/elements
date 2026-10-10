<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("kbd");

import type { KbdProps } from "./props";

let { children, ...rest }: KbdProps = $props();
</script>

<kbd {...rest} data-scope="kbd" data-part="root">
  {@render children?.()}
</kbd>

