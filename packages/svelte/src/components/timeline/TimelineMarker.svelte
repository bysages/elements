<script lang="ts">
import type { TimelineMarkerProps } from "./props";

let { children, ...rest }: TimelineMarkerProps = $props();
</script>

<span {...rest} data-scope="timeline" data-part="marker">
  {@render children?.()}
</span>
