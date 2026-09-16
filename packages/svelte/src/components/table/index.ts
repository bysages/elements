import { injectComponentStyle } from "@bysages/core";
import type { CellData, RowData, TableFeatures } from "@tanstack/svelte-table";

import DataTableComponent from "./DataTable.svelte";

/** The control recipe as a one-stop data table: sorting, filtering,
 * pinning, merging, virtualization, and drag-to-reorder behind one
 * component. The API is TanStack's own — columns ride `ColumnDef`. */
export const DataTable = DataTableComponent;

export type { DataTableProps } from "./props";
export { FlexRender, createColumnHelper } from "@tanstack/svelte-table";
export type { ColumnDef, SortingState } from "@tanstack/svelte-table";

/** Column metadata understood by this table: mark columns whose values
 * read right-aligned in tabular figures. The type parameters mirror the
 * library's own declaration — augmentation merging demands an identical
 * parameter list. */
declare module "@tanstack/svelte-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    numeric?: boolean;
  }
}

injectComponentStyle("table");
