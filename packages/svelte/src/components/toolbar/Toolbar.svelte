<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("toolbar");

import type { ToolbarProps } from "./props";

let { label, start, end, children, ...rest }: ToolbarProps = $props();
</script>

<!-- A workbench rail: the start tools at the leading edge, the end
tools at the trailing, the rail itself carrying the toolbar role. -->
<div {...rest} role="toolbar" aria-label={label} data-scope="toolbar" data-part="root">
  <div data-scope="toolbar" data-part="group" data-edge="start">
    {#if start}
      {@render start()}
    {:else}
      {@render children?.()}
    {/if}
  </div>
  {#if end}
    <div data-scope="toolbar" data-part="group" data-edge="end">
      {@render end()}
    </div>
  {/if}
</div>
