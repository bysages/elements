<script lang="ts">
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/svelte/tree-view";

import TreeViewNodes from "./TreeViewNodes.svelte";
import type { TreeViewOption } from "./props";
import TreeViewRoot from "./TreeViewRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  defaultExpandedValue,
  expandedValue = $bindable(),
  onExpandedChange,
  options,
  multiple = false,
  label,
  trailing,
  children,
  ...rest
}: {
  value?: string[];
  defaultValue?: string[];
  /** Branch values expanded on first render; top-level branches by default. */
  defaultExpandedValue?: string[];
  /** Controlled expanded branch values. */
  expandedValue?: string[];
  /** Called when controlled expansion changes. */
  onExpandedChange?: (value: string[]) => void;
  options: TreeViewOption[];
  multiple?: boolean;
  label?: string;
  trailing?: import("svelte").Snippet<[TreeViewOption]>;
  children?: import("svelte").Snippet;
} & import("./props").TreeViewRootProps = $props();

const branchValues = $derived(
  options.filter((option) => option.children?.length).map((option) => option.value),
);
const collection = $derived(createTreeCollection({
  nodeToValue: (node: TreeViewOption) => node.value,
  nodeToString: (node: TreeViewOption) => node.label,
  isNodeDisabled: (node: TreeViewOption) => !!node.disabled,
  rootNode: { value: "root", label: "", children: options },
}));
</script>

<TreeViewRoot bind:value bind:expandedValue {collection}
  defaultExpandedValue={defaultExpandedValue ?? branchValues} defaultSelectedValue={defaultValue}
  selectionMode={multiple ? "multiple" : "single"} onExpandedChange={(event: { expandedValue: string[] }) => onExpandedChange?.(event.expandedValue)} {...rest}>
  {#if label}
    <ArkTreeView.Label data-visually-hidden>{label}</ArkTreeView.Label>
  {/if}
  <ArkTreeView.Tree>
    <TreeViewNodes items={options} {trailing} />
  </ArkTreeView.Tree>
  {@render children?.()}
</TreeViewRoot>
