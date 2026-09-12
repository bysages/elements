import { treeViewCss } from "./tree-view";

/** The JSON tree rides the tree-view machine and renders the identical
 * part anatomy — only the scope attribute differs — so its stylesheet is
 * the tree stylesheet under the other scope. Value nodes read as data:
 * tabular numerals, never a second color. */
export const jsonTreeViewCss =
  treeViewCss.replaceAll('data-scope="tree-view"', 'data-scope="json-tree-view"') +
  /* css */ `
[data-scope="json-tree-view"][data-part="item-text"] {
  font-variant-numeric: tabular-nums;
}
`;
