<script lang="ts">
  import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";
  import type { JsonTreeViewTreeProps } from "@ark-ui/svelte/json-tree-view";

  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { arrow, indentGuide, renderValue, ...rest }: JsonTreeViewTreeProps = $props();
</script>

{#snippet defaultArrow()}
  <InternalIcon name="chevron-right" />
{/snippet}

<!-- The auto-rendered tree hands every branch its chevron through the
`arrow` snippet — the house icon unless the consumer draws their own. -->
{#if arrow}
  <ArkJsonTreeView.Tree {...rest} {arrow} {indentGuide} {renderValue} />
{:else}
  <ArkJsonTreeView.Tree {...rest} {indentGuide} {renderValue} arrow={defaultArrow} />
{/if}
