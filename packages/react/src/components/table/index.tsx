import { injectComponentStyle } from "@bysages/core";
import type { SortingState } from "@tanstack/react-table";
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
  useTable,
} from "@tanstack/react-table";
import type {
  CellData,
  Column,
  ColumnDef,
  Header,
  Row,
  RowData,
  TableFeatures,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useMemo, useReducer, useRef, type CSSProperties } from "react";

export { FlexRender, createColumnHelper };
export type { ColumnDef, SortingState };

/** Column metadata understood by this table: mark columns whose values
 * read right-aligned in tabular figures. The type parameters mirror the
 * library's own declaration — augmentation merging demands an identical
 * parameter list. */
declare module "@tanstack/react-table" {
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
  /** Applied to the root vessel. */
  style?: CSSProperties;
}

const SELECT_COL_ID = "__select";
const SELECT_COL_WIDTH = 48;

/* --- Drag-to-reorder helpers ------------------------------------------- */

type TreeNode = RowData & { id?: unknown; subRows?: TreeNode[] };

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

function ChevronGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/** React keeps `indeterminate` off the JSX types; the DOM property is the
 * only channel, so the checkbox owns its ref. */
function SelectBox(props: {
  checked: boolean;
  indeterminate: boolean;
  onToggle: () => void;
  label: string;
}) {
  const box = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (box.current) box.current.indeterminate = props.indeterminate;
  });
  return (
    <input
      ref={box}
      type="checkbox"
      checked={props.checked}
      aria-label={props.label}
      onChange={props.onToggle}
    />
  );
}

