<script lang="ts">
import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
import type { AvatarProps } from "./props";

let { size, children, ...rest }: AvatarProps = $props();
</script>

<!-- A circular seal on inset paper that holds initials until the image
loads over it; `size` picks a control-height rung for the seal — the
core styles re-point --bs-avatar-size per rung. -->
<ArkAvatar.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkAvatar.Root>
