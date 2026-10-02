/** Ark's JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The API is
 * Ark's own — Root, Tree, plus createJsonTreeCollection. */
import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";
import { injectComponentStyle } from "@bysages/core";

import JsonTreeViewTree from "./JsonTreeViewTree.svelte";

/* Ark's namespace is frozen — spread copies the members so Tree can be
 * the chevron-dressed auto-render while the rest stay Ark's own parts. */
export const JsonTreeView: Omit<typeof ArkJsonTreeView, "Tree"> & {
  Tree: typeof JsonTreeViewTree;
} = {
  ...ArkJsonTreeView,
  Tree: JsonTreeViewTree,
};

injectComponentStyle("json-tree-view");
