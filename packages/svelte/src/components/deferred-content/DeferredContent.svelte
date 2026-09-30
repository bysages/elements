<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("deferred-content");

import { onMount } from "svelte";
import type { DeferredContentProps } from "./props";

let { threshold = 0.2, placeholder, children, ...rest }: DeferredContentProps = $props();

let host: HTMLDivElement | undefined = $state();
let active = $state(false);

onMount(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        active = true;
        observer.disconnect();
      }
    },
    { threshold },
  );
  if (host) observer.observe(host);
  return () => observer.disconnect();
});
</script>

<!-- Content that waits to be worth rendering: the slot stays off the
tree until the placeholder scrolls near the viewport, then mounts once
and stays. -->
<div bind:this={host} {...rest} data-scope="deferred-content" data-part="root">
  {#if active}
    {@render children?.()}
  {:else}
    {@render placeholder?.()}
  {/if}
</div>