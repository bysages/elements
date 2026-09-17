import { injectComponentStyle } from "@bysages/core";

import CascadeSelectComponent from "./CascadeSelect.svelte";

/** A corridor of linked columns: pick a branch and the next column
 * dissolves open beside it, until a leaf click settles the whole
 * path. */
export const CascadeSelect = CascadeSelectComponent;

export type { CascadeSelectNode, CascadeSelectProps } from "./props";

injectComponentStyle("cascade-select");
