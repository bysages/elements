import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/react/json-tree-view";
import { injectComponentStyle } from "@bysages/core";
import { chevron_right } from "@bysages/icons";
import type { ComponentProps } from "react";

import { glyphNode } from "../../internal/glyph";

/** The auto-rendered tree hands every branch its chevron from the
 * `arrow` element — filled with the house glyph unless the consumer
 * draws their own, so a JSON tree never opens as a bare indent. */
function JsonTreeViewTree(props: ComponentProps<typeof ArkJsonTreeView.Tree>) {
  const { arrow = glyphNode(chevron_right), ...rest } = props;
  return <ArkJsonTreeView.Tree {...rest} arrow={arrow} />;
}

/** JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The parts —
 * Root, Tree, plus createJsonTreeCollection. */
export const JsonTreeView: typeof ArkJsonTreeView = Object.assign({}, ArkJsonTreeView, {
  Tree: JsonTreeViewTree as never,
});

injectComponentStyle("json-tree-view");
