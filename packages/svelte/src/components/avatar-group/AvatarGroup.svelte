<script lang="ts">
import type { AvatarGroupProps } from "./props";

let { size, children, ...rest }: AvatarGroupProps = $props();
</script>

<div {...rest} data-scope="avatar-group" data-part="root" data-size={size}>
  {@render children?.()}
</div>
