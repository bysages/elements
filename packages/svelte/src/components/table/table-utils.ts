import type { RowData } from "@tanstack/svelte-table";

/* --- Drag-to-reorder helpers ------------------------------------------- */

export type TreeNode = RowData & { id?: unknown; subRows?: TreeNode[] };

/** The list holding `id` and the index inside it, or null when absent. */
export function findNode(rows: TreeNode[], id: string): { list: TreeNode[]; index: number } | null {
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index]!;
    if (String(row.id) === id) return { list: rows, index };
    if (row.subRows) {
      const hit = findNode(row.subRows, id);
      if (hit) return hit;
    }
  }
  return null;
}

/** True when `id` sits anywhere in the node's subtree — dropping a node
 * into its own descendants would orphan it. */
export function containsNode(node: TreeNode, id: string): boolean {
  return !!node.subRows?.some((child) => String(child.id) === id || containsNode(child, id));
}

/** Rebuild every array along the path to `id`, leaving sibling branches
 * untouched by reference (TanStack's memoization keeps their rows). */
export function removeById(rows: TreeNode[], id: string): TreeNode[] {
  const next: TreeNode[] = [];
  for (const row of rows) {
    if (String(row.id) === id) continue;
    next.push(row.subRows ? { ...row, subRows: removeById(row.subRows, id) } : row);
  }
  return next;
}

/** Rebuild the path to `id` and swap the node for `patch(node)`. */
export function replaceById(
  rows: TreeNode[],
  id: string,
  patch: (node: TreeNode) => TreeNode,
): TreeNode[] {
  return rows.map((row) => {
    if (String(row.id) === id) return patch(row);
    return row.subRows ? { ...row, subRows: replaceById(row.subRows, id, patch) } : row;
  });
}

/** Toggle one drop-indicator attribute without rewriting it every event. */
export function mark(el: HTMLElement, attr: string, on: boolean) {
  if (on) el.setAttribute(attr, "");
  else el.removeAttribute(attr);
}
