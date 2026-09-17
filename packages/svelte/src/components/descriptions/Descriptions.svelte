<script lang="ts">
import type { DescriptionsRootProps } from "./props";

let { layout = "horizontal", children, ...rest }: DescriptionsRootProps = $props();
</script>

<dl {...rest} data-scope="descriptions" data-part="root" data-layout={layout}>
  {@render children?.()}
</dl>
