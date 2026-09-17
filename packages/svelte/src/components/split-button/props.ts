import type { HTMLAttributes } from "svelte/elements";

export interface SplitButtonEntry {
  label: string;
  /** Handed back with `onSelect` when the entry is chosen. */
  value: string;
  danger?: boolean;
  disabled?: boolean;
}

export interface SplitButtonProps extends HTMLAttributes<HTMLDivElement> {
  /** The main action's label. */
  label: string;
  /** The dropdown's entries. */
  items?: SplitButtonEntry[];
  /** How both halves rest; the arrow always reads as one control with
   * the main button. */
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** The main button was pressed. */
  onclick?: () => void;
  /** An entry was chosen; carries its `value`. */
  onSelect?: (value: string) => void;
}
