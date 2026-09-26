import { TreeView as ArkTreeView } from "@ark-ui/vue/tree-view";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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
    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the select preset for the same turn.
    return () => h(ArkTreeView.Root as never, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data properties
 * so Root can be the sized wrapper while the rest stay Ark's own parts. */
export const TreeView: Omit<typeof ArkTreeView, "Root"> & { Root: typeof TreeViewRoot } = {
  ...ArkTreeView,
  Root: TreeViewRoot,
};

injectComponentStyle("tree-view");
