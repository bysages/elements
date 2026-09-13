import { injectComponentStyle } from "@bysages/core";
import type { SortingState } from "@tanstack/vue-table";
import {
  FlexRender,
  cellSpanningFeature,
  columnFilteringFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/vue-table";
import type { Column, ColumnDef, Header, Row, RowData } from "@tanstack/vue-table";
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
 * read right-aligned in tabular figures. */
declare module "@tanstack/vue-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TFeatures, TData, TValue> {
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
   * unless it uses `accessorKey`; `size` fixes a px width, otherwise the
   * column flexes (`minmax(minSize ?? 96px, 1fr)`). */
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
}

const SELECT_COL_ID = "__select";
const SELECT_COL_WIDTH = 48;

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
  },
  setup(rawProps, { expose }) {
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
      sortFns,
      rowSelectionFeature,
      rowExpandingFeature,
      expandedRowModel: createExpandedRowModel(),
      columnPinningFeature,
      columnSizingFeature,
      columnVisibilityFeature,
      cellSpanningFeature,
      ...(props.filterable
        ? {
            columnFilteringFeature,
            globalFilteringFeature,
            filteredRowModel: createFilteredRowModel(),
            filterFns,
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
      getSubRows: (row: any) => row.subRows,
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
          return def?.size != null ? `${def.size}px` : `minmax(${def?.minSize ?? 96}px, 1fr)`;
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
            onClick: (e: Event) => e.stopPropagation(),
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
          "aria-sort":
            sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined,
          ...pinAttrs(column),
          onClick: canSort ? () => column.toggleSorting() : undefined,
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
      return h(
        "div",
        {
          key: row.id,
          role: "row",
          "data-scope": "table",
          "data-part": "row",
          "data-selected": row.getIsSelected() || undefined,
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
