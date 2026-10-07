import { useFilter } from "@ark-ui/vue/locale";
import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { TreeView as ArkTreeView, createTreeCollection } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
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
const TreeSelectFacade = defineComponent({
  name: "TreeSelect",
  /* The root is a popover fragment (trigger + portal), so the caller's
     class rides on the control itself. */
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: undefined },
    data: { type: Array as PropType<TreeSelectNode[]>, required: true },
    placeholder: { type: String, default: "Select…" },
    filterable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    /** One rung of the ladder: the trigger height and the vessel's
     * row register follow it together. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("tree-select");
    injectComponentStyle("tree-view");
    const messages = useComponentMessages();
    const hostId = useElementId("tree-select", ctx.attrs);

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
        withPresenceRoot(ArkPopover.Root as never),
        withPresenceEnter({
          id: `${hostId.value}:popover`,
          open: open.value,
          "onUpdate:open": (value: boolean) => {
            open.value = value;
            if (!value) query.value = "";
          },
          positioning: { sameWidth: true, placement: "bottom-start" },
        }),
        () => [
          h(ArkPopover.Trigger, { asChild: true, disabled: props.disabled }, () =>
            h(
              "button",
              {
                ...ctx.attrs,
                type: "button",
                "data-scope": "tree-select",
                "data-part": "control",
                "data-size": props.size,
                "data-open": open.value ? "" : undefined,
                "data-placeholder": label.value == null ? "" : undefined,
                "data-invalid": props.invalid ? "" : undefined,
                disabled: props.disabled,
              },
              [label.value ?? props.placeholder, chevronDown()],
            ),
          ),
          h(ArkPopover.Positioner, () => [
            h(
              ArkPopover.Content,
              { "data-scope": "tree-select", "data-part": "content", "data-size": props.size },
              () => [
                ...(props.filterable
                  ? [
                      h("div", { "data-scope": "tree-select", "data-part": "search" }, [
                        h(Input, {
                          size: "sm",
                          modelValue: query.value,
                          "onUpdate:modelValue": (value: string) => (query.value = value),
                          placeholder: messages.value.command.filter,
                          "aria-label": messages.value.select.filter,
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
                            id: `${hostId.value}:tree`,
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
              ],
            ),
          ]),
        ],
      );
  },
});

// The tree rows keep the TreeView family's stylesheet — the vessel and
// positioner ride the tree-select scope above.

export const TreeSelect = defineFamily(TreeSelectFacade, Popover) as typeof TreeSelectFacade &
  typeof Popover;
