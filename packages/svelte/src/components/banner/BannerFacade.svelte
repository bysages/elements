<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  injectComponentStyle("banner");

  import BannerActions from "./BannerActions.svelte";
  import BannerBody from "./BannerBody.svelte";
  import BannerClose from "./BannerClose.svelte";
  import BannerDescription from "./BannerDescription.svelte";
  import BannerRoot from "./Banner.svelte";
  import BannerTitle from "./BannerTitle.svelte";
  import type { BannerFacadeProps } from "./props";

  let {
    status = "ink",
    title,
    message,
    dismissible = false,
    children,
    actions,
    ...rest
  }: BannerFacadeProps = $props();

  let dismissed = $state(false);
</script>

{#if !dismissed}
  <BannerRoot {status} {...rest}>
    <BannerBody>
      {#if title}
        <BannerTitle>{title}</BannerTitle>
      {/if}
      {#if message}
        <BannerDescription>{message}</BannerDescription>
      {/if}
      {@render children?.()}
      {#if actions}
        <BannerActions>{@render actions()}</BannerActions>
      {/if}
    </BannerBody>
    {#if dismissible}
      <BannerClose onclick={() => (dismissed = true)} />
    {/if}
  </BannerRoot>
{/if}
