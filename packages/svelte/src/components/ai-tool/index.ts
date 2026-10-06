import { withSelfRoot } from "../../internal/family";
import AiToolComponent from "./AiTool.svelte";

/** A tool call: the shared collapsible as the vessel — the name it
 * was reached by and the state it reached in on the trigger, its
 * input and output folded inside. */
export const AiTool = withSelfRoot(AiToolComponent);
export { AiTool as Tool };

export type { ToolProps, ToolStatus } from "./props";
