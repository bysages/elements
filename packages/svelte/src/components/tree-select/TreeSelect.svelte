<script lang="ts">
import Portal from "@ark-ui/svelte/portal";
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/svelte/tree-view";

import type { TreeSelectNode, TreeSelectProps } from "./props";

let {
  value = $bindable(),
  data,
  placeholder = "Select…",
  disabled = false,
  ...rest
}: TreeSelectProps = $props();

let open = $state(false);

const collection = $derived(
  createTreeCollection<TreeSelectNode>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: { value: "ROOT", label: "", children: data },
  }),
);

const firstLevel = $derived((data ?? []).map((node) => node.value));

const label = $derived.by(() => {
  let found: string | undefined;
  const walk = (nodes: TreeSelectNode[] | undefined) => {
    for (const node of nodes ?? []) {
      if (node.value === value) found = node.label;
      walk(node.children);
    }
  };
  walk(data);
  return found;
});

function pick(details: { selectedValue: string[] }) {
  const [selected] = details.selectedValue;
  if (selected == null) return;
  value = selected;
  open = false;
}
</script>

{#snippet row(node: TreeSelectNode, indexPath: number[])}
  <ArkTreeView.NodeProvider node={node} indexPath={indexPath}>
    {#if node.children}
      <ArkTreeView.Branch>
        <ArkTreeView.BranchControl>
          <ArkTreeView.BranchIndicator>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </ArkTreeView.BranchIndicator>
          <ArkTreeView.BranchText>{node.label}</ArkTreeView.BranchText>
        </ArkTreeView.BranchControl>
        <ArkTreeView.BranchContent>
          <ArkTreeView.BranchIndentGuide />
          {#each node.children as child, index (child.value)}
            {@render row(child, [...indexPath, index])}
          {/each}
        </ArkTreeView.BranchContent>
      </ArkTreeView.Branch>
    {:else}
      <ArkTreeView.Item>
        {#snippet asChild(props)}
          <span {...props()} style="display: flex; inline-size: 100%">
            <ArkTreeView.ItemText>{node.label}</ArkTreeView.ItemText>
          </span>
        {/snippet}
      </ArkTreeView.Item>
    {/if}
  </ArkTreeView.NodeProvider>
{/snippet}

<!-- A tree behind a field: the control reads like an input, the vessel
below walks the hierarchy, and one leaf click closes the deal. Single
selection — the chosen label rides on the control, its value rides in
`value`. -->
<ArkPopover.Root
  open={open}
  positioning={{ sameWidth: true, placement: "bottom-start" }}
  onOpenChange={(details) => (open = details.open)}
>
  <ArkPopover.Trigger {disabled}>
    {#snippet asChild(props)}
      <button
        {...props()}
        {...rest}
        type="button"
        data-scope="tree-select"
        data-part="control"
        data-open={open ? "" : undefined}
        data-placeholder={label == null ? "" : undefined}
        disabled={disabled}
      >
        {label ?? placeholder}
        <span data-part="chevron" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </button>
    {/snippet}
  </ArkPopover.Trigger>
  <Portal>
    <ArkPopover.Positioner>
      <ArkPopover.Content data-scope="tree-select" data-part="content">
        <ArkTreeView.Root
          collection={collection}
          selectionMode="single"
          selectedValue={value ? [value] : []}
          defaultExpandedValue={firstLevel}
          onSelectionChange={pick}
        >
          <ArkTreeView.Tree>
            {#each collection.rootNode.children ?? [] as node, index (node.value)}
              {@render row(node, [index])}
            {/each}
          </ArkTreeView.Tree>
        </ArkTreeView.Root>
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</ArkPopover.Root>
