<script lang="ts">
import type { TimelineContentProps } from "./props";

let { children, ...rest }: TimelineContentProps = $props();
</script>

<div {...rest} data-scope="timeline" data-part="content">
  {@render children?.()}
</div>
