/** Wrap bare tables in a scrolling lane — the same move the ProseTable
 * component makes for the markdown pipeline, for renderers that hand
 * back an HTML string (`renderHtml`) instead of going through Nuxt
 * Content. The wrapper is a plain div: the table-as-scroll-container
 * form is what ate the mouse wheel over plain tables. Idempotent, so
 * it can run after every stream patch. */
export function wrapProseTables(root: HTMLElement): void {
  for (const table of root.querySelectorAll("table")) {
    if (table.parentElement?.hasAttribute("data-table-scroll")) continue;
    const lane = document.createElement("div");
    lane.setAttribute("data-table-scroll", "");
    table.replaceWith(lane);
    lane.append(table);
  }
  refreshTableLanes(root);
}

/** A lane only becomes a scroll container when its table actually
 * overflows; until then it stays a plain block, transparent to the
 * page's own scrolling. */
export function refreshTableLanes(root: HTMLElement): void {
  for (const lane of root.querySelectorAll("[data-table-scroll]")) {
    lane.toggleAttribute("data-scrollable", lane.scrollWidth > lane.clientWidth);
  }
}
