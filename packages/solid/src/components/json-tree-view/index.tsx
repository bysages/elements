import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/solid/json-tree-view";
import type { JsonTreeViewTreeProps } from "@ark-ui/solid/json-tree-view";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps } from "solid-js";
import type { ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The API is
 * Ark's own — Root, Tree, plus createJsonTreeCollection. */
function JsonTreeViewRoot(props: ComponentProps<typeof ArkJsonTreeView.Root>) {
  const id = useElementId("json-tree-view", () => props.id);

  return createComponent(
    ArkJsonTreeView.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

/* The auto-rendered tree hands every branch its chevron through the
 * `arrow` element — the house icon unless the consumer draws their own. */
function JsonTreeViewTree(props: JsonTreeViewTreeProps) {
  return <ArkJsonTreeView.Tree {...props} arrow={props.arrow ?? iconNode("chevron-right")} />;
}

export const JsonTreeView: typeof JsonTreeViewRoot &
  Omit<typeof ArkJsonTreeView, "Root"> & { Root: typeof JsonTreeViewRoot } = defineFamily(
  JsonTreeViewRoot,
  {
    ...ArkJsonTreeView,
    Root: JsonTreeViewRoot,
    Tree: JsonTreeViewTree,
  },
);

injectComponentStyle("json-tree-view");
