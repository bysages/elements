<script lang="ts">
import type { AttachmentsProps } from "./props";

let { children, ...rest }: AttachmentsProps = $props();
</script>

<!-- The row the files ride in — a wrapping line of chips. -->
<span {...rest} data-scope="ai" data-part="attachments">
  {@render children?.()}
</span>
