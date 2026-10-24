import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type ToolStatus = "pending" | "running" | "completed" | "error" | "denied";
export type ToolApproval = "required" | "approved" | "denied";
export type ToolValue =
  | string
  | number
  | boolean
  | null
  | ToolValue[]
  | { [key: string]: ToolValue };

export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless `label` speaks friendlier words. */
  name: string;
  /** Friendlier trigger words than the raw tool name. */
  label?: string | Snippet;
  /** The state the call reached — stamped on the fold and whispered
   * in the status chip. */
  status?: ToolStatus;
  /** The human approval gate, when the call needs one. */
  approval?: ToolApproval;
  /** Custom request display; structured data can ride `inputValue`. */
  input?: Snippet;
  /** The machine-readable request, formatted automatically. */
  inputValue?: ToolValue;
  /** Custom answer display; structured data can ride `outputValue`. */
  output?: Snippet;
  /** The machine-readable answer, formatted automatically. */
  outputValue?: ToolValue;
  /** The fold arrives open when set — rides the shared collapsible. */
  defaultOpen?: boolean;
  /** The request was approved. */
  onApprove?: () => void;
  /** The request was denied. */
  onDeny?: () => void;
}
