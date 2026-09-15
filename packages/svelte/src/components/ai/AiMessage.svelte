<script lang="ts">
import type { MessageProps } from "./props";

let { role = "assistant", children, ...rest }: MessageProps = $props();
</script>

<article {...rest} data-scope="ai" data-part="message" data-role={role}>
  {@render children?.()}
</article>
