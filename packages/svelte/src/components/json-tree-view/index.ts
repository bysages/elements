import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";

import { defineFamily } from "../../internal/family";
import JsonTreeViewFacade from "./JsonTreeView.svelte";
import JsonTreeViewRoot from "./JsonTreeViewRoot.svelte";
import JsonTreeViewTree from "./JsonTreeViewTree.svelte";

/** JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The API is
 * Ark's own — Root, Tree, plus createJsonTreeCollection. */
export const JsonTreeView: typeof JsonTreeViewFacade &
  Omit<typeof ArkJsonTreeView, "Root" | "Tree"> & {
    Root: typeof JsonTreeViewRoot;
    Tree: typeof JsonTreeViewTree;
  } = defineFamily(JsonTreeViewFacade, {
  ...ArkJsonTreeView,
  Root: JsonTreeViewRoot,
  Tree: JsonTreeViewTree,
});
