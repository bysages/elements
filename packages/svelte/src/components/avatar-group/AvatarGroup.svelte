<script lang="ts">
import type { AvatarGroupProps } from "./props";

let { children, ...rest }: AvatarGroupProps = $props();
</script>

<div {...rest} data-scope="avatar-group" data-part="root">
  {@render children?.()}
</div>
