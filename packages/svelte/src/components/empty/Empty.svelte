<script lang="ts">
import type { EmptyProps } from "./props";

let { children, ...rest }: EmptyProps = $props();
</script>

<div {...rest} data-scope="empty" data-part="root">
  {@render children?.()}
</div>
