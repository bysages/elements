<script lang="ts">
  import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";
  import type { JsonTreeViewTreeProps } from "@ark-ui/svelte/json-tree-view";
  import { chevron_right } from "@bysages/icons";

  let { arrow, indentGuide, renderValue, ...rest }: JsonTreeViewTreeProps = $props();
</script>

{#snippet defaultArrow()}
  <svg viewBox="0 0 {chevron_right.width} {chevron_right.height}" aria-hidden="true">
    {@html chevron_right.body}
  </svg>
{/snippet}

<!-- The auto-rendered tree hands every branch its chevron through the
`arrow` snippet — the house glyph unless the consumer draws their own. -->
{#if arrow}
  <ArkJsonTreeView.Tree {...rest} {arrow} {indentGuide} {renderValue} />
{:else}
  <ArkJsonTreeView.Tree {...rest} {indentGuide} {renderValue} arrow={defaultArrow} />
{/if}
