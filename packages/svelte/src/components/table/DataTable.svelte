<script lang="ts">
import {
  FlexRender,
  cellSpanningFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTable,
  filterFn_arrIncludes,
  filterFn_equals,
  filterFn_includesString,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_weakEquals,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_alphanumericCaseSensitive,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  sortFn_textCaseSensitive,
  tableFeatures,
} from "@tanstack/svelte-table";
import type {
  Column,
  ColumnDef,
  Header,
  Row,
  RowData,
} from "@tanstack/svelte-table";
import { createVirtualizer } from "@tanstack/svelte-virtual";
import { get } from "svelte/store";
import { containsNode, findNode, mark, removeById, replaceById, type TreeNode } from "./table-utils";
import type { DataTableProps } from "./props";

let {
  data,
  columns,
  selectable = false,
  sortable = true,
  filterable = false,
  showToolbar = true,
  tree = false,
  merge,
  pinStart,
  pinEnd,
  virtual = false,
  rowHeight = 40,
  paginated = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  stickyFooter = false,
  initialSorting,
  globalFilterPlaceholder = "Filter rows",
  emptyText = "No rows",
  reorderable = false,
  onRowReorder,
  onColumnReorder,
  ...rest
}: DataTableProps = $props();

const SELECT_COL_ID = "__select";
const SELECT_COL_WIDTH = 48;

if (virtual && merge) {
  console.warn("[DataTable] `virtual` and `merge` are mutually exclusive; merge wins.");
}

/** Features follow the construction-time switches: sorting, selection,
 * expansion, pinning, and spanning are always part of the one-stop
 * shape; filtering and pagination ride their own render paths. */
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  // Built-ins registered by name from the individual exports — the
  // bundled `sortFns` registry is deprecated in v9, and `auto`
  // resolution only finds the names registered here.
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    alphanumericCaseSensitive: sortFn_alphanumericCaseSensitive,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
    textCaseSensitive: sortFn_textCaseSensitive,
  },
  rowSelectionFeature,
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
  columnPinningFeature,
  columnOrderingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  cellSpanningFeature,
  ...(filterable
    ? {
        columnFilteringFeature,
        globalFilteringFeature,
        filteredRowModel: createFilteredRowModel(),
        // The names `auto` resolution can pick, registered from the
        // individual exports — the bundled `filterFns` registry is
        // deprecated in v9. (The global filter hard-codes
        // `includesString` and never consults this registry.)
        filterFns: {
          arrIncludes: filterFn_arrIncludes,
          equals: filterFn_equals,
          includesString: filterFn_includesString,
          inDateRange: filterFn_inDateRange,
          inNumberRange: filterFn_inNumberRange,
          weakEquals: filterFn_weakEquals,
        },
      }
    : {}),
  ...(paginated ? { rowPaginationFeature, paginatedRowModel: createPaginatedRowModel() } : {}),
});

/** The select column leads; merged columns opt into value-based row
 * spanning at the model level. Built once: column inputs stay stable
 * for the life of the instance, like the features above. */
type Features = typeof features;
const mergeIds = new Set(merge ?? []);
// Columns defined by accessorKey carry no id of their own; TanStack
// derives the column id from that key.
const defId = (def: ColumnDef<any, any, any>) =>
  def.id ?? ("accessorKey" in def ? String(def.accessorKey) : "");
const cols = columns.map((def) =>
  mergeIds.has(defId(def)) ? { ...def, spanRows: true } : def,
) as ColumnDef<Features, any, any>[];
if (selectable) {
  cols.unshift({
    id: SELECT_COL_ID,
    size: SELECT_COL_WIDTH,
    enableSorting: false,
    header: () => "",
    cell: () => "",
  });
}

