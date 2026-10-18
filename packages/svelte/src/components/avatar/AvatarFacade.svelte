<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  injectComponentStyle("avatar");

  import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
  import { useElementId } from "../../internal/id";
  import type { AvatarFacadeProps } from "./props";

  let { name, src, size = "md", shape = "circle", children, ...rest }: AvatarFacadeProps = $props();

  const generatedId = $props.id();
  const id = $derived(useElementId("avatar", generatedId, rest.id));
  const initials = $derived(
    (name ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join(""),
  );
</script>

<!-- The common seal: an image when one is given, initials beneath it
until it loads; custom anatomy can still ride the Root. -->
<ArkAvatar.Root {...rest} {id} data-size={size} data-shape={shape}>
  {#if children}
    {@render children()}
  {:else}
    {#if src}
      <ArkAvatar.Image {src} alt={name ?? undefined} />
    {/if}
    {#if name}
      <ArkAvatar.Fallback>{initials}</ArkAvatar.Fallback>
    {/if}
  {/if}
</ArkAvatar.Root>
