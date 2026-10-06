import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
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

/** The node checkbox rides inside the branch control — a focusable
 * role there would nest one interactive element in another, so the
 * state stays visual and the branch itself answers the keyboard. */
const TreeViewNodeCheckbox = defineComponent({
  name: "STreeViewNodeCheckbox",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(ArkTreeView.NodeCheckbox, { ...attrs, "aria-hidden": "true", role: "presentation" }, slots);
  },
});

/* A branch is born with its chevron — the indicator stays a consumer's
 * slot to override, never a chore to remember. */
const TreeViewBranchIndicator = defineComponent({
  name: "STreeViewBranchIndicator",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(ArkTreeView.BranchIndicator, attrs, () => slots.default?.() ?? [iconNode("chevron-right")]);
  },
});

type TreeOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeOption[];
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
    options: { type: Array as PropType<TreeOption[]>, required: true },
    multiple: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    const collection = computed(() =>
      createTreeCollection({
        nodeToValue: (node: TreeOption) => node.value,
        nodeToString: (node: TreeOption) => node.label,

        isNodeDisabled: (node: TreeOption) => !!node.disabled,
        rootNode: { value: "root", label: "", children: props.options },
      }),
    );

    const nodes = (items: TreeOption[], path: number[] = []): any[] =>
      items.map((node, index) => {
        const indexPath = [...path, index];
        const row = node.children?.length
          ? h(ArkTreeView.Branch, () => [
              h(ArkTreeView.BranchControl, () => [
                h(ArkTreeView.BranchIndicator, () => iconNode("chevron-right")),
                h(ArkTreeView.BranchText, () => node.label),
              ]),
              h(ArkTreeView.BranchContent, () => nodes(node.children!, indexPath)),
            ])
          : h(ArkTreeView.Item, () => h(ArkTreeView.ItemText, () => node.label));
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
          "aria-label": props.label,
          selectionMode: props.multiple ? "multiple" : "single",
          ...(modelValue === undefined ? {} : { selectedValue: modelValue }),
          onSelectionChange: (event: { selectedValue: string[] }) =>
            emit("update:modelValue", event.selectedValue),
        } as never,
        () => h(ArkTreeView.Tree, () => nodes(props.options)),
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
    Root: typeof TreeViewRoot;
    NodeCheckbox: typeof TreeViewNodeCheckbox;
    BranchIndicator: typeof TreeViewBranchIndicator;
  };
