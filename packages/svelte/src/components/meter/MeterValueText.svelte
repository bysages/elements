<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("meter");

import type { MeterPartProps } from "./props";

let { children, ...rest }: MeterPartProps = $props();
</script>

<span {...rest} data-scope="meter" data-part="value-text">
  {@render children?.()}
</span>