const table = createTable<Features, any>({
  features,
  columns: cols,
  // The getter keeps row data reactive: the adapter re-reads it inside
  // its row-model memos as the prop updates.
  get data() {
    return data;
  },
  enableSorting: sortable !== false,
  getRowId: (row: any) => String(row.id),
  getSubRows: (row: any) => row.subRows,
  // Reordering swaps the whole data array; expansion is the user's
  // view state and must survive it.
  autoResetExpanded: false,
  initialState: {
    ...(initialSorting ? { sorting: initialSorting } : {}),
    ...(paginated ? { pagination: { pageIndex: 0, pageSize } } : {}),
    ...(pinStart || pinEnd
      ? { columnPinning: { start: pinStart ?? [], end: pinEnd ?? [] } }
      : {}),
  },
});

/** Instance-shaped aliases for the helpers below. */
type TColumn = Column<Features, any, unknown>;
type TRow = Row<Features, any>;
type THeader = Header<Features, any, unknown>;

const rows = $derived(table.getRowModel().rows);
const virtualMode = $derived(virtual && !merge);
const mergeMode = $derived(!virtual && !!merge);

/** The declared row height is the density-scale baseline; the live
 * scale comes off the document so the virtual window matches what CSS
 * actually renders. */
const baseRowHeight = () => rowHeight ?? 40;
function densityScale() {
  const value = Number(
    getComputedStyle(document.documentElement).getPropertyValue("--bs-density-scale"),
  );
  return Number.isFinite(value) && value > 0 ? value : 1;
}

let viewportEl = $state<HTMLDivElement | null>(null);

const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
  get count() {
    return rows.length;
  },
  getScrollElement: () => viewportEl,
  estimateSize: () => baseRowHeight() * densityScale(),
  getItemKey: (index: number) => rows[index]?.id ?? index,
  overscan: 8,
});
// The store emits on scroll and measure, not on option-getter changes —
// poke measure() whenever the row count moves so the window follows.
$effect(() => {
  void rows.length;
  get(virtualizer).measure();
});
// Density and scene presets rewrite the scale in place; re-measure so
// the virtual window keeps matching the rendered rows.
$effect(() => {
  if (typeof MutationObserver === "undefined") return;
  const densityObserver = new MutationObserver(() => get(virtualizer).measure());
  densityObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-density", "data-scene"],
  });
  return () => densityObserver.disconnect();
});

/** Column ids of the visible leaves, for pin-seam bookkeeping. */
const leafIds = $derived(table.getAllLeafColumns().map((c) => c.id));
const expandHostId = $derived.by<string | undefined>(() => {
  const id = leafIds.find((id) => id !== SELECT_COL_ID);
  return tree ? id : undefined;
});

/** Track list for every grid in the table; explicit sizes pin to px,
 * everything else flexes. */
const colsTemplate = $derived(
  table
    .getAllLeafColumns()
    .map((column) => {
      if (column.id === SELECT_COL_ID) return `${SELECT_COL_WIDTH}px`;
      const def = columns.find(
        (d) => d.id === column.id || ("accessorKey" in d && String(d.accessorKey) === column.id),
      );
      // A fixed `size` pins to px; an explicit `minSize` floors the
      // track; otherwise columns split evenly. The default must not
      // consult the content (max-content et al.) — every row is its
      // own grid, and content-sized tracks would realign per row,
      // dragging each row's cell edges away from the header's.
      return def?.size != null
        ? `${def.size}px`
        : def?.minSize != null
          ? `minmax(${def.minSize}px, 1fr)`
          : "1fr";
    })
    .join(" "),
);

/** Seam attributes the stylesheet reads; the pin offset rides a style
 * directive so it merges with the per-cell grid styles. */
function pinAttrs(column: TColumn) {
  const pinned = column.getIsPinned();
  if (!pinned) return { "data-pinned": undefined };
  const siblings = leafIds;
  const index = siblings.indexOf(column.id);
  const prev = index > 0 ? table.getColumn(siblings[index - 1]!) : undefined;
  const next = index < siblings.length - 1 ? table.getColumn(siblings[index + 1]!) : undefined;
  return {
    "data-pinned": pinned,
    "data-last-pinned":
      pinned === "start" && next?.getIsPinned() !== "start" ? "" : undefined,
    "data-first-pinned":
      pinned === "end" && prev?.getIsPinned() !== "end" ? "" : undefined,
  };
}

