import { useFilter } from "@ark-ui/solid/locale";
import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/solid/tree-view";
import type { TreeViewSelectionChangeDetails } from "@ark-ui/solid/tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { Input } from "../input";
import { Popover } from "../popover";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

function chevron() {
  return iconNode("chevron-right");
}

export interface TreeSelectProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  filterable?: boolean;
  /** One rung of the ladder: the trigger height and the vessel's
   * row register follow it together. */
  size?: "sm" | "md" | "lg";
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
function TreeSelectImpl(props: TreeSelectProps) {
  const messages = useComponentMessages();
  injectComponentStyle("tree-select");
  injectComponentStyle("tree-view");
  const id = useElementId("tree-select", () => rest.id);
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "placeholder",
    "filterable",
    "disabled",
    "size",
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
            <ArkTreeView.Item>
              <ArkTreeView.ItemText>{rowProps.node.label}</ArkTreeView.ItemText>
            </ArkTreeView.Item>
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
      id={id()}
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
            data-size={own.size ?? "md"}
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
          <ArkPopover.Content
            data-scope="tree-select"
            data-part="content"
            data-size={own.size ?? "md"}
          >
            <Show when={own.filterable}>
              <div data-scope="tree-select" data-part="search">
                <Input
                  size="sm"
                  value={query()}
                  onValueChange={setQuery}
                  placeholder={messages().select.filter}
                  aria-label={messages().select.filter}
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
                  id={`${id()}-tree`}
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

export const TreeSelect = defineFamily(TreeSelectImpl, Popover) as typeof TreeSelectImpl &
  typeof Popover;
