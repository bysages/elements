<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("descriptions");

import type { DescriptionsPartProps } from "./props";

let { children, ...rest }: DescriptionsPartProps = $props();
</script>

<div {...rest} data-scope="descriptions" data-part="item">
  {@render children?.()}
</div>
