<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("avatar-group");

import type { AvatarGroupProps } from "./props";

let { size, children, ...rest }: AvatarGroupProps = $props();
</script>

<div {...rest} data-scope="avatar-group" data-part="root" data-size={size}>
  {@render children?.()}
</div>
