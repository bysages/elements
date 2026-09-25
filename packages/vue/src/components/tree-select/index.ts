import { useFilter } from "@ark-ui/vue/locale";
import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType } from "vue";
import { Teleport } from "vue";

import { Input } from "../input";

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
 * `modelValue`. `filterable` puts a filter line at the top of the
 * vessel; matches keep their ancestors and the branches fan open.
 */
export const TreeSelect = defineComponent({
  name: "TreeSelect",
  props: {
    modelValue: { type: String, default: undefined },
    data: { type: Array as PropType<TreeSelectNode[]>, required: true },
    placeholder: { type: String, default: "Select…" },
    filterable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const open = ref(false);
    const query = ref("");
    const filterFns = useFilter({ sensitivity: "base" });

    const collection = computed(() =>
      createTreeCollection<TreeSelectNode>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        rootNode: { value: "ROOT", label: "", children: props.data },
      }),
    );

    const filtering = computed(() => props.filterable && query.value.trim().length > 0);

    /** The collection pruned to the matches — each hit keeping its
     * ancestors, so a deep match still reads inside its hierarchy. */
    const visibleCollection = computed(() =>
      filtering.value
        ? collection.value.filter((node) =>
            filterFns.value.contains(node.label, query.value.trim()),
          )
        : collection.value,
    );

    const firstLevel = computed(() => (props.data ?? []).map((node) => node.value));

    // While the filter runs, every branch on a hit's path stands open —
    // a deep match must not hide behind a collapsed fold. The expanded
    // prop is only supplied while filtering, so the rest state keeps the
    // machine's own remember-where-you-folded behavior.
    const expandedWhileFiltering = computed(() => {
      if (!filtering.value) return undefined;
      const values: string[] = [];
      const walk = (nodes: TreeSelectNode[]) => {
        for (const node of nodes) {
          if (node.children?.length) {
            values.push(node.value);
            walk(node.children);
          }
        }
      };
      walk(visibleCollection.value.rootNode.children ?? []);
      return values;
    });

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
          "onUpdate:open": (value: boolean) => {
            open.value = value;
            if (!value) query.value = "";
          },
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
                ...(props.filterable
                  ? [
                      h("div", { "data-scope": "tree-select", "data-part": "search" }, [
                        h(Input, {
                          size: "sm",
                          modelValue: query.value,
                          "onUpdate:modelValue": (value: string) => (query.value = value),
                          placeholder: "Filter…",
                          "aria-label": "Filter options",
                        }),
                      ]),
                    ]
                  : []),
                h("div", { "data-scope": "tree-select", "data-part": "body" }, [
                  (visibleCollection.value.rootNode.children ?? []).length === 0
                    ? [
                        h(
                          "p",
                          { "data-scope": "tree-select", "data-part": "empty" },
                          "Nothing matches",
                        ),
                      ]
                    : [
                        h(
                          ArkTreeView.Root,
                          {
                            collection: visibleCollection.value,
                            selectionMode: "single",
                            selectedValue: props.modelValue ? [props.modelValue] : [],
                            ...(filtering.value
                              ? { expandedValue: expandedWhileFiltering.value }
                              : { defaultExpandedValue: firstLevel.value }),
                            onSelectionChange: pick,
                          } as never,
                          () => [
                            h(ArkTreeView.Tree, () =>
                              visibleCollection.value.rootNode.children?.map((node, index) =>
                                h(Row, { key: node.value, node, indexPath: [index] }),
                              ),
                            ),
                          ],
                        ),
                      ],
                ]),
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
