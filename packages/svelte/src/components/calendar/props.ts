import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Selected date(s) — an array, as the machine speaks in ranges. */
  value?: unknown[];
  min?: unknown;
  max?: unknown;
  onValueChange?: (value: unknown[]) => void;
  children?: Snippet;
}
