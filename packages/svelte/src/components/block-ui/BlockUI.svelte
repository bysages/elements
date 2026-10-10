<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("block-ui");

import Spinner from "../spinner/Spinner.svelte";
import type { BlockUIProps } from "./props";

let { blocked = false, children, ...rest }: BlockUIProps = $props();
</script>

<!-- A curtain over content that must wait: the blocked region keeps
its shape and dims under frosted paper while a quiet wheel reports
the wait. -->
<div
  {...rest}
  data-scope="block-ui"
  data-part="root"
  data-blocked={blocked ? "" : undefined}
  aria-busy={blocked || undefined}
>
  {@render children?.()}
  {#if blocked}
    <div data-scope="block-ui" data-part="mask">
      <Spinner size="lg" />
    </div>
  {/if}
</div>
