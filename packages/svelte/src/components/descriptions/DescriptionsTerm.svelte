<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("descriptions");

import type { DescriptionsPartProps } from "./props";

let { children, ...rest }: DescriptionsPartProps = $props();
</script>

<dt {...rest} data-scope="descriptions" data-part="term">
  {@render children?.()}
</dt>
