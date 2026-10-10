<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("timeline");

import type { TimelineItemProps } from "./props";

let { children, ...rest }: TimelineItemProps = $props();
</script>

<li {...rest} data-scope="timeline" data-part="item">
  {@render children?.()}
</li>

