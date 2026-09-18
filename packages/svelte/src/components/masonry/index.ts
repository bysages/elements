import { injectComponentStyle } from "@bysages/core";

import MasonryComponent from "./Masonry.svelte";

/** A wall of uneven heights: items flow down each column before
 * crossing to the next, so the order is column-first. A row-flow wall
 * would need grid masonry, which browsers do not ship yet. */
export const Masonry = MasonryComponent;

export type { MasonryProps } from "./props";

injectComponentStyle("masonry");
