<script lang="ts">
import type { SourcesProps } from "./props";

let { children, ...rest }: SourcesProps = $props();
</script>

<!-- The reading list under a response: where this ink came from. -->
<ol {...rest} data-scope="ai" data-part="sources">
  {@render children?.()}
</ol>
