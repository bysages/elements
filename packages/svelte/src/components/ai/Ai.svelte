<script lang="ts">
import type { AiPartProps } from "./props";

let { children, ...rest }: AiPartProps = $props();
</script>

<div {...rest} role="log" aria-label="Conversation" data-scope="ai" data-part="conversation">
  {@render children?.()}
</div>
