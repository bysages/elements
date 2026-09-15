<script lang="ts">
import type { EmptyDescriptionProps } from "./props";

let { children, ...rest }: EmptyDescriptionProps = $props();
</script>

<p {...rest} data-scope="empty" data-part="description">
  {@render children?.()}
</p>
