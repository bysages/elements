<script lang="ts">
import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<div {...rest} data-scope="card" data-part="content">
  {@render children?.()}
</div>
