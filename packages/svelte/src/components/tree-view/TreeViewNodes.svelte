<script lang="ts">
import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";

import InternalIcon from "../../internal/InternalIcon.svelte";
import TreeViewBranchIndicator from "./TreeViewBranchIndicator.svelte";
import TreeViewNodes from "./TreeViewNodes.svelte";
import type { TreeViewOption } from "./props";

type TreeOption = TreeViewOption;

let {
  items,
  indexPath = [],
  trailing,
}: {
  items: TreeOption[];
  indexPath?: number[];
  trailing?: import("svelte").Snippet<[TreeOption]>;
} = $props();
</script>

{#each items as node, index (node.value)}
  {@const nodePath = [...indexPath, index]}
  <ArkTreeView.NodeProvider node={node} indexPath={nodePath}>
    {#if node.children?.length}
      <ArkTreeView.Branch>
        <ArkTreeView.BranchControl>
          {#if node.icon}<InternalIcon name={node.icon} />{/if}
          <TreeViewBranchIndicator />
          <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
          {#if node.meta}
            <span data-scope="tree-view" data-part="node-meta">{node.meta}</span>
          {/if}
          {@render trailing?.(node)}
        </ArkTreeView.BranchControl>
        <ArkTreeView.BranchContent>
          <TreeViewNodes items={node.children} indexPath={nodePath} {trailing} />
        </ArkTreeView.BranchContent>
      </ArkTreeView.Branch>
    {:else}
      <ArkTreeView.Item>
        {#if node.icon}<InternalIcon name={node.icon} />{/if}
        <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
        {#if node.meta}
          <span data-scope="tree-view" data-part="node-meta">{node.meta}</span>
        {/if}
        {@render trailing?.(node)}
      </ArkTreeView.Item>
    {/if}
  </ArkTreeView.NodeProvider>
{/each}

