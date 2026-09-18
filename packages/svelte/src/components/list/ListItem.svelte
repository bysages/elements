<script lang="ts">
import type { ListItemProps } from "./props";

let { children, ...rest }: ListItemProps = $props();
</script>

<li {...rest} data-scope="list" data-part="item">
  {@render children?.()}
</li>
