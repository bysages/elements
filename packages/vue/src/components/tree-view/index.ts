import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  computed,
  defineComponent,
  h,
  type Component,
  type PropType,
  type SetupContext,
} from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** TreeView, dressed in the paper-and-ink system: quiet rows where
 * selection is pure light on the paper, one hairline plumb line per depth,
 * and branches that swing open on the spring. The parts —
 * Root, Label, Tree, NodeProvider, NodeContext, Branch, BranchControl,
 * BranchTrigger, BranchIndicator, BranchText, BranchContent,
 * BranchIndentGuide, Item, ItemText, ItemIndicator, NodeCheckbox,
 * NodeRenameInput, plus createTreeCollection. */

const TreeViewRoot = defineComponent({
  name: "STreeViewRoot",
  props: {
    /** One rung of the row register: the rows' breathing room follows it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("tree-view", attrs);
    injectComponentStyle("tree-view");

    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the select preset for the same turn.
    return () =>
      h(ArkTreeView.Root as never, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/* A branch is born with its chevron — the indicator stays a consumer's
 * slot to override, never a chore to remember. */
const TreeViewNodeCheckbox = defineComponent({
  name: "STreeViewNodeCheckbox",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(ArkTreeView.NodeCheckbox, { ...attrs, "aria-hidden": true }, slots);
  },
});

const TreeViewBranchIndicator = defineComponent({
  name: "STreeViewBranchIndicator",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(ArkTreeView.BranchIndicator, attrs, () => slots.default?.() ?? [iconNode("chevron-right")]);
  },
});

export type TreeViewOption = {
  label: string;
  value: string;
  disabled?: boolean;
  /** A curated core icon at the row's leading edge. */
  icon?: string;
  /** A quiet trailing label, commonly a count. */
  meta?: string;
  children?: TreeViewOption[];
};

/** The complete tree behind selected values: nested options render their own
 * branches and leaves, while async and checkbox trees remain anatomy work. */
const TreeViewFacade = defineComponent({
  name: "STreeView",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    /** Branch values expanded on first render; top-level branches by default. */
    defaultExpandedValue: { type: Array as PropType<string[]>, default: undefined },
    /** Controlled expanded branch values. */
    expandedValue: { type: Array as PropType<string[]>, default: undefined },
    /** Nested rows: `{ label, value, disabled?, icon?, meta?, children? }` —
     * `icon` rides the core whitelist, `meta` renders a quiet trailing
     * label, and `children` turns the row into a branch. */
    options: { type: Array as PropType<TreeViewOption[]>, required: true },
    multiple: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: string[]) => true,
    "update:expandedValue": (_value: string[]) => true,
  },
  setup(props, { attrs, emit, slots }: SetupContext) {
    const collection = computed(() =>
      createTreeCollection({
        nodeToValue: (node: TreeViewOption) => node.value,
        nodeToString: (node: TreeViewOption) => node.label,

        isNodeDisabled: (node: TreeViewOption) => !!node.disabled,
        rootNode: { value: "root", label: "", children: props.options },
      }),
    );

    const nodeTrailing = (node: TreeViewOption) =>
      [
        node.meta
          ? h("span", { "data-scope": "tree-view", "data-part": "node-meta" }, node.meta)
          : null,
        ...((slots.trailing?.({ node }) ?? []) as any[]),
      ].filter(Boolean);

    const nodes = (items: TreeViewOption[], path: number[] = []): any[] =>
      items.map((node, index) => {
        const indexPath = [...path, index];
        const row = node.children?.length
          ? h(ArkTreeView.Branch, () => [
              h(ArkTreeView.BranchControl, () => [
                node.icon ? iconNode(node.icon) : null,
                h(ArkTreeView.BranchIndicator, () => iconNode("chevron-right")),
                h(ArkTreeView.BranchText, () => node.label),
                ...nodeTrailing(node),
              ]),
              h(ArkTreeView.BranchContent, () => nodes(node.children!, indexPath)),
            ])
          : h(ArkTreeView.Item, () => [
              node.icon ? iconNode(node.icon) : null,
              h(ArkTreeView.ItemText, () => node.label),
              ...nodeTrailing(node),
            ]);
        return h(
          ArkTreeView.NodeProvider as never,
          { key: node.value, node, indexPath },
          () => row,
        );
      });

    return () => {
      const branchValues = props.options
        .filter((option) => option.children?.length)
        .map((option) => option.value);
      const modelValue = props.modelValue;
      return h(
        TreeViewRoot,
        {
          ...attrs,
          collection: collection.value,
          defaultExpandedValue: props.defaultExpandedValue ?? branchValues,
          ...(props.expandedValue === undefined ? {} : { expandedValue: props.expandedValue }),
          defaultSelectedValue: props.defaultValue,
          selectionMode: props.multiple ? "multiple" : "single",
          ...(modelValue === undefined ? {} : { selectedValue: modelValue }),
          onSelectionChange: (event: { selectedValue: string[] }) =>
            emit("update:modelValue", event.selectedValue),
          onExpandedChange: (event: { expandedValue: string[] }) =>
            emit("update:expandedValue", event.expandedValue),
        } as never,
        () => [
          ...(props.label
            ? [h(ArkTreeView.Label, { "data-visually-hidden": "" }, () => props.label)]
            : []),
          h(ArkTreeView.Tree, () => nodes(props.options)),
        ],
      );
    };
  },
});

export const TreeView = defineFamily(TreeViewFacade, {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
} as unknown as { Root: Component } & Record<string, Component>) as typeof TreeViewFacade &
  Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
    Root: typeof ArkTreeView.Root & typeof TreeViewRoot;
    NodeCheckbox: typeof TreeViewNodeCheckbox;
    BranchIndicator: typeof TreeViewBranchIndicator;
  };
