import { injectComponentStyle } from "@bysages/core";
import type { SortingState } from "@tanstack/solid-table";
import {
  FlexRender,
  cellSpanningFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
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
  createTable,
} from "@tanstack/solid-table";
import type {
  CellData,
  Column,
  ColumnDef,
  Header,
  Row,
  RowData,
  TableFeatures,
} from "@tanstack/solid-table";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { For, createMemo, createSignal, onCleanup, onMount, type JSX } from "solid-js";

export { FlexRender, createColumnHelper };
export type { ColumnDef, SortingState };

/** Column metadata understood by this table: mark columns whose values
 * read right-aligned in tabular figures. The type parameters mirror the
 * library's own declaration — augmentation merging demands an identical
 * parameter list. */
declare module "@tanstack/solid-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    numeric?: boolean;
  }
}

/** One-stop data table on TanStack Table v9, dressed in the paper-and-ink
 * system: rows are CSS grids under ARIA table semantics, so sticky headers,
 * pinned columns, merged cells, and a virtualized window all stay honest
 * while sorting, filtering, tree expansion, selection, and pagination come
 * from the row-model pipeline. */
export interface DataTableProps {
  /** Row data; replaced wholesale on change — TanStack's memoized row
   * models keep unrelated rows untouched, so edits land without a full
   * re-render. Tree rows nest under `subRows`. */
  data: RowData[];
  /** Column definitions (TanStack `ColumnDef`, preferably built with
   * `createColumnHelper().columns([...])`). Give every column an `id`
   * unless it uses `accessorKey`. `size` fixes a px width; `minSize`
   * floors a flexing track; otherwise the track hugs its content and
   * only the table's leftover width is shared between columns. */
  columns: ColumnDef<any, any, any>[];
  /** Render a leading checkbox column with select-all. */
  selectable?: boolean;
  /** Allow header-click sorting (default true). */
  sortable?: boolean;
  /** Render a global-filter toolbar and per-column filter inputs. */
  filterable?: boolean;
  /** Keep the built-in toolbar row above the table (default true when
   * `filterable`). Turn it off to host the global filter in your own
   * toolbar — the feature stays registered and the instance methods
   * keep working. */
  showToolbar?: boolean;
  /** Enable tree expansion over `subRows`; the first column hosts the
   * expander and depth indent. */
  tree?: boolean;
  /** Column ids whose equal adjacent values merge into one cell (mutually
   * exclusive with `virtual`). */
  merge?: string[];
  /** Column ids pinned to the start edge. */
  pinStart?: string[];
  /** Column ids pinned to the end edge. */
  pinEnd?: string[];
  /** Virtualize the body through a fixed-height window (mutually exclusive
   * with `merge`). */
  virtual?: boolean;
  /** Row height in px; must match CSS so the virtual window aligns. */
  rowHeight?: number;
  /** Render the pagination bar and slice rows client-side. */
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  /** Keep the (optional) footer row pinned to the viewport bottom. */
  stickyFooter?: boolean;
  initialSorting?: SortingState;
  globalFilterPlaceholder?: string;
  emptyText?: string;
  /** Allow dragging header cells onto each other to reorder columns and
   * body rows onto each other to reorder data — with `tree`, row drops
   * read as before / inside / after, so a drop can also nest a branch
   * under its target. Rows need a stable `id`. Row dragging rests while
   * sorting or filtering hides the data order. */
  reorderable?: boolean;
  /** Fires with the reordered data array (the whole tree in tree mode). */
  onRowReorder?: (rows: RowData[]) => void;
  /** Fires with the full leaf-column id order after a header drop. */
  onColumnReorder?: (ids: string[]) => void;
}

const SELECT_COL_ID = "__select";
const SELECT_COL_WIDTH = 48;

/* --- Drag-to-reorder helpers ------------------------------------------- */

type TreeNode = Exclude<RowData, Array<any>> & { id?: unknown; subRows?: TreeNode[] };

/** Placement attrs for a pinned cell plus the seam markers the stylesheet
 * reads; spread onto header, body, and footer cells. */
