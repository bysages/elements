import BentoComponent from "./Bento.svelte";
import BentoCellComponent from "./BentoCell.svelte";

/** The bento lattice: a grid of unequal tiles that reads as one plate
 * — Bento, Bento.Cell. */
export const Bento = Object.assign(BentoComponent, { Cell: BentoCellComponent });

export type { BentoProps } from "./props";
