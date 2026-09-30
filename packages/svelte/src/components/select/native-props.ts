import type { HTMLAttributes } from "svelte/elements";

export interface NativeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "size" | "children"
> {
  /** Two-way bindable — the chosen value. */
  value?: string;
  options: NativeSelectOption[];
  /** One rung of the control-height ladder. */
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  placeholder?: string;
  disabled?: boolean;
}
