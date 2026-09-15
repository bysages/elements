<script lang="ts">
import type { TimelineItemProps } from "./props";

let { children, ...rest }: TimelineItemProps = $props();
</script>

<li {...rest} data-scope="timeline" data-part="item">
  {@render children?.()}
</li>
