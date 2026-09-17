import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/solid/tree-view";
import type { TreeViewSelectionChangeDetails } from "@ark-ui/solid/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

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
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

/**
 * A tree behind a field: the control reads like an input, the vessel
 * below walks the hierarchy, and one leaf click closes the deal. Single
 * selection — the chosen label rides on the control, its value rides in
 * `value`.
 */
export function TreeSelect(props: TreeSelectProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "placeholder",
    "disabled",
    "onValueChange",
  ]);
  const [open, setOpen] = createSignal(false);

  const collection = createMemo(() =>
    createTreeCollection<TreeSelectNode>({
      nodeToValue: (node) => node.value,
      nodeToString: (node) => node.label,
      rootNode: { value: "ROOT", label: "", children: own.data },
    }),
  );

  const firstLevel = () => (own.data ?? []).map((node) => node.value);

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
      onOpenChange={(details) => setOpen(details.open)}
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
            <ArkTreeView.Root
              collection={collection()}
              selectionMode="single"
              selectedValue={own.value ? [own.value] : []}
              defaultExpandedValue={firstLevel()}
              onSelectionChange={pick}
            >
              <ArkTreeView.Tree>
                <For each={collection().rootNode.children}>
                  {(node, index) => <Row node={node} indexPath={[index()]} />}
                </For>
              </ArkTreeView.Tree>
            </ArkTreeView.Root>
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
