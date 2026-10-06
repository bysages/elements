<script lang="ts">
  import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchIndicatorProps } from "@ark-ui/svelte/tree-view";

  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { children, ...rest }: TreeViewBranchIndicatorProps = $props();
</script>

<!-- A branch is born with its chevron — the indicator stays a consumer's
snippet to override, never a chore to remember. -->
<ArkTreeView.BranchIndicator {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <InternalIcon name="chevron-right" />
  {/if}
</ArkTreeView.BranchIndicator>
