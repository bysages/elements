import { injectComponentStyle } from "@bysages/core";

import TransferComponent from "./Transfer.svelte";

/** Two ledgers and a crossing: items sit in the source column until
 * the reader checks them and walks them across — and back, the same
 * way. */
export const Transfer = TransferComponent;

export type { TransferItem, TransferProps } from "./props";

// The rows are the checkbox family's own seals — the transfer
// stylesheet only dresses the ledgers around them.
injectComponentStyle("transfer");
injectComponentStyle("checkbox");
