import type { HTMLAttributes } from "svelte/elements";

export interface TerminalProps extends Omit<HTMLAttributes<HTMLDivElement>, "oncommand"> {
  /** The transcript, oldest line first. */
  lines?: string[];
  /** The sigil at the head of the entry line. */
  prompt?: string;
  placeholder?: string;
  label?: string;
  onCommand?: (text: string) => void;
}