export function DataTable(rawProps: DataTableProps) {
  // Declared defaults keep these present for the whole render.
  const props = rawProps as DataTableProps &
    Required<Pick<DataTableProps, "sortable" | "rowHeight" | "pageSize" | "pageSizeOptions">>;
  const {
    selectable = false,
    sortable = true,
    filterable = false,
    tree = false,
    virtual: virtualProp = false,
    rowHeight = 40,
    paginated = false,
    pageSize = 10,
    pageSizeOptions = [10, 20, 50],
    globalFilterPlaceholder = "Filter rows",
    emptyText = "No rows",
    reorderable = false,
  } = props;
  const merge = props.merge;
  const virtual = virtualProp && !merge;
  const mergeMode = !virtualProp && !!merge;

  /** Features follow the construction-time switches: sorting, selection,
   * expansion, pinning, and spanning are always part of the one-stop
   * shape; filtering and pagination ride their own render paths. Memoized
   * so the feature registry stays stable across renders. */
  const features = useMemo(
    () =>
      tableFeatures({
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
        ...(paginated
          ? { rowPaginationFeature, paginatedRowModel: createPaginatedRowModel() }
          : {}),
      }),
    [filterable, paginated],
  );

  /** The select column leads; merged columns opt into value-based row
   * spanning at the model level. Stable per feature/def set, like the
   * features above. */
  type Features = typeof features;
  const columns = useMemo(() => {
    if (virtualProp && merge) {
      console.warn("[DataTable] `virtual` and `merge` are mutually exclusive; merge wins.");
    }
    const mergeIds = new Set(merge ?? []);
    // Columns defined by accessorKey carry no id of their own; TanStack
    // derives the column id from that key.
    const defId = (def: ColumnDef<any, any, any>) =>
      def.id ?? ("accessorKey" in def ? String(def.accessorKey) : "");
    // The prop keeps its wide shape (any built-in fn name); the full fn
    // registries above make the narrowed instance type true at runtime.
    const narrowed = props.columns.map((def) =>
      mergeIds.has(defId(def)) ? { ...def, spanRows: true } : def,
    ) as ColumnDef<Features, any, any>[];
    if (selectable) {
      narrowed.unshift({
        id: SELECT_COL_ID,
        size: SELECT_COL_WIDTH,
        enableSorting: false,
        header: () => "",
        cell: () => "",
      });
    }
    return narrowed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.columns, merge, selectable, features]);

  const table = useTable<Features, any>({
    features,
    columns,
    data: props.data,
    enableSorting: sortable,
    getRowId: (row: any) => String(row.id),
    getSubRows: (row: any) => row.subRows,
    // Reordering swaps the whole data array; expansion is the user's
    // view state and must survive it.
    autoResetExpanded: false,
    initialState: {
      ...(props.initialSorting ? { sorting: props.initialSorting } : {}),
      ...(paginated ? { pagination: { pageIndex: 0, pageSize } } : {}),
      ...(props.pinStart || props.pinEnd
        ? { columnPinning: { start: props.pinStart ?? [], end: props.pinEnd ?? [] } }
        : {}),
    },
  });

  const viewport = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;

  /** The declared row height is the density-scale baseline; the live
   * scale comes off the document so the virtual window matches what CSS
   * actually renders. */
  const densityScale = () => {
    const value = Number(
      getComputedStyle(document.documentElement).getPropertyValue("--bs-density-scale"),
    );
    return Number.isFinite(value) && value > 0 ? value : 1;
  };

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => viewport.current,
    estimateSize: () => rowHeight * densityScale(),
    getItemKey: (index) => rows[index]?.id ?? index,
    overscan: 8,
  });
  // Density and scene presets rewrite the scale in place; re-render so
  // the virtual window keeps matching the rendered rows.
  const [, rerender] = useReducer((count: number) => count + 1, 0);
  useEffect(() => {
    if (!virtual) return;
    const observer = new MutationObserver(rerender);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-density", "data-scene"],
    });
    return () => observer.disconnect();
  }, [virtual]);

  const virtualRows = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  /** Column ids of the visible leaves, for pin-seam bookkeeping. */
  const leafIds = table.getAllLeafColumns().map((c) => c.id);
  const expandHostId = tree ? leafIds.find((id) => id !== SELECT_COL_ID) : undefined;

  /** Track list for every grid in the table; explicit sizes pin to px,
   * everything else flexes. */
  const colsTemplate = table
    .getAllLeafColumns()
    .map((column) => {
      if (column.id === SELECT_COL_ID) return `${SELECT_COL_WIDTH}px`;
      const def = props.columns.find(
        (d) => d.id === column.id || ("accessorKey" in d && String(d.accessorKey) === column.id),
      );
      // A fixed `size` pins to px; an explicit `minSize` floors the
      // track; otherwise the track hugs its content and only the
      // leftover space is shared — columns never stare at empty width.
      return def?.size != null
        ? `${def.size}px`
        : def?.minSize != null
          ? `minmax(${def.minSize}px, 1fr)`
          : "minmax(max-content, 1fr)";
    })
    .join(" ");

  /** Inline placement for pinned cells plus the seam attributes the
   * stylesheet reads. */
  type TColumn = Column<Features, any, unknown>;
  function pinAttrs(column: TColumn) {
    const pinned = column.getIsPinned();
    const attrs: Record<string, unknown> = {
      "data-pinned": pinned || undefined,
    };
    if (!pinned) return attrs;
    const offset = pinned === "start" ? column.getStart("start") : column.getAfter("end");
    const index = leafIds.indexOf(column.id);
    const prev = index > 0 ? table.getColumn(leafIds[index - 1]!) : undefined;
    const next = index < leafIds.length - 1 ? table.getColumn(leafIds[index + 1]!) : undefined;
    attrs["data-last-pinned"] =
      pinned === "start" && next?.getIsPinned() !== "start" ? "" : undefined;
    attrs["data-first-pinned"] = pinned === "end" && prev?.getIsPinned() !== "end" ? "" : undefined;
    attrs.style = { "--pin-offset": `${offset}px` } as CSSProperties;
    return attrs;
  }

  type TRow = Row<Features, any>;
  type THeader = Header<Features, any, unknown>;

  /* --- Drag reordering ---------------------------------------------------
   * Visuals ride data-* attributes written straight onto the DOM node in
   * drag-over and cleared on leave/drop/end — no per-pixel re-render. */

  const drag = useRef<{
    col: string | null;
    row: string | null;
    lastColDrop: HTMLElement | null;
    lastRowDrop: HTMLElement | null;
  }>({ col: null, row: null, lastColDrop: null, lastRowDrop: null });

  function clearColDrop() {
    const el = drag.current.lastColDrop;
    if (el) {
      el.removeAttribute("data-drop-before-col");
      el.removeAttribute("data-drop-after-col");
      drag.current.lastColDrop = null;
    }
  }

  function clearRowDrop() {
    const el = drag.current.lastRowDrop;
    if (el) {
      el.removeAttribute("data-drop-before");
      el.removeAttribute("data-drop-inside");
      el.removeAttribute("data-drop-after");
      el.style.removeProperty("--bs-drop-indent");
      drag.current.lastRowDrop = null;
    }
  }

  function onColDragStart(e: React.DragEvent) {
    drag.current.col = (e.currentTarget as HTMLElement).dataset.id!;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", drag.current.col!);
    (e.currentTarget as HTMLElement).setAttribute("data-dragging", "");
  }

  /** Header cells answer drops on either side of their midpoint; pinned
   * columns and the drag source themselves never light up. */
  function onColDragOver(column: TColumn, e: React.DragEvent) {
    if (!drag.current.col || drag.current.col === column.id || column.getIsPinned()) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const el = e.currentTarget as HTMLElement;
    if (drag.current.lastColDrop !== el) clearColDrop();
    const box = el.getBoundingClientRect();
    const before = e.clientX < box.left + box.width / 2;
    mark(el, "data-drop-before-col", before);
    mark(el, "data-drop-after-col", !before);
    drag.current.lastColDrop = el;
  }

  function onColDragLeave(e: React.DragEvent) {
    if ((e.currentTarget as HTMLElement) === drag.current.lastColDrop) clearColDrop();
  }

  function onColDrop(column: TColumn, e: React.DragEvent) {
    e.preventDefault();
    if (!drag.current.col || drag.current.col === column.id) return;
    const el = e.currentTarget as HTMLElement;
    const box = el.getBoundingClientRect();
    const before = e.clientX < box.left + box.width / 2;
    const moved = drag.current.col;
    const state = table.atoms.columnOrder.get();
    const order = (state.length ? [...state] : table.getAllLeafColumns().map((c) => c.id)).filter(
      (id) => id !== moved,
    );
    const at = order.indexOf(column.id);
    order.splice(before ? at : at + 1, 0, moved!);
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

  function onColDragEnd(e: React.DragEvent) {
    drag.current.col = null;
    (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
    clearColDrop();
  }

  /** Row dragging rests while any view (sorting, filtering, pagination
   * past the first page) stands between the display order and the data
   * order — a drop there would lie about what it reordered. */
  const rowDraggable =
    reorderable &&
    !mergeMode &&
    table.atoms.sorting.get().length === 0 &&
    !(filterable && (table.atoms.columnFilters.get().length || table.atoms.globalFilter.get())) &&
    !(paginated && table.atoms.pagination.get().pageIndex !== 0);

  function onRowDragStart(row: TRow, e: React.DragEvent) {
    drag.current.row = String(row.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", drag.current.row!);
    (e.currentTarget as HTMLElement).setAttribute("data-dragging", "");
  }

  /** Where a tree drop lands: the outer bands of the target row read as
   * sibling slots (40% each, so the insertion line answers the hand
   * everywhere and indents to the reference row's own depth — cross a
   * boundary and the level flips from the row above's to the row
   * below's); the narrow middle band reads as "make child". A node
   * never drops into its own subtree. */
  function rowZone(row: TRow, e: React.DragEvent): "before" | "inside" | "after" {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pos = (e.clientY - box.top) / box.height;
    return pos < 0.4 ? "before" : pos > 0.6 ? "after" : "inside";
  }

  function onRowDragOver(row: TRow, e: React.DragEvent) {
    if (!drag.current.row || drag.current.row === String(row.id)) return;
    const el = e.currentTarget as HTMLElement;
    let zone: "before" | "inside" | "after";
    if (tree) {
      // A parent never drops anywhere into its own subtree — every band
      // of a descendant's row stays dark, and the drop refuses too.
      const hit = findNode(props.data as TreeNode[], drag.current.row!);
      const dragged = hit?.list[hit.index];
      if (!dragged || containsNode(dragged, String(row.id))) return;
      zone = rowZone(row, e);
    } else {
      const box = el.getBoundingClientRect();
      zone = e.clientY - box.top < box.height / 2 ? "before" : "after";
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (drag.current.lastRowDrop !== el) clearRowDrop();
    mark(el, "data-drop-before", zone === "before");
    mark(el, "data-drop-inside", zone === "inside");
    mark(el, "data-drop-after", zone === "after");
    // The insertion line previews the depth of the coming sibling slot.
    el.style.setProperty("--bs-drop-indent", String(tree ? row.depth : 0));
    drag.current.lastRowDrop = el;
  }

  function onRowDragLeave(e: React.DragEvent) {
    if ((e.currentTarget as HTMLElement) === drag.current.lastRowDrop) clearRowDrop();
  }

  function onRowDrop(row: TRow, e: React.DragEvent) {
    e.preventDefault();
    if (!drag.current.row || drag.current.row === String(row.id)) return;
    const el = e.currentTarget as HTMLElement;
    const box = el.getBoundingClientRect();
    const targetId = String(row.id);
    const movedId = drag.current.row!;

    if (tree) {
      const zone = rowZone(row, e);
      const hit = findNode(props.data as TreeNode[], movedId);
      const dragged = hit?.list[hit.index];
      if (!dragged || containsNode(dragged, targetId)) return;
      let next = removeById(props.data as TreeNode[], movedId);
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
      const data = props.data;
      const from = data.findIndex((r) => String((r as TreeNode).id) === movedId);
      const to = data.findIndex((r) => String((r as TreeNode).id) === targetId);
      if (from < 0 || to < 0) return;
      const next = [...data];
      const [movedRow] = next.splice(from, 1);
      const slot = to > from ? to - 1 : to;
      next.splice(pos < 0.5 ? slot : slot + 1, 0, movedRow!);
      props.onRowReorder?.(next);
    }
    // The re-render may swallow dragend — clear the stage here.
    clearRowDrop();
  }

  function onRowDragEnd(e: React.DragEvent) {
    drag.current.row = null;
    (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
    clearRowDrop();
  }

  function renderCell(cell: ReturnType<TRow["getVisibleCells"]>[number], row: TRow) {
    const column = cell.column;
    if (cell.getIsCovered()) return null;

    const isExpandHost = column.id === expandHostId;
    const pin = pinAttrs(column);
    const style = { ...(pin.style as CSSProperties) };
    delete pin.style;
    const rowSpan = cell.getRowSpan();
    if (rowSpan > 1) {
      style.gridRow = `span ${rowSpan}`;
    }
    const spanned = rowSpan > 1 ? { "data-spanned": "" } : {};

    let content;
    if (column.id === SELECT_COL_ID) {
      content = (
        <SelectBox
          checked={row.getIsSelected()}
          indeterminate={false}
          onToggle={() => row.toggleSelected(!row.getIsSelected())}
          label="Select row"
        />
      );
    } else if (isExpandHost) {
      content = (
        <div
          data-scope="table"
          data-part="cell-main"
          style={{ "--bs-table-depth": String(row.depth) } as CSSProperties}
        >
          <button
            type="button"
            data-scope="table"
            data-part="expander"
            data-expanded={row.getIsExpanded() || undefined}
            data-leaf={!row.getCanExpand() || undefined}
            aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
            onClick={() => row.toggleExpanded()}
          >
            <ChevronGlyph />
          </button>
          <FlexRender cell={cell} />
        </div>
      );
    } else {
      content = <FlexRender cell={cell} />;
    }

    return (
      <div
        key={column.id}
        role="cell"
        data-scope="table"
        data-part="cell"
        data-numeric={column.columnDef.meta?.numeric ? "" : undefined}
        {...spanned}
        {...pin}
        style={style}
      >
        {content}
      </div>
    );
  }

  function renderHeaderCell(header: THeader) {
    const column = header.column;
    const sorted = column.getIsSorted();
    const canSort = column.getCanSort();
    const canFilter = filterable && column.getCanFilter();
    const canDrag = !!reorderable && column.id !== SELECT_COL_ID && !column.getIsPinned();
    return (
      <div
        key={column.id}
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
        onClick={canSort ? () => column.toggleSorting() : undefined}
        onDragStart={canDrag ? onColDragStart : undefined}
        onDragOver={canDrag ? (e) => onColDragOver(column, e) : undefined}
        onDragLeave={canDrag ? onColDragLeave : undefined}
        onDrop={canDrag ? (e) => onColDrop(column, e) : undefined}
        onDragEnd={canDrag ? onColDragEnd : undefined}
      >
        {header.isPlaceholder ? null : <FlexRender header={header} />}
        {canFilter ? (
          <input
            type="text"
            data-scope="table"
            data-part="header-filter"
            aria-label={`Filter ${column.id}`}
            value={(column.getFilterValue() as string) ?? ""}
            placeholder="Filter"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            onDragStart={(e) => e.stopPropagation()}
            onInput={(e) => column.setFilterValue((e.target as HTMLInputElement).value)}
          />
        ) : null}
      </div>
    );
  }

  function renderRow(row: TRow, virtualIndex: number) {
    const style: CSSProperties = {};
    if (virtual) {
      const item = virtualRows[virtualIndex]!;
      style.position = "absolute";
      style.insetInlineStart = "0";
      style.inlineSize = "100%";
      style.transform = `translateY(${item.start}px)`;
      style.blockSize = `${item.size}px`;
    }
    return (
      <div
        key={row.id}
        role="row"
        data-scope="table"
        data-part="row"
        data-selected={row.getIsSelected() || undefined}
        draggable={rowDraggable || undefined}
        onDragStart={rowDraggable ? (e) => onRowDragStart(row, e) : undefined}
        onDragOver={rowDraggable ? (e) => onRowDragOver(row, e) : undefined}
        onDragLeave={rowDraggable ? onRowDragLeave : undefined}
        onDrop={rowDraggable ? (e) => onRowDrop(row, e) : undefined}
        onDragEnd={rowDraggable ? onRowDragEnd : undefined}
        style={style}
      >
        {row.getVisibleCells().map((cell) => renderCell(cell, row))}
      </div>
    );
  }

  const header = (
    <div role="rowgroup" data-scope="table" data-part="header">
      {table.getHeaderGroups().map((group) => (
        <div key={group.id} role="row" data-scope="table" data-part="row">
          {group.headers.map((header) => {
            const column = header.column;
            if (column.id === SELECT_COL_ID) {
              const all = table.getIsAllRowsSelected();
              return (
                <div
                  key={column.id}
                  role="columnheader"
                  data-scope="table"
                  data-part="header-cell"
                  {...pinAttrs(column)}
                >
                  <SelectBox
                    checked={all}
                    indeterminate={table.getIsSomeRowsSelected() && !all}
                    onToggle={() => table.toggleAllRowsSelected(!all)}
                    label="Select all rows"
                  />
                </div>
              );
            }
            return renderHeaderCell(header);
          })}
        </div>
      ))}
    </div>
  );

  const body = (
    <div
      role="rowgroup"
      data-scope="table"
      data-part="body"
      data-merge={mergeMode || undefined}
      style={virtual ? { position: "relative", blockSize: `${totalSize}px` } : undefined}
    >
      {virtual
        ? virtualRows.map((_, index) => renderRow(rows[index]!, index))
        : rows.map((row) => renderRow(row, -1))}
      {rows.length === 0 ? (
        <div data-scope="table" data-part="empty">
          {emptyText}
        </div>
      ) : null}
    </div>
  );

  const hasFooters = table
    .getFooterGroups()
    .some((group) => group.headers.some((header) => header.column.columnDef.footer));

  const footer =
    props.stickyFooter && hasFooters ? (
      <div role="rowgroup" data-scope="table" data-part="footer">
        {table.getFooterGroups().map((group) => (
          <div key={group.id} role="row" data-scope="table" data-part="row">
            {group.headers.map((header) => (
              <div
                key={header.column.id}
                role="columnheader"
                data-scope="table"
                data-part="footer-cell"
                data-numeric={header.column.columnDef.meta?.numeric ? "" : undefined}
                {...pinAttrs(header.column)}
              >
                {header.isPlaceholder ? null : <FlexRender footer={header} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    ) : null;

  /** The bar only exists when the pagination feature is registered; its
   * state reads stay inside this branch. */
  const paginationBar = paginated
    ? (() => {
        const pagination = table.atoms.pagination.get();
        const rowCount = table.getRowCount();
        const pageCount = table.getPageCount();
        return (
          <div data-scope="table" data-part="pagination">
            <button
              type="button"
              data-scope="table"
              data-part="page-button"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
            <button
              type="button"
              data-scope="table"
              data-part="page-button"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
            <select
              data-scope="table"
              data-part="page-size"
              aria-label="Rows per page"
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number((e.target as HTMLSelectElement).value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
            <span data-scope="table" data-part="page-status">
              Page {pagination.pageIndex + 1} of {pageCount} · {rowCount} rows
            </span>
          </div>
        );
      })()
    : null;

  const toolbar = filterable ? (
    <div data-scope="table" data-part="toolbar">
      <input
        type="search"
        data-scope="table"
        data-part="global-filter"
        aria-label="Filter all columns"
        placeholder={globalFilterPlaceholder}
        value={(table.atoms.globalFilter.get() as string) ?? ""}
        onInput={(e) => table.setGlobalFilter((e.target as HTMLInputElement).value)}
      />
    </div>
  ) : null;

  return (
    <div
      data-scope="table"
      data-part="root"
      data-reorderable={reorderable || undefined}
      style={
        {
          "--bs-table-row-height": `calc(${rowHeight}px * var(--bs-density-scale, 1))`,
          ...props.style,
        } as CSSProperties
      }
    >
      {toolbar}
      <div data-scope="table" data-part="viewport" ref={viewport}>
        <div
          role="table"
          data-scope="table"
          data-part="table"
          style={{ "--bs-table-cols": colsTemplate } as CSSProperties}
        >
          {header}
          {body}
          {footer}
        </div>
      </div>
      {paginationBar}
    </div>
  );
}

injectComponentStyle("table");
