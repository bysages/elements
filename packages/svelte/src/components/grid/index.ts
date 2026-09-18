import { injectComponentStyle } from "@bysages/core";

import GridComponent from "./Grid.svelte";

/** An alignment lattice: tracks of equal measure, sized by column count
 * — or, with `minChildWidth`, as many tracks as the container fits. */
export const Grid = GridComponent;

export type { GridProps } from "./props";

injectComponentStyle("grid");
