<script lang="ts">
import type { ListActionsProps } from "./props";

let { children, ...rest }: ListActionsProps = $props();
</script>

<div {...rest} data-scope="list" data-part="actions">
  {@render children?.()}
</div>
