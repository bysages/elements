import { withSelfRoot } from "../../internal/family";
import GridComponent from "./Grid.svelte";

/** An alignment lattice: tracks of equal measure, sized by column count
 * — or, with `minChildWidth`, as many tracks as the container fits. */
export const Grid = withSelfRoot(GridComponent);

export type { GridProps } from "./props";
