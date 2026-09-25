<script lang="ts">
import { useFilter } from "@ark-ui/svelte/locale";
import Portal from "@ark-ui/svelte/portal";
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/svelte/tree-view";

import Input from "../input/Input.svelte";
import type { TreeSelectNode, TreeSelectProps } from "./props";

let {
  value = $bindable(),
  data,
  placeholder = "Select…",
  filterable = false,
  disabled = false,
  ...rest
}: TreeSelectProps = $props();

let open = $state(false);
let query = $state("");
const filterFns = useFilter({ sensitivity: "base" });

const collection = $derived(
  createTreeCollection<TreeSelectNode>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: { value: "ROOT", label: "", children: data },
  }),
);

const filtering = $derived(filterable && query.trim().length > 0);

/** The collection pruned to the matches — each hit keeping its
 * ancestors, so a deep match still reads inside its hierarchy. */
const visibleCollection = $derived(
  filtering
    ? collection.filter((node) => filterFns.contains(node.label, query.trim()))
    : collection,
);

const firstLevel = $derived((data ?? []).map((node) => node.value));

// While the filter runs, every branch on a hit's path stands open —
// a deep match must not hide behind a collapsed fold. The expanded
// prop is only supplied while filtering, so the rest state keeps the
// machine's own remember-where-you-folded behavior.
const expandedWhileFiltering = $derived.by(() => {
  if (!filtering) return undefined;
  const values: string[] = [];
  const walk = (nodes: TreeSelectNode[]) => {
    for (const node of nodes) {
      if (node.children?.length) {
        values.push(node.value);
        walk(node.children);
      }
    }
  };
  walk(visibleCollection.rootNode.children ?? []);
  return values;
});

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
`value`. `filterable` puts a filter line at the top of the vessel;
matches keep their ancestors and the branches fan open. -->
<ArkPopover.Root
  open={open}
  positioning={{ sameWidth: true, placement: "bottom-start" }}
  onOpenChange={(details) => {
    open = details.open;
    if (!details.open) query = "";
  }}
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
        {#if filterable}
          <div data-scope="tree-select" data-part="search">
            <Input size="sm" bind:value={query} placeholder="Filter…" aria-label="Filter options" />
          </div>
        {/if}
        <div data-scope="tree-select" data-part="body">
          {#if (visibleCollection.rootNode.children ?? []).length === 0}
            <p data-scope="tree-select" data-part="empty">Nothing matches</p>
          {:else}
            <ArkTreeView.Root
              collection={visibleCollection}
              selectionMode="single"
              selectedValue={value ? [value] : []}
              expandedValue={filtering ? expandedWhileFiltering : undefined}
              defaultExpandedValue={filtering ? undefined : firstLevel}
              onSelectionChange={pick}
            >
              <ArkTreeView.Tree>
                {#each visibleCollection.rootNode.children ?? [] as node, index (node.value)}
                  {@render row(node, [index])}
                {/each}
              </ArkTreeView.Tree>
            </ArkTreeView.Root>
          {/if}
        </div>
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</ArkPopover.Root>
