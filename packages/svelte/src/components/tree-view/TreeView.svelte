<script lang="ts">
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/svelte/tree-view";

import TreeViewNodes from "./TreeViewNodes.svelte";
import TreeViewRoot from "./TreeViewRoot.svelte";

type TreeOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeOption[];
};

let {
  value = $bindable(),
  defaultValue,
  options,
  multiple = false,
  label,
  children,
  ...rest
}: {
  value?: string[];
  defaultValue?: string[];
  options: TreeOption[];
  multiple?: boolean;
  label?: string;
  children?: import("svelte").Snippet;
} & import("./props").TreeViewRootProps = $props();

const branchValues = $derived(
  options.filter((option) => option.children?.length).map((option) => option.value),
);
const collection = $derived(createTreeCollection({
  nodeToValue: (node: TreeOption) => node.value,
  nodeToString: (node: TreeOption) => node.label,
  isNodeDisabled: (node: TreeOption) => !!node.disabled,
}));
</script>

<TreeViewRoot bind:value {collection} defaultExpandedValue={branchValues} defaultSelectedValue={defaultValue} selectionMode={multiple ? "multiple" : "single"} aria-label={label} {...rest}>
  <ArkTreeView.Tree>
    <TreeViewNodes items={options} />
  </ArkTreeView.Tree>
  {@render children?.()}
</TreeViewRoot>
