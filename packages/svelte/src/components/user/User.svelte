<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("user");

import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
import type { UserProps } from "./props";

let { name, description, size, src, shape = "circle", children, ...rest }: UserProps = $props();

const initials = $derived(
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => (word[0] ?? "").toUpperCase())
    .join(""),
);
</script>

<!-- A person on one line: the seal before the words, the name and its
quiet echo beneath. The mark is the Avatar itself — one component
renders it here, so every size and shape the Avatar knows the user
inherits; this row only lays the words out beside it. -->
<div {...rest} data-scope="user" data-part="root">
  <ArkAvatar.Root data-size={size} data-shape={shape}>
    {#if src}<ArkAvatar.Image src={src} />{/if}
    <ArkAvatar.Fallback>{initials}</ArkAvatar.Fallback>
  </ArkAvatar.Root>
  <div data-scope="user" data-part="meta">
    <span data-scope="user" data-part="name">{name}</span>
    {#if description}<span data-scope="user" data-part="description">{description}</span>{/if}
    {@render children?.()}
  </div>
</div>