type PinAttrs = {
  "data-pinned"?: string;
  "data-last-pinned"?: string;
  "data-first-pinned"?: string;
  style?: JSX.CSSProperties;
};

/** Solid's JSX input types omit `indeterminate` even though the runtime
 * property exists; the select checkboxes spread it through. */
type CheckboxAttrs = JSX.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean };

/** The list holding `id` and the index inside it, or null when absent. */
function findNode(rows: TreeNode[], id: string): { list: TreeNode[]; index: number } | null {
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
function containsNode(node: TreeNode, id: string): boolean {
  return !!node.subRows?.some((child) => String(child.id) === id || containsNode(child, id));
}

/** Rebuild every array along the path to `id`, leaving sibling branches
 * untouched by reference (TanStack's memoization keeps their rows). */
function removeById(rows: TreeNode[], id: string): TreeNode[] {
  const next: TreeNode[] = [];
  for (const row of rows) {
    if (String(row.id) === id) continue;
    next.push(row.subRows ? { ...row, subRows: removeById(row.subRows, id) } : row);
  }
  return next;
}

/** Rebuild the path to `id` and swap the node for `patch(node)`. */
function replaceById(
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
function mark(el: HTMLElement, attr: string, on: boolean) {
  if (on) el.setAttribute(attr, "");
  else el.removeAttribute(attr);
}

const chevronGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export function DataTable(props: DataTableProps) {
  if (props.virtual && props.merge) {
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
    ...(props.filterable
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
    ...(props.paginated
      ? { rowPaginationFeature, paginatedRowModel: createPaginatedRowModel() }
      : {}),
  });

  /** The select column leads; merged columns opt into value-based row
   * spanning at the model level. Built once: column inputs stay stable
   * for the life of the instance, like the features above. */
  type Features = typeof features;
  const mergeIds = new Set(props.merge ?? []);
  // Columns defined by accessorKey carry no id of their own; TanStack
  // derives the column id from that key.
  const defId = (def: ColumnDef<any, any, any>) =>
    def.id ?? ("accessorKey" in def ? String(def.accessorKey) : "");
  const columns = props.columns.map((def) =>
    mergeIds.has(defId(def)) ? { ...def, spanRows: true } : def,
  ) as ColumnDef<Features, any, any>[];
  if (props.selectable) {
    columns.unshift({
      id: SELECT_COL_ID,
      size: SELECT_COL_WIDTH,
      enableSorting: false,
      header: () => "",
      cell: () => "",
    });
  }

  const table = createTable<Features, any>({
    features,
    columns,
    // The getter keeps row data reactive: the adapter re-reads it inside
    // its row-model memos as `props` updates.
    get data() {
      return props.data;
    },
    enableSorting: props.sortable !== false,
    getRowId: (row) => String(row.id),
    getSubRows: (row) => row.subRows,
    // Reordering swaps the whole data array; expansion is the user's
    // view state and must survive it.
    autoResetExpanded: false,
    initialState: {
      ...(props.initialSorting ? { sorting: props.initialSorting } : {}),
      ...(props.paginated ? { pagination: { pageIndex: 0, pageSize: props.pageSize ?? 10 } } : {}),
      ...(props.pinStart || props.pinEnd
        ? { columnPinning: { start: props.pinStart ?? [], end: props.pinEnd ?? [] } }
        : {}),
    },
  });

  const [viewport, setViewport] = createSignal<HTMLDivElement | null>(null);
  const rows = createMemo(() => table.getRowModel().rows);

  /** Instance-shaped aliases for the render helpers below. */
  type TColumn = Column<Features, any, unknown>;
  type TRow = Row<Features, any>;
  type THeader = Header<Features, any, unknown>;

  /** The declared row height is the density-scale baseline; the live
   * scale comes off the document so the virtual window matches what CSS
   * actually renders. */
  const baseRowHeight = () => props.rowHeight ?? 40;
  const densityScale = () => {
    const value = Number(
      getComputedStyle(document.documentElement).getPropertyValue("--bs-density-scale"),
    );
    return Number.isFinite(value) && value > 0 ? value : 1;
  };

  const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    get count() {
      return rows().length;
    },
    getScrollElement: () => viewport(),
    estimateSize: () => baseRowHeight() * densityScale(),
    getItemKey: (index: number) => rows()[index]?.id ?? index,
    overscan: 8,
  });
  // Density and scene presets rewrite the scale in place; re-measure so
  // the virtual window keeps matching the rendered rows.
  onMount(() => {
    if (typeof MutationObserver === "undefined") return;
    const densityObserver = new MutationObserver(() => virtualizer.measure());
    densityObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-density", "data-scene"],
    });
    onCleanup(() => densityObserver.disconnect());
  });

  const virtual = () => props.virtual && !props.merge;
  const mergeMode = () => !props.virtual && !!props.merge;

  /** Column ids of the visible leaves, for pin-seam bookkeeping. */
  const leafIds = createMemo(() => table.getAllLeafColumns().map((c) => c.id));
  const expandHostId = createMemo<string | undefined>(() => {
    const id = leafIds().find((id) => id !== SELECT_COL_ID);
    return props.tree ? id : undefined;
  });

  /** Track list for every grid in the table; explicit sizes pin to px,
   * everything else flexes. */
  const colsTemplate = createMemo(() =>
    table
      .getAllLeafColumns()
      .map((column) => {
        if (column.id === SELECT_COL_ID) return `${SELECT_COL_WIDTH}px`;
        const def = props.columns.find(
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

  /** Inline placement for pinned cells plus the seam attributes the
   * stylesheet reads. */
  function pinAttrs(column: TColumn): PinAttrs {
    const pinned = column.getIsPinned();
    if (!pinned) return { "data-pinned": undefined };
    const offset = pinned === "start" ? column.getStart("start") : column.getAfter("end");
    const siblings = leafIds();
    const index = siblings.indexOf(column.id);
    const prev = index > 0 ? table.getColumn(siblings[index - 1]!) : undefined;
    const next = index < siblings.length - 1 ? table.getColumn(siblings[index + 1]!) : undefined;
    return {
      "data-pinned": pinned,
      "data-last-pinned": pinned === "start" && next?.getIsPinned() !== "start" ? "" : undefined,
      "data-first-pinned": pinned === "end" && prev?.getIsPinned() !== "end" ? "" : undefined,
      style: { "--pin-offset": `${offset}px` } as JSX.CSSProperties,
    };
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
    props.onColumnReorder?.(order);
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
  const rowDraggable = createMemo(() => {
    if (!props.reorderable || mergeMode()) return false;
    if (table.atoms.sorting.get().length) return false;
    if (
      props.filterable &&
      (table.atoms.columnFilters.get().length || table.atoms.globalFilter.get())
    )
      return false;
    if (props.paginated && table.atoms.pagination.get().pageIndex !== 0) return false;
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
    if (props.tree) {
      // A parent never drops anywhere into its own subtree — every band
      // of a descendant's row stays dark, and the drop refuses too.
      const hit = findNode(props.data as TreeNode[], dragRowId);
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
    el.style.setProperty("--bs-drop-indent", String(props.tree ? row.depth : 0));
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

    if (props.tree) {
      const zone = rowZone(row, e);
      const hit = findNode(props.data as TreeNode[], dragRowId);
      const dragged = hit?.list[hit.index];
      if (!dragged || containsNode(dragged, targetId)) return;
      let next = removeById(props.data as TreeNode[], dragRowId);
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
      props.onRowReorder?.(next);
    } else {
      const pos = (e.clientY - box.top) / box.height;
      const from = props.data.findIndex((r) => String((r as TreeNode).id) === dragRowId);
      const to = props.data.findIndex((r) => String((r as TreeNode).id) === targetId);
      if (from < 0 || to < 0) return;
      const next = [...props.data];
      const [moved] = next.splice(from, 1);
      const slot = to > from ? to - 1 : to;
      next.splice(pos < 0.5 ? slot : slot + 1, 0, moved!);
      props.onRowReorder?.(next);
    }
    // The re-render may swallow dragend — clear the stage here.
    clearRowDrop();
  }

  function onRowDragEnd(e: DragEvent) {
    dragRowId = null;
    (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
    clearRowDrop();
  }

  function renderCell(cell: ReturnType<TRow["getVisibleCells"]>[number], row: TRow): JSX.Element {
    const column = cell.column;
    if (cell.getIsCovered()) return null;

    const isExpandHost = column.id === expandHostId();
    const pin = pinAttrs(column);
    const pinStyle = pin.style ?? {};
    delete pin.style;
    const rowSpan = cell.getRowSpan();
    const style: JSX.CSSProperties = {
      ...pinStyle,
      ...(rowSpan > 1 ? { "grid-row": `span ${rowSpan}` } : {}),
    };

    let content: JSX.Element;
    if (column.id === SELECT_COL_ID) {
      content = (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          {...({ indeterminate: false } as CheckboxAttrs)}
          aria-label="Select row"
          onchange={() => row.toggleSelected(!row.getIsSelected())}
        />
      );
    } else if (isExpandHost) {
      content = (
        <div
          data-scope="table"
          data-part="cell-main"
          style={{ "--bs-table-depth": String(row.depth) }}
        >
          <button
            type="button"
            data-scope="table"
            data-part="expander"
            data-expanded={row.getIsExpanded() || undefined}
            data-leaf={!row.getCanExpand() || undefined}
            aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
            onclick={() => row.toggleExpanded()}
          >
            {chevronGlyph}
          </button>
          <FlexRender cell={cell} />
        </div>
      );
    } else {
      content = <FlexRender cell={cell} />;
    }

    return (
      <div
        role="cell"
        data-scope="table"
        data-part="cell"
        data-numeric={column.columnDef.meta?.numeric ? "" : undefined}
        data-spanned={rowSpan > 1 ? "" : undefined}
        {...pin}
        style={style}
      >
        {content}
      </div>
    );
  }

  function renderRow(row: TRow, virtualItem?: { start: number; size: number }): JSX.Element {
    const style: JSX.CSSProperties = virtualItem
      ? {
          position: "absolute",
          "inset-inline-start": "0",
          "inline-size": "100%",
          transform: `translateY(${virtualItem.start}px)`,
          "block-size": `${virtualItem.size}px`,
        }
      : {};
    const draggable = rowDraggable();
    return (
      <div
        role="row"
        data-scope="table"
        data-part="row"
        data-selected={row.getIsSelected() || undefined}
        draggable={draggable || undefined}
        ondragstart={draggable ? (e: DragEvent) => onRowDragStart(row, e) : undefined}
        ondragover={draggable ? (e: DragEvent) => onRowDragOver(row, e) : undefined}
        ondragleave={draggable ? onRowDragLeave : undefined}
        ondrop={draggable ? (e: DragEvent) => onRowDrop(row, e) : undefined}
        ondragend={draggable ? onRowDragEnd : undefined}
        style={style}
      >
        <For each={row.getVisibleCells()}>{(cell) => renderCell(cell, row)}</For>
      </div>
    );
  }

  function renderHeaderCell(header: THeader): JSX.Element {
    const column = header.column;
    const sorted = column.getIsSorted();
    const canSort = column.getCanSort();
    const canFilter = props.filterable && column.getCanFilter();
    const canDrag = !!props.reorderable && column.id !== SELECT_COL_ID && !column.getIsPinned();
    return (
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
        onclick={canSort ? () => column.toggleSorting() : undefined}
        ondragstart={canDrag ? onColDragStart : undefined}
        ondragover={canDrag ? (e: DragEvent) => onColDragOver(column, e) : undefined}
        ondragleave={canDrag ? onColDragLeave : undefined}
        ondrop={canDrag ? (e: DragEvent) => onColDrop(column, e) : undefined}
        ondragend={canDrag ? onColDragEnd : undefined}
      >
        {header.isPlaceholder || header.column.columnDef.header === "" ? null : (
          <FlexRender header={header} />
        )}
        {canFilter ? (
          <input
            type="text"
            data-scope="table"
            data-part="header-filter"
            aria-label={`Filter ${column.id}`}
            value={(column.getFilterValue() as string) ?? ""}
            placeholder="Filter"
            draggable={false}
            onclick={(e: MouseEvent) => e.stopPropagation()}
            // Text selection owns a drag from inside the filter box.
            ondragstart={(e: Event) => e.stopPropagation()}
            oninput={(e: Event) => column.setFilterValue((e.target as HTMLInputElement).value)}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      data-scope="table"
      data-part="root"
      data-reorderable={props.reorderable || undefined}
      style={{ "--bs-table-row-height": `calc(${baseRowHeight()}px * var(--bs-density-scale, 1))` }}
    >
      {props.filterable && (props.showToolbar ?? true) ? (
        <div data-scope="table" data-part="toolbar">
          <input
            type="search"
            data-scope="table"
            data-part="global-filter"
            aria-label="Filter all columns"
            placeholder={props.globalFilterPlaceholder}
            value={(table.atoms.globalFilter.get() as string) ?? ""}
            oninput={(e: Event) => table.setGlobalFilter((e.target as HTMLInputElement).value)}
          />
        </div>
      ) : null}
      <div data-scope="table" data-part="viewport" ref={setViewport}>
        <div
          role="table"
          data-scope="table"
          data-part="table"
          style={{ "--bs-table-cols": colsTemplate() }}
        >
          <div role="rowgroup" data-scope="table" data-part="header">
            <For each={table.getHeaderGroups()}>
              {(group) => (
                <div role="row" data-scope="table" data-part="row">
                  <For each={group.headers}>
                    {(header) => {
                      const column = header.column;
                      if (column.id !== SELECT_COL_ID) return renderHeaderCell(header);
                      const all = table.getIsAllRowsSelected();
                      return (
                        <div
                          role="columnheader"
                          data-scope="table"
                          data-part="header-cell"
                          {...pinAttrs(column)}
                        >
                          <input
                            type="checkbox"
                            checked={all}
                            {...({
                              indeterminate: table.getIsSomeRowsSelected() && !all,
                            } as CheckboxAttrs)}
                            aria-label="Select all rows"
                            onchange={() => table.toggleAllRowsSelected(!all)}
                          />
                        </div>
                      );
                    }}
                  </For>
                </div>
              )}
            </For>
          </div>
          <div
            role="rowgroup"
            data-scope="table"
            data-part="body"
            data-merge={mergeMode() || undefined}
            style={
              virtual()
                ? { position: "relative", "block-size": `${virtualizer.getTotalSize()}px` }
                : undefined
            }
          >
            {virtual() ? (
              <For each={virtualizer.getVirtualItems()}>
                {(item) => renderRow(rows()[item.index]!, item)}
              </For>
            ) : (
              <For each={rows()}>{(row) => renderRow(row)}</For>
            )}
            {rows().length === 0 ? (
              <div data-scope="table" data-part="empty">
                {props.emptyText}
              </div>
            ) : null}
          </div>
          {props.stickyFooter &&
          table
            .getFooterGroups()
            .some((group) => group.headers.some((header) => header.column.columnDef.footer)) ? (
            <div role="rowgroup" data-scope="table" data-part="footer">
              <For each={table.getFooterGroups()}>
                {(group) => (
                  <div role="row" data-scope="table" data-part="row">
                    <For each={group.headers}>
                      {(header) => (
                        <div
                          role="columnheader"
                          data-scope="table"
                          data-part="footer-cell"
                          data-numeric={header.column.columnDef.meta?.numeric ? "" : undefined}
                          {...pinAttrs(header.column)}
                        >
                          {header.isPlaceholder ? null : <FlexRender footer={header} />}
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          ) : null}
        </div>
      </div>
      {props.paginated ? (
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
            value={table.atoms.pagination.get().pageSize}
            onchange={(e: Event) =>
              table.setPageSize(Number((e.target as HTMLSelectElement).value))
            }
          >
            <For each={props.pageSizeOptions ?? [10, 20, 50]}>
              {(size) => <option value={size}>{`${size} / page`}</option>}
            </For>
          </select>
          <span data-scope="table" data-part="page-status">
            {`Page ${table.atoms.pagination.get().pageIndex + 1} of ${table.getPageCount()} · ${table.getRowCount()} rows`}
          </span>
        </div>
      ) : null}
    </div>
  );
}

injectComponentStyle("table");
