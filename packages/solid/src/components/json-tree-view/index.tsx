import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/solid/json-tree-view";
import type { JsonTreeViewTreeProps } from "@ark-ui/solid/json-tree-view";
import { injectComponentStyle } from "@bysages/core";
import { chevron_right } from "@bysages/icons";

/** Ark's JsonTreeView, dressed in the paper-and-ink system: the tree-view
 * recipes re-scoped, with value nodes reading as tabular data. The API is
 * Ark's own — Root, Tree, plus createJsonTreeCollection. */

/* The auto-rendered tree hands every branch its chevron through the
 * `arrow` element — the house glyph unless the consumer draws their own. */
function JsonTreeViewTree(props: JsonTreeViewTreeProps) {
  return (
    <ArkJsonTreeView.Tree
      {...props}
      arrow={
        props.arrow ?? (
          <svg
            viewBox={`0 0 ${chevron_right.width} ${chevron_right.height}`}
            aria-hidden="true"
            innerHTML={chevron_right.body}
          />
        )
      }
    />
  );
}

export const JsonTreeView: Omit<typeof ArkJsonTreeView, "Tree"> & {
  Tree: typeof JsonTreeViewTree;
} = {
  ...ArkJsonTreeView,
  Tree: JsonTreeViewTree,
};

injectComponentStyle("json-tree-view");
