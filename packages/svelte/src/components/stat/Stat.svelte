<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("stat");

import type {StatPartProps} from "./props";

let { children, ...rest }: StatPartProps = $props();
</script>

<div {...rest} data-scope="stat" data-part="root">
  {@render children?.()}
</div>

