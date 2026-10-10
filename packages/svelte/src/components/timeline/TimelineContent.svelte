<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("timeline");

import type { TimelineContentProps } from "./props";

let { children, ...rest }: TimelineContentProps = $props();
</script>

<div {...rest} data-scope="timeline" data-part="content">
  {@render children?.()}
</div>

