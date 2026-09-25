import { useFilter } from "@ark-ui/solid/locale";
import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/solid/tree-view";
import type { TreeViewSelectionChangeDetails } from "@ark-ui/solid/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { Input } from "../input";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

function chevron() {
  return (
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
  );
}

export interface TreeSelectProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  filterable?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

/**
 * A tree behind a field: the control reads like an input, the vessel
 * below walks the hierarchy, and one leaf click closes the deal. Single
 * selection — the chosen label rides on the control, its value rides in
 * `value`. `filterable` puts a filter line at the top of the vessel;
 * matches keep their ancestors and the branches fan open.
 */
export function TreeSelect(props: TreeSelectProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "placeholder",
    "filterable",
    "disabled",
    "onValueChange",
  ]);
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const filterFns = useFilter({ sensitivity: "base" });

  const collection = createMemo(() =>
    createTreeCollection<TreeSelectNode>({
      nodeToValue: (node) => node.value,
      nodeToString: (node) => node.label,
      rootNode: { value: "ROOT", label: "", children: own.data },
    }),
  );

  const filtering = () => own.filterable && query().trim().length > 0;

  /** The collection pruned to the matches — each hit keeping its
   * ancestors, so a deep match still reads inside its hierarchy. */
  const visibleCollection = createMemo(() =>
    filtering()
      ? collection().filter((node) => filterFns().contains(node.label, query().trim()))
      : collection(),
  );

  const firstLevel = () => (own.data ?? []).map((node) => node.value);

  // While the filter runs, every branch on a hit's path stands open —
  // a deep match must not hide behind a collapsed fold. The expanded
  // prop is only supplied while filtering, so the rest state keeps the
  // machine's own remember-where-you-folded behavior.
  const expandedWhileFiltering = () => {
    if (!filtering()) return undefined;
    const values: string[] = [];
    const walk = (nodes: TreeSelectNode[]) => {
      for (const node of nodes) {
        if (node.children?.length) {
          values.push(node.value);
          walk(node.children);
        }
      }
    };
    walk(visibleCollection().rootNode.children ?? []);
    return values;
  };

  const label = () => {
    let found: string | undefined;
    const walk = (nodes: TreeSelectNode[] | undefined) => {
      for (const node of nodes ?? []) {
        if (node.value === own.value) found = node.label;
        walk(node.children);
      }
    };
    walk(own.data);
    return found;
  };

  function pick(details: TreeViewSelectionChangeDetails) {
    const [value] = details.selectedValue;
    if (value == null) return;
    own.onValueChange?.(value);
    setOpen(false);
  }

  function Row(rowProps: { node: TreeSelectNode; indexPath: number[] }) {
    return (
      <ArkTreeView.NodeProvider node={rowProps.node} indexPath={rowProps.indexPath}>
        <Show
          when={rowProps.node.children}
          fallback={
            <ArkTreeView.Item
              asChild={(propsFn) => (
                <span {...propsFn()} style={{ display: "flex", "inline-size": "100%" }}>
                  <ArkTreeView.ItemText>{rowProps.node.label}</ArkTreeView.ItemText>
                </span>
              )}
            />
          }
        >
          <ArkTreeView.Branch>
            <ArkTreeView.BranchControl>
              <ArkTreeView.BranchIndicator>{chevron()}</ArkTreeView.BranchIndicator>
              <ArkTreeView.BranchText>{rowProps.node.label}</ArkTreeView.BranchText>
            </ArkTreeView.BranchControl>
            <ArkTreeView.BranchContent>
              <ArkTreeView.BranchIndentGuide />
              <For each={rowProps.node.children}>
                {(child, index) => (
                  <Row node={child} indexPath={[...rowProps.indexPath, index()]} />
                )}
              </For>
            </ArkTreeView.BranchContent>
          </ArkTreeView.Branch>
        </Show>
      </ArkTreeView.NodeProvider>
    );
  }

  return (
    <ArkPopover.Root
      {...rest}
      open={open()}
      onOpenChange={(details) => {
        setOpen(details.open);
        if (!details.open) setQuery("");
      }}
      positioning={{ sameWidth: true, placement: "bottom-start" }}
    >
      <ArkPopover.Trigger
        asChild={(propsFn) => (
          <button
            {...propsFn()}
            type="button"
            data-scope="tree-select"
            data-part="control"
            data-open={open() ? "" : undefined}
            data-placeholder={label() == null ? "" : undefined}
            disabled={own.disabled}
          >
            {label() ?? own.placeholder ?? "Select…"}
            <span data-part="chevron" aria-hidden="true">
              {chevron()}
            </span>
          </button>
        )}
      />
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content data-scope="tree-select" data-part="content">
            <Show when={own.filterable}>
              <div data-scope="tree-select" data-part="search">
                <Input
                  size="sm"
                  value={query()}
                  onValueChange={setQuery}
                  placeholder="Filter…"
                  aria-label="Filter options"
                />
              </div>
            </Show>
            <div data-scope="tree-select" data-part="body">
              <Show
                when={(visibleCollection().rootNode.children ?? []).length > 0}
                fallback={
                  <p data-scope="tree-select" data-part="empty">
                    Nothing matches
                  </p>
                }
              >
                <ArkTreeView.Root
                  collection={visibleCollection()}
                  selectionMode="single"
                  selectedValue={own.value ? [own.value] : []}
                  {...(filtering()
                    ? { expandedValue: expandedWhileFiltering() }
                    : { defaultExpandedValue: firstLevel() })}
                  onSelectionChange={pick}
                >
                  <ArkTreeView.Tree>
                    <For each={visibleCollection().rootNode.children}>
                      {(node, index) => <Row node={node} indexPath={[index()]} />}
                    </For>
                  </ArkTreeView.Tree>
                </ArkTreeView.Root>
              </Show>
            </div>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

// The tree rows keep the TreeView family's stylesheet — the vessel and
// positioner ride the tree-select scope above.
injectComponentStyle("tree-select");
injectComponentStyle("tree-view");
