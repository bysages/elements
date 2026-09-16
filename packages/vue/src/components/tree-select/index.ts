import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType } from "vue";
import { Teleport } from "vue";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

function chevron() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m9 18 6-6-6-6" })],
  );
}

function chevronDown() {
  return h("span", { "data-part": "chevron", "aria-hidden": true }, chevron());
}

/**
 * A tree behind a field: the control reads like an input, the vessel
 * below walks the hierarchy, and one leaf click closes the deal. Single
 * selection — the chosen label rides on the control, its value rides in
 * `modelValue`.
 */
export const TreeSelect = defineComponent({
  name: "TreeSelect",
  props: {
    modelValue: { type: String, default: undefined },
    data: { type: Array as PropType<TreeSelectNode[]>, required: true },
    placeholder: { type: String, default: "Select…" },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const open = ref(false);

    const collection = computed(() =>
      createTreeCollection<TreeSelectNode>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        rootNode: { value: "ROOT", label: "", children: props.data },
      }),
    );

    const firstLevel = computed(() => (props.data ?? []).map((node) => node.value));

    const label = computed(() => {
      let found: string | undefined;
      const walk = (nodes: TreeSelectNode[] | undefined) => {
        for (const node of nodes ?? []) {
          if (node.value === props.modelValue) found = node.label;
          walk(node.children);
        }
      };
      walk(props.data);
      return found;
    });

    function pick(details: { selectedValue: string[] }) {
      const [value] = details.selectedValue;
      if (value == null) return;
      ctx.emit("update:modelValue", value);
      open.value = false;
    }

    const Row = defineComponent({
      name: "TreeSelectRow",
      props: {
        node: { type: Object as PropType<TreeSelectNode>, required: true },
        indexPath: { type: Array as PropType<number[]>, required: true },
      },
      setup(rowProps): () => unknown {
        return () =>
          h(ArkTreeView.NodeProvider, { node: rowProps.node, indexPath: rowProps.indexPath }, () =>
            rowProps.node.children
              ? [
                  h(ArkTreeView.Branch, () => [
                    h(ArkTreeView.BranchControl, () => [
                      h(ArkTreeView.BranchIndicator, () => chevron()),
                      h(ArkTreeView.BranchText, () => rowProps.node.label),
                    ]),
                    h(ArkTreeView.BranchContent, () => [
                      h(ArkTreeView.BranchIndentGuide),
                      ...rowProps.node.children!.map((child, index) =>
                        h(Row, {
                          key: child.value,
                          node: child,
                          indexPath: [...rowProps.indexPath, index],
                        }),
                      ),
                    ]),
                  ]),
                ]
              : [
                  h(ArkTreeView.Item, { asChild: true } as never, () =>
                    h("span", { style: { display: "flex", inlineSize: "100%" } }, [
                      h(ArkTreeView.ItemText, () => rowProps.node.label),
                    ]),
                  ),
                ],
          );
      },
    });

    return () =>
      h(
        ArkPopover.Root,
        {
          open: open.value,
          "onUpdate:open": (value: boolean) => (open.value = value),
          positioning: { sameWidth: true, placement: "bottom-start" },
        },
        () => [
          h(ArkPopover.Trigger, { asChild: true, disabled: props.disabled }, () =>
            h(
              "button",
              {
                type: "button",
                "data-scope": "tree-select",
                "data-part": "control",
                "data-open": open.value ? "" : undefined,
                "data-placeholder": label.value == null ? "" : undefined,
                disabled: props.disabled,
              },
              [label.value ?? props.placeholder, chevronDown()],
            ),
          ),
          h(Teleport, { to: "body" }, [
            h(ArkPopover.Positioner, () => [
              h(ArkPopover.Content, { "data-scope": "tree-select", "data-part": "content" }, () => [
                h(
                  ArkTreeView.Root,
                  {
                    collection: collection.value,
                    selectionMode: "single",
                    selectedValue: props.modelValue ? [props.modelValue] : [],
                    defaultExpandedValue: firstLevel.value,
                    onSelectionChange: pick,
                  } as never,
                  () => [
                    h(ArkTreeView.Tree, () =>
                      collection.value.rootNode.children?.map((node, index) =>
                        h(Row, { key: node.value, node, indexPath: [index] }),
                      ),
                    ),
                  ],
                ),
              ]),
            ]),
          ]),
        ],
      );
  },
});

// The tree rows keep the TreeView family's stylesheet — the vessel and
// positioner ride the tree-select scope above.
injectComponentStyle("tree-select");
injectComponentStyle("tree-view");
