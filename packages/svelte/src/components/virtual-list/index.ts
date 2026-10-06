import { withSelfRoot } from "../../internal/family";
import VirtualListComponent from "./VirtualList.svelte";

/** A ledger that only mounts the rows on stage. */
export const VirtualList = withSelfRoot(VirtualListComponent);

export type { VirtualListProps } from "./props";
