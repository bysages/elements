<script lang="ts">
import type { CardPartProps } from "./props";

let { children, ...rest }: CardPartProps = $props();
</script>

<footer {...rest} data-scope="card" data-part="footer">
  {@render children?.()}
</footer>
