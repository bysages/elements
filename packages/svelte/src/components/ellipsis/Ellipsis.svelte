<script lang="ts">
import type { EllipsisProps } from "./props";

let { lines = 1, children, ...rest }: EllipsisProps = $props();

const multiline = $derived(lines > 1);
</script>

<!-- The overflow knife: text cut at one line, or held to N lines. The
primitive only draws the cut — reaching the full text (title, tooltip)
stays the consumer's decision. -->
<span
  {...rest}
  style:--bs-ellipsis-lines={multiline ? String(lines) : undefined}
  data-scope="ellipsis"
  data-part="root"
  data-multiline={multiline ? "" : undefined}
>
  {@render children?.()}
</span>
