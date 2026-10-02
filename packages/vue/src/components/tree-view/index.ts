import { TreeView as ArkTreeView } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { chevron_right } from "@bysages/icons";
import { defineComponent, h, type PropType } from "vue";

import { glyphNode } from "../../internal/glyph";

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
    injectComponentStyle("tree-view");

    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the select preset for the same turn.
    return () => h(ArkTreeView.Root as never, { ...attrs, "data-size": props.size }, slots);
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
      h(ArkTreeView.BranchIndicator, attrs, () => slots.default?.() ?? [glyphNode(chevron_right)]);
  },
});

/* Ark's namespace is frozen — spread copies the members as data properties
 * so Root can be the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: Omit<typeof ArkTreeView, "Root" | "NodeCheckbox" | "BranchIndicator"> & {
  Root: typeof TreeViewRoot;
  NodeCheckbox: typeof TreeViewNodeCheckbox;
  BranchIndicator: typeof TreeViewBranchIndicator;
} = {
  ...ArkTreeView,
  Root: TreeViewRoot,
  NodeCheckbox: TreeViewNodeCheckbox,
  BranchIndicator: TreeViewBranchIndicator,
};
