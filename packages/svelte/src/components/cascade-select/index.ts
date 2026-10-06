import { withSelfRoot } from "../../internal/family";
import CascadeSelectComponent from "./CascadeSelect.svelte";

/** A corridor of linked columns: pick a branch and the next column
 * dissolves open beside it, until a leaf click settles the whole
 * path. */
export const CascadeSelect = withSelfRoot(CascadeSelectComponent);

export type { CascadeSelectNode, CascadeSelectProps } from "./props";
