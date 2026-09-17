<script lang="ts">
import type { DescriptionsPartProps } from "./props";

let { children, ...rest }: DescriptionsPartProps = $props();
</script>

<dd {...rest} data-scope="descriptions" data-part="detail">
  {@render children?.()}
</dd>
