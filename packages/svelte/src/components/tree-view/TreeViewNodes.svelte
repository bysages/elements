<script lang="ts">
import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";

import TreeViewBranchIndicator from "./TreeViewBranchIndicator.svelte";
import TreeViewNodes from "./TreeViewNodes.svelte";

export type TreeOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeOption[];
};

let { items, indexPath = [] }: { items: TreeOption[]; indexPath?: number[] } = $props();
</script>

{#each items as node, index (node.value)}
  {@const nodePath = [...indexPath, index]}
  <ArkTreeView.NodeProvider node={node} indexPath={nodePath}>
    {#if node.children?.length}
      <ArkTreeView.Branch>
        <ArkTreeView.BranchControl>
          <TreeViewBranchIndicator />
          <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
        </ArkTreeView.BranchControl>
        <ArkTreeView.BranchContent>
          <TreeViewNodes items={node.children} indexPath={nodePath} />
        </ArkTreeView.BranchContent>
      </ArkTreeView.Branch>
    {:else}
      <ArkTreeView.Item>
        <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
      </ArkTreeView.Item>
    {/if}
  </ArkTreeView.NodeProvider>
{/each}

