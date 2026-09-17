import { injectComponentStyle } from "@bysages/core";

import AiToolComponent from "./AiTool.svelte";

/** A tool call: the shared collapsible as the vessel — the name it
 * was reached by and the state it reached in on the trigger, its
 * input and output folded inside. */
export const AiTool = AiToolComponent;

export type { ToolProps, ToolStatus } from "./props";

injectComponentStyle("ai");
