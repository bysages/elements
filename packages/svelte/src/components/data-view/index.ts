import { withSelfRoot } from "../../internal/family";
import DataViewComponent from "./DataView.svelte";

/** One vessel, two layouts: a ledger or a lattice, paged with the
 * pagination family's own parts. */
export const DataView = withSelfRoot(DataViewComponent);

export type { DataViewProps } from "./props";
