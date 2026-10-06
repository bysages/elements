import { withSelfRoot } from "../../internal/family";
import ToolbarComponent from "./Toolbar.svelte";

/** A workbench rail: the start tools at the leading edge, the end
 * tools at the trailing. */
export const Toolbar = withSelfRoot(ToolbarComponent);

export type { ToolbarProps } from "./props";
