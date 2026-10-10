<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("timeline");

import type { TimelineMarkerProps } from "./props";

let { children, ...rest }: TimelineMarkerProps = $props();
</script>

<span {...rest} data-scope="timeline" data-part="marker">
  {@render children?.()}
</span>