function pinOffset(column: TColumn): string | undefined {
  const pinned = column.getIsPinned();
  if (!pinned) return undefined;
  const offset = pinned === "start" ? column.getStart("start") : column.getAfter("end");
  return `${offset}px`;
}

/* --- Drag reordering ---------------------------------------------------
 * Visuals ride data-* attributes written straight onto the DOM node in
 * dragover and cleared on leave/drop/end — no per-pixel re-render. */

let dragColId: string | null = null;
let dragRowId: string | null = null;
let lastColDrop: HTMLElement | null = null;
let lastRowDrop: HTMLElement | null = null;

function clearColDrop() {
  if (lastColDrop) {
    lastColDrop.removeAttribute("data-drop-before-col");
    lastColDrop.removeAttribute("data-drop-after-col");
    lastColDrop = null;
  }
}

function clearRowDrop() {
  if (lastRowDrop) {
    lastRowDrop.removeAttribute("data-drop-before");
    lastRowDrop.removeAttribute("data-drop-inside");
    lastRowDrop.removeAttribute("data-drop-after");
    lastRowDrop.style.removeProperty("--bs-drop-indent");
    lastRowDrop = null;
  }
}

function onColDragStart(e: DragEvent) {
  dragColId = (e.currentTarget as HTMLElement).dataset.id!;
  e.dataTransfer!.effectAllowed = "move";
  e.dataTransfer!.setData("text/plain", dragColId!);
  (e.currentTarget as HTMLElement).setAttribute("data-dragging", "");
}

/** Header cells answer drops on either side of their midpoint; pinned
 * columns and the drag source themselves never light up. */
function onColDragOver(column: TColumn, e: DragEvent) {
  if (!dragColId || dragColId === column.id || column.getIsPinned()) return;
  e.preventDefault();
  e.dataTransfer!.dropEffect = "move";
  const el = e.currentTarget as HTMLElement;
  if (lastColDrop !== el) clearColDrop();
  const before =
    e.clientX < el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2;
  mark(el, "data-drop-before-col", before);
  mark(el, "data-drop-after-col", !before);
  lastColDrop = el;
}

function onColDragLeave(e: DragEvent) {
  if ((e.currentTarget as HTMLElement) === lastColDrop) clearColDrop();
}

function onColDrop(column: TColumn, e: DragEvent) {
  e.preventDefault();
  if (!dragColId || dragColId === column.id) return;
  const el = e.currentTarget as HTMLElement;
  const before =
    e.clientX < el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2;
  const state = table.atoms.columnOrder.get();
  const order = (state.length ? [...state] : table.getAllLeafColumns().map((c) => c.id)).filter(
    (id) => id !== dragColId,
  );
  const at = order.indexOf(column.id);
  order.splice(before ? at : at + 1, 0, dragColId);
  // The select column always leads, whatever was dragged where.
  const selectAt = order.indexOf(SELECT_COL_ID);
  if (selectAt > 0) {
    order.splice(selectAt, 1);
    order.unshift(SELECT_COL_ID);
  }
  table.setColumnOrder(order);
  onColumnReorder?.(order);
  // The re-render may swallow dragend — clear the stage here.
  clearColDrop();
}

