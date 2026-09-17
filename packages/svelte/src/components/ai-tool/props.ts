import type { HTMLAttributes } from "svelte/elements";

export type ToolStatus = "pending" | "running" | "completed" | "error";

export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless `label` speaks friendlier words. */
  name: string;
  label?: string;
  /** The state the call reached — stamped on the fold and whispered
   * in the status chip. */
  status?: ToolStatus;
  input?: string;
  output?: string;
}
