import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/vue/json-tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The parts —
 * Root, Tree, plus createJsonTreeCollection. */

const JsonTreeViewRoot = defineComponent({
  name: "SJsonTreeViewRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("json-tree-view", attrs);

    return () => h(ArkJsonTreeView.Root as never, { ...attrs, id: id.value }, slots);
  },
});

/** The auto-rendered tree hands every branch its chevron from the
 * `arrow` slot — filled with the house glyph unless the consumer draws
 * their own, so a JSON tree never opens as a bare indent. */
const JsonTreeViewTree = defineComponent({
  name: "SJsonTreeViewTree",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(ArkJsonTreeView.Tree as never, attrs, {
        ...(slots.default ? { default: () => slots.default?.() } : {}),
        ...(slots.indentGuide ? { indentGuide: () => slots.indentGuide?.() } : {}),
        ...(slots.renderValue
          ? {
              renderValue: (node: unknown) =>
                (slots.renderValue as (s: unknown) => unknown)?.(node),
            }
          : {}),
        arrow: () => slots.arrow?.() ?? [iconNode("chevron-right")],
      });
  },
});

/** The one-tag path for a read-only tree: `data` and the initial depth
 * are all a quiet ledger needs; deeper control stays on the anatomy. */
const JsonTreeViewFacade = defineComponent({
  name: "SJsonTreeView",
  props: {
    data: { type: null, required: true },
    defaultExpandedDepth: { type: Number, default: 1 },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        JsonTreeViewRoot,
        {
          ...attrs,
          data: props.data,
          defaultExpandedDepth: props.defaultExpandedDepth,
        } as never,
        () => h(JsonTreeViewTree),
      );
  },
});

type JsonTreeViewParts = Omit<typeof ArkJsonTreeView, "Root" | "Tree"> & {
  Root: typeof JsonTreeViewRoot;
  Tree: typeof JsonTreeViewTree;
};

export const JsonTreeView = defineFamily(JsonTreeViewFacade, {
  ...ArkJsonTreeView,
  Root: JsonTreeViewRoot,
  Tree: JsonTreeViewTree as never,
}) as unknown as typeof JsonTreeViewFacade & JsonTreeViewParts;

injectComponentStyle("json-tree-view");
