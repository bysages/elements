<script lang="ts">
import type { TimelineProps } from "./props";

let { children, ...rest }: TimelineProps = $props();
</script>

<ol {...rest} data-scope="timeline" data-part="root">
  {@render children?.()}
</ol>
