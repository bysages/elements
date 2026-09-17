import type { HTMLAttributes } from "svelte/elements";

export interface SuggestionProps extends HTMLAttributes<HTMLButtonElement> {
  /** The next stroke this seal proposes — also its label; handed
   * back whole on `onSelect`. */
  prompt: string;
  onSelect?: (prompt: string) => void;
}