function onColDragEnd(e: DragEvent) {
  dragColId = null;
  (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
  clearColDrop();
}

/** Row dragging rests while any view (sorting, filtering, pagination
 * past the first page) stands between the display order and the data
 * order — a drop there would lie about what it reordered. */
const rowDraggable = $derived.by(() => {
  if (!reorderable || mergeMode) return false;
  if (table.atoms.sorting.get().length) return false;
  if (filterable && (table.atoms.columnFilters.get().length || table.atoms.globalFilter.get()))
    return false;
  if (paginated && table.atoms.pagination.get().pageIndex !== 0) return false;
  return true;
});

function onRowDragStart(row: TRow, e: DragEvent) {
  dragRowId = String(row.id);
  e.dataTransfer!.effectAllowed = "move";
  e.dataTransfer!.setData("text/plain", dragRowId);
  (e.currentTarget as HTMLElement).setAttribute("data-dragging", "");
}

/** Where a tree drop lands: the outer bands of the target row read as
 * sibling slots (40% each, so the insertion line answers the hand
 * everywhere and indents to the reference row's own depth — cross a
 * boundary and the level flips from the row above's to the row
 * below's); the narrow middle band reads as "make child". A node
 * never drops into its own subtree. */
function rowZone(row: TRow, e: DragEvent): "before" | "inside" | "after" {
  const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const pos = (e.clientY - box.top) / box.height;
  return pos < 0.4 ? "before" : pos > 0.6 ? "after" : "inside";
}

function onRowDragOver(row: TRow, e: DragEvent) {
  if (!dragRowId || dragRowId === String(row.id)) return;
  const el = e.currentTarget as HTMLElement;
  let zone: "before" | "inside" | "after";
  if (tree) {
    // A parent never drops anywhere into its own subtree — every band
    // of a descendant's row stays dark, and the drop refuses too.
    const hit = findNode(data as TreeNode[], dragRowId);
    const dragged = hit?.list[hit.index];
    if (!dragged || containsNode(dragged, String(row.id))) return;
    zone = rowZone(row, e);
  } else {
    const box = el.getBoundingClientRect();
    zone = e.clientY - box.top < box.height / 2 ? "before" : "after";
  }
  e.preventDefault();
  e.dataTransfer!.dropEffect = "move";
  if (lastRowDrop !== el) clearRowDrop();
  mark(el, "data-drop-before", zone === "before");
  mark(el, "data-drop-inside", zone === "inside");
  mark(el, "data-drop-after", zone === "after");
  // The insertion line previews the depth of the coming sibling slot.
  el.style.setProperty("--bs-drop-indent", String(tree ? row.depth : 0));
  lastRowDrop = el;
}

function onRowDragLeave(e: DragEvent) {
  if ((e.currentTarget as HTMLElement) === lastRowDrop) clearRowDrop();
}

function onRowDrop(row: TRow, e: DragEvent) {
  e.preventDefault();
  if (!dragRowId || dragRowId === String(row.id)) return;
  const el = e.currentTarget as HTMLElement;
  const box = el.getBoundingClientRect();
  const targetId = String(row.id);

  if (tree) {
    const zone = rowZone(row, e);
    const hit = findNode(data as TreeNode[], dragRowId);
    const dragged = hit?.list[hit.index];
    if (!dragged || containsNode(dragged, targetId)) return;
    let next = removeById(data as TreeNode[], dragRowId);
    if (zone === "inside") {
      next = replaceById(next, targetId, (node) => ({
        ...node,
        subRows: [...(node.subRows ?? []), dragged],
      }));
    } else {
      const slot = findNode(next, targetId);
      if (!slot) return;
      slot.list.splice(slot.index + (zone === "after" ? 1 : 0), 0, dragged);
    }
    onRowReorder?.(next as RowData[]);
  } else {
    const pos = (e.clientY - box.top) / box.height;
    const from = (data as TreeNode[]).findIndex((r) => String(r.id) === dragRowId);
    const to = (data as TreeNode[]).findIndex((r) => String(r.id) === targetId);
    if (from < 0 || to < 0) return;
    const next = [...data];
    const [moved] = next.splice(from, 1);
    const slot = to > from ? to - 1 : to;
    next.splice(pos < 0.5 ? slot : slot + 1, 0, moved!);
    onRowReorder?.(next);
  }
  // The re-render may swallow dragend — clear the stage here.
  clearRowDrop();
}

function onRowDragEnd(e: DragEvent) {
  dragRowId = null;
  (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
  clearRowDrop();
}

const hasFooters = $derived(
  table.getFooterGroups().some((group) =>
    group.headers.some((header) => header.column.columnDef.footer),
  ),
);

function cellStyle(column: TColumn, span: number) {
  return {
    ...(pinOffset(column) ? { "--pin-offset": pinOffset(column) } : {}),
    ...(span > 1 ? { "grid-row": `span ${span}` } : {}),
  };
}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  {...rest}
  data-scope="table"
  data-part="root"
  data-reorderable={reorderable || undefined}
  style:--bs-table-row-height={`calc(${baseRowHeight()}px * var(--bs-density-scale, 1))`}
>
  {#if filterable && showToolbar}
    <div data-scope="table" data-part="toolbar">
      <input
        type="search"
        data-scope="table"
        data-part="global-filter"
        aria-label="Filter all columns"
        placeholder={globalFilterPlaceholder}
        value={(table.atoms.globalFilter.get() as string) ?? ""}
        oninput={(e) => table.setGlobalFilter((e.currentTarget as HTMLInputElement).value)}
      />
    </div>
  {/if}
  <div data-scope="table" data-part="viewport" bind:this={viewportEl}>
    <div
      role="table"
      data-scope="table"
      data-part="table"
      style:--bs-table-cols={colsTemplate}
    >
      <div role="rowgroup" data-scope="table" data-part="header">
        {#each table.getHeaderGroups() as group (group.id)}
          <div role="row" data-scope="table" data-part="row">
            {#each group.headers as header (header.column.id)}
              {@const column = header.column}
              {#if column.id === SELECT_COL_ID}
                {@const all = table.getIsAllRowsSelected()}
                <div
                  role="columnheader"
                  data-scope="table"
                  data-part="header-cell"
                  {...pinAttrs(column)}
                  style:--pin-offset={pinOffset(column)}
                >
                  <input
                    type="checkbox"
                    checked={all}
                    indeterminate={table.getIsSomeRowsSelected() && !all}
                    aria-label="Select all rows"
                    onchange={() => table.toggleAllRowsSelected(!all)}
                  />
                </div>
              {:else}
                {@const sorted = column.getIsSorted()}
                {@const canSort = column.getCanSort()}
                {@const canFilter = filterable && column.getCanFilter()}
                {@const canDrag = !!reorderable && column.id !== SELECT_COL_ID && !column.getIsPinned()}
                <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
                <div
                  role="columnheader"
                  data-scope="table"
                  data-part="header-cell"
                  data-sortable={canSort || undefined}
                  data-sort={sorted || undefined}
                  data-numeric={column.columnDef.meta?.numeric ? "" : undefined}
                  data-draggable={canDrag || undefined}
                  data-id={column.id}
                  draggable={canDrag || undefined}
                  aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                  {...pinAttrs(column)}
                  style:--pin-offset={pinOffset(column)}
                  onclick={canSort ? () => column.toggleSorting() : undefined}
                  ondragstart={canDrag ? onColDragStart : undefined}
                  ondragover={canDrag ? (e) => onColDragOver(column, e) : undefined}
                  ondragleave={canDrag ? onColDragLeave : undefined}
                  ondrop={canDrag ? (e) => onColDrop(column, e) : undefined}
                  ondragend={canDrag ? onColDragEnd : undefined}
                >
                  {#if !header.isPlaceholder && header.column.columnDef.header !== ""}
                    <FlexRender header={header} />
                  {/if}
                  {#if canFilter}
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <input
                      type="text"
                      data-scope="table"
                      data-part="header-filter"
                      aria-label={`Filter ${column.id}`}
                      value={(column.getFilterValue() as string) ?? ""}
                      placeholder="Filter"
                      draggable={false}
                      onclick={(e) => e.stopPropagation()}
                      ondragstart={(e) => e.stopPropagation()}
                      oninput={(e) => column.setFilterValue((e.currentTarget as HTMLInputElement).value)}
                    />
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
      <div
        role="rowgroup"
        data-scope="table"
        data-part="body"
        data-merge={mergeMode || undefined}
        style={virtualMode
          ? { position: "relative", "block-size": `${$virtualizer.getTotalSize()}px` }
          : undefined}
      >
        {#if virtualMode}
          {#each $virtualizer.getVirtualItems() as item (item.key)}
            {@const row = rows[item.index]!}
            {@render renderRow(row, item)}
          {/each}
        {:else}
          {#each rows as row (row.id)}
            {@render renderRow(row)}
          {/each}
        {/if}
        {#if rows.length === 0}
          <div data-scope="table" data-part="empty">{emptyText}</div>
        {/if}
      </div>
      {#if stickyFooter && hasFooters}
        <div role="rowgroup" data-scope="table" data-part="footer">
          {#each table.getFooterGroups() as group (group.id)}
            <div role="row" data-scope="table" data-part="row">
              {#each group.headers as header (header.column.id)}
                <div
                  role="columnheader"
                  data-scope="table"
                  data-part="footer-cell"
                  data-numeric={header.column.columnDef.meta?.numeric ? "" : undefined}
                  {...pinAttrs(header.column)}
                  style:--pin-offset={pinOffset(header.column)}
                >
                  {#if !header.isPlaceholder}<FlexRender footer={header} />{/if}
                </div>
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  {#if paginated}
    {@const pagination = table.atoms.pagination.get()}
    <div data-scope="table" data-part="pagination">
      <button
        type="button"
        data-scope="table"
        data-part="page-button"
        disabled={!table.getCanPreviousPage()}
        onclick={() => table.previousPage()}
      >
        Prev
      </button>
      <button
        type="button"
        data-scope="table"
        data-part="page-button"
        disabled={!table.getCanNextPage()}
        onclick={() => table.nextPage()}
      >
        Next
      </button>
      <select
        data-scope="table"
        data-part="page-size"
        aria-label="Rows per page"
        value={pagination.pageSize}
        onchange={(e) => table.setPageSize(Number((e.currentTarget as HTMLSelectElement).value))}
      >
        {#each pageSizeOptions as size (size)}
          <option value={size}>{`${size} / page`}</option>
        {/each}
      </select>
      <span data-scope="table" data-part="page-status">
        {`Page ${pagination.pageIndex + 1} of ${table.getPageCount()} · ${table.getRowCount()} rows`}
      </span>
    </div>
  {/if}
</div>

{#snippet renderRow(row: TRow, item?: { start: number; size: number })}
  <div
    role="row"
    data-scope="table"
    data-part="row"
    data-selected={row.getIsSelected() || undefined}
    draggable={rowDraggable || undefined}
    ondragstart={(e) => onRowDragStart(row, e)}
    ondragover={(e) => onRowDragOver(row, e)}
    ondragleave={onRowDragLeave}
    ondrop={(e) => onRowDrop(row, e)}
    ondragend={onRowDragEnd}
    style={item
      ? {
          position: "absolute",
          "inset-inline-start": "0",
          "inline-size": "100%",
          transform: `translateY(${item.start}px)`,
          "block-size": `${item.size}px`,
        }
      : undefined}
  >
    {#each row.getVisibleCells() as cell (cell.column.id)}
      {#if !cell.getIsCovered()}
        {@const column = cell.column}
        {@const rowSpan = cell.getRowSpan()}
        {@const isExpandHost = column.id === expandHostId}
        <div
          role="cell"
          data-scope="table"
          data-part="cell"
          data-numeric={column.columnDef.meta?.numeric ? "" : undefined}
          data-spanned={rowSpan > 1 ? "" : undefined}
          {...pinAttrs(column)}
          style={cellStyle(column, rowSpan)}
        >
          {#if column.id === SELECT_COL_ID}
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              indeterminate={false}
              aria-label="Select row"
              onchange={() => row.toggleSelected(!row.getIsSelected())}
            />
          {:else if isExpandHost}
            <div data-scope="table" data-part="cell-main" style:--bs-table-depth={String(row.depth)}>
              <button
                type="button"
                data-scope="table"
                data-part="expander"
                data-expanded={row.getIsExpanded() || undefined}
                data-leaf={!row.getCanExpand() || undefined}
                aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
                onclick={() => row.toggleExpanded()}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
              <FlexRender cell={cell} />
            </div>
          {:else}
            <FlexRender cell={cell} />
          {/if}
        </div>
      {/if}
    {/each}
  </div>
{/snippet}
