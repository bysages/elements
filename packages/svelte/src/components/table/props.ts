import type { ColumnDef, RowData, SortingState } from "@tanstack/svelte-table";
import type { HTMLAttributes } from "svelte/elements";

/** One-stop data table on TanStack Table v9, dressed in the paper-and-ink
 * system: rows are CSS grids under ARIA table semantics, so sticky headers,
 * pinned columns, merged cells, and a virtualized window all stay honest
 * while sorting, filtering, tree expansion, selection, and pagination come
 * from the row-model pipeline. */
export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
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
}
