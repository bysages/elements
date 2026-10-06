<script lang="ts">
import { Swap as ArkSwap } from "@ark-ui/svelte/swap";

import InternalIcon from "../../internal/InternalIcon.svelte";
import SwapRoot from "./SwapRoot.svelte";

let {
  swap = false,
  on,
  off,
  children,
  ...rest
}: {
  swap?: boolean;
  on?: import("svelte").Snippet;
  off?: import("svelte").Snippet;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/swap").SwapRootProps = $props();
</script>

<SwapRoot {swap} {...rest}>
  <ArkSwap.Indicator type="on">
    {#if on}{@render on()}{:else}<InternalIcon name="check" />{/if}
  </ArkSwap.Indicator>
  <ArkSwap.Indicator type="off">
    {#if off}{@render off()}{:else}<InternalIcon name="x" />{/if}
  </ArkSwap.Indicator>
  {@render children?.()}
</SwapRoot>
