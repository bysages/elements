<script lang="ts">
  import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchIndicatorProps } from "@ark-ui/svelte/tree-view";
  import { chevron_right } from "@bysages/icons";

  let { children, ...rest }: TreeViewBranchIndicatorProps = $props();
</script>

<!-- A branch is born with its chevron — the indicator stays a consumer's
snippet to override, never a chore to remember. -->
<ArkTreeView.BranchIndicator {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <svg viewBox="0 0 {chevron_right.width} {chevron_right.height}" aria-hidden="true">
      {@html chevron_right.body}
    </svg>
  {/if}
</ArkTreeView.BranchIndicator>
