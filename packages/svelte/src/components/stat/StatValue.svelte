<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("stat");

import type {StatPartProps} from "./props";

let { children, ...rest }: StatPartProps = $props();
</script>

<div {...rest} data-scope="stat" data-part="value">
  {@render children?.()}
</div>
