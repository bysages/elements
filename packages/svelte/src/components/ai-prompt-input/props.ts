import type { HTMLAttributes } from "svelte/elements";

export interface PromptInputProps extends HTMLAttributes<HTMLFormElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field; send clears it back through the binding. */
  value?: string;
  onSubmit?: (value: string) => void;
  /** The quiet invitation before the reader types. */
  placeholder?: string;
  disabled?: boolean;
}
