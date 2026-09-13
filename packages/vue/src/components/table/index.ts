import { injectComponentStyle } from "@bysages/core";
import type { SortingState } from "@tanstack/vue-table";
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
} from "@tanstack/vue-table";
import type {
  CellData,
  Column,
  ColumnDef,
  Header,
  Row,
  RowData,
  TableFeatures,
} from "@tanstack/vue-table";
import { useVirtualizer } from "@tanstack/vue-virtual";
import {
  computed,
  defineComponent,
  h,
  onScopeDispose,
  ref,
  type CSSProperties,
  type PropType,
} from "vue";

export { FlexRender, createColumnHelper };
export type { ColumnDef, SortingState };

/** Column metadata understood by this table: mark columns whose values
 * read right-aligned in tabular figures. The type parameters mirror the
 * library's own declaration — augmentation merging demands an identical
 * parameter list. */
declare module "@tanstack/vue-table" {
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

function chevronGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2.5,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m9 6 6 6-6 6" })],
  );
}

function selectBox(checked: boolean, indeterminate: boolean, onToggle: () => void, label: string) {
  return h("input", {
    type: "checkbox",
    checked,
    indeterminate,
    "aria-label": label,
    onChange: onToggle,
  });
}

export const DataTable = defineComponent({
  name: "SDataTable",
  emits: {
    rowReorder: (_rows: RowData[]) => true,
    columnReorder: (_ids: string[]) => true,
  },
  props: {
    data: { type: Array as PropType<RowData[]>, required: true },
    columns: { type: Array as PropType<ColumnDef<any, any, any>[]>, required: true },
    selectable: Boolean,
    sortable: { type: Boolean, default: true },
    filterable: Boolean,
    tree: Boolean,
    merge: { type: Array as PropType<string[]> },
    pinStart: { type: Array as PropType<string[]> },
    pinEnd: { type: Array as PropType<string[]> },
    virtual: Boolean,
    rowHeight: { type: Number, default: 40 },
    paginated: Boolean,
    pageSize: { type: Number, default: 10 },
    pageSizeOptions: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 50],
    },
    stickyFooter: Boolean,
    initialSorting: { type: Array as PropType<SortingState> },
    globalFilterPlaceholder: { type: String, default: "Filter rows" },
    emptyText: { type: String, default: "No rows" },
    reorderable: Boolean,
  },
  setup(rawProps, { expose, emit }) {
    // Declared defaults keep these present at runtime.
    const props = rawProps as DataTableProps & Required<Pick<DataTableProps, "pageSizeOptions">>;

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
    // The prop keeps its wide shape (any built-in fn name); the full fn
    // registries above make the narrowed instance type true at runtime.
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

    const table = useTable<Features, any>({
      features,
      columns,
      data: computed(() => props.data),
      enableSorting: props.sortable !== false,
      getRowId: (row: any) => String(row.id),
      getSubRows: (row: any) => row.subRows,
      // Reordering swaps the whole data array; expansion is the user's
      // view state and must survive it.
      autoResetExpanded: false,
      initialState: {
        ...(props.initialSorting ? { sorting: props.initialSorting } : {}),
        ...(props.paginated
          ? { pagination: { pageIndex: 0, pageSize: props.pageSize ?? 10 } }
          : {}),
        ...(props.pinStart || props.pinEnd
          ? { columnPinning: { start: props.pinStart ?? [], end: props.pinEnd ?? [] } }
          : {}),
      },
    });

    const viewport = ref<HTMLElement | null>(null);
    const rows = computed(() => table.getRowModel().rows);

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

    const virtualizer = useVirtualizer(
      computed(() => ({
        count: rows.value.length,
        getScrollElement: () => viewport.value,
        estimateSize: () => baseRowHeight() * densityScale(),
        getItemKey: (index: number) => rows.value[index]?.id ?? index,
        overscan: 8,
      })),
    );
    // Density and scene presets rewrite the scale in place; re-measure so
    // the virtual window keeps matching the rendered rows.
    const densityObserver = new MutationObserver(() => virtualizer.value.measure());
    densityObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-density", "data-scene"],
    });
    onScopeDispose(() => densityObserver.disconnect());
    const virtualRows = computed(() => virtualizer.value.getVirtualItems());
    const totalSize = computed(() => virtualizer.value.getTotalSize());

    const virtual = computed(() => props.virtual && !props.merge);
    const mergeMode = computed(() => !props.virtual && !!props.merge);

    /** Column ids of the visible leaves, for pin-seam bookkeeping. */
    const leafIds = computed(() => table.getAllLeafColumns().map((c) => c.id));
    const expandHostId = computed(() => {
      const id = leafIds.value.find((id) => id !== SELECT_COL_ID);
      return props.tree ? id : undefined;
    });

    expose({ table });

    /** Track list for every grid in the table; explicit sizes pin to px,
     * everything else flexes. */
    const colsTemplate = computed(() =>
      table
        .getAllLeafColumns()
        .map((column) => {
          if (column.id === SELECT_COL_ID) return `${SELECT_COL_WIDTH}px`;
          const def = props.columns.find(
            (d) =>
              d.id === column.id || ("accessorKey" in d && String(d.accessorKey) === column.id),
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
        .join(" "),
    );

    /** Inline placement for pinned cells plus the seam attributes the
     * stylesheet reads. */
    function pinAttrs(column: TColumn) {
      const pinned = column.getIsPinned();
      const attrs: Record<string, unknown> = {
        "data-pinned": pinned || undefined,
      };
      if (!pinned) return attrs;
      const offset = pinned === "start" ? column.getStart("start") : column.getAfter("end");
      const siblings = leafIds.value;
      const index = siblings.indexOf(column.id);
      const prev = index > 0 ? table.getColumn(siblings[index - 1]!) : undefined;
      const next = index < siblings.length - 1 ? table.getColumn(siblings[index + 1]!) : undefined;
      attrs["data-last-pinned"] =
        pinned === "start" && next?.getIsPinned() !== "start" ? "" : undefined;
      attrs["data-first-pinned"] =
        pinned === "end" && prev?.getIsPinned() !== "end" ? "" : undefined;
      attrs.style = { "--pin-offset": `${offset}px` };
      return attrs;
    }

    /* --- Drag reordering -------------------------------------------------
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
      emit("columnReorder", order);
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
    const rowDraggable = computed(() => {
      if (!props.reorderable || mergeMode.value) return false;
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
        emit("rowReorder", next);
      } else {
        const pos = (e.clientY - box.top) / box.height;
        const from = props.data.findIndex((r) => String((r as TreeNode).id) === dragRowId);
        const to = props.data.findIndex((r) => String((r as TreeNode).id) === targetId);
        if (from < 0 || to < 0) return;
        const next = [...props.data];
        const [moved] = next.splice(from, 1);
        const slot = to > from ? to - 1 : to;
        next.splice(pos < 0.5 ? slot : slot + 1, 0, moved!);
        emit("rowReorder", next);
      }
      // The re-render may swallow dragend — clear the stage here.
      clearRowDrop();
    }

    function onRowDragEnd(e: DragEvent) {
      dragRowId = null;
      (e.currentTarget as HTMLElement).removeAttribute("data-dragging");
      clearRowDrop();
    }

    function renderCell(cell: ReturnType<TRow["getVisibleCells"]>[number], row: TRow) {
      const column = cell.column;
      if (cell.getIsCovered()) return null;

      const isExpandHost = column.id === expandHostId.value;
      const pin = pinAttrs(column);
      const style = { ...(pin.style as CSSProperties) };
      delete pin.style;
      const rowSpan = cell.getRowSpan();
      if (rowSpan > 1) {
        style.gridRow = `span ${rowSpan}`;
      }
      const attrs: Record<string, unknown> = rowSpan > 1 ? { "data-spanned": "" } : {};

      let content;
      if (column.id === SELECT_COL_ID) {
        content = selectBox(
          row.getIsSelected(),
          false,
          () => row.toggleSelected(!row.getIsSelected()),
          "Select row",
        );
      } else if (isExpandHost) {
        content = h(
          "div",
          {
            "data-scope": "table",
            "data-part": "cell-main",
            style: { "--bs-table-depth": String(row.depth) },
          },
          [
            h(
              "button",
              {
                type: "button",
                "data-scope": "table",
                "data-part": "expander",
                "data-expanded": row.getIsExpanded() || undefined,
                "data-leaf": !row.getCanExpand() || undefined,
                "aria-label": row.getIsExpanded() ? "Collapse row" : "Expand row",
                onClick: () => row.toggleExpanded(),
              },
              chevronGlyph(),
            ),
            h(FlexRender, { cell }),
          ],
        );
      } else {
        content = h(FlexRender, { cell });
      }

      return h(
        "div",
        {
          key: column.id,
          role: "cell",
          "data-scope": "table",
          "data-part": "cell",
          "data-numeric": column.columnDef.meta?.numeric ? "" : undefined,
          ...attrs,
          ...pin,
          style,
        },
        [content],
      );
    }

    function renderHeaderCell(header: THeader) {
      const column = header.column;
      const sorted = column.getIsSorted();
      const canSort = column.getCanSort();
      const canFilter = props.filterable && column.getCanFilter();
      const canDrag = !!props.reorderable && column.id !== SELECT_COL_ID && !column.getIsPinned();
      const children = [header.isPlaceholder ? null : h(FlexRender, { header })];
      if (canFilter) {
        children.push(
          h("input", {
            key: "filter",
            type: "text",
            "data-scope": "table",
            "data-part": "header-filter",
            "aria-label": `Filter ${column.id}`,
            value: (column.getFilterValue() as string) ?? "",
            placeholder: "Filter",
            draggable: false,
            onClick: (e: Event) => e.stopPropagation(),
            // Text selection owns a drag from inside the filter box.
            onDragstart: (e: Event) => e.stopPropagation(),
            onInput: (e: Event) => column.setFilterValue((e.target as HTMLInputElement).value),
          }),
        );
      }
      return h(
        "div",
        {
          key: column.id,
          role: "columnheader",
          "data-scope": "table",
          "data-part": "header-cell",
          "data-sortable": canSort || undefined,
          "data-sort": sorted || undefined,
          "data-numeric": column.columnDef.meta?.numeric ? "" : undefined,
          "data-draggable": canDrag || undefined,
          "data-id": column.id,
          draggable: canDrag || undefined,
          "aria-sort":
            sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined,
          ...pinAttrs(column),
          onClick: canSort ? () => column.toggleSorting() : undefined,
          onDragstart: canDrag ? (e: DragEvent) => onColDragStart(e) : undefined,
          onDragover: canDrag ? (e: DragEvent) => onColDragOver(column, e) : undefined,
          onDragleave: canDrag ? onColDragLeave : undefined,
          onDrop: canDrag ? (e: DragEvent) => onColDrop(column, e) : undefined,
          onDragend: canDrag ? (e: DragEvent) => onColDragEnd(e) : undefined,
        },
        children,
      );
    }

    function renderRow(row: TRow, index: number) {
      const style: CSSProperties = {};
      if (virtual.value) {
        const item = virtualRows.value[index]!;
        style.position = "absolute";
        style.insetInlineStart = "0";
        style.inlineSize = "100%";
        style.transform = `translateY(${item.start}px)`;
        style.blockSize = `${item.size}px`;
      }
      const draggable = rowDraggable.value;
      return h(
        "div",
        {
          key: row.id,
          role: "row",
          "data-scope": "table",
          "data-part": "row",
          "data-selected": row.getIsSelected() || undefined,
          draggable: draggable || undefined,
          onDragstart: draggable ? (e: DragEvent) => onRowDragStart(row, e) : undefined,
          onDragover: draggable ? (e: DragEvent) => onRowDragOver(row, e) : undefined,
          onDragleave: draggable ? onRowDragLeave : undefined,
          onDrop: draggable ? (e: DragEvent) => onRowDrop(row, e) : undefined,
          onDragend: draggable ? (e: DragEvent) => onRowDragEnd(e) : undefined,
          style,
        },
        row.getVisibleCells().map((cell) => renderCell(cell, row)),
      );
    }

    return () => {
      const bodyRows = rows.value;

      const header = h(
        "div",
        { role: "rowgroup", "data-scope": "table", "data-part": "header" },
        table.getHeaderGroups().map((group) =>
          h(
            "div",
            { key: group.id, role: "row", "data-scope": "table", "data-part": "row" },
            group.headers.map((header) => {
              const column = header.column;
              if (column.id === SELECT_COL_ID) {
                const all = table.getIsAllRowsSelected();
                return h(
                  "div",
                  {
                    key: column.id,
                    role: "columnheader",
                    "data-scope": "table",
                    "data-part": "header-cell",
                    ...pinAttrs(column),
                  },
                  [
                    selectBox(
                      all,
                      table.getIsSomeRowsSelected() && !all,
                      () => table.toggleAllRowsSelected(!all),
                      "Select all rows",
                    ),
                  ],
                );
              }
              return renderHeaderCell(header);
            }),
          ),
        ),
      );

      const body = h(
        "div",
        {
          role: "rowgroup",
          "data-scope": "table",
          "data-part": "body",
          "data-merge": mergeMode.value || undefined,
          style: virtual.value
            ? { position: "relative", blockSize: `${totalSize.value}px` }
            : undefined,
        },
        [
          ...(virtual.value
            ? virtualRows.value.map((_, index) => renderRow(bodyRows[index]!, index))
            : bodyRows.map((row) => renderRow(row, -1))),
          ...(bodyRows.length === 0
            ? [h("div", { "data-scope": "table", "data-part": "empty" }, props.emptyText)]
            : []),
        ],
      );

      const hasFooters = table
        .getFooterGroups()
        .some((group) => group.headers.some((header) => header.column.columnDef.footer));

      const footer =
        props.stickyFooter && hasFooters
          ? h(
              "div",
              { role: "rowgroup", "data-scope": "table", "data-part": "footer" },
              table.getFooterGroups().map((group) =>
                h(
                  "div",
                  { key: group.id, role: "row", "data-scope": "table", "data-part": "row" },
                  group.headers.map((header) =>
                    h(
                      "div",
                      {
                        key: header.column.id,
                        role: "columnheader",
                        "data-scope": "table",
                        "data-part": "footer-cell",
                        "data-numeric": header.column.columnDef.meta?.numeric ? "" : undefined,
                        ...pinAttrs(header.column),
                      },
                      [header.isPlaceholder ? null : h(FlexRender, { footer: header })],
                    ),
                  ),
                ),
              ),
            )
          : null;

      /** The bar only exists when the pagination feature is registered;
       * its state reads stay inside this branch. */
      const paginationBar = props.paginated
        ? (() => {
            const pagination = table.atoms.pagination.get();
            const rowCount = table.getRowCount();
            const pageCount = table.getPageCount();
            return h("div", { "data-scope": "table", "data-part": "pagination" }, [
              h(
                "button",
                {
                  type: "button",
                  "data-scope": "table",
                  "data-part": "page-button",
                  disabled: !table.getCanPreviousPage(),
                  onClick: () => table.previousPage(),
                },
                "Prev",
              ),
              h(
                "button",
                {
                  type: "button",
                  "data-scope": "table",
                  "data-part": "page-button",
                  disabled: !table.getCanNextPage(),
                  onClick: () => table.nextPage(),
                },
                "Next",
              ),
              h(
                "select",
                {
                  "data-scope": "table",
                  "data-part": "page-size",
                  "aria-label": "Rows per page",
                  value: pagination.pageSize,
                  onChange: (e: Event) =>
                    table.setPageSize(Number((e.target as HTMLSelectElement).value)),
                },
                props.pageSizeOptions.map((size) =>
                  h("option", { key: size, value: size }, `${size} / page`),
                ),
              ),
              h("span", { "data-scope": "table", "data-part": "page-status" }, [
                `Page ${pagination.pageIndex + 1} of ${pageCount} · ${rowCount} rows`,
              ]),
            ]);
          })()
        : null;

      const toolbar = props.filterable
        ? h("div", { "data-scope": "table", "data-part": "toolbar" }, [
            h("input", {
              type: "search",
              "data-scope": "table",
              "data-part": "global-filter",
              "aria-label": "Filter all columns",
              placeholder: props.globalFilterPlaceholder,
              value: (table.atoms.globalFilter.get() as string) ?? "",
              onInput: (e: Event) => table.setGlobalFilter((e.target as HTMLInputElement).value),
            }),
          ])
        : null;

      return h(
        "div",
        {
          "data-scope": "table",
          "data-part": "root",
          "data-reorderable": props.reorderable || undefined,
          style: {
            "--bs-table-row-height": `calc(${baseRowHeight()}px * var(--bs-density-scale, 1))`,
          },
        },
        [
          toolbar,
          h(
            "div",
            { "data-scope": "table", "data-part": "viewport", ref: viewport },
            h(
              "div",
              {
                role: "table",
                "data-scope": "table",
                "data-part": "table",
                style: { "--bs-table-cols": colsTemplate.value },
              },
              [header, body, footer],
            ),
          ),
          paginationBar,
        ],
      );
    };
  },
});

injectComponentStyle("table");
