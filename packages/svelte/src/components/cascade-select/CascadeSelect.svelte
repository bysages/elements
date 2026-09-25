<script lang="ts">
import { useEnvironmentContext } from "@ark-ui/svelte/environment";
import { useFilter, useLocaleContext } from "@ark-ui/svelte/locale";
import Portal from "@ark-ui/svelte/portal";
import * as cascade from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/svelte";

import Input from "../input/Input.svelte";
import type { CascadeSelectNode, CascadeSelectProps } from "./props";

let {
  value = $bindable(),
  data,
  placeholder = "Select…",
  highlightTrigger,
  filterable = false,
  multiple = false,
  disabled = false,
  ...rest
}: CascadeSelectProps = $props();

const id = $props.id();
const locale = useLocaleContext();
const env = useEnvironmentContext();

const collection = $derived(
  cascade.collection<CascadeSelectNode>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    nodeToChildren: (node) => node.children ?? [],
    rootNode: { value: "ROOT", label: "", children: data },
  }),
);

const service = useMachine(cascade.machine, () => ({
  id,
  collection: collection,
  dir: locale().dir,
  getRootNode: env().getRootNode,
  disabled: disabled || undefined,
  multiple: multiple || undefined,
  ...(value !== undefined ? { value } : null),
  ...(highlightTrigger != null ? { highlightTrigger } : null),
  onValueChange(details) {
    value = details.value;
  },
}));

const api = $derived(cascade.connect(service, normalizeProps));

let query = $state("");
const filterFns = useFilter({ sensitivity: "base" });
const filtering = $derived(filterable && query.trim().length > 0);

/** The corridor's answer to a query: every leaf whose route matches —
 * the query may land on any hop, and the whole route still shows. */
const matchPaths = $derived.by(() => {
  if (!filtering) return [];
  const q = query.trim();
  const hits: { path: string[]; labels: string[] }[] = [];
  const walk = (
    nodes: CascadeSelectNode[] | undefined,
    path: string[],
    labels: string[],
    matched: boolean,
  ) => {
    for (const node of nodes ?? []) {
      const hit = matched || filterFns.contains(node.label, q);
      const nextPath = [...path, node.value];
      const nextLabels = [...labels, node.label];
      if (node.children?.length) {
        walk(node.children, nextPath, nextLabels, hit);
      } else if (hit) {
        hits.push({ path: nextPath, labels: nextLabels });
      }
    }
  };
  walk(data, [], [], false);
  return hits;
});

const isSelected = (path: string[]) =>
  (value ?? []).some((p) => p.join("/") === path.join("/"));

function pickMatch(path: string[]) {
  if (multiple) {
    const current = value ?? [];
    const key = path.join("/");
    const next = current.some((p) => p.join("/") === key)
      ? current.filter((p) => p.join("/") !== key)
      : [...current, path];
    api.setValue(next);
  } else {
    api.selectValue(path);
    api.setOpen(false);
  }
}

/** The machine's `valueAsString` only updates through its select event,
 * so an externally-set `value` would render the placeholder forever —
 * resolve the labels from the data instead. */
function labelsFor(path: string[]): string[] | null {
  const out: string[] = [];
  let nodes: CascadeSelectNode[] | undefined = data;
  for (const segment of path) {
    const node: CascadeSelectNode | undefined = nodes?.find((n) => n.value === segment);
    if (!node) return null;
    out.push(node.label);
    nodes = node.children;
  }
  return out;
}

const display = $derived.by(() => {
  const parts = (value ?? [])
    .map((path) => labelsFor(path)?.join(" / "))
    .filter((label): label is string => label != null);
  return parts.length > 0 ? parts.join(", ") : null;
});
</script>

{#snippet column(node: CascadeSelectNode, indexPath: number[], valuePath: string[])}
  {@const nodeState = api.getItemState({ item: node, indexPath, value: valuePath })}
  {@const children = collection.getNodeChildren(node)}
  <ul {...api.getListProps({ item: node, indexPath, value: valuePath })}>
    {#each children as item, index (collection.getNodeValue(item))}
      {@const itemValue = collection.getNodeValue(item)}
      {@const itemProps = { item, indexPath: [...indexPath, index], value: [...valuePath, itemValue] }}
      {@const itemState = api.getItemState(itemProps)}
      <li {...api.getItemProps(itemProps)}>
        <span {...api.getItemTextProps(itemProps)}>{item.label}</span>
        {#if itemState.hasChildren}
          <span data-part="branch-indicator" aria-hidden="true">
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
        {/if}
        <span {...api.getItemIndicatorProps(itemProps)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12.5 5 5L19 7" />
          </svg>
        </span>
      </li>
    {/each}
  </ul>
  {#if nodeState.highlightedChild != null && collection.isBranchNode(nodeState.highlightedChild)}
    {@render column(
      nodeState.highlightedChild,
      [...indexPath, nodeState.highlightedIndex],
      [...valuePath, collection.getNodeValue(nodeState.highlightedChild)],
    )}
  {/if}
{/snippet}

<!-- A corridor of linked columns: pick a branch and the next column
dissolves open beside it, until a leaf click settles the whole path.
`value` is the selected path (or paths, when `multiple`) — the joined
labels ride the trigger. `filterable` swaps the corridor for a flat
list of matching paths while a query runs — each hit still reads as
its full route. -->
<div {...rest} {...api.getRootProps()}>
  <div {...api.getControlProps()}>
    <button
      {...api.getTriggerProps()}
      onclick={(event) => {
        api.getTriggerProps().onclick?.(event);
        query = "";
      }}
      disabled={disabled || undefined}
    >
      <span {...api.getValueTextProps()}>{display ?? placeholder}</span>
      <span {...api.getIndicatorProps()}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>
  </div>
  <Portal>
    <div {...api.getPositionerProps()}>
      <div {...api.getContentProps()}>
        {#if filterable}
          <div data-part="search">
            <Input size="sm" bind:value={query} placeholder="Filter…" aria-label="Filter options" />
          </div>
        {/if}
        {#if filtering}
          {#if matchPaths.length === 0}
            <p data-part="empty">Nothing matches</p>
          {:else}
            {#each matchPaths as hit (hit.path.join("/"))}
              <button
                type="button"
                data-part="match"
                data-selected={isSelected(hit.path) || undefined}
                onclick={() => pickMatch(hit.path)}
              >
                {hit.labels.join(" / ")}
              </button>
            {/each}
          {/if}
        {:else}
          {@render column(collection.rootNode, [], [])}
        {/if}
      </div>
    </div>
  </Portal>
</div>
