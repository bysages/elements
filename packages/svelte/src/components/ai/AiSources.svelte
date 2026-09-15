<script lang="ts">
import type { AiPartProps } from "./props";

let { children, ...rest }: AiPartProps = $props();
</script>

<ol {...rest} data-scope="ai" data-part="sources">
  {@render children?.()}
</ol>
