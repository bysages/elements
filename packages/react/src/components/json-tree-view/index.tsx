import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/react/json-tree-view";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** The auto-rendered tree hands every branch its chevron from the
 * `arrow` element — filled with the house icon unless the consumer
 * draws their own, so a JSON tree never opens as a bare indent. */
function JsonTreeViewTree(props: ComponentProps<typeof ArkJsonTreeView.Tree>) {
  const { arrow = iconNode("chevron-right"), ...rest } = props;
  return <ArkJsonTreeView.Tree {...rest} arrow={arrow} />;
}

/** JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The parts —
 * Root, Tree, plus createJsonTreeCollection. */
function JsonTreeViewRoot(props: ComponentProps<typeof ArkJsonTreeView.Root>) {
  const id = useElementId("json-tree-view", props);

  return <ArkJsonTreeView.Root {...props} id={id} />;
}

/** The one-tag path for a read-only tree; custom node rendering stays on
 * the anatomy. */
function JsonTreeViewFacade({
  data,
  defaultExpandedDepth = 1,
  ...rest
}: {
  data: unknown;
  defaultExpandedDepth?: number;
} & ComponentProps<typeof JsonTreeViewRoot>) {
  return (
    <JsonTreeViewRoot {...rest} data={data} defaultExpandedDepth={defaultExpandedDepth}>
      <JsonTreeViewTree />
    </JsonTreeViewRoot>
  );
}

export const JsonTreeView = Object.assign(JsonTreeViewFacade, {
  ...ArkJsonTreeView,
  Root: JsonTreeViewRoot,
  Tree: JsonTreeViewTree,
});

injectComponentStyle("json-tree-view");
