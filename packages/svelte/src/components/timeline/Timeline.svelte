<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("timeline");

import type { TimelineProps } from "./props";

let { orientation = "vertical", children, ...rest }: TimelineProps = $props();
</script>

<ol {...rest} data-scope="timeline" data-part="root" data-orientation={orientation}>
  {@render children?.()}
</ol>

