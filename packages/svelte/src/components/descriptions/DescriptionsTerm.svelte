<script lang="ts">
import type { DescriptionsPartProps } from "./props";

let { children, ...rest }: DescriptionsPartProps = $props();
</script>

<dt {...rest} data-scope="descriptions" data-part="term">
  {@render children?.()}
</dt>
