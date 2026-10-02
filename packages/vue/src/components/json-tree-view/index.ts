import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/vue/json-tree-view";
import { injectComponentStyle } from "@bysages/core";
import { chevron_right } from "@bysages/icons";
import { defineComponent, h } from "vue";

import { glyphNode } from "../../internal/glyph";

/** JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The parts —
 * Root, Tree, plus createJsonTreeCollection. */

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
        arrow: () => slots.arrow?.() ?? [glyphNode(chevron_right)],
      });
  },
});

export const JsonTreeView: typeof ArkJsonTreeView = Object.assign({}, ArkJsonTreeView, {
  Tree: JsonTreeViewTree as never,
});

injectComponentStyle("json-tree-view");
