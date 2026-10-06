import { withSelfRoot } from "../../internal/family";
import OrderListComponent from "./OrderList.svelte";

/** A ledger the reader may rewrite: rows move by grip or by the side
 * arrows; the value is the order. */
export const OrderList = withSelfRoot(OrderListComponent);

export type { OrderListProps, OrderOption } from "./props";
