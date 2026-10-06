<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("avatar");

import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
import { useElementId } from "../../internal/id";
import type { AvatarProps } from "./props";

let { size, shape = "circle", children, ...rest }: AvatarProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("avatar", generatedId, rest.id));
</script>

<!-- A circular seal on inset paper that holds initials until the image
loads over it; `size` picks a control-height rung for the seal — the
core styles re-point --bs-avatar-size per rung. -->
<ArkAvatar.Root {...rest} {id} data-size={size} data-shape={shape}>
  {@render children?.()}
</ArkAvatar.Root>
