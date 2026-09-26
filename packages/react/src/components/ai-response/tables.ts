/** Wide tables ride a scrolling lane instead of bursting the column.
 * The lane is a plain div: the table-as-scroll-container form is what
 * ate the mouse wheel over plain tables. Idempotent, so it can run
 * after every stream patch. */
const lanes = new Set<HTMLElement>();
let laneObserver: ResizeObserver | undefined;

/** A lane's verdict must follow its box — the panel around it can
 * resize at any moment, so each lane stays observed and re-decided
 * whenever its width changes. */
function watchLane(lane: HTMLElement): void {
  if (lanes.has(lane)) return;
  lanes.add(lane);
  laneObserver ??= new ResizeObserver(() => {
    for (const lane of lanes) {
      if (!lane.isConnected) {
        laneObserver!.unobserve(lane);
        lanes.delete(lane);
        continue;
      }
      lane.toggleAttribute("data-scrollable", lane.scrollWidth > lane.clientWidth);
    }
  });
  laneObserver.observe(lane);
}

export function wrapResponseTables(root: HTMLElement): void {
  for (const table of root.querySelectorAll("table")) {
    if (table.parentElement?.hasAttribute("data-table-scroll")) continue;
    const lane = document.createElement("div");
    lane.setAttribute("data-table-scroll", "");
    table.replaceWith(lane);
    lane.append(table);
  }
  for (const lane of root.querySelectorAll<HTMLElement>("[data-table-scroll]")) {
    lane.toggleAttribute("data-scrollable", lane.scrollWidth > lane.clientWidth);
    watchLane(lane);
  }
}
