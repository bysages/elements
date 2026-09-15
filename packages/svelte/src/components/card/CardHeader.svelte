<script lang="ts">
import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<header {...rest} data-scope="card" data-part="header">
  {@render children?.()}
</header>
