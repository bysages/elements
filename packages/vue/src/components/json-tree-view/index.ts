import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/vue/json-tree-view";
import { injectComponentStyle } from "@bysages/core";

/** Ark's JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The API is
 * Ark's own — Root, Tree, plus createJsonTreeCollection. */
export const JsonTreeView = ArkJsonTreeView;

injectComponentStyle("json-tree-view");
