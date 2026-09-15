<script lang="ts">
import type { AiPartProps } from "./props";

let { children, ...rest }: AiPartProps = $props();
</script>

<div {...rest} data-scope="ai" data-part="content">
  {@render children?.()}
</div>
