<script lang="ts">
import type { DescriptionsPartProps } from "./props";

let { children, ...rest }: DescriptionsPartProps = $props();
</script>

<div {...rest} data-scope="descriptions" data-part="item">
  {@render children?.()}
</div>
